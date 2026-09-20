import React from 'react';

interface HubHeaderProps {
    subject?: string;
    date?: string;
}

export const HubHeader: React.FC<HubHeaderProps> = ({ subject, date }) => {
    return (
        <header className="w-full border-b border-[#1f242c] bg-[#0b0c12] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-topic-ai"></span>
                <span className="text-[#f0f6fc] font-bold tracking-wider uppercase">HUB_AI // REACT 19</span>
                <span className="text-[#30363d]">/</span>
                <span className="text-topic-ai">#{subject || 'INDEX'}</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-[11px]">DATE: {date || 'STANDBY'}</span>
            </div>
        </header>
    );
};