import React, { useState } from 'react';
import { Network, FileText, Code, Maximize2, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FlowchartViewer } from './FlowchartViewer';

interface Results {
    flowchart: string;
    algorithm: string;
    pseudoCode: string;
}

interface ResultDisplayProps {
    results: Results | null;
    onUpdate: (results: Results | null) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'flowchart' | 'algorithm' | 'pseudocode'>('flowchart');
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const handleUpdate = (field: keyof Results, value: string) => {
        if (!results) return;
        onUpdate({
            ...results,
            [field]: value
        });
    };

    const handleFix = () => {
        if (!results) return;

        if (activeTab === 'algorithm') {
            const fixed = results.algorithm
                // Split by newline OR by a digit-dot/paren followed by space that is preceded by whitespace
                // Examples to catch: "1. Start 2. End" -> ["1. Start", "2. End"]
                .split(/(?:\r?\n)|(?:\s+(?=\d+[.|)]\s))/)
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map((line, index) => {
                    // Remove existing numbering if present at start of line
                    const cleanLine = line.replace(/^\d+[.)]\s*/, '');
                    return `${index + 1}. ${cleanLine}`;
                })
                .join('\n');
            handleUpdate('algorithm', fixed);
        } else if (activeTab === 'pseudocode') {
            const lines = results.pseudoCode.split('\n').map(l => l.trim()).filter(l => l);
            let indent = 0;
            const fixed = lines.map(line => {
                const upper = line.toUpperCase();
                // Decrease indent for closing blocks before printing the line
                if (upper.startsWith('END') || upper.startsWith('ELSE') || upper.startsWith('UNTIL')) {
                    indent = Math.max(0, indent - 1);
                }

                const formatted = '    '.repeat(indent) + line;

                // Increase indent for block starters
                if (upper.startsWith('IF') || upper.startsWith('ELSE') || upper.startsWith('WHILE') || upper.startsWith('FOR') || upper.startsWith('FUNCTION') || upper.startsWith('do')) {
                    indent++;
                }
                return formatted;
            }).join('\n');
            handleUpdate('pseudoCode', fixed);
        }
    };

    const CopyButton = ({ text }: { text: string }) => (
        <button
            onClick={() => handleCopy(text)}
            className="absolute top-4 right-4 p-2 z-10 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
            title="Copy to Clipboard"
        >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
    );

    const FixButton = () => (
        <button
            onClick={handleFix}
            className="absolute top-4 right-14 p-2 z-10 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-gray-400 hover:text-blue-400 transition-colors shadow-sm"
            title="Auto-Format / Align"
        >
            <Sparkles className="w-4 h-4" />
        </button>
    );

    if (!results) {
        return (
            <div className="h-full glass-card rounded-2xl flex items-center justify-center min-h-[400px] shadow-sm">
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400 border border-blue-500/20">
                        <Network className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Ready to Visualize</h3>
                    <p className="text-gray-400 max-w-sm">
                        Enter your code on the left and click "Generate" to create flowcharts, algorithms, and pseudocode.
                    </p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'flowchart', label: 'Flowchart', icon: Network },
        { id: 'algorithm', label: 'Algorithm', icon: FileText },
        { id: 'pseudocode', label: 'Pseudo Code', icon: Code },
    ] as const;

    return (
        <div className="flex flex-col h-full glass-card rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                                activeTab === tab.id
                                    ? "bg-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30"
                                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium px-2 hidden sm:inline">
                        Editable
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-transparent overflow-hidden p-0 min-h-[400px] relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'flowchart' && (
                        <motion.div
                            key="flowchart"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="h-full flex items-center justify-center p-4"
                        >
                            <FlowchartViewer
                                code={results.flowchart}
                                onCodeChange={(code) => handleUpdate('flowchart', code)}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'algorithm' && (
                        <motion.div
                            key="algorithm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="h-full relative flex flex-col"
                        >
                            <FixButton />
                            <CopyButton text={results.algorithm} />
                            <textarea
                                value={results.algorithm}
                                onChange={(e) => handleUpdate('algorithm', e.target.value)}
                                className="flex-1 w-full h-full p-6 resize-none focus:outline-none text-gray-300 font-mono text-sm leading-relaxed bg-transparent"
                                placeholder="Algorithm steps..."
                                spellCheck={false}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'pseudocode' && (
                        <motion.div
                            key="pseudocode"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="h-full relative flex flex-col"
                        >
                            <FixButton />
                            <CopyButton text={results.pseudoCode} />
                            <textarea
                                value={results.pseudoCode}
                                onChange={(e) => handleUpdate('pseudoCode', e.target.value)}
                                className="flex-1 w-full h-full p-6 resize-none focus:outline-none text-gray-300 font-mono text-sm leading-relaxed bg-transparent"
                                placeholder="Pseudo-code..."
                                spellCheck={false}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-4 py-2 bg-white/5 border-t border-white/10">
                <p className="text-[10px] text-center text-gray-500 font-medium uppercase tracking-wider">
                    Disclaimer: AI-generated results may contain errors. Please review for accuracy.
                </p>
            </div>
        </div>
    );
};
