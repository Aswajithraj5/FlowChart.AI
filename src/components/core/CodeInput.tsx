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
        <div className="flex flex-col h-full bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-white/10">
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
                        disabled={isGenerating || !code.trim()}
                        className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-900/20"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                Generate
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
        </div>
    );
};
