-- Add DELETE policies for admins on contact_submissions and cv_submissions tables

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete cv submissions"
ON public.cv_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));