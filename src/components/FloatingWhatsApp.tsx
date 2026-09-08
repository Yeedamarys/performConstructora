export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/593959564486?text=Hola%2C%20quiero%20solicitar%20una%20cotizaci%C3%B3n."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotiza ahora por WhatsApp"
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-success text-white shadow-[0_12px_28px_rgba(43,47,51,0.12)] flex items-center justify-center hover:scale-105 transition-transform z-50"
    >
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-brand-deep shadow-md whatsapp-cta pointer-events-none">
        ¡Cotiza ahora!
      </span>
      <svg viewBox="0 0 32 32" fill="currentColor" className="relative z-10 h-7 w-7" aria-hidden="true">
        <path d="M16 3a13 13 0 0 0-11.15 19.67L3 29l6.5-1.7A13 13 0 1 0 16 3Zm0 23.65a10.58 10.58 0 0 1-5.4-1.48l-.39-.23-3.86 1 1.03-3.75-.25-.39A10.64 10.64 0 1 1 16 26.65Zm5.84-7.96c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.31-.82 1.04-1.01 1.25-.19.21-.38.24-.7.08a8.66 8.66 0 0 1-2.55-1.58 9.54 9.54 0 0 1-1.76-2.2c-.19-.32 0-.49.14-.64.14-.14.32-.37.48-.55.16-.19.21-.32.31-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.63-.53-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.39 5.38 4.76.75.32 1.34.51 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="absolute h-full w-full rounded-full border-2 border-brand-success animate-ping opacity-75"></span>
    </a>
  );
}
