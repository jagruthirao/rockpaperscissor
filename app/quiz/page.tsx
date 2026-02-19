'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import api from '@/services/api';

const questions = [
    {
        id: 'gender',
        question: 'Select your gender',
        options: ['Male', 'Female']
    },
    {
        id: 'budget',
        question: 'Your budget range',
        options: ['Under 1500', '1500-2000', '2000-5000', '50,000+']
    },
    {
        id: 'occasion',
        question: 'Where will you wear this?',
        options: ['Office', 'Casual outing', 'Party', 'Wedding']
    }
];

interface QuizAnswers {
    gender?: string;
    budget?: string | number;
    occasion?: string;
    [key: string]: string | number | undefined;
}

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const router = useRouter();

    const handleOptionSelect = (option: string) => {
        const currentQ = questions[step];
        if (!currentQ) return;

        let value: string | number = option;

        if (currentQ.id === 'budget') {
            if (option.includes("Under 1500")) value = 1500;
            else if (option.includes("1500-2000")) value = 2000;
            else if (option.includes("2000-5000")) value = 5000;
            else value = 50000; // High budget
        }

        const updatedAnswers = { ...answers, [currentQ.id]: value };
        setAnswers(updatedAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitQuiz(updatedAnswers);
        }
    };

    const submitQuiz = async (finalAnswers: QuizAnswers) => {
        console.log("Quiz answers:", finalAnswers);

        try {
            const res = await api.post('/recommendation/quiz', finalAnswers);
            localStorage.setItem('recommendations', JSON.stringify(res.data.recommendations));
            localStorage.setItem('style_tip', res.data.style_tip);
            localStorage.setItem('quiz_completed', 'true');
            router.push('/recommendations');
        } catch (err) {
            console.error("Quiz submission failed", err);

            // Dynamic Fallback based on User Input (Network Fail Proofing)
            const isMale = finalAnswers.gender === "Male";
            const budgetVal = Number(finalAnswers.budget) || 2000;
            const targetPrice = budgetVal >= 50000 ? 150000 : budgetVal; // Match backend logic

            const titleBrand = isMale
                ? (budgetVal > 2000 ? "Rare Rabbit" : "Roadster")
                : (budgetVal >= 50000 ? "Manish Malhotra" : (budgetVal > 2000 ? "Forever New" : "Tokyo Talkies"));

            const mockImage = isMale
                ? "https://images.unsplash.com/photo-1488161628813-99c974fc5b28?q=80&w=2000&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop";

            const mockRecs = [
                {
                    id: 101,
                    name: `${finalAnswers.occasion} Ensemble`,
                    price: targetPrice * 0.6,
                    brand: titleBrand,
                    image_url: mockImage,
                    category: "Apparel",
                    gender: finalAnswers.gender,
                    occasion: finalAnswers.occasion
                },
                {
                    id: 102,
                    name: isMale ? "Formal Loafers" : "Heels",
                    price: targetPrice * 0.25,
                    brand: isMale ? "Clarks" : "Inc.5",
                    image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop",
                    category: "Footwear",
                    gender: finalAnswers.gender,
                    occasion: finalAnswers.occasion
                },
                {
                    id: 103,
                    name: isMale ? "Classic Watch" : "Statement Bag",
                    price: targetPrice * 0.15,
                    brand: isMale ? "Fossil" : "Lavie",
                    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2000&auto=format&fit=crop",
                    category: "Accessory",
                    gender: finalAnswers.gender,
                    occasion: finalAnswers.occasion
                }
            ];

            localStorage.setItem('recommendations', JSON.stringify(mockRecs));
            localStorage.setItem('style_tip', `Here are some ${Number(finalAnswers.budget) < 2000 ? 'affordable' : 'premium'} looks selected for your ${finalAnswers.occasion}.`);
            localStorage.setItem('quiz_completed', 'true');
            router.push('/recommendations');
        }
    };

    const currentQuestion = questions[step];

    if (!currentQuestion) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-luxury-charcoal text-white">
                Loading quiz...
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-luxury-charcoal p-4 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

            <GlassCard className="w-full max-w-lg min-h-[400px] flex flex-col justify-center items-center relative z-10 border-[#D4AF37]/20 bg-[#0a0a0a]/90">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#FFFFF0] font-playfair">
                            {currentQuestion.question}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className="p-4 rounded-xl border border-white/5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all text-left text-lg font-medium text-[#FFFFF0]/80 group"
                                >
                                    <span className="group-hover:text-[#D4AF37] transition-colors">{option}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 mt-8">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-8 rounded-full transition-colors ${i === step ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-gray-800'
                                }`}
                        />
                    ))}
                </div>
            </GlassCard>
        </main>
    );
}
