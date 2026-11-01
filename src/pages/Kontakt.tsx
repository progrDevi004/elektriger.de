import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Phone, Mail, ArrowRight, ArrowLeft, User, Building2, Briefcase, FileText, CheckCircle, Send, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { supabase } from "@/integrations/supabase/client";
import { SITE_EMAIL } from "@/data/brand";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    city: "Peine",
    phone: "+49 1520 6268513"
  }
];

type UserType = "privat" | "gewerbe";

interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  subject: string;
  message: string;
  cv?: File | null;
}

const privatSubjects = [
  "Smart Home Beratung",
  "Elektrik Neubau / Sanierung",
  "Sanierung / Modernisierung",
  "Ambient Assisted Living",
  "Sonstiges"
];

const gewerbeSubjects = [
  "E-Check / Prüfung",
  "Dokumentation / Revisionspläne",
  "Smart Home",
  "Bauüberwachung / Bauherrenbegleitung",
  "Netzwerktechnik",
  "Sonstiges"
];

const Kontakt = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>("privat");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: "privat",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    subject: "",
    message: "",
    cv: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const { HoneypotField, isSpam } = useSpamProtection();
  const totalSteps = userType === "privat" ? 3 : 3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(".type-toggle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });

      // Form card animation
      gsap.from(".form-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".form-card",
          start: "top 85%"
        }
      });

      // Offices animation
      gsap.from(".office-card", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".offices-section",
          start: "top 80%"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setFormData(prev => ({ ...prev, userType: type, subject: "" }));
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Privacy checkbox validation
    if (!privacyAccepted) {
      setPrivacyError(true);
      toast.error("Bitte akzeptieren Sie die Datenschutzerklärung und AGB.");
      return;
    }
    
    // Spam protection check
    if (isSpam()) {
      toast.error("Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Upload CV if present
      let cvUrl = null;
      if (formData.cv) {
        const fileExt = formData.cv.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('cv-uploads')
          .upload(fileName, formData.cv);
        
        if (uploadError) {
          console.error('CV upload error:', uploadError);
        } else {
          cvUrl = uploadData.path;
        }
      }

      // Save to database
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          user_type: formData.userType,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          position: formData.position || null,
          subject: formData.subject,
          message: formData.message,
          cv_url: cvUrl
        });

      if (error) {
        console.error('Submission error:', error);
        toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
      } else {
        // Send email notification
        try {
          await supabase.functions.invoke('send-notification-email', {
            body: {
              type: 'contact',
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              position: formData.position,
              subject: formData.subject,
              message: formData.message,
              userType: formData.userType
            }
          });
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't show error to user, submission was still successful
        }
        
        setIsSubmitted(true);
        toast.success("Ihre Nachricht wurde erfolgreich gesendet!");
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userType: "privat",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      subject: "",
      message: "",
      cv: null
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setPrivacyAccepted(false);
    setPrivacyError(false);
  };

  const renderPrivatStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="privat-step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Persönliche Daten</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Vorname *</label>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="Max"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nachname *</label>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="Mustermann"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">E-Mail *</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                placeholder="max@email.de"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                placeholder="+49 123 456789"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="privat-step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Ihr Anliegen</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Betreff *</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                required
              >
                <option value="">Bitte wählen...</option>
                {privatSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Objektart / Beschreibung</label>
              <input 
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                placeholder="z.B. Einfamilienhaus Neubau"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="privat-step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Ihre Nachricht</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nachricht *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all resize-none text-sm"
                placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                required
              />
            </div>
            <div className="flex items-start gap-3 pt-4">
              <input 
                type="checkbox"
                id="privacy-privat"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (e.target.checked) setPrivacyError(false);
                }}
                className={`mt-1 h-4 w-4 rounded border-border bg-secondary text-teal focus:ring-teal/50 ${privacyError ? 'ring-2 ring-red-400' : ''}`}
              />
              <label htmlFor="privacy-privat" className="text-sm text-muted-foreground leading-relaxed">
                Ich habe die <a href="/datenschutz" className="text-teal hover:underline">Datenschutzerklärung</a> und die <a href="/agb" className="text-teal hover:underline">AGB</a> gelesen und akzeptiere diese. *
              </label>
            </div>
            {privacyError && (
              <p className="text-xs text-red-400 mt-2">Bitte akzeptieren Sie die Datenschutzerklärung und AGB.</p>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderGewerbeStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="unternehmen-step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Ihre Kontaktdaten</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Vorname *</label>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="Maria"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nachname *</label>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="Schmidt"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Unternehmen *</label>
              <input 
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                placeholder="Ihr Unternehmen GmbH"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-Mail *</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="maria@unternehmen.de"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="unternehmen-step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Ihr Bedarf</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Betreff *</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                required
              >
                <option value="">Bitte wählen...</option>
                {gewerbeSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Projektbeschreibung (optional)</label>
              <input 
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all text-sm"
                placeholder="z.B. Mehrfamilienhaus, 12 Einheiten"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="unternehmen-step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-medium text-primary">Projektbeschreibung</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nachricht *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all resize-none text-sm"
                placeholder="Beschreiben Sie Ihr Projekt oder Ihren Bedarf..."
                required
              />
            </div>
            <div className="flex items-start gap-3 pt-4">
              <input 
                type="checkbox"
                id="privacy-gewerbe"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (e.target.checked) setPrivacyError(false);
                }}
                className={`mt-1 h-4 w-4 rounded border-border bg-secondary text-teal focus:ring-teal/50 ${privacyError ? 'ring-2 ring-red-400' : ''}`}
              />
              <label htmlFor="privacy-gewerbe" className="text-sm text-muted-foreground leading-relaxed">
                Ich habe die <a href="/datenschutz" className="text-teal hover:underline">Datenschutzerklärung</a> und die <a href="/agb" className="text-teal hover:underline">AGB</a> gelesen und akzeptiere diese. *
              </label>
            </div>
            {privacyError && (
              <p className="text-xs text-red-400 mt-2">Bitte akzeptieren Sie die Datenschutzerklärung und AGB.</p>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SEO
        title="Kontakt – Elektriker in Peine für Elektrik & Energie"
        description="Kontaktieren Sie Ihren Elektriker in Peine für Elektrik, Smart Home, E-Check oder Energie-Themen. Wir antworten in der Regel innerhalb von 24 Stunden."
        path="/kontakt"
        keywords="Kontakt Elektriker Peine, Elektriker Peine anfragen, Elektrik Angebot Peine, Smart Home Beratung Peine, E-Check Peine"
      />
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div ref={heroRef} className="text-center mb-16">
            <span className="hero-subtitle inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20 mb-6">
              Kontakt aufnehmen
            </span>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 text-gradient-silver">
              Lassen Sie uns sprechen
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ob Elektrik, Smart Home, Energie oder E-Check – wir sind für Sie da.
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="type-toggle flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-full bg-secondary border border-border">
              <button
                onClick={() => handleUserTypeChange("privat")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  userType === "privat"
                    ? "bg-gradient-to-r from-teal to-green text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Privatkunde
              </button>
              <button
                onClick={() => handleUserTypeChange("gewerbe")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  userType === "gewerbe"
                    ? "bg-gradient-to-r from-teal to-green text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Gewerbekunde
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Multi-Step Form */}
            <div ref={formRef} className="form-card lg:col-span-2 p-8 md:p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm max-w-xl mx-auto lg:max-w-none w-full">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary mb-4">Vielen Dank!</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-full text-foreground hover:border-teal/50 transition-all"
                  >
                    Neue Anfrage starten
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-10 w-full">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                      <div key={index} className={`flex items-center ${index < totalSteps - 1 ? 'flex-1' : ''}`}>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 flex-shrink-0 ${
                            index + 1 <= currentStep
                              ? "bg-gradient-to-br from-teal to-green text-white"
                              : "bg-secondary border border-border text-muted-foreground"
                          }`}
                        >
                          {index + 1 < currentStep ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        {index < totalSteps - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
                              index + 1 < currentStep ? "bg-teal" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <HoneypotField />
                    <AnimatePresence mode="wait">
                      {userType === "privat" ? renderPrivatStep() : renderGewerbeStep()}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                          currentStep === 1
                            ? "opacity-0 pointer-events-none"
                            : "bg-secondary border border-border text-foreground hover:border-teal/50"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </button>

                      {currentStep < totalSteps ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 hover:scale-[1.02] transition-all duration-300"
                        >
                          Weiter
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-green text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar - Offices & Contact */}
            <div className="offices-section space-y-6">
              <div className="office-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-primary mb-4">Adresse</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Gunzelinstr. 12a
                    <br />
                    31224 Peine
                    <br />
                    <span className="text-sm">Einsatzgebiet: ca. 50 km Umgebung</span>
                  </p>
                </div>
              </div>

              <div className="office-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-primary mb-4">Telefon</h3>
                {offices.map((office) => (
                  <div key={office.city} className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-5 h-5 text-teal shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-teal transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="office-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-medium text-primary mb-4">E-Mail</h3>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-teal shrink-0" />
                  <a href={`mailto:${SITE_EMAIL}`} className="hover:text-teal transition-colors">
                    {SITE_EMAIL}
                  </a>
                </div>
              </div>

              <div className="office-card p-6 rounded-2xl border border-border bg-gradient-to-br from-teal/10 to-green/10">
                <h3 className="text-lg font-medium text-primary mb-3">Schnelle Antwort</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir antworten in der Regel innerhalb von 24 Stunden auf Ihre Anfrage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kontakt;