
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Layout as LayoutIcon, Image as ImageIcon, Sparkles, Github, Play, PencilLine, User, LogOut, X, Mail, Lock, Smartphone, ShieldCheck } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aura_user');
    setUser(null);
  };

  const navItems = [
    { name: 'Core', path: '/', icon: Zap },
    { name: 'Studio', path: '/thumbnail', icon: LayoutIcon },
    { name: 'Motion', path: '/video', icon: Play },
    { name: 'Paint', path: '/edit', icon: PencilLine },
    { name: 'Retouch', path: '/enhance', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col text-slate-200 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 p-2 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-cyan-500/10">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-space font-black text-2xl tracking-tighter text-white uppercase">Aura<span className="text-cyan-400">Studio</span></span>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 text-xs font-black transition-all hover:text-cyan-400 tracking-widest uppercase ${
                  location.pathname === item.path ? 'text-cyan-400' : 'text-slate-500'
                }`}
              >
                <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            {user ? (
              <div className="flex items-center space-x-4 bg-white/5 pl-4 pr-1 py-1 rounded-2xl border border-white/5">
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black text-white uppercase leading-none">{user.name}</p>
                  <p className="text-[8px] text-cyan-400 font-bold tracking-widest mt-0.5">ELITE MEMBER</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-slate-900 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/5"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('signin'); setIsAuthModalOpen(true); }}
                className="aura-button text-white font-black py-3 px-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95"
              >
                Initialize Account
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md aura-card rounded-[3rem] p-12 shadow-3xl overflow-hidden border border-white/10">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X className="w-6 h-6"/></button>
            
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                <ShieldCheck className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-space font-black tracking-tight mb-2">{authMode === 'signin' ? 'Welcome Back' : 'Join the Elite'}</h2>
              <p className="text-slate-500 text-sm font-medium tracking-tight">Access Aura AI's full creative capability.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const userData = {
                name: (formData.get('name') as string) || 'Elite Creator',
                email: formData.get('email') as string,
              };
              localStorage.setItem('aura_user', JSON.stringify(userData));
              setUser(userData);
              setIsAuthModalOpen(false);
            }}>
              {authMode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input name="name" required type="text" placeholder="Full Name" className="w-full bg-slate-950/50 border border-white/5 rounded-[1.25rem] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-all" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input name="email" required type="email" placeholder="Email Address" className="w-full bg-slate-950/50 border border-white/5 rounded-[1.25rem] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input required type="password" placeholder="Secure Password" className="w-full bg-slate-950/50 border border-white/5 rounded-[1.25rem] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>

              <button type="submit" className="w-full py-5 bg-white text-slate-950 font-black text-xs uppercase tracking-[0.3em] rounded-[1.25rem] mt-4 hover:bg-cyan-400 transition-all shadow-2xl active:scale-95">
                {authMode === 'signin' ? 'Verify Credentials' : 'Create Profile'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                {authMode === 'signin' ? "New around here?" : "Already part of the network?"}
                <button 
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="ml-3 text-cyan-400 hover:text-white transition-colors"
                >
                  {authMode === 'signin' ? 'Initialize' : 'Authenticate'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-18 pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 h-20 flex items-center justify-around pb-safe">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-all ${
              location.pathname === item.path ? 'text-cyan-400 scale-110' : 'text-slate-600'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1.5" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Layout;
