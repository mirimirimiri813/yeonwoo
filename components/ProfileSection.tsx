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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
      <div className="space-y-6">
        <RetroCard title="PROFILE.IMG" color="pink" className="text-center">
          <div 
            className="bg-white border-2 border-dashed border-gray-400 p-2 mb-4 relative overflow-hidden"
          >
             {speechBubble && (
                <div className="absolute top-2 right-2 z-20 animate-bounce-short pointer-events-none">
                    <div className="bg-white border-2 border-black px-2 py-1 rounded-lg shadow-lg relative">
                        <p className="font-hand font-bold text-xs sm:text-sm">{speechBubble}</p>
                        <div className="absolute bottom-[-5px] left-3 w-2 h-2 bg-white border-b-2 border-r-2 border-black rotate-45"></div>
                    </div>
                </div>
             )}

            <img 
              src={YEONWOO_PROFILE.imageUrl} 
              alt="Yeonwoo" 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          {/* Key Profile Info Card */}
          <div className="text-left space-y-2 text-sm bg-white p-3 border-2 border-gray-200 shadow-inner min-h-[100px]">
            <p className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="font-bold text-pink-600">Name</span> 
              <span className="font-bold">{YEONWOO_PROFILE.name}</span>
            </p>
            <p className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="font-bold text-pink-600">Age</span> 
              <span className="font-bold">{YEONWOO_PROFILE.age.current}세</span>
            </p>
            <p className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="font-bold text-pink-600">Height</span> 
              <span className="flex items-center gap-2">
                <span className="line-through text-gray-400 text-[10px]">164cm</span>
                <span className="font-bold bg-yellow-200 px-1.5 rounded">167cm</span>
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-bold text-pink-600">MBTI</span> 
              <span className="font-bold">{YEONWOO_PROFILE.mbti}</span>
            </p>
          </div>
        </RetroCard>

        <RetroCard title="MOOD">
            <div className="flex justify-around items-center py-2">
                <div className="text-center cursor-pointer hover:scale-110 transition-transform"><span className="text-3xl sm:text-4xl block">😤</span><p className="text-[10px] mt-1 text-gray-600 font-bold">쇠질중</p></div>
                <div className="text-center opacity-40 hover:opacity-100 cursor-pointer hover:scale-110 transition-transform"><span className="text-3xl sm:text-4xl block">🤬</span><p className="text-[10px] mt-1 text-gray-600 font-bold">태성짱남</p></div>
                <div className="text-center opacity-40 hover:opacity-100 cursor-pointer hover:scale-110 transition-transform"><span className="text-3xl sm:text-4xl block">🥰</span><p className="text-[10px] mt-1 text-gray-600 font-bold">너생각</p></div>
            </div>
        </RetroCard>
      </div>

      <div className="space-y-6">
        <RetroCard title="CHARACTER_SHEET" color="blue">
            <h3 className="text-lg sm:text-xl font-black border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-600" /> 
                도연우 탐구생활
            </h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold bg-blue-200 inline-block px-2.5 py-1 border border-black mb-2 text-xs uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">성격 & 특징</h4>
                    <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 bg-white p-3 border-2 border-gray-200">
                        {YEONWOO_PROFILE.personality.map((p, i) => <li key={i} className="leading-tight">{p}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold bg-red-200 inline-block px-2.5 py-1 border border-black mb-2 text-xs uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">콤플렉스</h4>
                     <div className="flex flex-wrap gap-1.5">
                        {YEONWOO_PROFILE.complex?.map((c, i) => (
                            <span key={i} className="text-[10px] sm:text-xs border-2 border-red-200 text-red-600 px-2 py-1 bg-red-50 font-bold rounded">
                                🚫 {c}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
        </RetroCard>

        <div className="space-y-4">
            {!showIlchonForm ? (
                <div className="flex gap-2">
                    <button onClick={() => setShowIlchonForm(true)} className="flex-1 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-3 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] text-sm sm:text-base font-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <Heart size={16} className="text-red-500 fill-red-500" /> 일촌평 쓰기
                    </button>
                </div>
            ) : (
                <form onSubmit={handleIlchonSubmit} className="bg-white border-2 border-black p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex gap-2 animate-fade-in">
                    <input type="text" value={ilchonInput} onChange={(e) => setIlchonInput(e.target.value)} placeholder="일촌평 입력..." className="flex-1 border-b-2 border-gray-200 outline-none px-2 font-hand text-base" autoFocus />
                    <button type="submit" className="bg-blue-500 text-white p-2 hover:bg-blue-600 rounded transition-colors"><Send size={18} /></button>
                    <button type="button" onClick={() => setShowIlchonForm(false)} className="bg-gray-100 p-2 rounded"><X size={18} /></button>
                </form>
            )}

            {ilchonMessages.length > 0 && (
                <div className="bg-yellow-50 border-2 border-gray-200 p-3 text-xs shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-gray-200">
                        <MessageCircle size={14} className="text-orange-500" />
                        <span className="font-bold text-orange-700">최신 일촌평</span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                        {ilchonMessages.map((msg) => (
                            <div key={msg.id} className={`p-2 border rounded-md ${msg.isOwner ? 'bg-pink-50 border-pink-100 ml-4' : 'bg-white border-gray-100 shadow-sm'}`}>
                                <div className="flex items-center gap-1.5 mb-1">
                                    {msg.isOwner && <CornerDownRight size={12} className="text-gray-400" />}
                                    <span className={`font-black text-[11px] ${msg.isOwner ? 'text-pink-600' : 'text-blue-600'}`}>{msg.author}</span>
                                </div>
                                <p className="text-xs text-gray-700 font-hand text-base leading-tight">{msg.content}</p>
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