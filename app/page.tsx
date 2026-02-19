'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image with Parallax-like fixed position */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed z-0"
      />

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-luxury-charcoal z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-glow">
            EST. 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-9xl font-playfair font-bold text-[#FFFFF0] mb-6 drop-shadow-2xl"
        >
          Style <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9F4E0] to-[#D4AF37]">Fusion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[#FFFFF0]/80 text-lg md:text-2xl max-w-3xl mb-12 font-light leading-relaxed drop-shadow-lg"
        >
          The epitome of digital couture. <br className="hidden md:block" />
          AI-generated fashion for the modern connoisseur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <button
            onClick={() => router.push('/quiz')}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transform hover:scale-105 transition-all duration-300 border border-[#D4AF37]/50"
          >
            <span className="relative z-10 flex items-center gap-3 tracking-wider">
              ENTER ATELIER
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </button>
        </motion.div>

        {/* Floating Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:gap-16 text-[#D4AF37] text-[0.65rem] md:text-xs tracking-[0.2em] uppercase opacity-80"
        >
          <div className="flex items-center gap-2 animate-float" style={{ animationDelay: '0s' }}>
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" /> Bespoke AI
          </div>
          <div className="flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />  Haute Couture
          </div>
          <div className="flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" /> Visual Styling
          </div>
        </motion.div>
      </div>
    </main>
  );
}
