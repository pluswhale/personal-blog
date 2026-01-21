import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { Metadata } from 'next'

export const revalidate = 60 // Revalidate every 60 seconds

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 mb-8 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <header className="mb-12">
            <time
              className="text-sm font-medium mb-4 block"
              style={{ color: 'var(--color-accent-secondary)' }}
            >
              {formatDate(post.created_at)}
            </time>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {post.title}
            </h1>
            <p 
              className="text-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {post.excerpt}
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass p-8 sm:p-12 rounded-3xl">
            <div
              className="prose prose-lg max-w-none"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="leading-relaxed"
              />
            </div>
          </div>
        </ScrollReveal>
      </article>
    </div>
  )
}
