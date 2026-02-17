import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Play } from 'lucide-react';

interface CodeInputProps {
    code: string;
    setCode: (code: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onGenerate, isGenerating }) => {
    const [language, setLanguage] = useState('python');

    return (
        <div className="flex flex-col h-full glass-card rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-500/20">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Source Code</span>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-800 text-gray-300 text-sm rounded-lg px-3 py-1.5 border border-white/10 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="html">HTML</option>
                    </select>

                    <button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 group"
                    >
                        {isGenerating ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                <span>Generate Logic</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-[400px]">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        padding: { top: 16 },
                        fontFamily: 'JetBrains Mono, monospace',
                    }}
                />
            </div>
        </div >
    );
};
