import React from 'react';
import { VILLAGE_INFO } from '../constants';
import { MapPin } from 'lucide-react';

export const VillageSection: React.FC = () => {
  return (
    <div className="space-y-8 font-['DungGeunMo']">
      
      <div className="flex flex-col gap-1">
        <h2 className="text-lg sm:text-xl font-bold text-pink-500 flex items-center gap-1">
            › 추억의 도화마을
        </h2>
        <div className="w-full h-px bg-gray-200"></div>
      </div>

      {/* Main Title Box */}
      <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-center relative">
          <div className="inline-flex items-center gap-2 border-b-2 border-black pb-1 mb-2">
            <MapPin className="text-red-500 w-6 h-6" />
            <h1 className="text-2xl font-bold text-black">{VILLAGE_INFO.name}</h1>
          </div>
          <p className="text-sm font-bold text-gray-600 mt-2">{VILLAGE_INFO.summary}</p>
      </div>

      {/* Description Box */}
      <div className="border-2 border-black bg-[#40e0d0] p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="bg-[#40e0d0] px-2 py-1 text-white font-bold text-sm flex justify-between items-center">
            <span>VILLAGE_GUIDE</span>
            <div className="flex gap-1">
                <div className="w-3 h-3 bg-white border border-black"></div>
                <div className="w-3 h-3 bg-white border border-black"></div>
            </div>
        </div>
        <div className="bg-white border-2 border-black p-6 min-h-[150px] flex items-center justify-center relative overflow-hidden">
             {/* Background Tree Decoration (CSS/SVG) */}
             <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
                 <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z"/></svg>
             </div>
             
             <p className="text-sm sm:text-base leading-loose font-hand font-bold text-center z-10 px-4">
                {VILLAGE_INFO.description}
             </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {VILLAGE_INFO.locations.map((loc, i) => (
             <div key={i} className="border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                 <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] text-white px-1.5 py-0.5 font-bold ${i === 0 ? 'bg-blue-600' : 'bg-blue-400'}`}>
                        {loc.tag}
                    </span>
                    <h3 className="font-bold text-sm">{loc.name}</h3>
                 </div>
                 <p className="text-xs text-gray-600 leading-snug break-keep">
                    {loc.description}
                 </p>
             </div>
         ))}
      </div>
      
    </div>
  );
};