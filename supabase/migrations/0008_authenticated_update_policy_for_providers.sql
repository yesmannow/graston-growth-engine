CREATE POLICY "Auth update providers" 
  ON public.providers 
  FOR UPDATE TO authenticated USING (true);