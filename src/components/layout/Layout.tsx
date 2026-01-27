import React from 'react';
import { Navbar } from './Navbar';
import { Github, Linkedin } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    onNavigate: (view: 'home' | 'features' | 'how-it-works') => void;
    username?: string | null;
    onLogout: () => void;
    onGetStarted: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, username, onLogout, onGetStarted }) => {
    return (
        <div className="min-h-screen bg-[#030712] text-gray-100 font-sans selection:bg-blue-500/30">
            <Navbar
                onNavigate={onNavigate}
                onGetStarted={onGetStarted}
                username={username}
                onLogout={onLogout}
            />

            <main className="pt-16 min-h-screen">
                {children}
            </main>

            <footer className="py-12 border-t border-white/5 bg-gray-950/50">
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

            {/* Background gradients/blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[128px]" />
            </div>
        </div>
    );
};
