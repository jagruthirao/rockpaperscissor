import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="w-full bg-luxury-charcoal border-t border-white/5 py-8 mt-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                <div className="mb-4 md:mb-0">
                    <span className="font-bold text-white text-lg">Style<span className="text-luxury-cyan">Fusion</span></span>
                    <p className="mt-1">© {new Date().getFullYear()} StyleFusion. All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-luxury-cyan transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-luxury-cyan transition-colors">Terms of Service</Link>
                    <Link href="/contact" className="hover:text-luxury-cyan transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
};
