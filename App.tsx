import React, { useState, useRef, useEffect } from 'react';
import { ProfileSection } from './components/ProfileSection';
import { FamilySection } from './components/FamilySection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { Home, Users, Box, Music, BatteryMedium, Wifi } from 'lucide-react';
import { IlchonMessage } from './types';

enum Tab {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  FAMILY = 'FAMILY',
  CAPSULE = 'CAPSULE'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROFILE);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Interactive State
  const [proteinCount, setProteinCount] = useState(0);
  const [ilchonMessages, setIlchonMessages] = useState<IlchonMessage[]>([]);

  useEffect(() => {
    if (audioRef.current) {
        if (bgmPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log("Playback failed (likely autoplay policy or network):", e);
                    setBgmPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }
  }, [bgmPlaying]);

  const handleGiftProtein = () => {
    setProteinCount(prev => prev + 1);
    // Visual feedback is now handled in ProfileSection via speech bubble
  };

  const handleWriteIlchon = (msg: string) => {
    if (!msg || !msg.trim()) return;

    // 1. Add User Message
    const userMsg: IlchonMessage = {
        id: Date.now(),
        author: 'User', // In a real app, this would be the logged-in user's name
        content: msg,
        isOwner: false
    };
    setIlchonMessages(prev => [userMsg, ...prev]);

    // 2. Yeonwoo Auto-reply logic (Delayed)
    setTimeout(() => {
        const replies = [
            "마! 니 내 짝꿍 맞네. 말 이쁘게 하노.",
            "시끄럽다. 내 생각 할 시간에 운동이나 해라.",
            "오냐, 니도 오늘 하루 힘내라. 내(오빠)가 응원한다.",
            "ㅋㅋㅋㅋ 니 쫌 귀엽네? (농담이다 착각마라)",
            "내 키 188 될 거니까 쫌만 기다리라. 그때 니 호강시켜준다.",
            "야! 남사시럽게 이런 거는 와 쓰는데! (입꼬리 올라감)",
            "하... 내 인기 피곤하다 피곤해.",
            "밥은 묵고 댕기나? 굶지 마라 확 마."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMsg: IlchonMessage = {
            id: Date.now() + 1,
            author: '도연우',
            content: randomReply,
            isOwner: true
        };
        
        setIlchonMessages(prev => [replyMsg, ...prev]);
    }, 1000); // 1 second delay
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.PROFILE: 
        return <ProfileSection 
            proteinCount={proteinCount} 
            onGiftProtein={handleGiftProtein}
            ilchonMessages={ilchonMessages}
            onWriteIlchon={handleWriteIlchon}
        />;
      case Tab.FAMILY: return <FamilySection />;
      case Tab.CAPSULE: return <TimeCapsuleSection />;
      default: return <ProfileSection 
            proteinCount={proteinCount} 
            onGiftProtein={handleGiftProtein}
            ilchonMessages={ilchonMessages}
            onWriteIlchon={handleWriteIlchon}
      />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      {/* Main OS Window */}
      <div className="w-full max-w-5xl bg-[#e0e0e0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex flex-col h-[90vh] max-h-[800px]">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center select-none">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <img src="https://picsum.photos/20/20" alt="icon" className="w-4 h-4 border border-white" />
            <span>Yeonwoo's Minihompy - Microsoft Internet Explorer</span>
          </div>
          <div className="flex gap-1">
             <button className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white">_</button>
             <button className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white">□</button>
             <button className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center font-bold active:border-t-black active:border-l-black active:border-b-white active:border-r-white">X</button>
          </div>
        </div>

        {/* Menu Bar (Fake) */}
        <div className="bg-[#ece9d8] text-black text-xs px-2 py-1 border-b border-gray-400 flex gap-4">
            <span className="underline">F</span>ile <span className="underline">E</span>dit <span className="underline">V</span>iew <span className="underline">F</span>avorites <span className="underline">T</span>ools <span className="underline">H</span>elp
        </div>

        {/* Address Bar */}
        <div className="bg-[#ece9d8] p-1 flex items-center gap-2 border-b border-gray-400 pb-2">
            <span className="text-xs text-gray-500">Address</span>
            <div className="bg-white border border-gray-500 text-sm px-2 py-0.5 flex-1 font-mono">
                http://www.cyworld.com/yeonwoo_muscle_king
            </div>
            <button className="bg-[#ece9d8] border-2 border-white border-b-gray-600 border-r-gray-600 px-2 text-xs active:border-t-gray-600">Go</button>
        </div>

        {/* Content Area (The Minihompy) */}
        <div className="flex-1 bg-gray-200 p-2 sm:p-6 overflow-hidden flex flex-col sm:flex-row gap-4">
            
            {/* Left Sidebar */}
            <div className="w-full sm:w-64 bg-white border border-gray-400 rounded-lg p-4 flex flex-col gap-4 shadow-inner overflow-y-auto">
                <div className="border border-gray-200 p-1">
                    <img src="https://picsum.photos/id/1005/300/300" className="w-full aspect-square object-cover grayscale brightness-110" alt="Main" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs text-blue-500 cursor-pointer hover:underline">Edit Profile ▶</p>
                    <div className="border-t border-dotted border-gray-400 my-2"></div>
                    <p className="text-sm font-bold">도연우 (25)</p>
                    <p className="text-xs text-gray-500">♂ Male / ESFP</p>
                    <div className="flex justify-center items-center gap-1 text-xs text-orange-500 mt-2">
                         <span className="animate-pulse">❤️</span> Today: {1024 + proteinCount}
                    </div>
                </div>
                
                <div className="mt-auto bg-gray-100 p-2 rounded text-xs border border-gray-300">
                    <div className="font-bold mb-1">📢 Today's BGM</div>
                    <div className="flex items-center justify-between bg-white border border-gray-300 px-1 py-1 marquee overflow-hidden whitespace-nowrap">
                        <div className={`flex items-center gap-1 ${bgmPlaying ? 'animate-marquee' : ''}`}>
                           <Music size={10} /> 
                           <span>도연우의 추천 BGM - 재생 중... </span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-1 gap-2">
                        <button onClick={() => setBgmPlaying(!bgmPlaying)} className="text-[10px] border border-gray-400 px-1 hover:bg-white active:bg-gray-200">
                            {bgmPlaying ? '◼ Stop' : '▶ Play'}
                        </button>
                    </div>
                    {/* Updated Source with confirm=t to bypass potential virus scan interstitials for medium files */}
                    <audio ref={audioRef} loop src="https://docs.google.com/uc?export=download&id=1MBNafBQ4esjGSR4Qi0e6U8U6Jmk5zMxo&confirm=t" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="bg-white border border-gray-400 rounded-lg p-1 shadow-inner h-full flex flex-col relative">
                     {/* Inner Scrollable */}
                     <div className="flex-1 overflow-y-auto p-4 sm:p-6 relative z-10 custom-scrollbar">
                        <div className="mb-6 pb-2 border-b border-dotted border-gray-300 flex justify-between items-end">
                            <h1 className="text-xl sm:text-2xl font-bold text-pink-500">
                                우주최강 상남자의 홈피
                            </h1>
                            <span className="text-xs text-gray-400 font-mono">http://.../muscle_king</span>
                        </div>
                        {renderContent()}
                     </div>

                     {/* Right Side Tabs (Absolute positioned for desktop visual, relative for mobile) */}
                     <div className="absolute top-8 -right-[34px] flex flex-col gap-2 z-0 hidden sm:flex">
                        <TabButton 
                            active={activeTab === Tab.PROFILE} 
                            onClick={() => setActiveTab(Tab.PROFILE)} 
                            label="홈" 
                            color="bg-pink-400"
                            icon={<Home size={16} />}
                        />
                        <TabButton 
                            active={activeTab === Tab.FAMILY} 
                            onClick={() => setActiveTab(Tab.FAMILY)} 
                            label="인맥" 
                            color="bg-blue-400"
                            icon={<Users size={16} />}
                        />
                        <TabButton 
                            active={activeTab === Tab.CAPSULE} 
                            onClick={() => setActiveTab(Tab.CAPSULE)} 
                            label="보물" 
                            color="bg-yellow-400"
                            icon={<Box size={16} />}
                        />
                     </div>
                </div>
            </div>

            {/* Mobile Tabs (Bottom) */}
             <div className="sm:hidden flex justify-between bg-white border border-gray-400 p-1 rounded-lg">
                <button 
                    onClick={() => setActiveTab(Tab.PROFILE)} 
                    className={`flex-1 py-2 text-xs font-bold ${activeTab === Tab.PROFILE ? 'bg-pink-100 text-pink-600' : 'text-gray-500'}`}
                >
                    프로필
                </button>
                <button 
                    onClick={() => setActiveTab(Tab.FAMILY)} 
                    className={`flex-1 py-2 text-xs font-bold ${activeTab === Tab.FAMILY ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                    인맥
                </button>
                <button 
                    onClick={() => setActiveTab(Tab.CAPSULE)} 
                    className={`flex-1 py-2 text-xs font-bold ${activeTab === Tab.CAPSULE ? 'bg-yellow-100 text-yellow-600' : 'text-gray-500'}`}
                >
                    보물
                </button>
             </div>

        </div>

        {/* Footer Status Bar */}
        <div className="bg-[#ece9d8] border-t border-gray-400 px-2 py-1 flex justify-between items-center text-xs text-gray-600 select-none">
            <div className="flex gap-4">
                <span>Done</span>
                <span className="hidden sm:inline">Internet</span>
            </div>
            <div className="flex gap-2 items-center">
                <Wifi size={12} />
                <BatteryMedium size={12} />
                <span>100%</span>
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper for side tabs
const TabButton = ({ active, onClick, label, color, icon }: any) => (
    <button 
        onClick={onClick}
        className={`
            w-[32px] py-3 rounded-r-lg border-t border-r border-b border-gray-400 shadow-sm
            flex flex-col items-center justify-center gap-1 text-xs text-white font-bold writing-mode-vertical transition-transform
            ${active ? `${color} translate-x-0` : 'bg-gray-400 -translate-x-1 hover:bg-gray-500'}
        `}
    >
        {icon}
        <span className="mt-1" style={{writingMode: 'vertical-rl'}}>{label}</span>
    </button>
);

export default App;