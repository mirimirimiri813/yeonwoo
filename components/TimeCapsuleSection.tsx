import React, { useState } from 'react';
import { TIME_CAPSULE_LETTER, CAPSULE_ITEMS } from '../constants';
import { RetroCard } from './RetroCard';
import { Shovel, Lock, LockOpen, Search } from 'lucide-react';

export const TimeCapsuleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
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
                        onClick={() => setIsOpen(false)}
                        className="text-xs underline text-gray-500 hover:text-black"
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
                            <pre className="font-hand text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-bold">
                                {TIME_CAPSULE_LETTER}
                            </pre>
                            <div className="mt-4 flex justify-end">
                                <img src="https://picsum.photos/100/100?random=stamp" alt="stamp" className="w-16 h-16 opacity-50 mix-blend-multiply grayscale contrast-150" style={{borderRadius: '50%'}} />
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-center bg-blue-200 border border-blue-400 py-1">발견된 아이템</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {CAPSULE_ITEMS.map((item, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                                    <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-pink-100 border-2 border-pink-300 p-4 mt-4 text-center">
                            <p className="text-pink-600 font-bold text-sm mb-2">System Message</p>
                            <p className="text-xs">
                                "어부바 쿠폰"의 유효기간이 확인되었습니다.<br/>
                                <span className="font-bold text-lg">무제한</span>
                            </p>
                        </div>
                    </div>
                </div>
            </RetroCard>
        </div>
      )}
    </div>
  );
};
