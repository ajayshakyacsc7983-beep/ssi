
import React, { useState, useRef } from 'react';
import { Download, Type, Upload, Wand2, Sparkles, AlertCircle, RefreshCcw, Layout as LayoutIcon, Maximize, MousePointer2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const POSITIONS = [
  { id: 'top-left', label: 'Top Left' }, { id: 'top-center', label: 'Top Center' }, { id: 'top-right', label: 'Top Right' },
  { id: 'middle-left', label: 'Middle Left' }, { id: 'center', label: 'Center' }, { id: 'middle-right', label: 'Middle Right' },
  { id: 'bottom-left', label: 'Bottom Left' }, { id: 'bottom-center', label: 'Bottom Center' }, { id: 'bottom-right', label: 'Bottom Right' }
];

const ThumbnailMaker: React.FC = () => {
  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTextOverlay, setAiTextOverlay] = useState('EPIC REVEAL');
  const [textSize, setTextSize] = useState(70); // 1-100 scale for prompt weight
  const [textPosition, setTextPosition] = useState('bottom-left');
  const [subjectImage, setSubjectImage] = useState<string | null>(null);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const aiFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSubjectImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSizingDescriptor = (val: number) => {
    if (val < 30) return "small and subtle";
    if (val < 60) return "medium-sized and balanced";
    if (val < 85) return "large, bold, and prominent";
    return "massive, cinematic, and screen-filling";
  };

  const generateAIThumbnail = async () => {
    if (!aiPrompt.trim() && !subjectImage) {
      setError("Please provide a topic or a reference image.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const sizeDesc = getSizingDescriptor(textSize);
      const positionDesc = POSITIONS.find(p => p.id === textPosition)?.label || "bottom left";
      
      const basePrompt = `Professional YouTube thumbnail. 
        Topic: ${aiPrompt}. 
        Style: High-contrast, vibrant, click-bait aesthetic with cinematic lighting. 
        CRITICAL TEXT INSTRUCTION: Render the text "${aiTextOverlay}" in the ${positionDesc} area of the frame. 
        The text must be ${sizeDesc}, using a thick, sans-serif font with a heavy drop shadow for maximum readability. 
        Ensure no other text is in the image.`;

      let contents: any;
      if (subjectImage) {
        const base64Data = subjectImage.split(',')[1];
        contents = {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: `Focus on the subject in this image. ${basePrompt}` }
          ]
        };
      } else {
        contents = basePrompt;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: contents,
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      let imageData = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageData) {
        setGeneratedThumbnail(imageData);
      } else {
        throw new Error("AI generated the scene but didn't return an image. Try a more descriptive prompt.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during generation.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedThumbnail) return;
    const link = document.createElement('a');
    link.href = generatedThumbnail;
    link.download = `visionai-pro-thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-space font-extrabold mb-4">
          AI <span className="gradient-text">Thumbnail Studio</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Generate high-conversion thumbnails by describing your scene and positioning your headline with pixel-perfect AI intent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Control Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-8">
            {/* Topic Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                Video Topic / Scene
              </label>
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-fuchsia-500 transition-all text-white placeholder:text-slate-700 resize-none shadow-inner"
                placeholder="A futuristic gamer room with blue neon..."
              />
            </div>

            {/* Headline Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-cyan-400" />
                Headline Text
              </label>
              <input 
                type="text" 
                value={aiTextOverlay}
                onChange={(e) => setAiTextOverlay(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-cyan-500 transition-all text-white shadow-inner"
                placeholder="What should the text say?"
              />
            </div>

            {/* Position Selection */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <MousePointer2 className="w-3.5 h-3.5 text-indigo-400" />
                Text Position
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
                {POSITIONS.map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setTextPosition(pos.id)}
                    className={`aspect-square rounded-lg transition-all flex items-center justify-center group ${
                      textPosition === pos.id 
                      ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20' 
                      : 'bg-slate-900 text-slate-600 hover:text-slate-400 hover:bg-slate-800'
                    }`}
                    title={pos.label}
                  >
                    <div className={`w-2 h-2 rounded-full ${textPosition === pos.id ? 'bg-white' : 'bg-current opacity-30 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Maximize className="w-3.5 h-3.5 text-orange-400" />
                  Text Prominence
                </label>
                <span className="text-[10px] font-black text-fuchsia-400 uppercase">{getSizingDescriptor(textSize)}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={textSize}
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
              />
            </div>

            {/* Optional Image */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Reference Subject</label>
              <div 
                onClick={() => aiFileInputRef.current?.click()}
                className={`group h-24 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                  subjectImage ? 'border-fuchsia-500/50 bg-fuchsia-500/5' : 'border-slate-800 hover:border-slate-600 hover:bg-slate-900/50'
                }`}
              >
                {subjectImage ? (
                  <div className="flex items-center gap-4 px-4 w-full">
                    <img src={subjectImage} className="w-12 h-12 object-cover rounded-xl border border-fuchsia-500/30 shadow-lg" alt="Ref" />
                    <div className="flex-grow">
                      <p className="text-[10px] font-bold text-slate-300">Image Loaded</p>
                      <button onClick={(e) => { e.stopPropagation(); setSubjectImage(null); }} className="text-[10px] text-fuchsia-400 hover:underline">Remove</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-slate-600 mb-1 group-hover:text-fuchsia-400 transition-colors" />
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Upload Reference</span>
                  </>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={generateAIThumbnail}
              disabled={loading}
              className="w-full py-5 px-4 bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-purple-600 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 text-white rounded-[1.5rem] text-sm font-black flex items-center justify-center space-x-3 transition-all shadow-2xl shadow-fuchsia-500/25 active:scale-95 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="tracking-widest">BUILD THUMBNAIL</span>
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-400 font-medium leading-relaxed">{error}</p>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-grow">
          <div className="relative group">
            <div className={`absolute -inset-2 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
            
            <div className="relative glass rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 bg-slate-950/50">
              {/* Header */}
              <div className="bg-slate-900/60 px-8 py-5 flex items-center justify-between border-b border-slate-800/50">
                <div className="flex items-center space-x-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-800"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Canvas Output: 16:9 Ultra-HD</span>
                </div>
                {generatedThumbnail && (
                  <button 
                    onClick={handleDownload}
                    className="flex items-center space-x-2 bg-white text-slate-950 hover:bg-slate-100 px-6 py-2.5 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span>EXPORT AS PNG</span>
                  </button>
                )}
              </div>

              {/* Viewport */}
              <div className="aspect-video relative flex items-center justify-center bg-[#010101]">
                {generatedThumbnail ? (
                  <img src={generatedThumbnail} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="Generated result" />
                ) : loading ? (
                  <div className="flex flex-col items-center justify-center space-y-8 p-12 text-center">
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-fuchsia-500/10 border-t-fuchsia-500 rounded-full animate-spin"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-fuchsia-400 animate-pulse" />
                    </div>
                    <div className="space-y-3">
                      <p className="font-space font-black text-3xl text-white tracking-tight">Designing Layout...</p>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">Gemini is rendering shadows, text outlines, and cinematic lighting based on your specs.</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => aiPrompt ? generateAIThumbnail() : null}
                    className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-400 cursor-pointer transition-all duration-500 group/empty"
                  >
                    <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mb-6 group-hover/empty:scale-110 group-hover/empty:bg-slate-800 transition-all border border-slate-800">
                      <Wand2 className="w-10 h-10 text-slate-700 group-hover/empty:text-fuchsia-500 transition-colors animate-float" />
                    </div>
                    <p className="font-space font-bold text-xl uppercase tracking-widest opacity-50">Empty Studio</p>
                    <p className="text-xs mt-3 opacity-30 font-medium">Click "Build Thumbnail" to begin rendering</p>
                  </div>
                )}

                {/* Badges */}
                {generatedThumbnail && !loading && (
                   <div className="absolute top-8 left-8 flex flex-col gap-2">
                    <div className="glass px-4 py-2 rounded-xl text-[10px] font-black text-cyan-400 border border-cyan-500/30 uppercase tracking-widest shadow-2xl backdrop-blur-xl">VisionAI v3.0</div>
                    <div className="glass px-4 py-2 rounded-xl text-[10px] font-black text-fuchsia-400 border border-fuchsia-500/30 uppercase tracking-widest shadow-2xl backdrop-blur-xl">AI-Native Layout</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="glass p-6 rounded-3xl border border-slate-800/50 hover:bg-white/5 transition-all">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                  <LayoutIcon className="w-5 h-5 text-cyan-400"/>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">Rule of Thirds</h4>
                <p className="text-xs text-slate-500 leading-relaxed">The AI intelligently balances the text with your subject for a cinematic look.</p>
             </div>
             <div className="glass p-6 rounded-3xl border border-slate-800/50 hover:bg-white/5 transition-all">
                <div className="w-10 h-10 bg-fuchsia-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Maximize className="w-5 h-5 text-fuchsia-400"/>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">High Contrast</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Automatic shadow casting ensures your headline pops even on busy backgrounds.</p>
             </div>
             <div className="glass p-6 rounded-3xl border border-slate-800/50 hover:bg-white/5 transition-all">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-400"/>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">CTR Optimized</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Trained on thousands of top-performing thumbnails for maximum engagement.</p>
             </div>
          </div>
        </div>
      </div>

      <input 
        type="file" 
        ref={aiFileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
        accept="image/*" 
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ThumbnailMaker;
