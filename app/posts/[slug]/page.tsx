import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <time className="text-gray-600 dark:text-gray-400">
          {formatDate(post.created_at)}
        </time>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Simple content rendering - you can enhance this with a markdown parser */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="whitespace-pre-wrap"
        />
      </div>
    </article>
  )
}
