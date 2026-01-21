# Quick Setup Guide

A step-by-step guide to get your personal blog up and running in 15 minutes.

## Step 1: Install Dependencies (2 minutes)

```bash
# Install Node.js packages
npm install
```

## Step 2: Set Up Supabase (5 minutes)

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `personal-blog` (or your choice)
   - Database Password: Generate a strong password (save it!)
   - Region: Choose closest to your location
6. Click "Create new project" and wait ~2 minutes

### Set Up Database

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy the contents of `supabase-setup.sql` from this project
4. Paste into the SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### Get Your API Keys

1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

## Step 3: Configure Environment Variables (2 minutes)

1. Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

2. Open `.env.local` and replace the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Customize Your Content (3 minutes)

### Update Personal Information

Edit `app/page.tsx`:

```typescript
// Find and replace:
- "Your Name" → Your actual name
- "your.email@example.com" → Your email
- "yourusername" → Your GitHub username
- Update the bio text to describe yourself
```

### Update Site Metadata

Edit `app/layout.tsx`:

```typescript
// Find and update:
- authors: [{ name: 'Your Name' }] → Your name
- Update the description
- Update the URL to your domain (optional for now)
```

### Update Footer

Edit `components/Footer.tsx` if you want to customize the footer text.

## Step 5: Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- ✅ Your home page with your name
- ✅ Navigation with Home, Posts, Projects
- ✅ Dark mode toggle working
- ✅ Sample blog posts (from the SQL setup)
- ✅ Sample projects (from the SQL setup)

## Step 6: Test Everything (2 minutes)

### Test Navigation
- Click "Posts" - should show sample blog posts
- Click a post - should open full post page
- Click "Projects" - should show sample projects
- Click "Home" - should return to home page

### Test Dark Mode
- Click the sun/moon icon in the top right
- Page should switch between light and dark themes

### Test Responsive Design
- Open browser dev tools (F12)
- Toggle device toolbar (Cmd/Ctrl + Shift + M)
- Switch between mobile and desktop views
- Everything should look good!

## Next Steps

### Add Your Own Content

#### Add a Blog Post

1. Go to your Supabase dashboard
2. Click "Table Editor" → "posts"
3. Click "Insert row" → "Insert row"
4. Fill in:
   - **title**: "My First Post"
   - **slug**: "my-first-post" (URL-friendly, no spaces)
   - **content**: Your post content (HTML supported)
   - **excerpt**: Short description (1-2 sentences)
5. Click "Save"
6. Refresh your blog - new post appears!

#### Add a Project

1. Go to Supabase dashboard
2. Click "Table Editor" → "projects"
3. Click "Insert row" → "Insert row"
4. Fill in:
   - **name**: Project name
   - **description**: What it does
   - **stack**: "React, Node.js, MongoDB" (comma-separated)
   - **link**: GitHub URL or live demo
5. Click "Save"
6. Refresh your projects page!

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for DigitalOcean.

Quick options:
- **DigitalOcean** (recommended) - See DEPLOYMENT.md
- **Vercel** - `npm i -g vercel && vercel` (easiest)
- **Netlify** - Connect your GitHub repo
- **Railway** - Connect your GitHub repo

### Enhance Your Blog

Optional improvements:

1. **Add Markdown Support**
   ```bash
   npm install react-markdown
   ```
   Update post rendering to use Markdown

2. **Add Syntax Highlighting**
   ```bash
   npm install rehype-highlight
   ```

3. **Add Image Support**
   - Enable Supabase Storage
   - Upload images to storage
   - Reference in posts

4. **Add Analytics**
   - Google Analytics
   - Plausible Analytics
   - Umami Analytics

5. **Add Comments**
   - Giscus (GitHub discussions)
   - Utterances (GitHub issues)
   - Disqus

## Troubleshooting

### "Cannot connect to Supabase"
- ✅ Check `.env.local` exists and has correct values
- ✅ Verify Supabase project is active (not paused)
- ✅ Restart dev server: `npm run dev`

### "No posts/projects showing"
- ✅ Run the SQL setup script in Supabase
- ✅ Check Table Editor in Supabase - rows should exist
- ✅ Verify RLS policies are created

### "Dark mode not working"
- ✅ Hard refresh: Cmd/Ctrl + Shift + R
- ✅ Clear browser cache
- ✅ Check browser console for errors

### TypeScript errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Project Structure

```
personal-blog/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Home/About page
│   ├── globals.css        # Global styles
│   ├── posts/             # Blog section
│   │   ├── page.tsx       # Posts list
│   │   └── [slug]/        # Dynamic post pages
│   │       └── page.tsx
│   └── projects/          # Portfolio section
│       └── page.tsx
├── components/            # React components
│   ├── Navigation.tsx     # Nav bar
│   ├── ThemeToggle.tsx    # Dark mode toggle
│   ├── ThemeProvider.tsx  # Theme context
│   └── Footer.tsx
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
│   └── database.ts       # Database types
├── supabase-setup.sql    # Database setup script
├── .env.local            # Your environment variables (create this)
└── package.json          # Dependencies
```

## Getting Help

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Troubleshooting
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Remove dependencies
npm install          # Reinstall dependencies
```

---

🎉 **Congratulations!** Your personal blog is now running!

Next: [Deploy to Production →](./DEPLOYMENT.md)
