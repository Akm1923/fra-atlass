import React from 'react';

const MapLegend: React.FC = () => {
    const legendItems = [
        { label: 'High Priority', color: 'bg-red-500/80' },
        { label: 'Medium Priority', color: 'bg-yellow-500/80' },
        { label: 'Low Priority', color: 'bg-green-500/80' },
    ];

    return (
        <div className="bg-slate-900/50 p-4 rounded-lg animate-[fadeIn_0.5s_ease-out_300ms]">
            <h2 className="text-lg font-bold text-orange-400 mb-3 border-b border-slate-600 pb-2">Legend</h2>
            <ul className="space-y-2">
                {legendItems.map(item => (
                    <li key={item.label} className="flex items-center">
                        <span className={`w-4 h-4 rounded-sm mr-3 border border-slate-500 ${item.color}`}></span>
                        <span className="text-sm text-slate-300">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MapLegend;