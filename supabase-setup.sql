-- =====================================================
-- Personal Blog - Supabase Database Setup
-- =====================================================
-- Run this in your Supabase SQL Editor to set up the database

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  stack TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- =====================================================
-- Sample Data (Optional - Remove if not needed)
-- =====================================================

-- Insert sample blog post
INSERT INTO posts (title, slug, content, excerpt)
VALUES (
  'Welcome to My Blog',
  'welcome-to-my-blog',
  '<h2>Hello World!</h2><p>This is my first blog post. I''m excited to share my thoughts and experiences with you.</p><p>In this blog, I''ll be writing about web development, programming, and technology in general. Stay tuned for more content!</p>',
  'An introduction to my blog and what you can expect to find here.'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, content, excerpt)
VALUES (
  'Building Modern Web Applications with Next.js',
  'building-modern-web-apps-nextjs',
  '<h2>Why Next.js?</h2><p>Next.js has become one of the most popular frameworks for building modern web applications. It offers server-side rendering, static site generation, and an amazing developer experience.</p><h3>Key Features</h3><ul><li>File-based routing</li><li>API routes</li><li>Automatic code splitting</li><li>Built-in CSS support</li></ul><p>In this post, I''ll explore why Next.js is my framework of choice for new projects.</p>',
  'Exploring the benefits of Next.js for modern web development and why it''s become my go-to framework.'
) ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (name, description, stack, link)
VALUES (
  'Personal Blog & Portfolio',
  'A modern, minimal personal website built with Next.js and Supabase. Features a blog, portfolio, and dark mode support.',
  'Next.js, TypeScript, Tailwind CSS, Supabase',
  'https://github.com/yourusername/personal-blog'
) ON CONFLICT DO NOTHING;

INSERT INTO projects (name, description, stack, link)
VALUES (
  'E-Commerce Platform',
  'Full-stack e-commerce application with product management, shopping cart, and payment integration.',
  'React, Node.js, Express, MongoDB, Stripe',
  'https://github.com/yourusername/ecommerce-platform'
) ON CONFLICT DO NOTHING;

INSERT INTO projects (name, description, stack, link)
VALUES (
  'Task Management App',
  'Collaborative task management tool with real-time updates and team collaboration features.',
  'Vue.js, Firebase, Vuex, Tailwind CSS',
  'https://github.com/yourusername/task-manager'
) ON CONFLICT DO NOTHING;

-- =====================================================
-- Indexes for better performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Your database is now ready to use with the Personal Blog application.
