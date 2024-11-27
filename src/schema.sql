CREATE TABLE IF NOT EXISTS urls(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    expires_at TIMESTAMP,
    clicks INTEGER DEFAULT 0
)