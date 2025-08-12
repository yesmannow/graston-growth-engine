CREATE POLICY "Auth insert providers" 
  ON public.providers 
  FOR INSERT TO authenticated WITH CHECK (true);