-- Create providers table
CREATE TABLE public.providers (
  id integer PRIMARY KEY,
  profile_status text,
  membership_tier text,
  search_priority integer,
  provider_name text,
  practitioner_type jsonb NOT NULL,
  profile_photo jsonb NOT NULL,
  tier_badge jsonb NOT NULL,
  location jsonb NOT NULL,
  contact jsonb NOT NULL,
  social_media jsonb NOT NULL,
  bio_experience jsonb NOT NULL,
  training_and_ceus jsonb NOT NULL,
  media_content jsonb NOT NULL,
  specialties jsonb NOT NULL,
  availability jsonb NOT NULL,
  reviews_and_faqs jsonb NOT NULL,
  admin jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);