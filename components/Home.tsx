
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Play, PencilLine, Sparkles, Layout as LayoutIcon, Star, Shield, Globe, Award, ShieldCheck, Terminal, Layers, Crown } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] bg-amber-600/5 blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[70%] bg-cyan-600/5 blur-[180px] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-48">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] animate-in slide-in-from-top-10 duration-1000">
            <Award className="w-4 h-4" />
            <span>ELITE CREATIVE ENGINE 2025</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-space font-black leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom-20 duration-1000">
            THE APEX OF <br />
            <span className="gradient-vantage">VISUAL AI.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium tracking-tight animate-in fade-in duration-1000 delay-500">
            VANTAGE AI Studio provides high-performance tools for professional creators. Neural upscaling, cinematic motion, and pixel-perfect editing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 pt-10 animate-in fade-in duration-1000 delay-700">
            <Link to="/thumbnail" className="btn-vantage px-16 py-6 rounded-2xl flex items-center space-x-4 text-[12px] uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(251,191,36,0.3)] transform transition-transform hover:scale-105 active:scale-95">
              <span>Enter Workspace</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-16 py-6 glass rounded-2xl text-white font-black hover:bg-white/10 transition-all border border-white/10 text-[12px] uppercase tracking-[0.3em]">
              Showcase 4.0
            </button>
          </div>
        </div>

        {/* Hero Visual Block */}
        <div className="mt-32 relative max-w-6xl mx-auto px-4 group">
           <div className="absolute -inset-10 bg-amber-500/10 blur-[150px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
           <div className="relative vantage-card rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-black">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" 
                alt="Vantage Core" 
                className="w-full object-cover aspect-[21/9] transition-transform duration-[3000ms] group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-16 left-16 flex items-center space-x-8">
                 <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_-5px_rgba(251,191,36,0.5)]">
                    <Terminal className="w-10 h-10 text-black" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[11px] font-black text-amber-500 uppercase tracking-[0.5em]">Neural Link: Stable</p>
                    <h3 className="text-4xl font-space font-black tracking-tight text-white">Advanced Render Pipeline</h3>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-white/5 bg-white/[0.01] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <StatBox val="4K" label="Restoration Max" />
          <StatBox val="1.2ms" label="Response Latency" />
          <StatBox val="99.9%" label="Neural Uptime" />
          <StatBox val="24/7" label="Cloud Support" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-48">
        <div className="text-center mb-24 space-y-6">
           <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter text-white">FORGE YOUR VISION.</h2>
           <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">Four specialized engines, one elite environment. Experience the power of the Gemini 3.0 Neural Network.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <FeatureLink 
            icon={LayoutIcon} 
            title="Thumbnail Forge" 
            desc="Construct high-conversion layouts optimized for the YouTube algorithm." 
            link="/thumbnail" 
            tag="STUDIO"
           />
           <FeatureLink 
            icon={Play} 
            title="Temporal Motion" 
            desc="Animate static imagery into cinematic motion with Veo Engine 3.1." 
            link="/video" 
            tag="KINETIC"
           />
           <FeatureLink 
            icon={PencilLine} 
            title="Magic Editor" 
            desc="Repaint reality with conversational precision using our Flash Image models." 
            link="/edit" 
            tag="SYNTHESIS"
           />
           <FeatureLink 
            icon={Sparkles} 
            title="Elite Retouch" 
            desc="Restore and upscale textures to 4K definition with neural Airbrush tech." 
            link="/enhance" 
            tag="RESTORATION"
           />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-48">
         <div className="relative vantage-card p-24 md:p-32 rounded-[4rem] text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-600/10 via-transparent to-cyan-600/10 opacity-50"></div>
            <div className="relative z-10 space-y-12">
               <h2 className="text-6xl md:text-9xl font-space font-black tracking-tighter text-white leading-none">START THE <br />PROTOCOL.</h2>
               <Link to="/thumbnail" className="btn-vantage px-16 py-8 rounded-[2rem] inline-block text-[14px] uppercase tracking-[0.4em]">
                  Initialize Studio
               </Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-amber-500" />
              <span className="font-space font-black text-2xl tracking-tighter text-white uppercase">VANTAGE</span>
           </div>
           <div className="flex space-x-12 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-amber-500 transition-colors">Documentation</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Safety Protocol</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Legal Framework</a>
           </div>
           <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
              &copy; 2025 VANTAGE AI INDUSTRIES
           </div>
        </div>
      </footer>

      <style>{`
        .shadow-3xl {
          box-shadow: 0 60px 120px -30px rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
};

const StatBox = ({ val, label }: { val: string, label: string }) => (
  <div className="space-y-3 group">
    <div className="text-5xl md:text-6xl font-space font-black tracking-tight text-white group-hover:text-amber-500 transition-colors">{val}</div>
    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{label}</div>
  </div>
);

const FeatureLink = ({ icon: Icon, title, desc, link, tag }: any) => (
  <Link to={link} className="vantage-card p-14 rounded-[3.5rem] space-y-10 group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-32 h-32 text-amber-500" />
    </div>
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-500">
      <Icon className="w-8 h-8 text-amber-500 group-hover:text-black" />
    </div>
    <div className="space-y-4">
      <div className="text-[11px] font-black text-amber-500/60 uppercase tracking-[0.5em]">{tag}</div>
      <h3 className="text-3xl font-space font-black text-white">{title}</h3>
      <p className="text-slate-500 text-lg leading-relaxed font-medium">{desc}</p>
    </div>
    <div className="pt-4 flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">
       <span>Execute</span>
       <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
    </div>
  </Link>
);

export default Home;
