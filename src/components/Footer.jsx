export default function Footer() {
  return (
    <footer className="relative py-10 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40 font-body">
        <span>&copy; {new Date().getFullYear()} — Designed &amp; built with React, Three.js and Tailwind.</span>
        <a href="#top" className="hover:text-cyan-soft transition-colors font-mono text-xs">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
