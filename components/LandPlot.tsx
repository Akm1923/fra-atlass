import React from 'react';
import { FRAplotData } from '../types';

interface LandPlotProps {
  plot: FRAplotData;
  isSelected: boolean;
  isSearched: boolean;
  onSelect: (plot: FRAplotData) => void;
}

// Fix: Created the LandPlot component to render SVG paths for land parcels.
const LandPlot: React.FC<LandPlotProps> = ({ plot, isSelected, isSearched, onSelect }) => {
  const priorityColors = {
    High: 'fill-red-500/50 stroke-red-400',
    Medium: 'fill-yellow-500/50 stroke-yellow-400',
    Low: 'fill-green-500/50 stroke-green-400',
  };

  const selectedStyles = 'stroke-orange-400 stroke-[4px] scale-105 [filter:drop-shadow(0_0_5px_rgba(249,115,22,0.8))]';
  const searchedStyles = 'stroke-blue-400 stroke-[4px] animate-pulse-border';


  return (
    <path
      d={plot.pathD}
      className={`
        ${priorityColors[plot.developmentPriority]}
        stroke-2
        hover:opacity-100 opacity-80
        transition-all duration-300 transform
        cursor-pointer
        origin-center
        ${isSelected ? selectedStyles : isSearched ? searchedStyles : 'hover:scale-105'}
      `}
      onClick={() => onSelect(plot)}
    />
  );
};

export default LandPlot;