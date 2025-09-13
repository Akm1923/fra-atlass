import React, { useMemo, useState } from 'react';
import { FRA_PLOT_DATA } from '../../constants';
import { FRAplotData } from '../../types';

const IndiaMap: React.FC = () => {
  const [hoveredPlot, setHoveredPlot] = useState<FRAplotData | null>(null);

  const { projectCoordinates, bounds } = useMemo(() => {
    if (FRA_PLOT_DATA.length === 0) {
      return { projectCoordinates: () => ({ top: 0, left: 0 }), bounds: null };
    }
    const lats = FRA_PLOT_DATA.map(p => p.lat).filter(l => l !== undefined) as number[];
    const lngs = FRA_PLOT_DATA.map(p => p.lng).filter(l => l !== undefined) as number[];

    const bounds = {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
    
    // Add some padding to bounds to avoid points on the very edge
    const latPadding = (bounds.maxLat - bounds.minLat) * 0.1;
    const lngPadding = (bounds.maxLng - bounds.minLng) * 0.1;

    bounds.minLat -= latPadding;
    bounds.maxLat += latPadding;
    bounds.minLng -= lngPadding;
    bounds.maxLng += lngPadding;

    const latRange = bounds.maxLat - bounds.minLat;
    const lngRange = bounds.maxLng - bounds.minLng;

    const projectCoordinates = (lat: number, lng: number) => {
      const top = ((bounds.maxLat - lat) / latRange) * 100;
      const left = ((lng - bounds.minLng) / lngRange) * 100;
      return { top: `${top}%`, left: `${left}%` };
    };

    return { projectCoordinates, bounds };
  }, []);

  if (!bounds) {
    return <div className="w-full h-[500px] rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">No data to display on map.</div>;
  }

  return (
    <div 
      className="relative w-full h-[500px] rounded-lg bg-slate-200 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1623152339839-819a15b5EA1b?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      {FRA_PLOT_DATA.map(plot => {
        if (plot.lat === undefined || plot.lng === undefined) return null;
        const { top, left } = projectCoordinates(plot.lat, plot.lng);
        const isHovered = hoveredPlot?.id === plot.id;
        
        return (
          <div
            key={plot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top, left }}
            onMouseEnter={() => setHoveredPlot(plot)}
            onMouseLeave={() => setHoveredPlot(null)}
          >
            <div className={`w-3 h-3 rounded-full bg-orange-500 border-2 border-white transition-all duration-200 ${isHovered ? 'scale-150' : ''}`}></div>
            {isHovered && (
              <div className="absolute bottom-full mb-2 w-max max-w-xs bg-slate-800 text-white text-xs rounded py-1 px-2 pointer-events-none -translate-x-1/2 left-1/2 z-10">
                <p className="font-bold">{plot.pattaHolder}</p>
                <p>{plot.area} acres</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndiaMap;
