import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Upload, FileText, MessageSquare, ArrowRight, ArrowLeft, User, Briefcase, X } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { supabase } from "@/integrations/supabase/client";

const formSteps = [
  {
    number: 1,
    icon: User,
    title: "Persönliche Daten",
    description: "Ihre Kontaktinformationen"
  },
  {
    number: 2,
    icon: Briefcase,
    title: "Berufliches",
    description: "Position & Ziele"
  },
  {
    number: 3,
    icon: Upload,
    title: "CV-Upload",
    description: "PDF hochladen"
  },
  {
    number: 4,
    icon: MessageSquare,
    title: "Abschluss",
    description: "Anmerkungen & Absenden"
  }
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const cvCheckSchema = z.object({
  firstName: z.string().trim().min(2, "Mindestens 2 Zeichen").max(50, "Maximal 50 Zeichen"),
  lastName: z.string().trim().min(2, "Mindestens 2 Zeichen").max(50, "Maximal 50 Zeichen"),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(100, "Maximal 100 Zeichen"),
  phone: z.string().trim().optional(),
  currentPosition: z.string().trim().max(100, "Maximal 100 Zeichen").optional(),
  targetPosition: z.string().trim().max(100, "Maximal 100 Zeichen").optional(),
  additionalNotes: z.string().trim().max(1000, "Maximal 1.000 Zeichen").optional(),
});

type CVCheckFormData = z.infer<typeof cvCheckSchema>;

const CVCheck = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileError, setCvFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { HoneypotField, isSpam } = useSpamProtection();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<CVCheckFormData>({
    resolver: zodResolver(cvCheckSchema),
    mode: "onChange"
  });

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "Bitte laden Sie nur PDF-Dateien hoch.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Die Datei ist zu groß (max. 10 MB).";
    }
    return null;
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setCvFileError(error);
      setCvFile(null);
    } else {
      setCvFile(file);
      setCvFileError(null);
    }
  }, [validateFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const removeFile = useCallback(() => {
    setCvFile(null);
    setCvFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const validateStep = async (step: number) => {
    switch (step) {
      case 1:
        return await trigger(["firstName", "lastName", "email", "phone"]);
      case 2:
        return await trigger(["currentPosition", "targetPosition"]);
      case 3:
        if (!cvFile) {
          setCvFileError("Bitte laden Sie Ihren Lebenslauf als PDF hoch.");
          return false;
        }
        return true;
      case 4:
        return await trigger(["additionalNotes"]);
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CVCheckFormData) => {
    if (!cvFile) {
      toast.error("Bitte laden Sie Ihren Lebenslauf als PDF hoch.");
      return;
    }
    
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
      // Upload CV to storage
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('cv-uploads')
        .upload(fileName, cvFile);
      
      if (uploadError) {
        console.error('CV upload error:', uploadError);
        toast.error("Fehler beim Hochladen der Datei. Bitte versuchen Sie es erneut.");
        setIsSubmitting(false);
        return;
      }

      // Save to database
      const { error } = await supabase
        .from('cv_submissions')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          current_position: data.currentPosition || null,
          target_position: data.targetPosition || null,
          additional_notes: data.additionalNotes || null,
          cv_url: uploadData.path
        });

      if (error) {
        console.error('Submission error:', error);
        toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
      } else {
        // Send email notification
        try {
          await supabase.functions.invoke('send-notification-email', {
            body: {
              type: 'cv',
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              currentPosition: data.currentPosition,
              targetPosition: data.targetPosition,
              additionalNotes: data.additionalNotes
            }
          });
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't show error to user, submission was still successful
        }
        
        setIsSubmitted(true);
        toast.success("CV erfolgreich eingereicht! Wir melden uns innerhalb von 48 Stunden.");
        reset();
        setCvFile(null);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-gradient-silver">
              CV Check
            </h1>
            <p className="text-base md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
              Professionelles Feedback zu Ihrem Lebenslauf von erfahrenen Personalberatern.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 rounded-2xl border border-teal/30 bg-teal/5 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-teal" />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">Vielen Dank!</h2>
              <p className="text-foreground mb-8 max-w-md mx-auto">
                Wir haben Ihren CV erhalten und werden uns innerhalb von 48 Stunden mit detailliertem Feedback bei Ihnen melden.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                variant="outline"
                className="border-teal/30 hover:bg-teal/10"
              >
                Neuen CV einreichen
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Step Indicator */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {formSteps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            currentStep >= step.number 
                              ? 'bg-teal text-white' 
                              : 'bg-secondary border border-border text-muted-foreground'
                          }`}
                        >
                          {currentStep > step.number ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="hidden md:block mt-2 text-center">
                          <p className={`text-xs font-medium ${currentStep >= step.number ? 'text-teal' : 'text-muted-foreground'}`}>
                            {step.title}
                          </p>
                        </div>
                      </div>
                      {index < formSteps.length - 1 && (
                        <div 
                          className={`w-8 md:w-16 lg:w-24 h-px mx-2 transition-colors duration-300 ${
                            currentStep > step.number ? 'bg-teal' : 'bg-border'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Mobile Step Title */}
                <div className="md:hidden mt-4 text-center">
                  <p className="text-sm font-medium text-teal">{formSteps[currentStep - 1].title}</p>
                  <p className="text-xs text-muted-foreground">{formSteps[currentStep - 1].description}</p>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                  <HoneypotField />
                  <AnimatePresence mode="wait" custom={currentStep}>
                    {/* Step 1: Personal Info */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Persönliche Daten</h2>
                        <p className="text-sm text-muted-foreground mb-6">Wie können wir Sie erreichen?</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm text-foreground">
                              Vorname *
                            </Label>
                            <Input
                              id="firstName"
                              {...register("firstName")}
                              placeholder="Max"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                            {errors.firstName && (
                              <p className="text-xs text-red-400">{errors.firstName.message}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm text-foreground">
                              Nachname *
                            </Label>
                            <Input
                              id="lastName"
                              {...register("lastName")}
                              placeholder="Mustermann"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                            {errors.lastName && (
                              <p className="text-xs text-red-400">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm text-foreground">
                              E-Mail *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              {...register("email")}
                              placeholder="max@beispiel.de"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                            {errors.email && (
                              <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm text-foreground">
                              Telefon (optional)
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              {...register("phone")}
                              placeholder="+49 123 456789"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Professional Info */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={2}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Berufliches</h2>
                        <p className="text-sm text-muted-foreground mb-6">Wo stehen Sie und wohin möchten Sie?</p>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPosition" className="text-sm text-foreground">
                              Aktuelle Position (optional)
                            </Label>
                            <Input
                              id="currentPosition"
                              {...register("currentPosition")}
                              placeholder="z.B. Senior Tax Manager bei Big-4"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="targetPosition" className="text-sm text-foreground">
                              Zielposition (optional)
                            </Label>
                            <Input
                              id="targetPosition"
                              {...register("targetPosition")}
                              placeholder="z.B. Partner in mittelständischer Kanzlei"
                              className="bg-secondary border-border focus:border-teal/50"
                            />
                            <p className="text-xs text-muted-foreground">
                              Hilft uns, Ihren CV gezielter zu analysieren.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: CV Upload */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={3}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Lebenslauf hochladen</h2>
                        <p className="text-sm text-muted-foreground mb-6">Laden Sie Ihren Lebenslauf als PDF-Datei hoch.</p>
                        
                        <div className="space-y-4">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleInputChange}
                            className="hidden"
                            id="cv-upload"
                          />
                          
                          {!cvFile ? (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-8 md:p-12 text-center ${
                                isDragging 
                                  ? 'border-teal bg-teal/10' 
                                  : cvFileError 
                                    ? 'border-red-400/50 bg-red-400/5' 
                                    : 'border-border bg-secondary hover:border-teal/50 hover:bg-card'
                              }`}
                            >
                              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors ${
                                isDragging ? 'bg-teal/20' : 'bg-secondary'
                              }`}>
                                <Upload className={`w-7 h-7 transition-colors ${isDragging ? 'text-teal' : 'text-muted-foreground'}`} />
                              </div>
                              <p className="text-foreground font-medium mb-1">
                                {isDragging ? 'Datei hier ablegen' : 'PDF-Datei hochladen'}
                              </p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Drag & Drop oder klicken zum Auswählen
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Max. 10 MB • Nur PDF-Dateien
                              </p>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-teal/30 bg-teal/5 p-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-6 h-6 text-teal" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-foreground font-medium truncate">{cvFile.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={removeFile}
                                  className="flex-shrink-0 hover:bg-red-400/10 hover:text-red-400"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {cvFileError && (
                            <p className="text-xs text-red-400">{cvFileError}</p>
                          )}
                          
                          <p className="text-xs text-muted-foreground">
                            Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Additional Notes & Submit */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        custom={4}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Fast geschafft!</h2>
                        <p className="text-sm text-muted-foreground mb-6">Haben Sie noch Anmerkungen für uns?</p>
                        
                        <div className="space-y-2 mb-8">
                          <Label htmlFor="additionalNotes" className="text-sm text-foreground">
                            Anmerkungen (optional)
                          </Label>
                          <Textarea
                            id="additionalNotes"
                            {...register("additionalNotes")}
                            placeholder="z.B. Bitte achten Sie besonders auf die Darstellung meiner M&A-Erfahrung..."
                            className="bg-secondary border-border focus:border-teal/50 min-h-[120px] resize-y"
                          />
                        </div>

                        {/* Summary */}
                        <div className="p-4 rounded-xl bg-secondary border border-border mb-6">
                          <h3 className="text-sm font-medium text-primary mb-3">Zusammenfassung</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Name:</div>
                            <div className="text-foreground">{watch("firstName")} {watch("lastName")}</div>
                            <div className="text-muted-foreground">E-Mail:</div>
                            <div className="text-foreground">{watch("email")}</div>
                            {watch("currentPosition") && (
                              <>
                                <div className="text-muted-foreground">Aktuelle Position:</div>
                                <div className="text-foreground">{watch("currentPosition")}</div>
                              </>
                            )}
                            {watch("targetPosition") && (
                              <>
                                <div className="text-muted-foreground">Zielposition:</div>
                                <div className="text-foreground">{watch("targetPosition")}</div>
                              </>
                            )}
                            <div className="text-muted-foreground">CV-Datei:</div>
                            <div className="text-foreground">{cvFile?.name || "Keine Datei"}</div>
                          </div>
                        </div>

                        {/* Benefits reminder */}
                        <div className="p-4 rounded-xl bg-teal/5 border border-teal/20">
                          <h3 className="text-sm font-medium text-teal mb-2">Was Sie erhalten:</h3>
                          <ul className="text-xs text-foreground space-y-1">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-teal" />
                              Detaillierte Analyse innerhalb von 48h
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-teal" />
                              Konkrete Verbesserungsvorschläge
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-teal" />
                              Branchenspezifische Empfehlungen
                            </li>
                          </ul>
                        </div>

                        {/* Privacy Checkbox */}
                        <div className="flex items-start gap-3 pt-4">
                          <input 
                            type="checkbox"
                            id="privacy-cvcheck"
                            checked={privacyAccepted}
                            onChange={(e) => {
                              setPrivacyAccepted(e.target.checked);
                              if (e.target.checked) setPrivacyError(false);
                            }}
                            className={`mt-1 h-4 w-4 rounded border-border bg-secondary text-teal focus:ring-teal/50 ${privacyError ? 'ring-2 ring-red-400' : ''}`}
                          />
                          <label htmlFor="privacy-cvcheck" className="text-sm text-muted-foreground leading-relaxed">
                            Ich habe die <a href="/datenschutz" className="text-teal hover:underline">Datenschutzerklärung</a> und die <a href="/agb" className="text-teal hover:underline">AGB</a> gelesen und akzeptiere diese. *
                          </label>
                        </div>
                        {privacyError && (
                          <p className="text-xs text-red-400 mt-2">Bitte akzeptieren Sie die Datenschutzerklärung und AGB.</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`${currentStep === 1 ? 'invisible' : ''}`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-teal to-green text-white hover:shadow-lg hover:shadow-teal/25"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-teal to-green text-white hover:shadow-lg hover:shadow-teal/25"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Wird gesendet...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            CV einreichen <CheckCircle className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVCheck;
