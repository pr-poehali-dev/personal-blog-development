CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT true
);

CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);