'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function SiteHeader() {
    const router = useRouter();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-none"
        >
            {/* Glassmorphism Background Container (Optional - currently transparent for floating feel) */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            {/* Logo */}
            <div
                onClick={() => router.push('/')}
                className="relative pointer-events-auto cursor-pointer group"
            >
                <div className="flex items-center gap-2">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                        <span className="text-black font-playfair font-bold text-lg">S</span>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-playfair font-bold text-[#FFFFF0] tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            Style Fusion
                        </h1>
                        <span className="text-[0.6rem] text-[#D4AF37] tracking-[0.3em] uppercase opacity-80 group-hover:tracking-[0.4em] transition-all duration-500">
                            Classic Luxury
                        </span>
                    </div>
                </div>
            </div>

            {/* Optional: Right side controls (if needed later) */}
            <div className="pointer-events-auto">
                {/* Placeholder for future nav items or user profile */}
            </div>
        </motion.header>
    );
}
