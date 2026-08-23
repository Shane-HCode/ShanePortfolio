export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* grid lines */}
      <div className="absolute inset-0 bg-grid-lines bg-[size:64px_64px] opacity-40" />

      {/* animated glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan/10 blur-[120px] animate-drift" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo/10 blur-[140px] animate-drift" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-cyan-deep/10 blur-[100px] animate-pulse-slow" />

      {/* noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050608_100%)]" />
    </div>
  )
}
