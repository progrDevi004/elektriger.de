import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from '@/integrations/supabase/client';
import { Calculator, Scale, FileText, Briefcase, MapPin, ArrowLeft, ArrowRight, Clock, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Vakanz {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  job_type: string;
  description: string | null;
  is_remote: boolean | null;
  created_at: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Tax':
      return Calculator;
    case 'Audit':
      return Scale;
    case 'Legal':
      return FileText;
    default:
      return Briefcase;
  }
};

const VakanzDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vakanz, setVakanz] = useState<Vakanz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVakanz = async () => {
      if (!id) {
        setError(true);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('vakanzen')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        setError(true);
      } else {
        setVakanz(data);
      }
      setIsLoading(false);
    };

    fetchVakanz();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 bg-secondary rounded" />
              <div className="h-12 w-3/4 bg-secondary rounded" />
              <div className="h-6 w-1/2 bg-secondary rounded" />
              <div className="h-40 w-full bg-secondary rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !vakanz) {
    return (
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-medium text-primary mb-4">Vakanz nicht gefunden</h1>
            <p className="text-foreground mb-8">Diese Position ist nicht mehr verfügbar oder wurde nicht gefunden.</p>
            <Link to="/vakanzen">
              <Button className="bg-gradient-to-r from-teal to-green text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zu allen Vakanzen
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = getCategoryIcon(vakanz.category);
  const createdDate = new Date(vakanz.created_at).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link 
            to="/vakanzen"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Vakanzen
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal">
                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex gap-2">
                {vakanz.is_remote && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20">
                    Remote
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
                  {vakanz.category}
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-medium mb-3 text-gradient-silver">
              {vakanz.title}
            </h1>
            
            <p className="text-lg text-foreground">{vakanz.company}</p>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-teal" />
              <div>
                <p className="text-xs text-muted-foreground">Standort</p>
                <p className="text-sm text-primary">{vakanz.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-teal" />
              <div>
                <p className="text-xs text-muted-foreground">Anstellung</p>
                <p className="text-sm text-primary">{vakanz.job_type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-teal" />
              <div>
                <p className="text-xs text-muted-foreground">Gehalt</p>
                <p className="text-sm text-teal font-mono">{vakanz.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-teal" />
              <div>
                <p className="text-xs text-muted-foreground">Veröffentlicht</p>
                <p className="text-sm text-primary">{createdDate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {vakanz.description && (
            <div className="mb-10">
              <h2 className="text-xl font-medium text-primary mb-4">Stellenbeschreibung</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {vakanz.description}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 rounded-2xl border border-border bg-card text-center">
            <h2 className="text-xl font-medium text-primary mb-3">Interesse an dieser Position?</h2>
            <p className="text-foreground mb-6 max-w-lg mx-auto">
              Kontaktieren Sie uns vertraulich für weitere Informationen oder um sich zu bewerben.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cv-check">
                <Button variant="outline" className="border-border hover:bg-secondary">
                  CV einreichen
                </Button>
              </Link>
              <Link to="/kontakt">
                <Button className="bg-gradient-to-r from-teal to-green text-white hover:shadow-xl hover:shadow-teal/25">
                  Jetzt bewerben <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VakanzDetail;
