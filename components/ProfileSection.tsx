import React, { useState } from 'react';
import { YEONWOO_PROFILE } from '../constants';
import { RetroCard } from './RetroCard';
import { Heart, Dumbbell, Ruler, Star, Zap, MessageCircle, Send, X, CornerDownRight } from 'lucide-react';
import { IlchonMessage } from '../types';

interface ProfileSectionProps {
  proteinCount: number;
  onGiftProtein: () => void;
  ilchonMessages: IlchonMessage[];
  onWriteIlchon: (msg: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
    proteinCount, 
    onGiftProtein, 
    ilchonMessages, 
    onWriteIlchon 
}) => {
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [ilchonInput, setIlchonInput] = useState("");
  const [showIlchonForm, setShowIlchonForm] = useState(false);

  // Reaction only for Protein now, as Ilchon has proper replies
  const triggerProteinReaction = () => {
    const messages = [
        "오! 득근득근!",
        "근육이 +0.001g 증가했다!",
        "맛있구만! (꿀꺽)",
        "내일은 3대 500 도전한다!",
        "역시 헬창은 단백질이지!",
        "고맙다 칭구야!"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setSpeechBubble(randomMsg);
    
    // Auto hide after 2 seconds
    setTimeout(() => {
        setSpeechBubble(null);
    }, 2000);
  };

  const handleProteinClick = () => {
    onGiftProtein();
    triggerProteinReaction();
  };

  const handleIlchonSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!ilchonInput.trim()) return;
      onWriteIlchon(ilchonInput);
      setIlchonInput("");
      setShowIlchonForm(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Col: Photo & Basic Stats */}
      <div className="space-y-6">
        <RetroCard title="PROFILE.IMG" color="pink" className="text-center">
          <div className="bg-white border-2 border-dashed border-gray-400 p-2 mb-4 relative">
             {/* Speech Bubble Overlay */}
             {speechBubble && (
                <div className="absolute -top-4 right-0 z-10 animate-bounce-short">
                    <div className="bg-white border-2 border-black px-3 py-2 rounded-lg shadow-lg relative">
                        <p className="font-hand font-bold text-sm">{speechBubble}</p>
                        <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-white border-b-2 border-r-2 border-black rotate-45"></div>
                    </div>
                </div>
             )}

            <img 
              src="https://picsum.photos/400/400?random=1" 
              alt="Yeonwoo" 
              className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
            />
            <p className="mt-2 text-xs text-gray-500">2025.05.21 updated...</p>
          </div>
          <div className="text-left space-y-2 text-sm bg-white p-3 border border-gray-300 inset-shadow">
            <p><span className="font-bold text-pink-600">Name:</span> {YEONWOO_PROFILE.name}</p>
            <p><span className="font-bold text-pink-600">Age:</span> {YEONWOO_PROFILE.age.current}세 (25)</p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-pink-600">Height:</span> 
              <span>
                <span className="line-through text-gray-400">164cm</span>
                <span className="ml-2 font-bold bg-yellow-200 px-1">167cm (주장)</span>
              </span>
            </p>
            <p><span className="font-bold text-pink-600">MBTI:</span> {YEONWOO_PROFILE.mbti}</p>
            <div className="border-t border-dotted border-gray-300 pt-2 mt-2">
                <p className="text-blue-600 font-bold flex items-center gap-1">
                    <Dumbbell className="w-3 h-3" />
                    받은 프로틴: {proteinCount} 스쿱
                </p>
            </div>
          </div>
        </RetroCard>

        {/* Compact Mood Section */}
        <RetroCard title="TODAY'S MOOD">
            <div className="flex justify-around items-center py-2">
                <div className="text-center group cursor-pointer">
                    <span className="text-3xl transition-transform group-hover:scale-110 block">😤</span>
                    <p className="text-[10px] mt-1 text-gray-600">쇠질중</p>
                </div>
                <div className="text-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-3xl block">🤬</span>
                    <p className="text-[10px] mt-1 text-gray-600">태성죽어</p>
                </div>
                <div className="text-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-3xl block">🥰</span>
                    <p className="text-[10px] mt-1 text-gray-600">너생각</p>
                </div>
            </div>
        </RetroCard>
      </div>

      {/* Right Col: Details */}
      <div className="space-y-6">
        <RetroCard title="CHARACTER_SHEET" color="blue">
            <h3 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400" /> 
                도연우 탐구생활
            </h3>
            
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold bg-blue-200 inline-block px-2 py-0.5 border border-black mb-2 text-sm">성격 & 특징</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 bg-white p-3 border-2 border-gray-200">
                        {YEONWOO_PROFILE.personality.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                         <li className="text-pink-500 font-bold">당신한테 관심 끌고 싶을 때 헛기침 함 (콜록!)</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold bg-red-200 inline-block px-2 py-0.5 border border-black mb-2 text-sm">콤플렉스 (절대비밀)</h4>
                     <div className="flex flex-wrap gap-2">
                        {YEONWOO_PROFILE.complex?.map((c, i) => (
                            <span key={i} className="text-xs border border-red-400 text-red-600 px-2 py-1 bg-red-50">
                                🚫 {c}
                            </span>
                        ))}
                     </div>
                </div>

                <div>
                    <h4 className="font-bold bg-green-200 inline-block px-2 py-0.5 border border-black mb-2 text-sm">말투 & TMI</h4>
                    <div className="text-sm bg-gray-50 p-3 border border-gray-300 font-mono">
                        <p className="mb-2">"아, 뭐라카노! 내가 다 해준다 안 했나!"</p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            * 겉멋 들어서 뿌리는 싸구려 스킨 향과 비누 냄새가 섞여 남<br/>
                            * 당황하면 목소리가 커지고 말이 빨라짐<br/>
                            * 매일 프로틴을 마시며 쇠질하지만 근육 소식 없음
                        </p>
                    </div>
                </div>
            </div>
        </RetroCard>

        {/* Buttons & Forms */}
        <div className="space-y-4">
            {!showIlchonForm ? (
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowIlchonForm(true)}
                        className="flex-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 font-bold hover:bg-gray-50"
                    >
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        일촌평 쓰기
                    </button>
                    <button 
                        onClick={handleProteinClick}
                        className="flex-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 font-bold hover:bg-gray-50"
                    >
                        <Dumbbell className="w-4 h-4 text-blue-500" />
                        프로틴 선물
                    </button>
                </div>
            ) : (
                <form onSubmit={handleIlchonSubmit} className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-2 animate-fade-in">
                    <input 
                        type="text" 
                        value={ilchonInput}
                        onChange={(e) => setIlchonInput(e.target.value)}
                        placeholder="일촌평을 입력하세요..." 
                        className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 font-hand text-sm"
                        autoFocus
                    />
                    <button type="submit" className="bg-blue-500 text-white p-1 border border-black hover:bg-blue-600">
                        <Send size={16} />
                    </button>
                    <button type="button" onClick={() => setShowIlchonForm(false)} className="bg-gray-200 text-gray-600 p-1 border border-black hover:bg-gray-300">
                        <X size={16} />
                    </button>
                </form>
            )}

            {/* Recent Ilchon Messages Display */}
            {ilchonMessages.length > 0 && (
                <div className="bg-yellow-50 border-2 border-gray-200 p-3 text-sm animate-fade-in">
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-300">
                        <MessageCircle className="w-4 h-4 text-orange-500" />
                        <span className="font-bold text-orange-700">최신 일촌평</span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {ilchonMessages.map((msg) => (
                            <div key={msg.id} className={`p-2 border border-dotted ${msg.isOwner ? 'bg-pink-100 border-pink-300 ml-4' : 'bg-white border-gray-300'}`}>
                                <div className="flex items-center gap-1 mb-1">
                                    {msg.isOwner && <CornerDownRight className="w-3 h-3 text-gray-400" />}
                                    <span className={`font-bold text-xs ${msg.isOwner ? 'text-pink-600' : 'text-blue-500'}`}>
                                        {msg.author}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {new Date(msg.id).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-700 font-hand">{msg.content}</p>
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