
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Layout as LayoutIcon, Image as ImageIcon, Sparkles, Github, Play, PencilLine, User, LogOut, X, Mail, Lock, Smartphone } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nexus_user');
    setUser(null);
  };

  const navItems = [
    { name: 'Forge', path: '/', icon: Zap },
    { name: 'Studio', path: '/thumbnail', icon: LayoutIcon },
    { name: 'Motion', path: '/video', icon: Play },
    { name: 'Magic', path: '/edit', icon: PencilLine },
    { name: 'HD', path: '/enhance', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-space font-bold text-2xl tracking-tight text-white">Nexus<span className="text-cyan-400">Studio</span></span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1.5 text-sm font-semibold transition-all hover:text-cyan-400 tracking-wide uppercase ${
                  location.pathname === item.path ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-white uppercase">{user.name}</p>
                  <p className="text-[10px] text-slate-500">PRO PLAN</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-slate-900 rounded-full border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('signin'); setIsAuthModalOpen(true); }}
                className="bg-white text-slate-950 font-black py-2.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 auth-modal-overlay">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md glass-card rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setIsAuthModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
            </div>
            
            <div className="text-center mb-10 space-y-2">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-space font-bold">{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-slate-400 text-sm">Experience the power of Nexus AI Studio</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const userData = {
                name: (formData.get('name') as string) || 'Creative Mind',
                email: formData.get('email') as string,
              };
              localStorage.setItem('nexus_user', JSON.stringify(userData));
              setUser(userData);
              setIsAuthModalOpen(false);
            }}>
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="name" required type="text" placeholder="John Doe" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50" />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input name="email" required type="email" placeholder="you@example.com" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50" />
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-white text-slate-950 font-black text-xs uppercase tracking-[0.2em] rounded-2xl mt-4 hover:scale-[1.02] transition-all shadow-xl active:scale-95">
                {authMode === 'signin' ? 'Authorize Access' : 'Initialize Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="ml-2 text-cyan-400 font-bold hover:underline"
                >
                  {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-2 h-18 flex items-center justify-around pb-safe shadow-2xl">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center py-2 px-1 min-w-[64px] transition-all relative ${
              location.pathname === item.path ? 'text-cyan-400 scale-110' : 'text-slate-500'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${location.pathname === item.path ? 'fill-cyan-400/10' : ''}`} />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
            {location.pathname === item.path && (
              <div className="absolute -top-1 w-8 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)]" />
            )}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="hidden lg:block bg-slate-950/50 border-t border-white/5 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-cyan-400" />
              <span className="font-space font-bold text-2xl text-white">Nexus Studio</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Bridging human imagination and silicon power. The ultimate workstation for creators, students, and visionaries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                <Smartphone className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-space font-black text-xs text-white uppercase tracking-[0.2em] mb-6">Platforms</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/thumbnail" className="hover:text-cyan-400 transition-colors">Thumbnail Forge</Link></li>
              <li><Link to="/video" className="hover:text-cyan-400 transition-colors">Motion Engine</Link></li>
              <li><Link to="/edit" className="hover:text-cyan-400 transition-colors">Magic Editor</Link></li>
              <li><Link to="/enhance" className="hover:text-cyan-400 transition-colors">HD Restoration</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-space font-black text-xs text-white uppercase tracking-[0.2em] mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API Status</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <span>&copy; 2025 NEXUS AI TECHNOLOGIES</span>
          <span>MADE IN THE FUTURE</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
