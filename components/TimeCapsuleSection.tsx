import React, { useState } from 'react';
import { TIME_CAPSULE_LETTER, CAPSULE_ITEMS } from '../constants';
import { RetroCard } from './RetroCard';
import { Shovel, Lock, LockOpen, Search, X, ZoomIn } from 'lucide-react';
import { TimeCapsuleItem } from '../types';

export const TimeCapsuleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimeCapsuleItem | null>(null);

  return (
    <div className="min-h-full flex flex-col relative pb-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
           2010년의 약속
        </h2>
        <p className="mt-2 text-sm text-gray-600 font-bold bg-yellow-100 inline-block px-2">
             * 과수원 복숭아 나무 아래 묻혀있던 상자
        </p>
      </div>

      {!isOpen ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[url('https://www.transparenttextures.com/patterns/dirt-texture.png')] bg-amber-100 border-4 border-dashed border-amber-800 rounded-lg cursor-pointer hover:bg-amber-200 transition-colors group" onClick={() => setIsOpen(true)}>
            <div className="w-32 h-32 bg-amber-800 rounded-lg shadow-xl flex items-center justify-center mb-4 group-hover:-translate-y-2 transition-transform relative">
                <Lock className="text-amber-200 w-12 h-12" />
                <div className="absolute -bottom-2 w-full h-2 bg-black/20 rounded-full blur-sm"></div>
            </div>
            <button className="bg-white border-2 border-black px-6 py-2 flex items-center gap-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-amber-50">
                <Shovel className="w-5 h-5" />
                땅 파보기 (Click)
            </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
            <RetroCard title="SECRET_BOX" color="blue" className="bg-yellow-50">
                <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
                    <div className="flex items-center gap-2">
                        <LockOpen className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-blue-800">개봉됨: 2025.XX.XX</span>
                    </div>
                    <button 
                        onClick={() => { setIsOpen(false); setSelectedItem(null); }}
                        className="text-xs underline text-gray-500 hover:text-black font-bold"
                    >
                        다시 묻기
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* The Letter */}
                    <div className="relative">
                        <div className="bg-white p-6 shadow-md rotate-[-1deg] border border-gray-200 relative overflow-hidden">
                            {/* Tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-200/50 rotate-2"></div>
                            
                            <h3 className="font-hand font-bold text-xl mb-4 text-gray-800 border-b-2 border-dotted border-gray-300 pb-2">
                                10살의 연우가...
                            </h3>
                            <div className="font-hand text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-bold min-h-[200px]">
                                {TIME_CAPSULE_LETTER}
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-center bg-blue-200 border border-blue-400 py-1 text-sm">발견된 아이템 (클릭해서 자세히 보기)</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {CAPSULE_ITEMS.map((item, idx) => (
                                <button 
                                  key={idx} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                  }}
                                  className={`w-full text-left bg-white border-2 border-gray-200 p-3 flex items-center gap-3 transition-all hover:bg-blue-50 hover:border-blue-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] active:translate-y-0.5 active:shadow-none ${selectedItem?.name === item.name ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : ''}`}
                                >
                                    <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 group">
                                        <ZoomIn className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-sm text-gray-800 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        <div className="bg-pink-100 border-2 border-pink-300 p-4 mt-4 text-center">
                            <p className="text-pink-600 font-bold text-sm mb-2">System Message</p>
                            <p className="text-xs font-bold">
                                "어부바 쿠폰"의 유효기간이 확인되었습니다.<br/>
                                <span className="font-bold text-xl text-pink-700 animate-pulse">무제한</span>
                            </p>
                        </div>
                    </div>
                </div>
            </RetroCard>
        </div>
      )}

      {/* Item Image Overlay - Use absolute positioning within the relative container to avoid parent clipping */}
      {selectedItem && (
        <div 
          className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2 sm:p-4 animate-fade-in" 
          onClick={() => setSelectedItem(null)}
          style={{ height: 'calc(100% + 40px)', top: '-20px' }}
        >
          <div 
            className="bg-[#e0e0e0] border-2 border-white border-b-gray-600 border-r-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] max-w-[90%] sm:max-w-sm w-full animate-bounce-short overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center">
              <span className="text-white font-bold text-[10px] sm:text-xs truncate">Treasure Viewer - {selectedItem.name}</span>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="w-5 h-5 sm:w-4 sm:h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-[10px] font-bold active:bg-gray-400"
              >
                X
              </button>
            </div>
            <div className="p-3 sm:p-4 bg-white m-1 border border-gray-400 flex flex-col items-center">
              <div className="border-4 border-double border-gray-300 p-1 sm:p-2 mb-3 sm:mb-4 bg-gray-50 w-full flex justify-center">
                {selectedItem.image ? (
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="max-w-full h-auto max-h-[250px] sm:max-h-[350px] object-contain drop-shadow-md bg-white"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center text-gray-400 italic text-sm">
                    이미지를 불러올 수 없습니다.
                  </div>
                )}
              </div>
              <div className="text-center w-full px-2">
                <h3 className="font-bold text-base sm:text-lg text-blue-900 mb-1">{selectedItem.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-hand text-base leading-snug">{selectedItem.description}</p>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="mt-4 w-full sm:w-auto px-8 py-1.5 bg-[#c0c0c0] border border-white border-b-black border-r-black font-bold text-xs sm:text-sm active:border-black active:border-b-white active:border-r-white hover:bg-gray-100 transition-colors"
              >
                닫기(Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};