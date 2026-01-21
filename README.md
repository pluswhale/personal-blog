# Personal Blog & Portfolio

A modern, minimal personal website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🏠 **Home/About Page** - Showcase your profile with contact information
- 📝 **Blog Posts** - Dynamic blog powered by Supabase
- 💼 **Portfolio** - Display your projects with tech stack details
- 🌓 **Dark Mode** - Beautiful dark/light theme toggle
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **SEO Optimized** - Meta tags and Open Graph support
- 🚀 **Fast Performance** - Built on Next.js 14 App Router with ISR

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Theme:** next-themes
- **Deployment:** DigitalOcean (instructions included)

## Getting Started

### Prerequisites

- Node.js 20+ installed
- A Supabase account and project
- Git (for deployment)

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-blog

# Install dependencies
npm install
```

### 2. Set Up Supabase

#### Create Tables

Go to your Supabase dashboard → SQL Editor and run:

```sql
-- Posts table
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
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

-- Allow public read access
CREATE POLICY "Allow public read access on posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);
```

#### Insert Sample Data (Optional)

```sql
-- Sample post
INSERT INTO posts (title, slug, content, excerpt)
VALUES (
  'Welcome to My Blog',
  'welcome-to-my-blog',
  'This is my first blog post! I''m excited to share my thoughts and experiences with you.',
  'An introduction to my blog and what you can expect to find here.'
);

-- Sample project
INSERT INTO projects (name, description, stack, link)
VALUES (
  'Personal Blog',
  'A modern personal website built with Next.js and Supabase',
  'Next.js, TypeScript, Tailwind CSS, Supabase',
  'https://github.com/yourusername/personal-blog'
);
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from your Supabase project settings → API.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Customize Content

Edit the following files to personalize your site:

- `app/page.tsx` - Update your name, bio, and contact links
- `app/layout.tsx` - Update metadata and site information
- `components/Footer.tsx` - Customize footer content

## Project Structure

```
personal-blog/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home/About page
│   ├── globals.css         # Global styles
│   ├── posts/
│   │   ├── page.tsx        # Blog posts list
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   └── projects/
│       └── page.tsx        # Projects/portfolio page
├── components/
│   ├── Navigation.tsx      # Main navigation bar
│   ├── ThemeToggle.tsx     # Dark mode toggle
│   ├── ThemeProvider.tsx   # Theme context provider
│   └── Footer.tsx          # Footer component
├── lib/
│   ├── supabase.ts         # Supabase client setup
│   └── utils.ts            # Utility functions
├── types/
│   └── database.ts         # TypeScript types for Supabase
└── package.json
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to DigitalOcean.

## Adding Content

### Adding a New Blog Post

1. Go to your Supabase dashboard
2. Navigate to Table Editor → `posts`
3. Click "Insert row"
4. Fill in:
   - `title`: Post title
   - `slug`: URL-friendly slug (e.g., "my-first-post")
   - `content`: Post content (supports HTML)
   - `excerpt`: Short description
5. Click "Save"

### Adding a New Project

1. Go to your Supabase dashboard
2. Navigate to Table Editor → `projects`
3. Click "Insert row"
4. Fill in:
   - `name`: Project name
   - `description`: Project description
   - `stack`: Comma-separated tech stack (e.g., "React, Node.js, MongoDB")
   - `link`: URL to project or GitHub repo
5. Click "Save"

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Typography

The site uses system fonts for optimal performance. To use custom fonts:

1. Add font files to `app/fonts/`
2. Import in `app/layout.tsx`
3. Update the `font-family` in `app/globals.css`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Contributing

This is a personal project, but feel free to fork and customize for your own use!

## License

MIT License - feel free to use this for your own personal website.

## Support

If you encounter any issues, please check:
- Supabase connection is working
- Environment variables are set correctly
- Tables are created with proper RLS policies
- Node.js version is 20+

## Roadmap

Potential future enhancements:
- [ ] Markdown support for blog posts
- [ ] Comments system
- [ ] Search functionality
- [ ] RSS feed
- [ ] Tags/categories for posts
- [ ] Analytics integration

---

Built with ❤️ using Next.js and Supabase
