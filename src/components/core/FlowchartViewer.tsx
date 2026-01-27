import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RefreshCw, Download, Pencil, Eye, HelpCircle } from 'lucide-react';
import { FlowchartHelpModal } from './FlowchartHelpModal';

interface FlowchartViewerProps {
    code: string;
    onCodeChange?: (code: string) => void;
}

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'Inter',
});

export const FlowchartViewer: React.FC<FlowchartViewerProps> = ({ code, onCodeChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [scale, setScale] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    useEffect(() => {
        const renderChart = async () => {
            // If editing, we might skip rendering or render debounced, but for now let's only render if not editing or if we want live preview?
            // Actually, we usually want to see the result *after* editing or if we are in view mode.
            // Let's render whenever code changes, unless it causes perf issues.
            if (!code || isEditing) return;

            try {
                // Sanitize code: remove markdown code blocks if present
                const cleanCode = code
                    .replace(/```mermaid/g, '')
                    .replace(/```/g, '')
                    .trim();

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // mermaid.render throws if syntax is invalid
                const { svg } = await mermaid.render(id, cleanCode);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                // detailed error message for better debugging
                setError('Failed to render flowchart. Syntax error from AI.' + (err instanceof Error ? err.message : ''));
            }
        };

        renderChart();
    }, [code, isEditing]); // basic dependency on code.

    const handleDownload = () => {
        if (!containerRef.current) return;

        const svgElement = containerRef.current.querySelector('svg');
        if (!svgElement) return;

        // Get SVG data
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // 1. Get intrinsic size from viewBox or width/height attributes
        // If these are missing, fallback to getBoundingClientRect, but usually Mermaid SVGs have 'viewBox' or 'maxWidth'
        let width = 0;
        let height = 0;

        const viewBox = svgElement.getAttribute('viewBox');
        if (viewBox) {
            const parts = viewBox.split(/\s+|,/).map(parseFloat);
            if (parts.length === 4) {
                width = parts[2];
                height = parts[3];
            }
        }

        // Fallback or if parsing failed
        if (!width || !height) {
            const rect = svgElement.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
        }

        // 2. Define a high scale factor for crisp export (e.g., 5x or minimum 2000px width)
        const scaleFactor = 5;

        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;

        img.onload = () => {
            if (!ctx) return;

            // Fill white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw image at the scaled size
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const pngUrl = canvas.toDataURL('image/png', 1.0); // Highest quality
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `flowchart-ai-${new Date().getTime()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        // Handle SVG loading
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    return (
        <div className="relative w-full h-full flex flex-col bg-white rounded-xl">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-gray-200 shadow-sm">
                {onCodeChange && (
                    <>
                        {isEditing && (
                            <>
                                <button
                                    onClick={() => setIsHelpOpen(true)}
                                    className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-md transition-colors"
                                    title="Syntax Guide"
                                >
                                    <HelpCircle size={18} />
                                </button>
                                <div className="w-px h-4 bg-gray-200 mx-1" />
                            </>
                        )}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`p-1.5 rounded-md transition-colors ${isEditing ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-amber-50 text-amber-500 font-bold border border-amber-200/50 shadow-sm shadow-amber-500/10'}`}
                            title={isEditing ? "View Chart" : "Edit Code"}
                        >
                            {isEditing ? <Eye size={18} /> : <Pencil size={18} />}
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1" />
                    </>
                )}
                <button
                    onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                    title="Zoom Out"
                    disabled={isEditing}
                >
                    <ZoomOut size={18} />
                </button>
                <span className="text-xs font-mono text-gray-500 w-12 text-center">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={() => setScale(s => Math.min(2, s + 0.1))}
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                    title="Zoom In"
                    disabled={isEditing}
                >
                    <ZoomIn size={18} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button
                    onClick={() => setScale(1)}
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600"
                    title="Reset Zoom"
                    disabled={isEditing}
                >
                    <RefreshCw size={18} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button
                    onClick={handleDownload}
                    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                    title="Download PNG"
                    disabled={isEditing}
                >
                    <Download size={18} />
                </button>
            </div>

            <div ref={containerRef} className="flex-1 overflow-auto flex items-center justify-center p-8">
                {isEditing ? (
                    <textarea
                        value={code}
                        onChange={(e) => onCodeChange?.(e.target.value)}
                        className="w-full h-full p-6 resize-none focus:outline-none text-gray-800 font-mono text-sm leading-relaxed bg-white/50"
                        placeholder="Mermaid syntax..."
                        spellCheck={false}
                    />
                ) : (
                    error ? (
                        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200 text-sm">
                            {error}
                        </div>
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: svg }}
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'center center',
                                transition: 'transform 0.2s ease-out'
                            }}
                        />
                    )
                )}
            </div>

            <FlowchartHelpModal
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
            />
        </div>
    );
};
