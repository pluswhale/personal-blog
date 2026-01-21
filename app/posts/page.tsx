import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Blog Posts</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thoughts, ideas, and tutorials about software development
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0"
              >
                <Link href={`/posts/${post.slug}`} className="group">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.created_at)}
                  </time>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 group-hover:underline">
                    Read more →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
