import React, { useState, useRef } from 'react';
import { Upload, Play, Film, Sparkles, AlertCircle, RefreshCcw, Download, Info, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const VideoGenerator: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "Analyzing your image details...",
    "Planning camera motion...",
    "Rendering neural frames...",
    "Applying cinematic lighting...",
    "Finalizing pixels...",
    "Almost there! Just a few more seconds..."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = (event) => setSourceImage(event.target?.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim() && !sourceImage) return;

    // Check for API Key selection for Veo models
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Proceeding after openSelectKey as per instructions (assuming success)
      }
    }

    setGenerating(true);
    setError(null);
    setVideoUrl(null);
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      setLoadingStep(steps[stepIndex % steps.length]);
      stepIndex++;
    }, 15000);

    try {
      // Always create a new instance right before the call to get the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const config: any = {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      };

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Cinematic movement, 4k, smooth transition',
        image: sourceImage ? {
          imageBytes: sourceImage.split(',')[1],
          mimeType: sourceImage.split(';')[0].split(':')[1]
        } : undefined,
        config: config
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const fetchUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        const response = await fetch(fetchUrl);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Video generation completed but no link was returned.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("Please ensure you have selected a valid API key with billing enabled for Veo models.");
        // If it fails with entity not found, prompt user to select key again
        if (window.aistudio) window.aistudio.openSelectKey();
      } else {
        setError(err.message || "Something went wrong during video generation.");
      }
    } finally {
      clearInterval(interval);
      setGenerating(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-5xl font-space font-black tracking-tighter uppercase">
          Veo <span className="text-fuchsia-500">Video Engine</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">Transform static images into cinematic sequences with state-of-the-art AI video generation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Film className="w-3.5 h-3.5" /> Starting Frame
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                  sourceImage ? 'border-fuchsia-500/50' : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                }`}
              >
                {sourceImage ? (
                  <img src={sourceImage} className="w-full h-full object-cover" alt="Source" />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Upload Reference Image</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Motion Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A gentle breeze blowing through the trees, camera slowly zooms in..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-fuchsia-500 text-white min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                {(['16:9', '9:16'] as const).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      aspectRatio === ratio 
                      ? 'bg-fuchsia-600 border-fuchsia-500 text-white' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={generateVideo}
              disabled={generating || (!sourceImage && !prompt)}
              className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-2xl font-black text-sm tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-fuchsia-500/20 active:scale-95"
            >
              {generating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              {generating ? 'GENERATING...' : 'CREATE VIDEO'}
            </button>
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-800/50 flex gap-4 items-start">
             <Info className="w-5 h-5 text-indigo-400 shrink-0" />
             <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
               Note: High-quality video generation can take 2-4 minutes. Do not close this tab during processing.
             </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="glass rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-3xl bg-black">
            <div className="aspect-video relative flex items-center justify-center">
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-contain"
                />
              ) : generating ? (
                <div className="flex flex-col items-center space-y-8 px-12 text-center">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-fuchsia-500/10 border-t-fuchsia-500 rounded-full animate-spin"></div>
                    <Film className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-fuchsia-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-space font-black text-2xl text-white tracking-tight">{loadingStep}</p>
                    <div className="flex justify-center gap-1">
                      <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-800 group cursor-default">
                  <Play className="w-20 h-20 mb-6 opacity-20 group-hover:opacity-30 transition-opacity" />
                  <p className="font-space font-black text-xl uppercase tracking-widest opacity-20">No Video Rendered</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
              <div className="space-y-4 w-full">
                <p className="text-sm font-bold text-red-400">{error}</p>
                {error.includes("API key") && (
                   <button 
                    onClick={() => window.aistudio.openSelectKey()}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest"
                  >
                    <Key className="w-3.5 h-3.5" /> Re-select API Key
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    </div>
  );
};

export default VideoGenerator;