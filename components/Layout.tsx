
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Layout as LayoutIcon, Image as ImageIcon, Sparkles, Github, Play, PencilLine, User, LogOut, X, Mail, Lock, Shield, Crown, Terminal } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('vantage_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.warn("Storage access failed", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vantage_user');
    setUser(null);
  };

  const navItems = [
    { name: 'Core', path: '/', icon: Terminal },
    { name: 'Studio', path: '/thumbnail', icon: LayoutIcon },
    { name: 'Motion', path: '/video', icon: Play },
    { name: 'Editor', path: '/edit', icon: PencilLine },
    { name: 'Restoration', path: '/enhance', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col text-slate-200">
      {/* Top Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-amber-600 p-2.5 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                <Crown className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-space font-black text-2xl tracking-tighter text-white uppercase leading-none">VANTAGE</span>
              <span className="text-[10px] font-black text-amber-500 tracking-[0.3em] uppercase">AI Studio</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center space-x-2 text-[11px] font-black transition-all hover:text-white tracking-[0.2em] uppercase ${
                  location.pathname === item.path ? 'text-amber-500' : 'text-slate-500'
                }`}
              >
                <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'text-amber-500' : ''}`} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4 bg-white/5 pl-5 pr-2 py-2 rounded-2xl border border-white/10 group">
                <div className="text-right">
                  <p className="text-[11px] font-black text-white uppercase leading-none">{user.name}</p>
                  <p className="text-[9px] text-amber-500 font-bold tracking-widest mt-1 uppercase">Gold Access</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-slate-900 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('signin'); setIsAuthModalOpen(true); }}
                className="btn-vantage px-8 py-3 rounded-xl text-[11px] uppercase tracking-[0.2em]"
              >
                Launch Protocol
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md vantage-card rounded-[2.5rem] p-12 shadow-3xl border border-white/10">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X className="w-6 h-6"/></button>
            
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-2xl">
                <Shield className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-4xl font-space font-black tracking-tight mb-2 text-white">{authMode === 'signin' ? 'Verify Identity' : 'Secure Handshake'}</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Connect to the VANTAGE Neural Network</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const userData = {
                name: (formData.get('name') as string) || 'Authorized User',
                email: formData.get('email') as string,
              };
              localStorage.setItem('vantage_user', JSON.stringify(userData));
              setUser(userData);
              setIsAuthModalOpen(false);
            }}>
              {authMode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input name="name" required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-amber-500/50 transition-all text-white" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input name="email" required type="email" placeholder="Access Email" className="w-full bg-slate-900 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-amber-500/50 transition-all text-white" />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input required type="password" placeholder="Passphrase" className="w-full bg-slate-900 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-amber-500/50 transition-all text-white" />
              </div>

              <button type="submit" className="w-full py-5 btn-vantage rounded-2xl mt-4 text-[11px] uppercase tracking-[0.3em]">
                {authMode === 'signin' ? 'Authorize Session' : 'Register Signature'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {authMode === 'signin' ? "No clearance?" : "Already verified?"}
                <button 
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="ml-3 text-amber-500 hover:text-white transition-colors"
                >
                  {authMode === 'signin' ? 'Obtain Access' : 'Authenticate'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 h-20 flex items-center justify-around pb-safe">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-all ${
              location.pathname === item.path ? 'text-amber-500 scale-110' : 'text-slate-600'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1.5" />
            <span className="text-[9px] font-black uppercase tracking-widest">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Layout;
