
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  personalityType?: MBTIType;
  bio?: string;
  photoUrl: string;
  location: string;
}

export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  optionA: string; // Counts toward E, S, T, J
  optionB: string; // Counts toward I, N, F, P
}

export interface MatchResult {
  user: User;
  compatibilityScore: number;
  reason: string;
}

export interface PersonalityInsight {
  type: MBTIType;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  idealMatches: MBTIType[];
}
