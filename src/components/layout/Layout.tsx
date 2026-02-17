import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Github, Linkedin } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    onNavigate: (view: 'home' | 'features' | 'how-it-works') => void;
    username?: string | null;
    onLogout: () => void;
    onGetStarted: () => void;
}

// Generate static particles for performance outside to keep component pure
const SHARED_PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 5}s`,
    size: Math.random() * 2 + 1
}));

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, username, onLogout, onGetStarted }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen text-gray-100 font-sans selection:bg-blue-500/30">
            <Navbar
                onNavigate={onNavigate}
                onGetStarted={onGetStarted}
                username={username}
                onLogout={onLogout}
            />

            <main className="pt-16 min-h-screen relative z-10">
                {children}
            </main>

            <footer className="py-12 border-t border-white/5 bg-gray-950/50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center items-center gap-6 mb-6">
                        <a
                            href="https://github.com/Aswajithraj5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aswajith-raj-a-b-70b4172a7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        Developed by <span className="text-gray-300 font-medium whitespace-nowrap">Aswajith Raj A B</span>
                    </p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                        © 2026 FlowChart.AI. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none bg-[#030712]">
                {/* Base Aurora Mesh Gradients */}
                <div className="absolute inset-0 aurora-layer">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-500/30 rounded-full blur-[120px] animate-[aurora_15s_infinite_alternate]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-500/30 rounded-full blur-[120px] animate-[aurora_18s_infinite_alternate-reverse]" />
                    <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px] animate-[aurora_20s_infinite_alternate]" />
                    <div className="absolute bottom-[20%] left-[10%] w-[60%] h-[60%] bg-sky-500/20 rounded-full blur-[110px] animate-[aurora_22s_infinite_alternate-reverse]" />
                </div>

                {/* Atmospheric Spotlight */}
                <div
                    className="absolute inset-0 opacity-60 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 80%)`
                    }}
                />

                {/* Deep Texture: Particles/Stars */}
                {SHARED_PARTICLES.map((p) => (
                    <div
                        key={p.id}
                        className="particle animate-twinkle bg-blue-100/40"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            '--duration': p.duration,
                            '--delay': p.delay,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 grid-pattern opacity-40 mix-blend-overlay" />

                {/* Noise Texture */}
                <div className="absolute inset-0 noise-overlay" />

                {/* Technical Overlay: Scanlines effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,128,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-80" />
            </div>
        </div>
    );
};
