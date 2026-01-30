
import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Download, Share2, Search, Wand2, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { GeneratedImage } from '../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastModelResponse, setLastModelResponse] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setLastModelResponse(null);

    try {
      // Create a fresh instance for each request to ensure the latest API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let imageData = '';
      let textContent = '';

      if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
          if (part.inlineData) {
            imageData = `data:image/png;base64,${part.inlineData.data}`;
          } else if (part.text) {
            textContent += part.text;
          }
        }
      }

      if (imageData) {
        const newImage: GeneratedImage = {
          id: Date.now().toString(),
          url: imageData,
          prompt: prompt,
          timestamp: new Date(),
        };
        setHistory(prev => [newImage, ...prev]);
        setPrompt('');
      } else if (textContent) {
        // Handle cases where the model returns an explanation/safety warning instead of an image
        setLastModelResponse(textContent);
        setError("The model returned a text message instead of an image. This often happens if the prompt triggers safety filters or if the model needs to provide more context.");
      } else {
        throw new Error("The model response was empty. Please try a different prompt.");
      }
    } catch (err: any) {
      console.error('VisionAI Generation Error:', err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("The requested model was not found. Please verify your project has access to 'gemini-2.5-flash-image'.");
      } else if (err.message?.includes("API_KEY")) {
        setError("Invalid API Key. Please check your credentials.");
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-space font-extrabold">AI Image <span className="gradient-text">Generator</span></h2>
        <p className="text-slate-400 max-w-xl">Type anything you can imagine and let VisionAI bring it to life in high fidelity.</p>
      </div>

      {/* Search Bar Container */}
      <div className="max-w-3xl mx-auto relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        <div className="relative glass p-2 rounded-2xl flex flex-col md:flex-row items-stretch gap-2">
          <div className="flex-grow flex items-center px-4 space-x-3">
            <Search className="w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic cyber-city with neon rain..."
              className="w-full bg-transparent border-none py-4 text-lg focus:outline-none placeholder:text-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && generateImage()}
            />
          </div>
          <button 
            onClick={generateImage}
            disabled={loading || !prompt}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error & Feedback Area */}
      {error && (
        <div className="max-w-3xl mx-auto mb-8 animate-in fade-in zoom-in duration-300">
          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start space-x-4 text-red-400">
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <p className="font-bold text-base leading-tight">{error}</p>
              {lastModelResponse && (
                <div className="bg-black/40 p-4 rounded-xl text-xs font-mono text-slate-300 border border-red-500/10 whitespace-pre-wrap leading-relaxed">
                  <span className="text-red-400/60 font-bold uppercase block mb-1">Model feedback:</span>
                  {lastModelResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <h3 className="font-space font-bold text-xl flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <span>Generation History</span>
          </h3>
          <span className="text-slate-500 text-sm">{history.length} Creations</span>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {history.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 space-y-4">
            <ImageIcon className="w-16 h-16 opacity-20" />
            <p>Your creative journey starts here. Enter a prompt above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {history.map((img) => (
              <div key={img.id} className="group glass rounded-2xl overflow-hidden border border-slate-800 transition-all hover:border-slate-600 shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-slate-900">
                  <img src={img.url} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end space-y-4">
                    <p className="text-sm text-white line-clamp-2 italic">"{img.prompt}"</p>
                    <div className="flex space-x-2">
                      <a 
                        href={img.url} 
                        download={`vision-ai-${img.id}.png`}
                        className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-white"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-xs font-bold">Save Image</span>
                      </a>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(img.prompt);
                          // Simple alert replacement or toast could go here
                        }}
                        className="p-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg transition-colors text-white"
                        title="Copy Prompt"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="glass rounded-2xl overflow-hidden border border-slate-800 animate-pulse">
    <div className="aspect-square bg-slate-800/30"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-800/50 rounded w-3/4"></div>
      <div className="h-3 bg-slate-800/50 rounded w-1/2"></div>
    </div>
  </div>
);

export default ImageGenerator;
