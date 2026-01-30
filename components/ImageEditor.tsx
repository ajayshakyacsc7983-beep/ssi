
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, RefreshCcw, Wand2, ArrowRight, Download, AlertCircle, PencilLine } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ImageEditor: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = (event) => setSourceImage(event.target?.result as string);
      reader.readAsDataURL(selected);
      setEditedImage(null);
    }
  };

  const applyEdit = async () => {
    if (!sourceImage || !editPrompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const base64Data = sourceImage.split(',')[1];
      const mimeType = sourceImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: `Modify this image based on the following instruction: "${editPrompt}". Return ONLY the modified image.` }
          ]
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
        setEditedImage(imageData);
      } else {
        throw new Error("The model didn't return an edited image. Try a more specific instruction.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to edit image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-5xl font-space font-black tracking-tight">AI <span className="text-cyan-400">Magic Editor</span></h2>
        <p className="text-slate-400">Describe any change and let VisionAI repaint the reality.</p>
      </div>

      {!sourceImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="max-w-2xl mx-auto h-[400px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center space-y-6 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer group bg-slate-900/10"
        >
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform border border-slate-800 group-hover:border-cyan-500/50">
            <Upload className="w-10 h-10 text-slate-500 group-hover:text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Drop your image here</p>
            <p className="text-slate-500 mt-1 uppercase text-xs font-black tracking-widest">Support PNG, JPG, WEBP</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div className="relative group">
                <div className="absolute top-4 left-4 z-10 glass px-3 py-1.5 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">Original</div>
                <img src={sourceImage} className="w-full aspect-square object-cover rounded-[2.5rem] border border-slate-800" alt="Source" />
             </div>
             
             <div className="relative">
                {editedImage ? (
                  <div className="animate-in zoom-in duration-500">
                    <div className="absolute top-4 left-4 z-10 glass px-3 py-1.5 rounded-lg text-[10px] font-black text-cyan-400 border border-cyan-400/30 uppercase tracking-widest">AI Modified</div>
                    <img src={editedImage} className="w-full aspect-square object-cover rounded-[2.5rem] border border-slate-800 shadow-2xl shadow-cyan-500/10" alt="Result" />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-slate-950 rounded-[2.5rem] border border-slate-900 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    {loading ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
                        <p className="font-bold text-cyan-400 animate-pulse">REPAINTING SCENE...</p>
                      </div>
                    ) : (
                      <div className="opacity-20 space-y-4">
                        <PencilLine className="w-16 h-16 mx-auto" />
                        <p className="font-space font-bold text-lg uppercase tracking-widest">Waiting for Instructions</p>
                      </div>
                    )}
                  </div>
                )}
             </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-60 transition-all duration-500"></div>
              <div className="relative glass p-2 rounded-2xl flex items-center gap-2">
                <input 
                  type="text" 
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="e.g. 'Add a retro 80s synthwave filter' or 'Make it a rainy day'..."
                  className="flex-grow bg-transparent border-none py-4 px-6 text-sm focus:outline-none text-white placeholder:text-slate-700"
                  onKeyDown={(e) => e.key === 'Enter' && applyEdit()}
                />
                <button 
                  onClick={applyEdit}
                  disabled={loading || !editPrompt}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 px-8 py-4 rounded-xl font-black text-xs tracking-widest flex items-center gap-2 transition-all active:scale-95 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  APPLY MAGIC
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['80s Retro Filter', 'Vibrant Sunset', 'Sketch Style', 'Anime Style', 'Cyberpunk', 'Black and White'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setEditPrompt(tag)}
                  className="px-4 py-2 glass rounded-full text-[10px] font-bold text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all uppercase tracking-widest"
                >
                  {tag}
                </button>
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 font-medium leading-relaxed">{error}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-8">
              <button 
                onClick={() => { setSourceImage(null); setEditedImage(null); setEditPrompt(''); }}
                className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Start New Edit
              </button>
              {editedImage && (
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = editedImage;
                    link.download = `visionai-edit-${Date.now()}.png`;
                    link.click();
                  }}
                  className="bg-white text-slate-950 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> Save HD
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

export default ImageEditor;
