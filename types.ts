export enum CharacterRole {
  PROTAGONIST = 'PROTAGONIST',
  MOTHER = 'MOTHER',
  FATHER = 'FATHER',
  RIVAL = 'RIVAL'
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: CharacterRole;
  age: {
    current: number;
    past: number;
  };
  appearance: string[];
  personality: string[];
  job?: string;
  mbti: string;
  description: string;
  relationships?: string[];
  complex?: string[];
  likes?: string[];
  dislikes?: string[];
}

export interface TimeCapsuleItem {
  name: string;
  description: string;
  image?: string;
}

export interface IlchonMessage {
  id: number;
  author: string;
  content: string;
  isOwner: boolean; // true if written by Yeonwoo
}