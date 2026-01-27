import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, MousePointer2 } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FlowchartHelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const syntaxExamples = [
        {
            category: "Shapes",
            items: [
                { syntax: "([Start])", desc: "Stadium shape (used for Start/End)" },
                { syntax: "[Process]", desc: "Rectangle (standard process)" },
                { syntax: "[/helloworld/]", desc: "Parallelogram (Input/Output / Print)" },
                { syntax: "{Decision}", desc: "Diamond (logic/decision)" },
                { syntax: "[(Database)]", desc: "Cylinder (data storage)" },
            ]
        },
        {
            category: "Arrows & Connections",
            items: [
                { syntax: "A --> B", desc: "Unidirectional arrow" },
                { syntax: "A --- B", desc: "Direct link without arrow" },
                { syntax: "A -- Yes --> B", desc: "Arrow with text label" },
                { syntax: "A -.-> B", desc: "Dotted line with arrow" },
                { syntax: "A ==> B", desc: "Thick arrow" },
            ]
        },
        {
            category: "Tips",
            items: [
                { syntax: "flowchart TD", desc: "Top Down flow" },
                { syntax: "flowchart LR", desc: "Left to Right flow" },
                { syntax: 'id["Text with (special) chars"]', desc: "Use quotes for special symbols" },
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <HelpCircle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Flowchart Syntax Guide</h3>
                                    <p className="text-xs text-gray-500">Quick guide for Mermaid.js editing</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors group"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {syntaxExamples.slice(0, 2).map((section) => (
                                    <div key={section.category}>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            {section.category}
                                        </h4>
                                        <div className="space-y-3">
                                            {section.items.map((item) => (
                                                <div key={item.syntax} className="group p-3 hover:bg-blue-50/50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                                                    <code className="text-sm font-mono text-blue-600 font-bold block mb-1">
                                                        {item.syntax}
                                                    </code>
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Advanced Tips & Orientation
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {syntaxExamples[2].items.map((item) => (
                                        <div key={item.syntax} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                            <code className="text-xs font-mono text-blue-600 block mb-1">
                                                {item.syntax}
                                            </code>
                                            <p className="text-[10px] text-gray-500 italic">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-blue-600 border-t border-blue-700 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/90">
                                <MousePointer2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Click "Edit Code" to experiment!</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                Got it!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
