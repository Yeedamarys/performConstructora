import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="#" 
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-success text-white shadow-[0_12px_28px_rgba(43,47,51,0.12)] flex items-center justify-center hover:scale-105 transition-transform z-50"
    >
      <MessageCircle size={28} />
      <span className="absolute w-full h-full rounded-full border-2 border-brand-success animate-ping opacity-75"></span>
    </a>
  );
}
