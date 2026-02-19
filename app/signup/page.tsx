'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                full_name: fullName
            });

            localStorage.setItem('token', response.data.access_token);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-luxury-charcoal relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-cyan/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <GlassCard className="w-full max-w-md p-8 border border-white/10">
                <h1 className="text-3xl font-bold text-center mb-2">Join StyleFusion</h1>
                <p className="text-gray-400 text-center mb-8">Create your luxury profile</p>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-luxury-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-cyan transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-luxury-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-cyan transition-colors"
                            placeholder="vip@stylefusion.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-luxury-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-cyan transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-luxury-cyan to-blue-500 text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Already have an account? <Link href="/login" className="text-luxury-cyan hover:underline">Log in</Link>
                    </p>
                </form>
            </GlassCard>
        </main>
    );
}
