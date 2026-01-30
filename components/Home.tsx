
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Play, PencilLine, Sparkles, Layout as LayoutIcon, Star, ShieldCheck, Globe, Trophy } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#02040a]">
      {/* Dynamic Background */}
      <div className="absolute top-[-30%] left-[-20%] w-[100%] h-[80%] bg-cyan-600/5 blur-[200px] rounded-full pulse-aura"></div>
      <div className="absolute bottom-[-30%] right-[-20%] w-[100%] h-[80%] bg-indigo-600/5 blur-[200px] rounded-full pulse-aura" style={{animationDelay: '2s'}}></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-40">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] animate-in slide-in-from-top-6 duration-1000">
            <Trophy className="w-4 h-4" />
            <span>Best AI Creative Suite 2025</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-space font-black leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom-10 duration-1000">
            BEYOND <br />
            <span className="gradient-aura">IMAGINATION.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium tracking-tight animate-in fade-in duration-1000 delay-300">
            Aura AI Studio is the elite workstation for creators. Upscale photos to museum-quality HD, generate cinematic motion, and edit pixels with conversational magic.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-6 animate-in fade-in duration-1000 delay-500">
            <Link to="/thumbnail" className="aura-button px-14 py-6 text-white font-black rounded-3xl transition-all flex items-center space-x-4 text-xs uppercase tracking-[0.2em] shadow-3xl">
              <span>Open Studio</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-14 py-6 glass rounded-3xl text-white font-black rounded-3xl hover:bg-white/10 transition-all border border-white/10 text-xs uppercase tracking-[0.2em]">
              Watch Showreel
            </button>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="mt-32 relative max-w-6xl mx-auto">
           <div className="absolute -inset-10 bg-cyan-500/10 blur-[120px] rounded-full opacity-30"></div>
           <div className="relative aura-card rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <img 
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600" 
                alt="Aura Interface" 
                className="w-full object-cover aspect-[21/9] hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 flex items-center space-x-6">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 text-black fill-black" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Engine Status: Active</p>
                    <h3 className="text-3xl font-space font-black tracking-tight">Neural Rendering Pipeline</h3>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <ToolLink 
            icon={LayoutIcon} 
            title="Studio" 
            desc="High-CTR YouTube thumbnails forged with AI layout intelligence." 
            link="/thumbnail" 
            label="FORGE"
           />
           <ToolLink 
            icon={Play} 
            title="Motion" 
            desc="Cinematic video generation from a single static reference image." 
            link="/video" 
            label="ANIMATE"
           />
           <ToolLink 
            icon={PencilLine} 
            title="Paint" 
            desc="Manipulate any photo detail using simple text instructions." 
            link="/edit" 
            label="MODIFY"
           />
           <ToolLink 
            icon={Sparkles} 
            title="Retouch" 
            desc="Professional Airbrush skin retouching and 4K upscaling." 
            link="/enhance" 
            label="ENHANCE"
           />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="border-t border-white/5 bg-white/[0.01] py-40">
         <div className="max-w-7xl mx-auto px-6 text-center space-y-20">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter">HD RETOUCHING.</h2>
              <p className="text-slate-500 font-medium">Our proprietary 'Airbrush' algorithm smooths skin, enhances lighting, and reconstructs textures for a flawless high-fashion look.</p>
            </div>
            
            <div className="aura-card p-4 rounded-[3.5rem] max-w-4xl mx-auto">
               <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" alt="Retouch Preview" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

const ToolLink = ({ icon: Icon, title, desc, link, label }: any) => (
  <Link to={link} className="aura-card p-10 rounded-[2.5rem] space-y-8 group">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-all group-hover:bg-cyan-500 group-hover:scale-110 group-hover:rotate-6">
      <Icon className="w-7 h-7 text-cyan-400 group-hover:text-black" />
    </div>
    <div className="space-y-3">
      <div className="text-[10px] font-black text-cyan-400/50 uppercase tracking-[0.4em]">{label}</div>
      <h3 className="text-2xl font-space font-bold text-white">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </Link>
);

export default Home;
