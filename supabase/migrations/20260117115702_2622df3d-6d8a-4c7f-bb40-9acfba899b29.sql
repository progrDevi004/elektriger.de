-- Storage Bucket für CV-Uploads erstellen
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('cv-uploads', 'cv-uploads', false, 10485760, ARRAY['application/pdf']);

-- Storage Policies
CREATE POLICY "Anyone can upload CVs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cv-uploads');

CREATE POLICY "Admins can view CVs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'cv-uploads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete CVs"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cv-uploads' AND public.has_role(auth.uid(), 'admin'));