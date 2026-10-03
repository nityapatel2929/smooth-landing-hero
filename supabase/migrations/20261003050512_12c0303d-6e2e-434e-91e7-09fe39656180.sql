ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_email_format CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT leads_message_length CHECK (char_length(btrim(message)) BETWEEN 1 AND 2000);