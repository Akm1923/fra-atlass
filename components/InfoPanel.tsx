import React from 'react';
import { FRAplotData } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import StarsBackground from './effects/StarsBackground';

interface InfoPanelProps {
  plot: FRAplotData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ plot, onClose }) => {
  const panelVisible = plot !== null;

  const priorityStyles = {
    High: 'bg-red-500/20 text-red-300',
    Medium: 'bg-yellow-500/20 text-yellow-300',
    Low: 'bg-green-500/20 text-green-300',
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-500 ${panelVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-800/90 backdrop-blur-sm shadow-2xl z-40 transform transition-transform duration-500 ease-in-out overflow-hidden
                   ${panelVisible ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-panel-title"
      >
        <StarsBackground />
        <div className="p-6 h-full flex flex-col text-gray-200 relative z-10">
          <div className="flex justify-between items-center border-b border-slate-600 pb-4 mb-6">
            <h2 id="info-panel-title" className="text-2xl font-bold text-orange-400">Plot Information</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-700 transition-colors"
              aria-label="Close panel"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {plot ? (
            <div className="flex-grow overflow-y-auto pr-2 animate-[fadeIn_0.5s_ease-in-out]">
                <div className="space-y-6">
                    <InfoCard Icon={UserIcon} title="Patta Holder" value={plot.pattaHolder} />
                    <InfoCard Icon={MapPinIcon} title="Plot Area" value={`${plot.area} acres`} />
                    {plot.lat !== undefined && plot.lng !== undefined && (
                        <InfoCard Icon={MapPinIcon} title="Coordinates" value={`Lat: ${plot.lat}, Lng: ${plot.lng}`} />
                    )}
                    <InfoCard Icon={BanknotesIcon} title="Development Priority">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${priorityStyles[plot.developmentPriority]}`}>
                            {plot.developmentPriority}
                        </span>
                    </InfoCard>

                    <div className="bg-slate-900/50 p-4 rounded-lg">
                        <div className="flex items-center text-lg font-semibold mb-3 text-gray-300">
                            <BuildingLibraryIcon className="w-6 h-6 mr-3 text-orange-400" />
                            <span>Eligible CSS Schemes</span>
                        </div>
                        <ul className="space-y-2 list-inside">
                            {plot.eligibleSchemes.map((scheme, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-400 mr-2 mt-1">&#10003;</span>
                                    <span>{scheme}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
          ) : (
             <div className="flex-grow flex items-center justify-center">
                <p className="text-slate-400">No plot selected.</p>
             </div>
          )}
        </div>
      </aside>
    </>
  );
};


interface InfoCardProps {
    Icon: React.ElementType;
    title: string;
    value?: string;
    children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ Icon, title, value, children }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg">
        <div className="flex items-center text-sm font-semibold text-slate-400 mb-2">
            <Icon className="w-5 h-5 mr-3 text-orange-400" />
            <span>{title}</span>
        </div>
        {value && <p className="text-xl font-bold text-white">{value}</p>}
        {children}
    </div>
);


export default InfoPanel;