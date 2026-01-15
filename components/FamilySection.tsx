import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SUPPORTING_CAST } from '../constants';
import { RetroCard } from './RetroCard';
import { CharacterRole } from '../types';
import { Crown, Shield, Siren, ZoomIn, X } from 'lucide-react';

export const FamilySection: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<{ url: string; name: string } | null>(null);

  const getIcon = (role: CharacterRole) => {
    switch (role) {
      case CharacterRole.MOTHER: return <Crown className="w-5 h-5 text-yellow-600" />;
      case CharacterRole.FATHER: return <Shield className="w-5 h-5 text-green-600" />;
      case CharacterRole.RIVAL: return <Siren className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            우리 동네 사람들
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SUPPORTING_CAST.map((char) => (
          <RetroCard 
            key={char.id} 
            title={`${char.name} (${char.age.current}세)`}
            color={char.role === CharacterRole.RIVAL ? 'gray' : 'pink'}
          >
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="shrink-0 flex flex-col items-center gap-2">
                    <div 
                      className="relative cursor-zoom-in group overflow-hidden border-2 border-black p-1 bg-white"
                      onClick={() => char.imageUrl && setExpandedImage({ url: char.imageUrl, name: char.name })}
                    >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center z-10">
                            <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <img 
                            src={char.imageUrl} 
                            alt={char.name} 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover transition-all duration-300" 
                        />
                        <div className="bg-black/60 text-white text-[8px] absolute bottom-1 right-1 px-1 font-bold pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            ZOOM
                        </div>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-sm bg-white border border-black px-2 py-1">
                        {getIcon(char.role)}
                        {char.role === CharacterRole.MOTHER && '서열 1위'}
                        {char.role === CharacterRole.FATHER && '서열 3위'}
                        {char.role === CharacterRole.RIVAL && '파출소 순경'}
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <div className="bg-white/50 p-2 border border-gray-300">
                        <p className="text-sm font-bold mb-1">📋 특징</p>
                        <p className="text-sm">{char.description}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="bg-white p-2 border border-gray-200 flex items-center gap-2">
                            <span className="font-bold shrink-0">MBTI</span>
                            <span>{char.mbti}</span>
                        </div>
                        <div className="bg-white p-2 border border-gray-200">
                            <span className="font-bold block mb-1">성격</span>
                            <ul className="list-disc list-inside space-y-1 text-gray-800">
                                {char.personality.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {char.relationships && (
                        <div className="bg-red-50 p-2 border border-red-200 text-xs">
                             <span className="font-bold text-red-500 block mb-1">⚠️ 관계도</span>
                             {char.relationships.map((r, i) => <div key={i}>{r}</div>)}
                        </div>
                    )}
                </div>
            </div>
          </RetroCard>
        ))}
      </div>

      {/* Shared Image Portal Modal for Supporting Cast */}
      {expandedImage && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" 
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="bg-[#e0e0e0] border-2 border-white border-b-gray-600 border-r-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-lg w-full overflow-hidden animate-bounce-short" 
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center">
              <span className="text-white font-bold text-xs truncate">Character View - {expandedImage.name}</span>
              <button onClick={() => setExpandedImage(null)} className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-[10px] font-bold active:bg-gray-400">X</button>
            </div>
            <div className="p-4 bg-white m-1 border border-gray-400 flex flex-col items-center">
              <div className="border-4 border-double border-gray-300 p-2 bg-gray-50 w-full flex justify-center">
                <img src={expandedImage.url} className="max-w-full max-h-[70vh] object-contain drop-shadow-lg" alt={expandedImage.name} />
              </div>
              <div className="mt-4 flex flex-col items-center gap-1">
                <p className="text-[10px] text-blue-800 font-bold uppercase tracking-widest">{expandedImage.name} Profile Photo</p>
                <button 
                    onClick={() => setExpandedImage(null)}
                    className="mt-2 px-10 py-2 bg-[#c0c0c0] border border-white border-b-black border-r-black font-bold text-xs sm:text-sm active:border-black active:border-b-white active:border-r-white hover:bg-gray-100 transition-colors"
                >
                    확인 (OK)
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};