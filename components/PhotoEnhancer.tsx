
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, AlertCircle, RefreshCcw, Download, Wand2, Key, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ComparisonSlider from './ComparisonSlider';

const PhotoEnhancer: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target?.result as string);
        setEnhancedUrl(null);
        setError(null);
      };
      reader.readAsDataURL(selected);
    }
  };

  const processImage = async () => {
    if (!file) return;
    
    setProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const base64Data = file.split(',')[1];
      const mimeType = file.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: "Professional Airbrush Retouching: Perform high-end skin smoothing while retaining pore detail, remove blemishes, whiten teeth naturally, brighten eyes, and optimize cinematic lighting. Enhance the resolution to 4K clarity. Return only the retouched image.",
            },
          ],
        },
      });

      let imageData = '';
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageData = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageData) {
        setEnhancedUrl(imageData);
      } else {
        throw new Error("No image was generated. Please check your image content or prompt.");
      }
    } catch (err: any) {
      console.error('Aura Enhancement Error:', err);
      if (err.message?.includes("403")) {
        setError("Permission Denied (403): Your API key might not have access to 'gemini-2.5-flash-image' or your region is restricted. Check your Google AI Studio project settings.");
      } else {
        setError(err.message || "An error occurred during enhancement.");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 pb-32 lg:pb-16">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl md:text-6xl font-space font-black tracking-tight uppercase">Airbrush <span className="text-cyan-400">HD</span></h2>
        <p className="text-slate-500 font-medium tracking-wide">Elite skin retouching & neural reconstruction.</p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group relative h-[500px] border-2 border-dashed border-white/5 rounded-[3.5rem] flex flex-col items-center justify-center space-y-8 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer shadow-3xl bg-slate-950/20"
        >
          <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 group-hover:border-cyan-500/50">
            <Upload className="w-10 h-10 text-slate-600 group-hover:text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Upload Portrait</p>
            <p className="text-slate-600 mt-2 uppercase text-[10px] font-black tracking-[0.3em]">Neural AI Reconstruction Engine</p>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="aura-card p-3 rounded-[3.5rem] overflow-hidden shadow-3xl">
            {enhancedUrl ? (
              <ComparisonSlider beforeImg={file} afterImg={enhancedUrl} />
            ) : (
              <div className="relative aspect-video bg-slate-950 rounded-[2.5rem] overflow-hidden">
                <img src={file} className={`w-full h-full object-cover ${processing ? 'blur-2xl opacity-40 scale-110' : 'opacity-60'}`} alt="Source" />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                  {processing ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-20 h-20 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
                      <div className="text-center">
                        <p className="font-space font-black text-3xl text-white uppercase tracking-tighter">Retouching Active</p>
                        <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse mt-3">Analyzing Facial Geometry</p>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={processImage}
                      className="aura-button px-14 py-6 text-white rounded-3xl font-black text-lg flex items-center space-x-4 transition-all hover:scale-105 active:scale-95 shadow-3xl"
                    >
                      <Wand2 className="w-6 h-6" />
                      <span>INITIALIZE AIRBRUSH</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2.5rem] flex items-start gap-6 animate-in zoom-in duration-300">
              <AlertCircle className="w-8 h-8 text-red-400 shrink-0 mt-1" />
              <div className="space-y-3">
                <p className="text-lg font-bold text-red-400 leading-tight">Initialization Failed</p>
                <p className="text-sm text-red-400/70 font-medium leading-relaxed">{error}</p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-red-500 px-4 py-2 rounded-xl mt-4">
                  <Key className="w-3 h-3" /> Check Project Permissions
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass p-8 rounded-[2.5rem]">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl overflow-hidden border border-white/5 shadow-xl">
                <img src={file} className="w-full h-full object-cover" alt="Source thumb" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">Image Source</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ready for High-End Retouch</p>
              </div>
            </div>

            <div className="flex space-x-4 w-full md:w-auto">
              <button 
                onClick={() => { setFile(null); setEnhancedUrl(null); setError(null); }}
                className="flex-grow md:flex-none glass px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                <RefreshCcw className="w-4 h-4 mr-2 inline" /> Reset
              </button>
              {enhancedUrl && (
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = enhancedUrl;
                    link.download = `aura-retouch-${Date.now()}.png`;
                    link.click();
                  }}
                  className="flex-grow md:flex-none bg-white text-slate-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95"
                >
                  <Download className="w-4 h-4 mr-2 inline" /> Export HD
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    </div>
  );
};

export default PhotoEnhancer;
