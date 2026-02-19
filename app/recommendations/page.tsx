'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import api from '@/services/api';
import { motion } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    description?: string;
    category?: string;
    brand?: string;
    gender?: string;
    occasion?: string;
}

export default function RecommendationsPage() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [styleTip, setStyleTip] = useState<string>("");
    const [masterLook, setMasterLook] = useState<Product | null>(null);
    const [aiImage, setAiImage] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('recommendations');
        const tip = localStorage.getItem('style_tip');

        if (data) {
            try {
                const recs = JSON.parse(data);
                if (Array.isArray(recs) && recs.length > 0) {
                    setRecommendations(recs);
                    setMasterLook(recs[0]);
                    generateAiOutfit(recs[0].gender || 'Female', recs[0].occasion || 'Casual');
                } else {
                    router.push('/quiz');
                }
            } catch (e) {
                console.error("Failed to parse recommendations", e);
            }
        } else {
            router.push('/quiz');
        }

        if (tip) setStyleTip(tip);
    }, []);

    const generateAiOutfit = async (gender: string, occasion: string) => {
        console.log(`Generating AI outfit for ${gender} - ${occasion}`);
        try {
            const res = await api.get(`/recommendation/generate-outfit?gender=${gender}&occasion=${occasion}`);
            console.log("AI Outfit Response:", res.data);
            if (res.data && res.data.image_url) {
                setAiImage(res.data.image_url);
            } else {
                console.warn("No image_url in response");
            }
        } catch (e) {
            console.error("AI Gen error", e);
        }
    };

    const openLink = (url: string) => window.open(url, '_blank');
    const getAmazonLink = (name: string) => `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;
    const getMyntraLink = (category: string) => `https://www.myntra.com/${encodeURIComponent(category || 'fashion')}`;

    // Loading State
    if (!masterLook) return (
        <div className="min-h-screen bg-luxury-charcoal flex flex-col items-center justify-center text-[#FFFFF0] font-playfair">
            <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4" />
            <p className="animate-pulse text-[#D4AF37]">Curating your bespoke look...</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-luxury-charcoal p-4 lg:p-8 text-[#FFFFF0] font-sans overflow-x-hidden selection:bg-[#D4AF37]/30">
            {/* Soft Background Gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-luxury-charcoal to-black -z-10" />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#D4AF37]/20 pb-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-playfair font-bold mb-2 text-[#FFFFF0]"
                        >
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9F4E0] to-[#D4AF37]">Signature</span> Style
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[#D4AF37]/60 text-sm tracking-widest uppercase"
                        >
                            Curated for {masterLook.occasion}
                        </motion.p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('quiz_completed');
                            router.push('/quiz');
                        }}
                        className="mt-4 md:mt-0 px-6 py-2 rounded-full border border-white/10 hover:bg-[#D4AF37]/10 text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group text-[#D4AF37]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] group-hover:animate-pulse" />
                        Retake Quiz
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Visual Hero Section */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#D4AF37]/10 group bg-[#0a0a0a] border border-[#D4AF37]/10"
                        >
                            {/* Debugging Image rendering */}
                            <img
                                src={aiImage || masterLook.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80"} // Fallback
                                alt="Master Look"
                                onError={(e) => {
                                    console.error("Image failed to load:", e.currentTarget.src);
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80"; // Ultimate fallback
                                }}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Reduced Gradient Opacity to ensure visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 pointer-events-none" />

                            {/* Floating Tag */}
                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-[#D4AF37]/30 text-xs font-bold tracking-widest uppercase text-[#D4AF37] shadow-lg flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                AI Generated Look
                            </div>

                            {/* Stylist Note Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <GlassCard className="p-6 !bg-[#050505]/80 !backdrop-blur-xl border-[#D4AF37]/20">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/20 shrink-0">
                                            AI
                                        </div>
                                        <div>
                                            <p className="text-[0.65rem] text-[#D4AF37] tracking-widest uppercase mb-1">Stylist Note</p>
                                            <p className="text-sm text-[#FFFFF0]/90 leading-relaxed italic">
                                                "{styleTip || "This ensemble balances elegance with modern comfort."}"
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    </div>

                    {/* Ensemble List */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-2xl font-playfair font-bold mb-2 text-[#FFFFF0]">Complete Ensemble</h2>
                            <div className="h-1 w-12 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-full mb-6" />
                            <p className="text-[#D4AF37]/60 text-sm">
                                We've broken down this look into {recommendations.length} key pieces available within your budget.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {recommendations.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-[2rem] opacity-0 group-hover:opacity-20 blur transition duration-500" />
                                    <div className="relative flex flex-col sm:flex-row items-center gap-6 p-4 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-1">

                                        {/* Image */}
                                        <div className="w-full sm:w-32 h-32 rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg relative">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
                                                <p className="text-[10px] text-white font-bold">₹{item.price}</p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 text-center sm:text-left w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2">
                                                <div>
                                                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-[#D4AF37]/60 uppercase tracking-wider border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-lg font-bold text-[#FFFFF0] mt-2 group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                                                    <p className="text-sm code text-[#C5A028]">{item.brand}</p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                                                <button
                                                    onClick={() => openLink(getAmazonLink(item.name))}
                                                    className="px-6 py-2 rounded-full bg-[#FF9900]/10 hover:bg-[#FF9900] text-[#FF9900] hover:text-black text-xs font-bold transition-all border border-[#FF9900]/20 hover:shadow-[0_0_15px_#FF9900]"
                                                >
                                                    Amazon
                                                </button>
                                                <button
                                                    onClick={() => openLink(getMyntraLink(item.category || 'fashion'))}
                                                    className="px-6 py-2 rounded-full bg-[#E11B23]/10 hover:bg-[#E11B23] text-[#E11B23] hover:text-white text-xs font-bold transition-all border border-[#E11B23]/20 hover:shadow-[0_0_15px_#E11B23]"
                                                >
                                                    Myntra
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end items-center gap-2 text-[#D4AF37] text-xs tracking-widest uppercase opacity-80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                            Budget Optimized
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
