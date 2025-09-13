import React, { useState, useMemo } from 'react';
import { FRA_PLOT_DATA, TRIBAL_COMMUNITIES } from '../constants';
import { FRAplotData, TribalCommunity, CommunityMember } from '../types';
import InfoPanel from '../components/InfoPanel';
import LandPlot from '../components/LandPlot';
import SummaryStats from '../components/gis/SummaryStats';
import MapLegend from '../components/gis/MapLegend';
import { SearchIcon } from '../components/icons/SearchIcon';
import StarsBackground from '../components/effects/StarsBackground';

// Helper component for layer toggles
const LayerToggle: React.FC<{
  label: string;
  isChecked: boolean;
  onChange: () => void;
}> = ({ label, isChecked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer text-slate-200 hover:text-white transition-colors">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 rounded bg-slate-700 border-slate-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
    />
    <span className="text-sm font-medium">{label}</span>
  </label>
);

const GISPage: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<FRAplotData | null>(null);
  const [layers, setLayers] = useState({
    roads: true,
    water: true,
    vegetation: true,
  });
  
  // State for community section
  const [activeCommunity, setActiveCommunity] = useState<TribalCommunity | null>(TRIBAL_COMMUNITIES[0]);
  const [activeMember, setActiveMember] = useState<CommunityMember | null>(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectPlot = (plot: FRAplotData) => {
    // If the same plot is clicked again, deselect it. Otherwise, select the new one.
    if (selectedPlot && selectedPlot.id === plot.id) {
      setSelectedPlot(null);
    } else {
      setSelectedPlot(plot);
    }
  };

  const handleClosePanel = () => {
    setSelectedPlot(null);
  };

  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };
  
  const handleSelectMember = (member: CommunityMember) => {
      setActiveMember(member);
      const plot = FRA_PLOT_DATA.find(p => p.id === member.plotId);
      if(plot) {
          setSelectedPlot(plot);
          // Scroll to the map view if on a small screen
          document.getElementById('map-view')?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const searchedPlotIds = useMemo(() => {
    if (!searchTerm.trim()) {
      return new Set();
    }
    return new Set(
      FRA_PLOT_DATA
        .filter(plot => plot.pattaHolder.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(plot => plot.id)
    );
  }, [searchTerm]);

  const sortedPlots = useMemo(() => {
    if (!selectedPlot) return FRA_PLOT_DATA;
    // Move selected plot to the end of the array to render it on top of other plots
    const otherPlots = FRA_PLOT_DATA.filter(p => p.id !== selectedPlot.id);
    const selected = FRA_PLOT_DATA.find(p => p.id === selectedPlot.id);
    return selected ? [...otherPlots, selected] : FRA_PLOT_DATA;
  }, [selectedPlot]);


  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-700 text-white">
      
      {/* GIS Controls Column */}
      <div className="w-80 h-full bg-slate-800/80 backdrop-blur-sm p-4 shadow-lg z-20 flex flex-col space-y-4 overflow-y-auto flex-shrink-0 relative">
        <StarsBackground />
        <div className="relative z-10 h-full flex flex-col space-y-4">
            <div className="animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-2xl font-bold text-orange-400">Jharkhand FRA Claims Atlas</h1>
                <p className="text-slate-300 text-sm mt-1">An interactive map visualizing Forest Rights Act land claims and development priorities. Select a land plot to view details.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative animate-[fadeIn_0.5s_ease-out_50ms]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
                type="text"
                placeholder="Search by Patta Holder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            </div>


            {/* Summary Stats */}
            <SummaryStats plots={FRA_PLOT_DATA} />
            
            {/* Layer Controls */}
            <div className="bg-slate-900/50 p-4 rounded-lg animate-[fadeIn_0.5s_ease-out_200ms]">
            <h2 className="text-lg font-bold text-orange-400 mb-3 border-b border-slate-600 pb-2">Map Layers</h2>
            <div className="space-y-3">
                <LayerToggle label="Roads" isChecked={layers.roads} onChange={() => toggleLayer('roads')} />
                <LayerToggle label="Water Bodies" isChecked={layers.water} onChange={() => toggleLayer('water')} />
                <LayerToggle label="Vegetation" isChecked={layers.vegetation} onChange={() => toggleLayer('vegetation')} />
            </div>
            </div>
            
            {/* Map Legend */}
            <MapLegend />
        </div>
      </div>
      
      {/* Main Map & Community Area (Scrollable) */}
      <div id="map-view" className="flex-grow relative overflow-y-auto">
        <div className="relative w-full h-[70vh] min-h-[500px] bg-slate-700">
            <svg
            className="w-full h-full"
            viewBox="0 0 600 500"
            preserveAspectRatio="xMidYMid meet"
            >
                <rect width="100%" height="100%" fill="#334155" /> 

                {/* --- MAP LAYERS --- */}
                {layers.water && (
                <g id="water-layer" className="transition-opacity duration-300">
                    <path d="M20 400 Q 50 350, 100 380 T 200 450 Q 150 500, 50 480 Z" fill="#38bdf8" opacity="0.7" />
                </g>
                )}
                {layers.vegetation && (
                <g id="vegetation-layer" className="transition-opacity duration-300">
                    <path d="M450 300 C 480 280, 520 320, 550 300 C 580 280, 590 350, 550 380 Z" fill="#22c55e" opacity="0.4" />
                    <path d="M480 20 C 500 10, 550 40, 580 30 L 590 100 L 500 120 Z" fill="#22c55e" opacity="0.4" />
                </g>
                )}
                {layers.roads && (
                <g id="roads-layer" className="transition-opacity duration-300">
                    <path d="M-10 210 C 150 160, 250 260, 400 210 L 580 190" stroke="#a1a1aa" strokeWidth="3" fill="none" strokeDasharray="8 4" />
                    <path d="M350 10 L 360 490" stroke="#a1a1aa" strokeWidth="2.5" fill="none" />
                </g>
                )}

                {/* --- INTERACTIVE PLOTS --- */}
                {sortedPlots.map(plot => (
                    <LandPlot 
                        key={plot.id}
                        plot={plot}
                        isSelected={selectedPlot?.id === plot.id}
                        isSearched={searchedPlotIds.has(plot.id)}
                        onSelect={handleSelectPlot}
                    />
                ))}
            </svg>
        </div>

        {/* Community Info Section */}
        <div id="communities" className="p-6 md:p-8 bg-slate-800 relative overflow-hidden">
          <StarsBackground />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-orange-400 mb-2">Tribal Communities</h2>
            <p className="text-slate-300 mb-6 max-w-3xl">Explore FRA claims by community. Select a community to see its members, then click a member to view their plot details on the map.</p>
            
            <div className="flex space-x-2 sm:space-x-4 border-b border-slate-600 mb-6">
                {TRIBAL_COMMUNITIES.map(community => (
                <button
                    key={community.name}
                    onClick={() => {
                    setActiveCommunity(community);
                    setActiveMember(null);
                    }}
                    className={`px-3 sm:px-4 py-2 font-semibold transition-colors duration-200 text-sm sm:text-base ${activeCommunity?.name === community.name ? 'border-b-2 border-orange-400 text-orange-400' : 'text-slate-300 hover:text-white'}`}
                >
                    {community.name}
                </button>
                ))}
            </div>

            {activeCommunity && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
                {/* Community Description */}
                <div className="lg:col-span-1 bg-slate-900/50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-3">{activeCommunity.name}</h3>
                    <p className="text-slate-300">{activeCommunity.description}</p>
                </div>

                {/* Members List */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {activeCommunity.members.map(member => (
                        <button
                        key={member.id}
                        onClick={() => handleSelectMember(member)}
                        className={`p-4 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${activeMember?.id === member.id ? 'bg-orange-500 text-white shadow-lg ring-2 ring-orange-300' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                        <p className="font-bold text-lg">{member.name}</p>
                        <p className="text-sm opacity-80">Age: {member.age}</p>
                        <p className="text-sm opacity-80">Father's Name: {member.fatherName}</p>
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <InfoPanel plot={selectedPlot} onClose={handleClosePanel} />
    </div>
  );
};

export default GISPage;