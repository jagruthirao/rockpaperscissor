'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from './GlassCard';

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category: string;
    brand: string;
}

interface Props {
    product: Product;
    onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeCard = ({ product, onSwipe }: Props) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            style={{ x, opacity, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute top-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
            <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-2 border-white/20">
                <div className="relative h-3/4 w-full">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-20" />
                </div>
                <div className="p-6 bg-luxury-surface/90 flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{product.brand}</h2>
                    <p className="text-lg text-gray-300 mb-2">{product.name}</p>
                    <p className="text-xl font-bold text-luxury-cyan">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                    </p>
                </div>

                {/* Swipe Indicators (Visual Feedback) */}
                <motion.div style={{ opacity: useTransform(x, [0, 100], [0, 1]) }} className="absolute top-10 left-10 border-4 border-green-500 text-green-500 px-4 py-2 rounded-lg text-2xl font-bold -rotate-12">
                    LIKE
                </motion.div>
                <motion.div style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }} className="absolute top-10 right-10 border-4 border-red-500 text-red-500 px-4 py-2 rounded-lg text-2xl font-bold rotate-12">
                    NOPE
                </motion.div>
            </GlassCard>
        </motion.div>
    );
};
