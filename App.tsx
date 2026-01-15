import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ProfileSection } from './components/ProfileSection';
import { FamilySection } from './components/FamilySection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { VillageSection } from './components/VillageSection';
import { Home, Users, Box, Map as MapIcon, Music, BatteryMedium, Wifi, AlertCircle, PlayCircle, PauseCircle, ChevronRight, X, ZoomIn, Heart } from 'lucide-react';
import { IlchonMessage } from './types';
import { YEONWOO_PROFILE } from './constants';

enum Tab {
  PROFILE = 'PROFILE',
  FAMILY = 'FAMILY',
  VILLAGE = 'VILLAGE',
  CAPSULE = 'CAPSULE'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROFILE);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [sidebarImageExpanded, setSidebarImageExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [ilchonMessages, setIlchonMessages] = useState<IlchonMessage[]>([]);

  useEffect(() => {
    if (audioRef.current) {
      if (bgmPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn("Autoplay blocked or link issue:", e);
            setBgmPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [bgmPlaying]);

  const handleWriteIlchon = (msg: string) => {
    if (!msg.trim()) return;
    const userMsg: IlchonMessage = { id: Date.now(), author: '나(User)', content: msg, isOwner: false };
    setIlchonMessages(prev => [userMsg, ...prev]);

    setTimeout(() => {
        let reply = "";
        if (msg.includes("귀엽다") || msg.includes("귀여워")) {
          reply = "마! 내가 어딜 봐서 귀엽노? 상남자라고 불러라! 확 마!";
        } else if (msg.includes("멋있다") || msg.includes("멋져") || msg.includes("잘생겼다")) {
          reply = "흥, 이제 알았나? 역시 내 맘 알아주는 건 니밖에 없다. (코 쓱)";
        } else if (msg.includes("키") || msg.includes("난쟁이") || msg.includes("작다")) {
          reply = "야! 내 아직 성장판 안 닫혔거든? 우유 맨날 묵고 있다. 조용히 해라.";
        } else if (msg.includes("상남자")) {
          reply = "오.. 니 좀 볼 줄 아네? 맞아, 내가 이 마을 최고의 상남자 도연우 아이겠나.";
        } else if (msg.includes("태성")) {
          reply = "강태성 그 자슥 얘기는 왜 꺼내는데? 기분 확 잡치네. 걔랑 놀지 마라!";
        } else if (msg.includes("운동") || msg.includes("근육") || msg.includes("단백질")) {
          reply = "오늘도 쇠질 빡세게 했다. 조만간 내 팔뚝 터질라 카니까 기대해라.";
        } else if (msg.includes("복숭아") || msg.includes("과수원") || msg.includes("사과")) {
          reply = "우리 집 복숭아가 젤 맛있는 건 우째 알고? 담에 마을 오면 내(오빠)가 하나 줄게.";
        } else if (msg.includes("사랑해") || msg.includes("좋아해")) {
          reply = "마, 갑자기 머라카노... (얼굴 빨개짐) 나중에 과수원 뒤에서 얘기하자.";
        } else {
          const genericReplies = [
            "마! 니 내 짝꿍 맞네. 자주 좀 들러라.",
            "운동이나 해라. 건강이 최고다.",
            "밥은 묵고 댕기나? 시골 오면 내가 맛있는 거 사줄게.",
            "내(오빠)가 항상 응원하는 거 알제? 기죽지 마라.",
            "아~ 오늘따라 심심하네. 머하고 사노?",
            "과수원 일 돕기 진짜 싫다... 니가 와서 좀 도와주면 안 되나?",
            "니 오늘 왜 연락 안 했노? 내 기다린 거 아이거든?",
            "세상에 맛있는 게 우예 이리 많노... 복숭아 말고 치킨 묵고 싶다.",
            "니 내 미니홈피 브금 좋지? 뻑간다 아이가."
          ];
          reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
        }
        setIlchonMessages(prev => [{ id: Date.now() + 1, author: '도연우', content: reply, isOwner: true }, ...prev]);
    }, 800);
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
    <div className="h-[100dvh] w-full bg-[#85a5ff] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden safe-area-inset">
      {/* Container: Full height on mobile, Boxed on Desktop */}
      <div className="w-full h-full sm:h-[90vh] sm:max-h-[850px] max-w-5xl bg-[#e0e0e0] flex flex-col overflow-hidden sm:border-2 sm:border-white sm:border-b-gray-600 sm:border-r-gray-600 sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center shrink-0 h-10 sm:h-10">
          <div className="flex items-center gap-2 text-white font-bold text-[11px] sm:text-xs truncate">
            <img src={YEONWOO_PROFILE.sidebarImageUrl} alt="icon" className="w-5 h-5 border border-white" />
            <span className="truncate">Yeonwoo's Minihompy - IE 6.0</span>
          </div>
          <div className="flex gap-1 shrink-0">
             <div className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center font-bold">_</div>
             <div className="w-5 h-5 bg-[#c0c0c0] border border-white border-b-black border-r-black text-[10px] flex items-center justify-center font-bold">X</div>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 bg-[#b0c4de] p-2 sm:p-3 lg:pr-11 overflow-hidden flex flex-col lg:flex-row gap-2 sm:gap-4">
            
            {/* Sidebar: Fixed height on mobile to prevent squashing, Full height on desktop */}
            <div className="w-full lg:w-56 bg-white border border-gray-400 lg:rounded-lg p-2.5 flex flex-row lg:flex-col gap-3 shrink-0 shadow-inner h-auto min-h-[100px] lg:h-full lg:min-h-0">
                {/* Profile Image */}
                <div 
                  className="w-20 sm:w-24 lg:w-full shrink-0 border-2 border-gray-100 cursor-zoom-in group relative overflow-hidden aspect-square self-center"
                  onClick={() => setSidebarImageExpanded(true)}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center z-10">
                        <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100" />
                    </div>
                    <img src={YEONWOO_PROFILE.sidebarImageUrl} className="w-full h-full object-cover" alt="Profile" />
                </div>
                
                {/* Profile Text Info */}
                <div className="flex-1 flex flex-col justify-center lg:text-center min-w-0">
                    <p className="font-bold text-blue-900 text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1 truncate">
                      {YEONWOO_PROFILE.name} ({YEONWOO_PROFILE.age.current})
                    </p>
                    <p className="text-gray-500 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{YEONWOO_PROFILE.mbti}</p>
                    <div className="text-orange-500 font-black text-[10px] sm:text-xs flex items-center gap-1 lg:justify-center">
                      <Heart size={10} fill="currentColor" /> TODAY: 1,024
                    </div>

                    {/* Desktop BGM (Hidden on small mobile to save space) */}
                    <div className="hidden sm:block mt-2 lg:mt-3 bg-[#f0f0f0] p-1.5 border-2 border-white border-b-gray-400 border-r-gray-400 rounded overflow-hidden">
                        <div className="flex items-center justify-between font-bold text-[9px] lg:text-[10px] mb-1 px-1">
                            <span className="text-blue-700">CYWORLD BGM</span>
                        </div>
                        <div className="bg-white border border-gray-300 px-1 py-1 overflow-hidden whitespace-nowrap mb-1">
                            <div className={`flex items-center gap-1 text-orange-600 font-bold text-[10px] ${bgmPlaying ? 'animate-marquee' : ''}`}>
                               <Music size={10} /> 
                               <span>{audioError ? '♬ 재생 불가' : (bgmPlaying ? '♬ Buzz - 가시' : '♬ 일촌 대환영!')}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => { setBgmPlaying(!bgmPlaying); setAudioError(false); }} 
                            className="w-full text-[10px] border border-gray-400 bg-[#e0e0e0] py-1 flex items-center justify-center gap-1 active:bg-gray-300 shadow-sm font-bold"
                        >
                            {bgmPlaying ? <PauseCircle size={12}/> : <PlayCircle size={12}/>} {bgmPlaying ? 'STOP' : 'PLAY'}
                        </button>
                        <audio ref={audioRef} loop src="https://raw.githubusercontent.com/mirimirimiri2/1/main/buzz.mp3" onError={() => setAudioError(true)} />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 h-full relative flex flex-col overflow-hidden lg:overflow-visible">
                {/* Mobile Tabs: ONLY visible on small screens (< lg) */}
                <div className="lg:hidden flex bg-white/70 backdrop-blur-sm p-1 rounded-t-lg border-x border-t border-gray-400 gap-1 overflow-x-auto no-scrollbar shrink-0 z-10">
                    <MobileNavItem active={activeTab === Tab.PROFILE} onClick={() => setActiveTab(Tab.PROFILE)} label="홈" icon={<Home size={14} />} />
                    <MobileNavItem active={activeTab === Tab.FAMILY} onClick={() => setActiveTab(Tab.FAMILY)} label="인맥" icon={<Users size={14} />} />
                    <MobileNavItem active={activeTab === Tab.VILLAGE} onClick={() => setActiveTab(Tab.VILLAGE)} label="마을" icon={<MapIcon size={14} />} />
                    <MobileNavItem active={activeTab === Tab.CAPSULE} onClick={() => setActiveTab(Tab.CAPSULE)} label="보물" icon={<Box size={14} />} />
                </div>

                {/* Main Content Box */}
                <div className="bg-white border border-gray-400 lg:rounded-lg shadow-inner flex-1 flex flex-col overflow-hidden relative z-10">
                     <div className="flex-1 overflow-y-auto p-3 sm:p-6 custom-scrollbar bg-white">
                        <div className="mb-4 pb-2 border-b-2 border-dotted border-gray-200 flex justify-between items-end">
                            <h1 className="text-base sm:text-xl lg:text-2xl font-black text-pink-500 truncate flex items-center gap-1">
                                <ChevronRight size={18} className="text-gray-300" />
                                {activeTab === Tab.PROFILE && "연우의 미니홈피"}
                                {activeTab === Tab.FAMILY && "우리는 일촌관계"}
                                {activeTab === Tab.VILLAGE && "추억의 도화마을"}
                                {activeTab === Tab.CAPSULE && "시간이 멈춘 상자"}
                            </h1>
                        </div>
                        <div className="pb-8">
                          {renderContent()}
                        </div>
                     </div>
                </div>

                {/* Desktop Tabs: ONLY visible on large screens (>= lg) */}
                {/* Moved OUTSIDE the overflow-hidden content box and positioned absolutely relative to this container */}
                <div className="absolute top-4 -right-[32px] flex flex-col gap-1.5 z-0 hidden lg:flex">
                    <TabButton active={activeTab === Tab.PROFILE} onClick={() => setActiveTab(Tab.PROFILE)} label="홈" color="bg-pink-400" icon={<Home size={16} />} />
                    <TabButton active={activeTab === Tab.FAMILY} onClick={() => setActiveTab(Tab.FAMILY)} label="인맥" color="bg-blue-400" icon={<Users size={16} />} />
                    <TabButton active={activeTab === Tab.VILLAGE} onClick={() => setActiveTab(Tab.VILLAGE)} label="마을" color="bg-green-400" icon={<Box size={16} />} />
                    <TabButton active={activeTab === Tab.CAPSULE} onClick={() => setActiveTab(Tab.CAPSULE)} label="보물" color="bg-yellow-400" icon={<Box size={16} />} />
                </div>
            </div>
        </div>

        {/* Taskbar */}
        <div className="bg-[#ece9d8] border-t border-gray-400 px-3 py-1 flex justify-between items-center text-[10px] sm:text-xs text-gray-700 select-none shrink-0 h-9 sm:h-10">
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 bg-gradient-to-b from-green-500 to-green-700 text-white px-2 py-0.5 rounded-r shadow-sm font-bold border border-green-800">
                  <img src="https://picsum.photos/12/12" alt="" className="w-3 h-3 rounded-full" /> Start
                </button>
                <div className="hidden md:flex gap-1">
                  <div className="px-3 py-0.5 bg-white border border-gray-300 shadow-inner rounded flex items-center gap-2">
                    <img src={YEONWOO_PROFILE.sidebarImageUrl} className="w-3 h-3" />
                    <span className="font-bold text-[10px] text-blue-800">도연우's Minihompy</span>
                  </div>
                </div>
            </div>
            <div className="flex gap-4 items-center bg-[#107ce0] text-white px-3 py-1 rounded-l-md h-full">
                <div className="flex gap-2 items-center">
                    <Wifi size={12} />
                    <BatteryMedium size={12} />
                </div>
                <span className="font-bold font-mono tracking-tight">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
      </div>

      {/* Sidebar Image Portal Modal */}
      {sidebarImageExpanded && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSidebarImageExpanded(false)}>
            <div className="bg-[#e0e0e0] border-2 border-white border-b-gray-600 border-r-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center h-10">
                    <span className="text-white font-bold text-xs">Profile View - Full Size</span>
                    <button onClick={() => setSidebarImageExpanded(false)} className="w-6 h-6 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-xs font-bold active:bg-gray-400">X</button>
                </div>
                <div className="p-4 bg-white m-1 border border-gray-400 flex flex-col items-center">
                    <img src={YEONWOO_PROFILE.sidebarImageUrl} className="max-w-full max-h-[70vh] object-contain border-2 border-gray-100" alt="Expanded Profile" />
                    <button onClick={() => setSidebarImageExpanded(false)} className="mt-4 px-12 py-2 bg-[#c0c0c0] border border-white border-b-black border-r-black font-bold text-sm sm:text-base active:shadow-inner active:bg-gray-200">확인 (OK)</button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label, color, icon }: any) => (
    <button onClick={onClick} className={`w-[32px] py-4 rounded-r-lg border border-gray-400 flex flex-col items-center justify-center gap-1.5 text-xs text-white font-bold transition-all ${active ? `${color} translate-x-0 shadow-md` : 'bg-gray-400 -translate-x-1.5 hover:bg-gray-500'}`}>
        {icon}
        <span style={{writingMode: 'vertical-rl'}} className="mt-1">{label}</span>
    </button>
);

const MobileNavItem = ({ active, onClick, label, icon }: any) => (
    <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-t-md transition-all border-b-2 min-w-[64px] ${active ? 'bg-white text-blue-700 border-blue-700 font-bold' : 'text-gray-500 border-transparent hover:bg-white/50'}`}>
        {icon}
        <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">{label}</span>
    </button>
);

export default App;