import React, { useState, useRef, useEffect } from 'react';
import { Bot, Github, Menu, LogOut, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onNavigate: (view: 'home' | 'features' | 'how-it-works') => void;
    onGetStarted: () => void;
    username?: string | null;
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onGetStarted, username, onLogout }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-navbar"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="p-2 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Flow Chart.AI
                        </span>
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => onNavigate('features')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => onNavigate('how-it-works')}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            How it works
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        {username ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-300 bg-blue-900/30 border border-blue-800 rounded-full hover:bg-blue-900/50 transition-all duration-200 group"
                                >
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                                        <User className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span>Welcome, {username}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-white/5 mb-2">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">User Account</p>
                                                <p className="text-sm text-gray-300 truncate">{username}</p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    onLogout();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left group"
                                            >
                                                <div className="p-1.5 rounded-lg bg-red-400/10 group-hover:bg-red-400/20 transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium">Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                onClick={onGetStarted}
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-colors shadow-lg shadow-blue-600/20"
                            >
                                Get Started
                            </button>
                        )}
                        <button className="md:hidden p-2 text-gray-400 hover:text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};
