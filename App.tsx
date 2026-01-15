import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ProfileSection } from './components/ProfileSection';
import { FamilySection } from './components/FamilySection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { VillageSection } from './components/VillageSection';
import { Home, Users, Box, Map as MapIcon, PlayCircle, PauseCircle, Minimize, X, Square, Search, MoreHorizontal } from 'lucide-react';
import { IlchonMessage } from './types';
import { YEONWOO_PROFILE } from './constants';

enum Tab {
  PROFILE = 'PROFILE',
  FAMILY = 'FAMILY',
  VILLAGE = 'VILLAGE',
  CAPSULE = 'CAPSULE'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.VILLAGE);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [sidebarImageExpanded, setSidebarImageExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [ilchonMessages, setIlchonMessages] = useState<IlchonMessage[]>([]);

  useEffect(() => {
    if (audioRef.current) {
      if (bgmPlaying) {
        audioRef.current.play().catch(e => {
            console.warn("Autoplay blocked:", e);
            setBgmPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [bgmPlaying]);

  const handleWriteIlchon = (msg: string) => {
    if (!msg.trim()) return;
    const userMsg: IlchonMessage = { id: Date.now(), author: '나(User)', content: msg, isOwner: false };
    setIlchonMessages(prev => [userMsg, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.PROFILE: return <ProfileSection ilchonMessages={ilchonMessages} onWriteIlchon={handleWriteIlchon} />;
      case Tab.FAMILY: return <FamilySection />;
      case Tab.VILLAGE: return <VillageSection />;
      case Tab.CAPSULE: return <TimeCapsuleSection />;
      default: return null;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#85a5ff] flex items-center justify-center p-0 sm:p-4 overflow-hidden font-['DungGeunMo']">
      
      {/* Main Window Frame */}
      <div className="w-full h-full sm:max-w-[1100px] sm:h-[90vh] bg-[#ece9d8] flex flex-col shadow-2xl sm:rounded-lg overflow-hidden border-2 border-[#f5f5f5] border-r-[#555] border-b-[#555]">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#3a6ea5] to-[#1e488f] h-8 flex items-center justify-between px-2 shrink-0 select-none">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <img src={YEONWOO_PROFILE.sidebarImageUrl} alt="icon" className="w-4 h-4 border border-white/50 bg-white" />
            <span className="truncate drop-shadow-md">Yeonwoo's Retro Home - Internet Explorer</span>
          </div>
          <div className="flex gap-1">
            <WindowControlIcon icon={<Minimize size={10} />} />
            <WindowControlIcon icon={<Square size={10} />} />
            <WindowControlIcon icon={<X size={10} />} bg="bg-[#d34736] text-white" />
          </div>
        </div>

        {/* Address Bar */}
        <div className="bg-[#ece9d8] border-b border-[#aca899] p-1 flex items-center gap-2 text-xs shrink-0 px-2 py-1.5 shadow-[inset_0_1px_0_white]">
             <span className="text-gray-500 hidden sm:inline">주소(D)</span>
             <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 flex items-center h-6">
                <img src="https://raw.githubusercontent.com/mirimirimiri2/1/refs/heads/main/%EB%8F%84%EC%97%B0%EC%9A%B0%20%ED%94%84%EC%82%AC.webp" className="w-3 h-3 mr-2 grayscale opacity-50" />
                <span className="text-black truncate">http://www.cyworld.com/yeonwoo_love</span>
             </div>
             <button className="flex items-center gap-1 px-3 py-0.5 bg-[#ece9d8] border border-white border-b-[#aca899] border-r-[#aca899] hover:border-[#aca899] hover:border-t-white active:border-t-[#aca899] active:border-l-[#aca899] active:bg-[#e0e0e0] h-6 text-black">
                이동 <Search size={10} />
             </button>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 bg-[#b0c4de] p-3 sm:p-5 flex flex-col lg:flex-row gap-4 overflow-hidden relative">
            
            {/* Left Sidebar (Profile) */}
            <aside className="w-full lg:w-64 bg-white rounded-[15px] p-4 shadow-[2px_2px_5px_rgba(0,0,0,0.1)] flex flex-col gap-3 border border-[#aaa] shrink-0 h-auto lg:h-full overflow-y-auto no-scrollbar z-10">
                <div className="bg-[#f0f0f0] p-1 rounded border border-[#ddd] shadow-inner">
                    <div 
                        className="w-full aspect-square bg-white border border-[#ccc] cursor-pointer overflow-hidden relative group"
                        onClick={() => setSidebarImageExpanded(true)}
                    >
                        <img src={YEONWOO_PROFILE.sidebarImageUrl} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                </div>

                <div className="text-center space-y-1.5 mt-1 border-b-2 border-dotted border-gray-300 pb-3">
                    <div className="text-blue-800 font-bold text-base flex justify-center items-center gap-1">
                       도연우 <span className="text-xs text-gray-500 font-normal">(25)</span>
                    </div>
                    <p className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
                        ♂ ESFP / 3w2
                    </p>
                    <div className="text-orange-500 font-bold text-xs flex items-center justify-center gap-1">
                        <span className="text-[10px] cursor-pointer">♥ Today:</span> 
                        <span className="bg-orange-50 text-orange-600 px-1 rounded">1,024</span>
                    </div>
                </div>

                <div className="flex-1 min-h-[20px]"></div>

                {/* BGM Player */}
                <div className="mt-auto">
                    <div className="text-[9px] font-bold text-blue-500 mb-1 pl-1">CYWORLD BGM</div>
                    <div className="bg-[#f5f5f5] border border-[#ccc] rounded p-1.5 shadow-sm">
                        <div className="bg-white border border-[#ddd] h-5 flex items-center px-2 mb-1 overflow-hidden whitespace-nowrap">
                             <div className={`text-[10px] text-black ${bgmPlaying ? 'animate-marquee' : ''}`}>
                                 {bgmPlaying ? '♬ Buzz - 가시 (겁쟁이 아님)' : '♬ 일촌 대환영!'}
                             </div>
                        </div>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setBgmPlaying(!bgmPlaying)}
                                className="flex-1 bg-[#e0e0e0] border border-white border-b-[#888] border-r-[#888] text-[10px] py-0.5 active:border-t-[#888] active:border-l-[#888] active:bg-[#ccc] flex items-center justify-center gap-1"
                            >
                                {bgmPlaying ? <PauseCircle size={10}/> : <PlayCircle size={10}/>} 
                                {bgmPlaying ? 'Stop' : 'Play'}
                            </button>
                        </div>
                    </div>
                    <audio ref={audioRef} loop src="https://raw.githubusercontent.com/mirimirimiri2/1/main/buzz.mp3" />
                </div>
            </aside>

            {/* Right Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative z-0">
                
                {/* Tabs */}
                <div className="flex gap-1 pl-2 shrink-0 h-8 sm:h-9 items-end">
                    <TopTab active={activeTab === Tab.PROFILE} onClick={() => setActiveTab(Tab.PROFILE)} label="홈" icon={<Home size={14} />} />
                    <TopTab active={activeTab === Tab.FAMILY} onClick={() => setActiveTab(Tab.FAMILY)} label="인맥" icon={<Users size={14} />} />
                    <TopTab active={activeTab === Tab.VILLAGE} onClick={() => setActiveTab(Tab.VILLAGE)} label="마을" icon={<MapIcon size={14} />} />
                    <TopTab active={activeTab === Tab.CAPSULE} onClick={() => setActiveTab(Tab.CAPSULE)} label="보물" icon={<Box size={14} />} />
                </div>

                {/* Content White Box */}
                <div className="flex-1 bg-white rounded-tr-[15px] rounded-b-[15px] border border-[#aaa] shadow-[3px_3px_10px_rgba(0,0,0,0.05)] p-4 sm:p-8 overflow-y-auto custom-scrollbar relative">
                    <div className="animate-fade-in">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-[#ece9d8] border-t border-[#aca899] h-6 flex items-center justify-between px-2 text-[10px] select-none shrink-0 shadow-[inset_0_1px_0_white]">
             <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-green-700 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5)]"></div>
                <span className="font-bold">Online</span>
             </div>
             <div className="flex gap-4 text-gray-500">
                <span className="hidden sm:inline">Copyright ⓒ Cyworld clone. All rights reserved.</span>
                <span className="font-mono">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             </div>
        </div>

      </div>

      {/* Expanded Image Modal */}
      {sidebarImageExpanded && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSidebarImageExpanded(false)}>
            <div className="max-w-md w-full bg-white p-2 rounded shadow-2xl" onClick={e => e.stopPropagation()}>
                <img src={YEONWOO_PROFILE.sidebarImageUrl} className="w-full h-auto rounded max-h-[80vh] object-contain" alt="Full" />
                <button onClick={() => setSidebarImageExpanded(false)} className="w-full mt-2 py-2 bg-gray-200 font-bold text-sm hover:bg-gray-300 rounded border border-gray-400">닫기</button>
            </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const WindowControlIcon = ({ icon, bg = "bg-[#ece9d8]" }: { icon: React.ReactNode, bg?: string }) => (
    <div className={`w-4 h-4 ${bg} border border-white border-b-[#888] border-r-[#888] flex items-center justify-center active:border-t-[#888] active:border-l-[#888] active:bg-[#ccc] cursor-pointer`}>
        {icon}
    </div>
);

const TopTab = ({ active, onClick, label, icon }: any) => (
    <button 
        onClick={onClick}
        className={`
            px-3 sm:px-6 h-8 sm:h-9 rounded-t-[10px] flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all relative top-[1px]
            ${active 
                ? 'bg-white text-[#3a6ea5] border border-[#aaa] border-b-white z-10 shadow-[0_-2px_3px_rgba(0,0,0,0.05)]' 
                : 'bg-[#e0e0e0] text-gray-500 border border-[#aaa] hover:bg-[#eaeaea]'}
        `}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

export default App;