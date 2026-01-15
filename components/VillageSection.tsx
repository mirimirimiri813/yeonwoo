import React, { useMemo } from 'react';
import { VILLAGE_INFO, VILLAGE_WARNINGS } from '../constants';
import { RetroCard } from './RetroCard';
import { MapPin, Info, Trees, ShoppingCart, Eye } from 'lucide-react';

export const VillageSection: React.FC = () => {
  // Pick a random warning once per render of this component instance
  const randomWarning = useMemo(() => {
    return VILLAGE_WARNINGS[Math.floor(Math.random() * VILLAGE_WARNINGS.length)];
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
            <MapPin className="text-red-500" /> {VILLAGE_INFO.name}
        </h2>
        <p className="text-sm text-gray-600 mt-2 font-bold">{VILLAGE_INFO.summary}</p>
      </div>

      <RetroCard title="VILLAGE_GUIDE" color="blue">
        <div className="space-y-6">
          <div className="bg-white p-4 border-2 border-black font-hand text-base sm:text-xl leading-relaxed shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Trees size={120} />
             </div>
             <p className="relative z-10">{VILLAGE_INFO.description}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VILLAGE_INFO.locations.map((loc, idx) => (
              <div key={idx} className="bg-white border-2 border-black p-3 relative group hover:bg-blue-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 font-bold uppercase">{loc.tag}</span>
                    <h4 className="font-bold text-sm sm:text-base flex items-center gap-1">
                        {loc.name === '도화슈퍼' && <ShoppingCart size={14} className="text-orange-500" />}
                        {loc.name}
                        {loc.name === '도화슈퍼' && <Eye size={12} className="text-red-400 animate-pulse ml-auto" />}
                    </h4>
                 </div>
                 <p className="text-xs sm:text-sm text-gray-600 leading-snug">{loc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </RetroCard>

      <div className="bg-yellow-100 border-2 border-black p-4 text-center animate-fade-in shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-bold flex items-center justify-center gap-2">
            <Info size={14} className="text-orange-500 shrink-0" /> 
            <span className="font-hand text-base sm:text-lg">{randomWarning}</span>
        </p>
      </div>
    </div>
  );
};