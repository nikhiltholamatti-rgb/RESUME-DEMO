-- ========================================================
-- ResumeForge Database Schema & Row Level Security (RLS)
-- ========================================================

-- 1. Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT DEFAULT 'My Resume',
    resume_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    theme JSONB NOT NULL DEFAULT '{}'::jsonb,
    template_id TEXT NOT NULL DEFAULT 'duo-blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT resumes_user_id_unique UNIQUE (user_id)
);

-- 2. Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id TEXT PRIMARY KEY DEFAULT ('fb_' || extract(epoch from now())::bigint::text),
    user_id TEXT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for resumes table
-- Users can view only their own resume
DROP POLICY IF EXISTS "Users can view their own resume" ON public.resumes;
CREATE POLICY "Users can view their own resume" 
ON public.resumes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own resume
DROP POLICY IF EXISTS "Users can insert their own resume" ON public.resumes;
CREATE POLICY "Users can insert their own resume" 
ON public.resumes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own resume
DROP POLICY IF EXISTS "Users can update their own resume" ON public.resumes;
CREATE POLICY "Users can update their own resume" 
ON public.resumes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own resume
DROP POLICY IF EXISTS "Users can delete their own resume" ON public.resumes;
CREATE POLICY "Users can delete their own resume" 
ON public.resumes 
FOR DELETE 
USING (auth.uid() = user_id);

-- 5. RLS Policies for feedback table
-- Anyone (authenticated or anonymous) can read feedback
DROP POLICY IF EXISTS "Anyone can view feedback" ON public.feedback;
CREATE POLICY "Anyone can view feedback" 
ON public.feedback 
FOR SELECT 
USING (true);

-- Anyone can submit feedback
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;
CREATE POLICY "Anyone can insert feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (true);

-- 6. Trigger for updated_at on resumes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_resumes_updated_at ON public.resumes;
CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON public.resumes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
