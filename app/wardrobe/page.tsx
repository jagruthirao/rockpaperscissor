import { GlassCard } from "@/components/ui/GlassCard";

export default function WardrobePage() {
    return (
        <main className="min-h-screen p-8 lg:p-12 relative overflow-hidden bg-luxury-charcoal text-white">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Digital Closet</h1>
                <p className="text-gray-400">Manage your wardrobe efficiently with AI.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Upload Section */}
                <GlassCard className="col-span-1 flex flex-col items-center justify-center border-dashed border-2 border-luxury-cyan/30 h-64 cursor-pointer hover:bg-luxury-surface/50">
                    <span className="text-4xl mb-4">+</span>
                    <span className="text-lg font-medium">Add New Item</span>
                    <span className="text-sm text-gray-500 mt-2">Auto-remove background</span>
                </GlassCard>

                {/* Closet Grid */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <GlassCard key={i} className="col-span-1 relative group">
                        <div className="h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-600">Item Image</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-medium">Designer Jacket</h3>
                                <p className="text-xs text-luxury-cyan">CPW: $12.50</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs border border-green-500/30" title="Sustainability Score">
                                A
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </main>
    );
}
