import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Workflow, Download, MousePointer2 } from 'lucide-react';

const steps = [
    {
        icon: MousePointer2,
        title: "1. Paste your Code",
        description: "Paste your Python, C++, or Java code into our secure, high-performance editor."
    },
    {
        icon: Brain,
        title: "2. AI Analysis",
        description: "Our advanced AI models analyze the logical flow and structure of your code instantly."
    },
    {
        icon: Workflow,
        title: "3. Logic Generation",
        description: "The AI generates a Mermaid flowchart, step-by-step algorithm, and clean pseudo-code."
    },
    {
        icon: Download,
        title: "4. Visualize & Export",
        description: "Review the logic in our interactive viewer and download the flowchart as a high-quality PNG."
    }
];

export const HowItWorksView: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
                >
                    How Flow Chart.AI Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    A seamless process to transform complex logic into clear visualizations.
                </motion.p>
            </div>

            <div className="relative">
                {/* Connection Line (Desktop) */}
                <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 -z-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all"
                        >
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
                                <step.icon className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 text-center"
            >
                <h3 className="text-2xl font-bold text-white mb-4">Ready to visualize your logic?</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Try it now with your own code and see the magic happen instantly.
                </p>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate-home'))}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/20"
                >
                    Go back to Editor
                </button>
            </motion.div>
        </div>
    );
};
