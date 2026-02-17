import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Layout, Shield, Cpu, Globe } from 'lucide-react';

const features = [
    {
        icon: Code2,
        title: "Multi-Language Support",
        description: "Transform code from Python, C++, Java, JavaScript, and more into structured logic."
    },
    {
        icon: Zap,
        title: "Instant Generation",
        description: "Get real-time flowcharts and algorithms powered by advanced Llama models on Groq Cloud."
    },
    {
        icon: Layout,
        title: "Interactive Visualization",
        description: "Export high-resolution PNGs and zoom/pan through complex logic structures with ease."
    },
    {
        icon: Shield,
        title: "Secure Processing",
        description: "Your code is processed securely and never stored. Privacy is built into our core."
    },
    {
        icon: Cpu,
        title: "High Performance",
        description: "Engineered for speed with low-latency AI inference and optimized SVG rendering."
    },
    {
        icon: Globe,
        title: "Accessible Anywhere",
        description: "Cloud-based AI infrastructure means you get top-tier performance on any device."
    }
];

export const FeaturesView: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
                >
                    Powerful Features for Developers
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    Everything you need to visualize, document, and master your algorithms.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-8 rounded-2xl glass-card transition-all duration-300 group cursor-default"
                    >
                        <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600/20 transition-colors">
                            <feature.icon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
