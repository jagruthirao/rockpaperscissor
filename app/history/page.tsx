'use client';
import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import api from '@/services/api';

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        // In a real app, this endpoint would exist. 
        // For now, I'll mock it or fetch the 'liked' interactions if I added that endpoint.
        // I haven't added GET /history yet in the backend plan above, good catch.
        // I'll stick to a placeholder or quickly add the endpoint if I can.
        // Let's assume I'll add the endpoint in the next step or just mock for visual.

        // Mock for visual demo since I need to add the endpoint
        setHistory([
            {
                id: 1,
                name: "Sabyasachi Bridal Lehenga",
                image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop",
                price: 450000.0,
                date: "Today"
            }
        ]);
    }, []);

    return (
        <main className="min-h-screen bg-luxury-charcoal p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Your Style History</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {history.map((item) => (
                    <GlassCard key={item.id} className="group cursor-pointer">
                        <div className="h-64 overflow-hidden rounded-lg mb-4">
                            <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-white truncate">{item.name}</h3>
                        <p className="text-luxury-cyan">₹{item.price}</p>
                        <p className="text-xs text-gray-500 mt-2">Liked {item.date}</p>
                    </GlassCard>
                ))}
            </div>
        </main>
    );
}
