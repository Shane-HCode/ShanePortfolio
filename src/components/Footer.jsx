export default function Footer() {
  return (
    <footer className="relative px-6 py-10 border-t md:px-12 border-white/5">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 mx-auto text-md md:text-xl lg:text-sm sm:flex-row text-white/40 font-body">
        <span>&copy; {new Date().getFullYear()} — SHANE HENRICUS</span>
        <a href="#top" className="font-mono transition-colors text-[16px] md:text-lg lg:text-sm hover:text-cyan-soft">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
