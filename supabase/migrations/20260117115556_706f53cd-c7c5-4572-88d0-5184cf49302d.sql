-- Tabelle für Kontaktanfragen
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type TEXT NOT NULL CHECK (user_type IN ('bewerber', 'unternehmen')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  position TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  cv_url TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabelle für CV-Check Einreichungen
CREATE TABLE public.cv_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  current_position TEXT,
  target_position TEXT,
  additional_notes TEXT,
  cv_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'completed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS aktivieren
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_submissions ENABLE ROW LEVEL SECURITY;

-- Jeder kann Kontaktanfragen erstellen (öffentliches Formular)
CREATE POLICY "Anyone can create contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Nur Admins können Kontaktanfragen lesen
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Nur Admins können Kontaktanfragen aktualisieren
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Jeder kann CV-Submissions erstellen (öffentliches Formular)
CREATE POLICY "Anyone can create cv submissions"
ON public.cv_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Nur Admins können CV-Submissions lesen
CREATE POLICY "Admins can view cv submissions"
ON public.cv_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Nur Admins können CV-Submissions aktualisieren
CREATE POLICY "Admins can update cv submissions"
ON public.cv_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger für updated_at
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cv_submissions_updated_at
BEFORE UPDATE ON public.cv_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();