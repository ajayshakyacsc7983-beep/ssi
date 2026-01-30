
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Check, AlertCircle, RefreshCcw, Download, Wand2 } from 'lucide-react';
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
              text: "Perform professional high-end retouching on this photo. Apply neural noise reduction, upscale the clarity, and use 'airbrush' skin-smoothing techniques while preserving natural texture. Fix lighting imbalances, sharpen eyes and hair details, and ensure a cinematic, high-fashion finish. Return only the enhanced image.",
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
        throw new Error("The AI didn't return an image. It might have returned text feedback instead.");
      }
    } catch (err: any) {
      console.error('Enhancement error:', err);
      setError(err.message || "Failed to enhance the photo. Please check your API key or try a different image.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadEnhanced = () => {
    if (!enhancedUrl) return;
    const link = document.createElement('a');
    link.href = enhancedUrl;
    link.download = `visionai-enhanced-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24 lg:pb-12">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-5xl font-space font-black tracking-tight uppercase">Neural <span className="text-indigo-400">Enhancer</span></h2>
        <p className="text-slate-400">Professional Airbrush retouching & 4K upscaling powered by Gemini Vision.</p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group relative h-96 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center space-y-6 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer shadow-2xl bg-slate-900/20"
        >
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-800 group-hover:border-cyan-500/50">
            <Upload className="w-10 h-10 text-slate-500 group-hover:text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Upload a photo to enhance</p>
            <p className="text-slate-500 mt-1 uppercase text-xs font-black tracking-widest">Neural details reconstructor</p>
          </div>
          <button className="px-8 py-3 glass rounded-xl text-xs font-black uppercase tracking-widest text-white group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
            Select Photo
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative rounded-[2.5rem] overflow-hidden glass border border-slate-800 p-2 shadow-2xl">
            {enhancedUrl ? (
              <ComparisonSlider 
                beforeImg={file} 
                afterImg={enhancedUrl} 
              />
            ) : (
              <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                <img src={file} className={`w-full h-full object-cover ${processing ? 'blur-md opacity-50' : 'opacity-80'}`} alt="Source" />
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-6">
                  {processing ? (
                    <div className="flex flex-col items-center space-y-4 text-center px-12">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-space font-black text-2xl text-white uppercase tracking-tighter">Retouching Pixels...</p>
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse mt-2">Neural Airbrush Active</p>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={processImage}
                      className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white rounded-2xl font-black text-lg flex items-center space-x-3 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/40"
                    >
                      <Wand2 className="w-6 h-6" />
                      <span>ENHANCE HD</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start space-x-4 text-red-400">
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="font-medium text-sm leading-relaxed">{error}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <img src={file} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">Source Image</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Ready for Pro Enhancing</p>
              </div>
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <button 
                onClick={() => { setFile(null); setEnhancedUrl(null); setError(null); }}
                className="flex-grow md:flex-none glass px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 flex items-center justify-center space-x-2 text-slate-300 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              {enhancedUrl && (
                <button 
                  onClick={downloadEnhanced}
                  className="flex-grow md:flex-none bg-white text-slate-950 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download HD</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
};

export default PhotoEnhancer;
