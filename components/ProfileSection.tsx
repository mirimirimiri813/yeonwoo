import React, { useState } from 'react';
import { YEONWOO_PROFILE } from '../constants';
import { RetroCard } from './RetroCard';
import { Heart, Star, MessageCircle, Send, X, CornerDownRight } from 'lucide-react';
import { IlchonMessage } from '../types';

interface ProfileSectionProps {
  ilchonMessages: IlchonMessage[];
  onWriteIlchon: (msg: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
    ilchonMessages, 
    onWriteIlchon 
}) => {
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [ilchonInput, setIlchonInput] = useState("");
  const [showIlchonForm, setShowIlchonForm] = useState(false);

  const handleIlchonSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!ilchonInput.trim()) return;
      onWriteIlchon(ilchonInput);
      setIlchonInput("");
      setShowIlchonForm(false);
      setSpeechBubble("오, 일촌평 고맙다!");
      setTimeout(() => setSpeechBubble(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 relative">
      <div className="space-y-4 sm:space-y-6">
        <RetroCard title="PROFILE.IMG" color="pink" className="text-center">
          <div 
            className="bg-white border-2 border-dashed border-gray-400 p-1 sm:p-2 mb-2 sm:mb-4 relative overflow-hidden"
          >
             {speechBubble && (
                <div className="absolute top-2 right-2 z-20 animate-bounce-short pointer-events-none">
                    <div className="bg-white border-2 border-black px-2 py-1 rounded-lg shadow-lg relative">
                        <p className="font-hand font-bold text-[10px] sm:text-sm">{speechBubble}</p>
                        <div className="absolute bottom-[-5px] left-3 w-2 h-2 bg-white border-b-2 border-r-2 border-black rotate-45"></div>
                    </div>
                </div>
             )}

            <img 
              src={YEONWOO_PROFILE.imageUrl} 
              alt="Yeonwoo" 
              className="w-full h-auto object-cover transition-all duration-500" 
            />
          </div>
          <div className="text-left space-y-1 sm:space-y-2 text-[11px] sm:text-sm bg-white p-2 sm:p-3 border border-gray-300">
            <p><span className="font-bold text-pink-600">Name:</span> {YEONWOO_PROFILE.name}</p>
            <p><span className="font-bold text-pink-600">Age:</span> {YEONWOO_PROFILE.age.current}세</p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-pink-600">Height:</span> 
              <span className="flex items-center">
                <span className="line-through text-gray-400 text-[10px]">164cm</span>
                <span className="ml-1 font-bold bg-yellow-200 px-1">167cm</span>
              </span>
            </p>
            <p><span className="font-bold text-pink-600">MBTI:</span> {YEONWOO_PROFILE.mbti}</p>
          </div>
        </RetroCard>

        <RetroCard title="MOOD">
            <div className="flex justify-around items-center py-1">
                <div className="text-center cursor-pointer"><span className="text-2xl sm:text-3xl block">😤</span><p className="text-[9px] mt-1 text-gray-600">쇠질중</p></div>
                <div className="text-center opacity-50 hover:opacity-100 cursor-pointer"><span className="text-2xl sm:text-3xl block">🤬</span><p className="text-[9px] mt-1 text-gray-600">태성짱남</p></div>
                <div className="text-center opacity-50 hover:opacity-100 cursor-pointer"><span className="text-2xl sm:text-3xl block">🥰</span><p className="text-[9px] mt-1 text-gray-600">너생각</p></div>
            </div>
        </RetroCard>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <RetroCard title="CHARACTER_SHEET" color="blue">
            <h3 className="text-base sm:text-lg font-bold border-b-2 border-black pb-1 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-600" /> 
                도연우 탐구생활
            </h3>
            <div className="space-y-3 sm:space-y-4">
                <div>
                    <h4 className="font-bold bg-blue-200 inline-block px-2 py-0.5 border border-black mb-1.5 text-[10px] sm:text-xs uppercase">성격 & 특징</h4>
                    <ul className="list-disc list-inside text-[11px] sm:text-sm space-y-1 bg-white p-2 border-2 border-gray-200">
                        {YEONWOO_PROFILE.personality.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold bg-red-200 inline-block px-2 py-0.5 border border-black mb-1.5 text-[10px] sm:text-xs uppercase">콤플렉스</h4>
                     <div className="flex flex-wrap gap-1">
                        {YEONWOO_PROFILE.complex?.map((c, i) => (
                            <span key={i} className="text-[9px] sm:text-[10px] border border-red-400 text-red-600 px-1.5 py-0.5 bg-red-50">
                                🚫 {c}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
        </RetroCard>

        <div className="space-y-3">
            {!showIlchonForm ? (
                <div className="flex gap-2">
                    <button onClick={() => setShowIlchonForm(true)} className="flex-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:shadow-none active:translate-x-[1px] active:translate-y-[1px] text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1.5">
                        <Heart size={14} className="text-red-500 fill-red-500" /> 일촌평 쓰기
                    </button>
                </div>
            ) : (
                <form onSubmit={handleIlchonSubmit} className="bg-white border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-1 animate-fade-in">
                    <input type="text" value={ilchonInput} onChange={(e) => setIlchonInput(e.target.value)} placeholder="일촌평 입력..." className="flex-1 border-b-2 border-gray-200 outline-none px-2 font-hand text-sm" autoFocus />
                    <button type="submit" className="bg-blue-500 text-white p-1 hover:bg-blue-600"><Send size={14} /></button>
                    <button type="button" onClick={() => setShowIlchonForm(false)} className="bg-gray-100 p-1"><X size={14} /></button>
                </form>
            )}

            {ilchonMessages.length > 0 && (
                <div className="bg-yellow-50 border-2 border-gray-200 p-2 text-xs">
                    <div className="flex items-center gap-1 mb-1.5 pb-0.5 border-b border-gray-200">
                        <MessageCircle size={12} className="text-orange-500" />
                        <span className="font-bold text-orange-700">최신 일촌평</span>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
                        {ilchonMessages.map((msg) => (
                            <div key={msg.id} className={`p-1.5 border border-dotted ${msg.isOwner ? 'bg-pink-100 border-pink-200 ml-3' : 'bg-white border-gray-200'}`}>
                                <div className="flex items-center gap-1 mb-0.5">
                                    {msg.isOwner && <CornerDownRight size={10} className="text-gray-400" />}
                                    <span className={`font-bold text-[10px] ${msg.isOwner ? 'text-pink-600' : 'text-blue-500'}`}>{msg.author}</span>
                                </div>
                                <p className="text-[10px] text-gray-700 font-hand">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};