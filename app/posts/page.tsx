import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Read my latest blog posts about web development, programming, and technology',
}

export const revalidate = 60 // Revalidate every 60 seconds

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts || []
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1
              className="text-6xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Blog Posts
            </h1>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Thoughts, ideas, and tutorials about software development
            </p>
          </div>
        </ScrollReveal>

        {posts.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-xl opacity-60">
                No posts yet. Check back soon!
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 100}>
                <Link href={`/posts/${post.slug}`}>
                  <article
                    className="group relative p-8 rounded-2xl transition-all duration-500 cursor-pointer h-full glass"
                    style={{
                      willChange: 'transform, opacity',
                    }}
                  >
                    {/* Hover overlay with buttons - More Subtle */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.15) 0%, rgba(87, 203, 255, 0.15) 100%)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <span
                        className="px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                        style={{
                          background: 'var(--color-bg-primary)',
                          color: 'var(--color-accent-primary)',
                        }}
                      >
                        Read Article
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-0 transition-all duration-500">
                      <time
                        className="text-sm font-medium mb-3 block"
                        style={{ color: 'var(--color-accent-secondary)' }}
                      >
                        {formatDate(post.created_at)}
                      </time>
                      <h2
                        className="text-2xl font-bold mb-4 transition-colors duration-300"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
