import React from 'react';
import { SUPPORTING_CAST } from '../constants';
import { RetroCard } from './RetroCard';
import { CharacterRole } from '../types';
import { Crown, Shield, Siren } from 'lucide-react';

export const FamilySection: React.FC = () => {
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
            title={char.name}
            color={char.role === CharacterRole.RIVAL ? 'gray' : 'pink'}
          >
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="shrink-0 flex flex-col items-center gap-2">
                    <img 
                        src={`https://picsum.photos/150/150?random=${char.id.length}`} 
                        alt={char.name} 
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover border-2 border-black p-1 bg-white" 
                    />
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
    </div>
  );
};