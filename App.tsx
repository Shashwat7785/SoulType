
import React, { useState, useEffect, useMemo } from 'react';
// Corrected imports: User and MBTIType are now imported from ./types
import { MBTI_QUESTIONS, MOCK_USERS, PERSONALITY_MAP } from './constants';
import { User, MBTIType } from './types';
import { getDetailedPersonalityAnalysis, getCompatibilityTip } from './services/geminiService';
import { Heart, User as UserIcon, BookOpen, Search, Sparkles, ChevronRight, CheckCircle2, LogOut } from 'lucide-react';

// --- View Components ---

const Header: React.FC<{ user?: User; onLogout: () => void }> = ({ user, onLogout }) => (
  <header className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <Heart className="text-white fill-current" size={20} />
      </div>
      <h1 className="text-xl font-bold tracking-tight">Soul<span className="gradient-text">Type</span></h1>
    </div>
    {user && (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-slate-200">{user.name}</span>
          <span className="text-xs text-indigo-400 font-semibold">{user.personalityType}</span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={20} className="text-slate-400" />
        </button>
      </div>
    )}
  </header>
);

const LoginView: React.FC<{ onLogin: (name: string, email: string) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md glass p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to SoulType</h2>
          <p className="text-slate-400">Discover meaningful connections based on who you truly are.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            onClick={() => name && email && onLogin(name, email)}
            disabled={!name || !email}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Find Your Type
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizView: React.FC<{ onComplete: (type: MBTIType) => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({ EI: 0, SN: 0, TF: 0, JP: 0 });

  const progress = ((currentIndex) / MBTI_QUESTIONS.length) * 100;

  const handleSelect = (option: 'A' | 'B') => {
    const q = MBTI_QUESTIONS[currentIndex];
    const score = option === 'A' ? 1 : -1;
    
    setAnswers(prev => ({
      ...prev,
      [q.dimension]: prev[q.dimension] + score
    }));

    if (currentIndex < MBTI_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Final calculation logic
      const type = [
        answers.EI + score >= 0 ? 'E' : 'I',
        answers.SN + score >= 0 ? 'S' : 'N',
        answers.TF + score >= 0 ? 'T' : 'F',
        answers.JP + score >= 0 ? 'J' : 'P',
      ].join('') as MBTIType;
      onComplete(type);
    }
  };

  const q = MBTI_QUESTIONS[currentIndex];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-2xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-3xl font-bold">Question {currentIndex + 1}</h2>
          <span className="text-slate-400 font-medium">{currentIndex + 1} of {MBTI_QUESTIONS.length}</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-medium leading-relaxed text-slate-200 mb-8">
          {q.text}
        </h3>
        
        <button 
          onClick={() => handleSelect('A')}
          className="w-full glass p-6 rounded-2xl text-left hover:bg-white/10 transition-all border border-white/5 hover:border-indigo-500/50 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg text-slate-300 group-hover:text-white transition-colors">{q.optionA}</span>
            <ChevronRight className="text-slate-600 group-hover:text-indigo-400" />
          </div>
        </button>

        <button 
          onClick={() => handleSelect('B')}
          className="w-full glass p-6 rounded-2xl text-left hover:bg-white/10 transition-all border border-white/5 hover:border-indigo-500/50 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg text-slate-300 group-hover:text-white transition-colors">{q.optionB}</span>
            <ChevronRight className="text-slate-600 group-hover:text-indigo-400" />
          </div>
        </button>
      </div>
    </div>
  );
};

const ResultView: React.FC<{ type: MBTIType; onProceed: () => void }> = ({ type, onProceed }) => {
  const insight = PERSONALITY_MAP[type];
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailedPersonalityAnalysis(type, insight).then(res => {
      setAiInsight(res);
      setLoading(false);
    });
  }, [type, insight]);

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
          <Sparkles size={14} />
          Your Result
        </div>
        <h2 className="text-6xl md:text-8xl font-black mb-4 gradient-text tracking-tighter">{type}</h2>
        <h3 className="text-2xl md:text-4xl font-bold text-slate-100 mb-4">{insight.title}</h3>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">{insight.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass p-8 rounded-3xl border border-white/10">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" /> Key Strengths
          </h4>
          <ul className="space-y-4">
            {insight.strengths.map(s => (
              <li key={s} className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400/50" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass p-8 rounded-3xl border border-white/10">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Search className="text-indigo-400" /> Best Romantic Matches
          </h4>
          <div className="flex flex-wrap gap-3">
            {insight.idealMatches.map(m => (
              <span key={m} className="px-4 py-2 bg-white/5 rounded-xl text-indigo-300 font-bold border border-white/10">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 mb-12 min-h-[300px] flex flex-col">
        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="text-purple-400" /> Gemini AI Deep Insight
        </h4>
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p>Analyzing psychological nuances...</p>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
            {aiInsight}
          </div>
        )}
      </div>

      <button 
        onClick={onProceed}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-lg"
      >
        See Compatible People
      </button>
    </div>
  );
};

const MatchingView: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'discover'>('matches');
  const [selectedMatch, setSelectedMatch] = useState<User | null>(null);
  const [tip, setTip] = useState<string>("");
  const [tipLoading, setTipLoading] = useState(false);

  // Logic: "matches" are users with types in the idealMatches list.
  // "discover" are everyone else.
  const idealMatchesList = PERSONALITY_MAP[user.personalityType!].idealMatches;
  
  const matches = useMemo(() => 
    MOCK_USERS.filter(u => idealMatchesList.includes(u.personalityType!)),
    [idealMatchesList]
  );

  const discover = useMemo(() => 
    MOCK_USERS.filter(u => !idealMatchesList.includes(u.personalityType!)),
    [idealMatchesList]
  );

  const handleOpenProfile = (match: User) => {
    setSelectedMatch(match);
    setTipLoading(true);
    getCompatibilityTip(user.personalityType!, match.personalityType!).then(res => {
      setTip(res);
      setTipLoading(false);
    });
  };

  const currentList = activeTab === 'matches' ? matches : discover;

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">Find Your <span className="gradient-text">Connection</span></h2>
          <p className="text-slate-400">Personalized suggestions based on {user.personalityType} psychology.</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('matches')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'matches' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Compatible ({matches.length})
          </button>
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'discover' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Explore More
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentList.map(u => (
          <div 
            key={u.id}
            className="group relative glass rounded-3xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all transform hover:-translate-y-2"
            onClick={() => handleOpenProfile(u)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img src={u.photoUrl} alt={u.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/20">
                {u.personalityType}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold">{u.name}, {u.age}</h3>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                <Search size={12} /> {u.location}
              </p>
              <div className="text-sm text-slate-200 line-clamp-2 italic">
                "{u.bio}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMatch(null)}></div>
          <div className="relative glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedMatch(null)}
              className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-white/20 transition-colors"
            >
              <LogOut size={20} className="rotate-180" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img src={selectedMatch.photoUrl} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20 mb-4 uppercase tracking-widest">
                  {selectedMatch.personalityType} • {PERSONALITY_MAP[selectedMatch.personalityType!].title}
                </div>
                <h3 className="text-3xl font-black mb-1">{selectedMatch.name}, {selectedMatch.age}</h3>
                <p className="text-slate-400 mb-6 flex items-center gap-1"><Search size={14} /> {selectedMatch.location}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">About</h4>
                    <p className="text-slate-200 leading-relaxed italic">"{selectedMatch.bio}"</p>
                  </div>

                  <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                    <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
                      <Sparkles size={14} /> AI Matching Insight
                    </h4>
                    {tipLoading ? (
                      <div className="flex gap-2 items-center text-xs text-slate-500">
                        <div className="w-3 h-3 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                        Generating chemistry analysis...
                      </div>
                    ) : (
                      <p className="text-sm text-slate-300 italic leading-relaxed whitespace-pre-wrap">{tip}</p>
                    )}
                  </div>

                  <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
                    <Heart size={18} fill="currentColor" /> Send a Spark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

enum AppStage {
  LOGIN,
  QUIZ,
  RESULT,
  MATCHING
}

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleLogin = (name: string, email: string) => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      photoUrl: `https://picsum.photos/seed/${name}/400/400`,
      location: 'Scanning...'
    });
    setStage(AppStage.QUIZ);
  };

  const handleQuizComplete = (type: MBTIType) => {
    setCurrentUser(prev => prev ? { ...prev, personalityType: type } : undefined);
    setStage(AppStage.RESULT);
  };

  const handleLogout = () => {
    setCurrentUser(undefined);
    setStage(AppStage.LOGIN);
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <main className="animate-in fade-in duration-700">
        {stage === AppStage.LOGIN && <LoginView onLogin={handleLogin} />}
        
        {stage === AppStage.QUIZ && <QuizView onComplete={handleQuizComplete} />}
        
        {stage === AppStage.RESULT && currentUser?.personalityType && (
          <ResultView 
            type={currentUser.personalityType} 
            onProceed={() => setStage(AppStage.MATCHING)} 
          />
        )}
        
        {stage === AppStage.MATCHING && currentUser && (
          <MatchingView user={currentUser} />
        )}
      </main>

      <footer className="py-12 border-t border-white/5 mt-20 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} SoulType. Powered by Gemini AI & Psychology.
        </p>
      </footer>
    </div>
  );
}
