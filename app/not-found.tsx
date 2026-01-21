import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          {/* Animated background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)',
              filter: 'blur(50px)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          />

          <div className="relative z-10 space-y-8">
            <h1
              className="text-9xl font-bold"
              style={{
                color: 'var(--color-text-primary)',
                textShadow: `4px 4px 0px var(--color-accent-primary)`,
              }}
            >
              404
            </h1>
            <h2
              className="text-3xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Page Not Found
            </h2>
            <p 
              className="text-xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 rounded-full font-semibold transition-all duration-300 cursor-pointer btn-accent mt-8"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
