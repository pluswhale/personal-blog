export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex gap-2 justify-center mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: 'var(--color-accent-primary)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: 'var(--color-accent-primary)',
              animation: 'pulse 1.5s ease-in-out infinite 0.2s',
            }}
          />
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: 'var(--color-accent-primary)',
              animation: 'pulse 1.5s ease-in-out infinite 0.4s',
            }}
          />
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    </div>
  )
}
