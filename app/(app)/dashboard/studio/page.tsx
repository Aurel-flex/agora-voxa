"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import pour gérer l'image proprement

type StudioState = "SETUP" | "RECORDING" | "ANALYZING" | "RESULTS";

const SPEECH_TEXT = `Mesdames et messieurs, on dit souvent que les mots s'envolent, mais que les écrits restent. 

Je crois tout le contraire. 

Un mot juste, prononcé au bon moment, avec la bonne intonation, a le pouvoir de changer le cours de l'histoire. Regardez autour de vous. Les plus grandes révolutions, les plus belles avancées humaines n'ont pas commencé par des armes, mais par des voix. 

Des voix qui ont osé s'élever contre l'injustice. Des voix qui ont su rassembler. 

Aujourd'hui, je ne vous demande pas d'être parfaits. Je vous demande d'être authentiques. Laissez résonner votre vérité. 

Car c'est dans la sincérité de votre voix que se trouve votre plus grande force. 

Je vous remercie.`;

export default function StudioPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<StudioState>("SETUP");
  const [recordTime, setRecordTime] = useState(0);
  const [mode, setMode] = useState<"VIDEO" | "AUDIO">("VIDEO");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const prompterRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [hasStartedRecording, setHasStartedRecording] = useState(false);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "RECORDING" && isPlaying) {
      interval = setInterval(() => setRecordTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, isPlaying]);

  useEffect(() => {
    if (step === "RECORDING" && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [step, stream]);

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    if (isPlaying && prompterRef.current) {
      scrollInterval = setInterval(() => {
        if (prompterRef.current) {
          prompterRef.current.scrollTop += 1;
        }
      }, 15); 
    }
    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (step === "ANALYZING") {
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        setVideoUrl(URL.createObjectURL(blob));
      }
      const timer = setTimeout(() => setStep("RESULTS"), 4000);
      return () => clearTimeout(timer);
    }
  }, [step, recordedChunks]);

  const togglePlayPause = () => {
    if (!hasStartedRecording) {
      setHasStartedRecording(true);
      setIsPlaying(true);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "inactive") {
        mediaRecorderRef.current.start();
      }
    } else if (isPlaying) {
      setIsPlaying(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
        mediaRecorderRef.current.resume();
      }
    }
  };

  const startCameraAndRecord = async (selectedMode: "VIDEO" | "AUDIO") => {
    setMode(selectedMode);
    setRecordedChunks([]);
    setVideoUrl(null);
    setRecordTime(0);
    setHasStartedRecording(false); 
    setIsPlaying(false); 

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: selectedMode === "VIDEO" ? { facingMode: { ideal: "user" } } : false, 
        audio: true 
      });

      setStream(mediaStream);
      setStep("RECORDING");

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) setRecordedChunks((prev) => [...prev, event.data]);
      };

      mediaRecorder.onstop = () => {
        mediaStream.getTracks().forEach(track => track.stop());
      };

    } catch (err) {
      console.error("Erreur caméra/micro", err);
      alert("Veuillez autoriser l'accès à la caméra et au micro.");
      setStep("SETUP");
    }
  };

  const stopRecording = () => {
    setIsPlaying(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setTimeout(() => setStep("ANALYZING"), 500);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-soleil">
      
      <header className="p-4 md:p-6 flex items-center justify-between border-b border-slate-800 z-50 bg-slate-900">
        <button 
          onClick={() => {
            if (stream) stream.getTracks().forEach(track => track.stop());
            router.back();
          }} 
          className="text-slate-400 hover:text-white font-bold flex items-center gap-2"
        >
          ← Quitter
        </button>
        <div className="flex items-center gap-2">
          <span className="bg-[#662483] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">PRO</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-4">
        
        {step === "SETUP" && (
          <div className="max-w-2xl w-full p-6 space-y-8 animate-in zoom-in-95">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-baloo font-extrabold text-white mb-4">Votre scène vous attend.</h1>
              <p className="text-slate-400 text-lg">Athéna analysera votre regard, votre voix et vos tics de langage.</p>
            </div>

            <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <h2 className="text-xl font-baloo font-bold text-white mb-4">📜 Défi : Le pouvoir des mots (<span className="text-[#662483]">~50 sec</span>)</h2>
              <p className="text-slate-400 italic mb-8">Un discours vibrant sur l'importance de la voix humaine.</p>
              
              <button 
                onClick={() => startCameraAndRecord("VIDEO")}
                className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white p-6 rounded-2xl flex items-center justify-center gap-4 transition-all hover:border-[#662483] group"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">📷</div>
                <div className="text-left">
                  <div className="font-bold text-lg">Activer la caméra</div>
                  <div className="text-sm text-slate-400">L'enregistrement ne démarrera pas tout de suite</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "RECORDING" && (
          <div className="w-full h-[80vh] md:h-auto md:aspect-video md:max-w-4xl relative bg-black md:rounded-3xl border-0 md:border-4 border-slate-800 overflow-hidden shadow-2xl flex flex-col mx-auto">
            
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] transition-opacity ${!isPlaying ? 'opacity-50' : 'opacity-100'}`} 
            />

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                <div className="bg-black/80 text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xl backdrop-blur-md shadow-2xl border border-slate-700">
                  {!hasStartedRecording ? "PRÊT À ENREGISTRER" : "EN PAUSE"}
                </div>
              </div>
            )}

            <div className="absolute top-0 left-0 w-full h-3/5 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none z-10"></div>
            
            <div 
              ref={prompterRef}
              className="absolute top-0 left-0 w-full h-3/5 overflow-y-auto z-20 px-4 md:px-16 scroll-smooth pb-32"
              style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
            >
              <div className="text-2xl md:text-4xl font-bold text-white leading-relaxed text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pt-10 pb-40 whitespace-pre-line">
                {SPEECH_TEXT}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center gap-6 z-30">
              <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
                <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></div>
                <span className="font-mono text-red-100 font-bold">{formatTime(recordTime)}</span>
              </div>

              <div className="flex items-center gap-4 w-full max-w-sm">
                <button 
                  onClick={togglePlayPause}
                  className={`flex-1 py-4 rounded-2xl font-bold backdrop-blur-md border transition-colors ${
                    !hasStartedRecording 
                      ? 'bg-[#662483] text-white border-white/20 hover:bg-[#4d1b63] shadow-lg'
                      : isPlaying 
                        ? 'bg-white/20 text-white border-white/30 hover:bg-white/30' 
                        : 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30'
                  }`}
                >
                  {!hasStartedRecording ? "▶️ Lancer" : isPlaying ? "⏸️ Pause" : "▶️ Reprendre"}
                </button>

                {hasStartedRecording && (
                  <button 
                    onClick={stopRecording}
                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.5)] shrink-0"
                  >
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {step === "ANALYZING" && (
          <div className="text-center space-y-8 animate-in fade-in">
            {/* 💡 REMPLACEMENT ÉMOJI PAR TA MASCOTTE */}
            <div className="relative w-32 h-32 mx-auto animate-bounce">
              <Image 
                src="/mascotte-athena-reflexion.png" 
                alt="Mascotte Panthère" 
                fill 
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-baloo font-bold text-white mb-2">Athéna analyse votre performance...</h2>
            <p className="text-slate-400">Préparez-vous à recevoir votre feedback personnalisé.</p>
          </div>
        )}

        {step === "RESULTS" && (
          <div className="w-full max-w-5xl p-6 space-y-8 animate-in slide-in-from-bottom-8">
            <div className="flex flex-col items-center text-center gap-4">
               {/* 💡 PETITE PANTHÈRE À CÔTÉ DU SCORE */}
              <div className="w-16 h-16 relative">
                <Image src="/mascotte-athena-applause.png" alt="Panthère" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-baloo font-extrabold text-white">Le retour d'Athéna</h1>
                <p className="text-[#662483] font-baloo font-bold mt-2 text-xl tracking-wide">Score global : 85/100</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm">Votre Performance</h3>
                <div className="aspect-video bg-black rounded-3xl overflow-hidden border-2 border-slate-700 shadow-xl">
                  {videoUrl && <video src={videoUrl} controls className="w-full h-full object-cover" />}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <a href="#" className="bg-black border border-slate-700 hover:border-[#00f2fe] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">TikTok</a>
                  <a href="#" className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90">Instagram</a>
                </div>
              </div>

              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl flex flex-col justify-center">
                <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-6">Analyse détaillée</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-2xl shrink-0">🎵</div>
                    <div>
                      <strong className="text-white text-lg block mb-1">Prosodie & Rythme</strong>
                      <p className="text-slate-400 leading-relaxed font-soleil">Le débit est excellent. Vos silences étaient bien placés.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#662483]/20 text-[#d08df5] rounded-xl flex items-center justify-center text-2xl shrink-0">📝</div>
                    <div>
                      <strong className="text-white text-lg block mb-1">Vocabulaire & Tics</strong>
                      <p className="text-slate-400 leading-relaxed font-soleil">Attention : 2 petits "euh" détectés. Respirez au lieu de combler le vide.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-2xl shrink-0">👁️</div>
                    <div>
                      <strong className="text-white text-lg block mb-1">Posture & Regard</strong>
                      <p className="text-slate-400 leading-relaxed font-soleil">Bon maintien. Veillez à regarder plus souvent l'objectif.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (stream) stream.getTracks().forEach(track => track.stop());
                router.push("/dashboard");
              }} 
              className="mt-8 w-full bg-slate-800 text-white px-8 py-4 rounded-xl font-baloo font-bold hover:bg-slate-700 transition-colors text-lg"
            >
               Terminer la session et retourner à l'Agora
            </button>
          </div>
        )}

      </main>
    </div>
  );
}