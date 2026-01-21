# ⚡ Quick Start (5 minutes)

Get your blog running in 5 minutes or less.

## 1. Install (30 seconds)

```bash
npm install
```

## 2. Supabase Setup (2 minutes)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor → New Query
4. Copy/paste contents of `supabase-setup.sql`
5. Click Run
6. Go to Settings → API
7. Copy Project URL and anon key

## 3. Configure (30 seconds)

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

## 4. Customize (1 minute)

Edit `app/page.tsx`:
- Line 15: Change "Your Name" to your name
- Lines 39-86: Update contact links

## 5. Run (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000

## Done! 🎉

Your blog is now running with:
- ✅ Sample blog posts
- ✅ Sample projects
- ✅ Dark mode
- ✅ Responsive design

## Next Steps

- **Add content**: Use Supabase dashboard to add posts/projects
- **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Customize**: Edit pages and components

Need more details? See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
