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
  const [ilchonInput, setIlchonInput] = useState("");
  const [showIlchonForm, setShowIlchonForm] = useState(false);

  const handleIlchonSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!ilchonInput.trim()) return;
      onWriteIlchon(ilchonInput);
      setIlchonInput("");
      setShowIlchonForm(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full content-start">
      <div className="space-y-6">
        <RetroCard title="MAIN_PHOTO" color="pink" className="text-center">
          <div className="bg-white border-2 border-dashed border-gray-300 p-2 mb-4">
            <img 
              src={YEONWOO_PROFILE.imageUrl} 
              alt="Yeonwoo" 
              className="w-full h-auto max-h-[300px] object-cover mx-auto" 
            />
          </div>
          <div className="text-left bg-[#f9f9f9] p-3 border border-gray-200 text-xs sm:text-sm space-y-1">
             <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-bold text-gray-500">Name</span>
                <span className="font-bold text-blue-600">{YEONWOO_PROFILE.name}</span>
             </div>
             <div className="flex justify-between border-b border-gray-200 pb-1 pt-1">
                <span className="font-bold text-gray-500">Job</span>
                <span>{YEONWOO_PROFILE.job}</span>
             </div>
             <p className="pt-2 leading-relaxed text-gray-600">
                "{YEONWOO_PROFILE.description}"
             </p>
          </div>
        </RetroCard>

        <RetroCard title="FEELING" color="gray">
             <div className="flex justify-around py-2">
                 <div className="text-center group cursor-pointer">
                    <div className="text-3xl mb-1 group-hover:-translate-y-1 transition-transform">🍑</div>
                    <span className="text-[10px] font-bold text-gray-500">과수원</span>
                 </div>
                 <div className="text-center group cursor-pointer">
                    <div className="text-3xl mb-1 group-hover:-translate-y-1 transition-transform">💪</div>
                    <span className="text-[10px] font-bold text-gray-500">헬창꿈나무</span>
                 </div>
                 <div className="text-center group cursor-pointer">
                    <div className="text-3xl mb-1 group-hover:-translate-y-1 transition-transform">😡</div>
                    <span className="text-[10px] font-bold text-gray-500">강태성ㅗ</span>
                 </div>
             </div>
        </RetroCard>
      </div>

      <div className="space-y-6">
        <RetroCard title="CHARACTER_SHEET" color="blue">
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                        <Star size={14} /> 성격 및 특징
                    </h4>
                    <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 bg-white p-3 border border-gray-200 rounded">
                        {YEONWOO_PROFILE.personality.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-1">
                        <X size={14} /> 콤플렉스
                    </h4>
                     <div className="flex flex-wrap gap-1.5">
                        {YEONWOO_PROFILE.complex?.map((c, i) => (
                            <span key={i} className="text-xs bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded-full font-bold">
                                {c}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
        </RetroCard>

        <div className="space-y-3">
             <div className="flex justify-between items-end border-b-2 border-gray-200 pb-1 mb-2">
                <h3 className="font-bold text-lg text-blue-500 flex items-center gap-1">
                    일촌평 <span className="text-sm text-gray-400 font-normal">({ilchonMessages.length})</span>
                </h3>
                {!showIlchonForm && (
                    <button onClick={() => setShowIlchonForm(true)} className="text-xs font-bold text-gray-500 hover:text-blue-500 underline">
                        작성하기
                    </button>
                )}
             </div>

            {showIlchonForm && (
                <form onSubmit={handleIlchonSubmit} className="flex gap-2 mb-4 animate-fade-in">
                    <input 
                        type="text" 
                        value={ilchonInput} 
                        onChange={(e) => setIlchonInput(e.target.value)} 
                        placeholder="일촌평을 남겨보세요..." 
                        className="flex-1 border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-400" 
                        autoFocus 
                    />
                    <button type="submit" className="bg-white border border-gray-300 px-3 text-xs hover:bg-gray-50 font-bold">등록</button>
                </form>
            )}

            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                {ilchonMessages.length === 0 ? (
                    <p className="text-center text-gray-400 text-xs py-4">아직 등록된 일촌평이 없습니다.</p>
                ) : (
                    ilchonMessages.map((msg) => (
                        <div key={msg.id} className={`text-xs p-2 border-b border-gray-100 ${msg.isOwner ? 'bg-blue-50' : ''}`}>
                            <span className={`font-bold mr-2 cursor-pointer hover:underline ${msg.isOwner ? 'text-blue-600' : 'text-gray-700'}`}>
                                {msg.author}
                            </span>
                            <span className="text-gray-600 font-hand text-sm">{msg.content}</span>
                            <span className="text-[9px] text-gray-300 ml-2">({new Date(msg.id).toLocaleDateString()})</span>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};