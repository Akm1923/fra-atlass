import React, { useMemo } from 'react';
import { FRAplotData } from '../../types';

interface SummaryStatsProps {
    plots: FRAplotData[];
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ plots }) => {
    const stats = useMemo(() => {
        const totalPlots = plots.length;
        const totalArea = plots.reduce((acc, plot) => acc + plot.area, 0);
        const priorityCounts = plots.reduce((acc, plot) => {
            acc[plot.developmentPriority] = (acc[plot.developmentPriority] || 0) + 1;
            return acc;
        }, {} as Record<'High' | 'Medium' | 'Low', number>);

        return {
            totalPlots,
            totalArea: totalArea.toFixed(1),
            highPriority: priorityCounts.High || 0,
            mediumPriority: priorityCounts.Medium || 0,
            lowPriority: priorityCounts.Low || 0,
        };
    }, [plots]);

    return (
        <div className="bg-slate-900/50 p-4 rounded-lg animate-[fadeIn_0.5s_ease-out_100ms]">
            <h2 className="text-lg font-bold text-orange-400 mb-3 border-b border-slate-600 pb-2">Data Summary</h2>
            <div className="space-y-3 text-sm">
                <StatRow label="Total Plots" value={stats.totalPlots} />
                <StatRow label="Total Area" value={`${stats.totalArea} acres`} />
                <div className="pt-2">
                    <h3 className="font-semibold text-slate-300 mb-2">Priority Breakdown:</h3>
                    <StatRow label="High" value={stats.highPriority} color="text-red-400" />
                    <StatRow label="Medium" value={stats.mediumPriority} color="text-yellow-400" />
                    <StatRow label="Low" value={stats.lowPriority} color="text-green-400" />
                </div>
            </div>
        </div>
    );
};

const StatRow: React.FC<{ label: string; value: string | number; color?: string }> = ({ label, value, color = 'text-white' }) => (
    <div className="flex justify-between items-center">
        <span className="text-slate-400">{label}:</span>
        <span className={`font-bold text-base ${color}`}>{value}</span>
    </div>
);

export default SummaryStats;