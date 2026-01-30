
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as LayoutIcon, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, Zap, Play, PencilLine, ShieldCheck, Globe, Star } from 'lucide-react';
import ComparisonSlider from './ComparisonSlider';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#020617]">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 blur-[150px] rounded-full pulse-slow"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] animate-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span>Introducing Nexus Engine 3.0</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-space font-black leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
            CRAFT THE <br />
            <span className="gradient-text">IMPOSSIBLE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed animate-in fade-in duration-1000 delay-300">
            Unlock the next dimension of visual creation. From 4K upscaling to cinematic video motion, Nexus Studio is your all-access pass to the AI revolution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in duration-1000 delay-500">
            <Link to="/thumbnail" className="px-10 py-5 btn-primary text-white font-black rounded-2xl transition-all flex items-center space-x-3 text-sm uppercase tracking-widest">
              <span>Start Forging</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-10 py-5 glass-card text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10 text-sm uppercase tracking-widest">
              See Showcase
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10 pt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center space-x-2"><Zap className="w-5 h-5"/> <span className="font-space font-bold">GEMINI 3 PRO</span></div>
             <div className="flex items-center space-x-2"><Play className="w-5 h-5"/> <span className="font-space font-bold">VEO MOTION</span></div>
             <div className="flex items-center space-x-2"><ShieldCheck className="w-5 h-5"/> <span className="font-space font-bold">NEXUS SECURE</span></div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-24 relative max-w-5xl mx-auto group">
           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-fuchsia-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
           <div className="relative glass-card rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
              <img 
                src="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=1200" 
                alt="AI Platform Preview" 
                className="w-full object-cover aspect-[21/9] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Processing Live</p>
                    <h3 className="text-2xl font-space font-bold">Neural Reconstruction Active</h3>
                 </div>
                 <div className="flex space-x-2">
                    <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-400 w-2/3 animate-pulse"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 border-y border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
           <StatItem value="25M+" label="Images Forged" />
           <StatItem value="1.2M" label="Creators Active" />
           <StatItem value="0.4s" label="Latency Time" />
           <StatItem value="4.9/5" label="User Rating" />
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter leading-[0.9]">
              THE APEX <br />
              <span className="text-cyan-400">CREATIVE SUITE.</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              We've consolidated the world's most powerful generative models into a single, intuitive interface. No more complex workflows. Just raw creation.
            </p>
            <div className="space-y-4 pt-4">
              <FeatureList icon={Star} text="Ultra-HD Restoration Engines" />
              <FeatureList icon={Globe} text="Cloud-Native Render Farm" />
              <FeatureList icon={Zap} text="Instant API Integration" />
            </div>
            <Link to="/thumbnail" className="inline-flex items-center space-x-2 text-white font-black uppercase text-xs tracking-widest border-b-2 border-cyan-500 pb-2 hover:border-white transition-all">
              <span>EXPLORE THE STUDIO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BentoCard 
              icon={LayoutIcon} 
              title="Thumbnail Studio" 
              desc="The #1 choice for top-tier YouTubers. AI-optimized layout for peak click-through rates."
              link="/thumbnail"
              color="text-cyan-400"
            />
            <BentoCard 
              icon={Play} 
              title="Motion Engine" 
              desc="Bring your photos to life with Veo's 3.1 temporal consistency technology."
              link="/video"
              color="text-fuchsia-400"
            />
            <BentoCard 
              icon={Sparkles} 
              title="HD Restoration" 
              desc="Restore heritage photos or low-res captures to museum-quality 4K definition."
              link="/enhance"
              color="text-indigo-400"
            />
            <BentoCard 
              icon={PencilLine} 
              title="Magic Editor" 
              desc="Don't like a detail? Just describe the change and watch it happen instantly."
              link="/edit"
              color="text-emerald-400"
            />
          </div>
        </div>
      </section>

      {/* Comparison Preview */}
      <section className="bg-slate-950 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-xl space-y-4">
                 <h2 className="text-4xl md:text-5xl font-space font-bold tracking-tight">Neural Reconstruction.</h2>
                 <p className="text-slate-400">Witness the power of Nexus HD. Our models don't just 'stretch' pixels; they reimagine details that were lost to time or compression.</p>
              </div>
              <Link to="/enhance" className="px-8 py-4 glass-card rounded-2xl text-xs font-black uppercase tracking-widest">Launch Enhancer</Link>
           </div>
           
           <div className="max-w-4xl mx-auto">
             <ComparisonSlider 
               beforeImg="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=40&w=800" 
               afterImg="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" 
             />
           </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="relative rounded-[4rem] bg-gradient-to-br from-indigo-900 via-slate-950 to-fuchsia-900 p-16 md:p-32 overflow-hidden text-center border border-white/10 shadow-3xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
           <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full"></div>
           <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full"></div>
           
           <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-8xl font-space font-black tracking-tighter text-white">READY TO <br />FORGE?</h2>
              <p className="text-indigo-100/60 text-lg max-w-xl mx-auto font-medium">Join over 1.2 million visionaries who are already building with Nexus Studio. Initialize your creative pipeline today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link to="/thumbnail" className="px-12 py-6 bg-white text-slate-950 font-black rounded-[1.5rem] text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl">
                    Create For Free
                 </Link>
                 <button className="px-12 py-6 glass rounded-[1.5rem] text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/10">
                    Enterprise
                 </button>
              </div>
           </div>
        </div>
      </section>

      <style>{`
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center space-y-2 group">
    <div className="text-4xl md:text-5xl font-space font-black tracking-tight text-white group-hover:scale-110 transition-transform">{value}</div>
    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</div>
  </div>
);

const FeatureList = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center space-x-3">
    <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center">
      <Icon className="w-3 h-3 text-cyan-400" />
    </div>
    <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">{text}</span>
  </div>
);

const BentoCard = ({ icon: Icon, title, desc, link, color }: { icon: any, title: string, desc: string, link: string, color: string }) => (
  <Link to={link} className="glass-card p-10 rounded-[2.5rem] space-y-6 group">
    <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:scale-110 ${color}`}>
      <Icon className="w-7 h-7" />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-space font-bold text-white">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
    <div className="pt-4 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
       <span>Initialize Studio</span>
       <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

export default Home;
