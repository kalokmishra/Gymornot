"use client";

import { useState, useEffect } from "react";

export default function ShareCard({ archetypeId, headline }: { archetypeId: string, headline: string }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const badgeMap: Record<string, string> = {
    "january-idealist": "/january_idealist_badge.png",
    "closet-athlete": "/closet_athlete_badge.png",
    "gym-crusader": "/gym_crusader_badge.png",
    "smoothie-socialite": "/smoothie_socialite_badge.png"
  };

  const badgeUrl = badgeMap[archetypeId] || badgeMap["gym-crusader"];
  const shareText = encodeURIComponent(headline + " See your GymOrNot diagnosis: https://gymornot.com");

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem(`gymornot_seen_popup_${archetypeId}`);
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem(`gymornot_seen_popup_${archetypeId}`, "true");
      
      // Start fading out after 1.8s
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 1800);

      // Remove from DOM after 2.3s (0.5s animation duration)
      const removeTimer = setTimeout(() => {
        setShowPopup(false);
      }, 2300);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [archetypeId]);

  return (
    <>
      {showPopup && (
        <div 
          className={`fixed inset-0 bg-void/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center pointer-events-none ${
            isFadingOut 
              ? "animate-[popupFadeOut_0.5s_ease-in-out_forwards]" 
              : "animate-[popupFadeIn_0.2s_ease-out_forwards]"
          }`}
        >
          <div 
            className={`text-center space-y-6 max-w-sm px-6 ${
              isFadingOut 
                ? "animate-[popupZoomOut_0.5s_ease-in-out_forwards]" 
                : "animate-[popupZoomIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            }`}
          >
            <div className="w-[240px] h-[240px] border-4 border-brand-lime bg-surface-raised mx-auto overflow-hidden rounded-none shadow-[0_0_50px_rgba(212,255,0,0.15)]">
              <img src={badgeUrl} alt="Archetype Badge" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-brand-red tracking-widest uppercase">Diagnosis Unlocked</span>
              <h2 className="font-display font-black text-3xl text-brand-lime uppercase tracking-tight mt-1 leading-none">{headline}</h2>
            </div>
          </div>
        </div>
      )}

      <div className="border border-zinc-800 bg-void p-6 sm:p-8 rounded-none">
        <h3 className="font-mono text-[10px] text-brand-red tracking-widest uppercase mb-4">Roast a Friend</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-[150px] h-[150px] shrink-0 border border-zinc-800 bg-zinc-950 overflow-hidden rounded-none">
            <img src={badgeUrl} alt="Archetype Badge" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-mono text-xs text-zinc-500 mb-4 leading-relaxed">Share your diagnosis and challenge your friends to face their own fitness reality.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}`}
                target="_blank"
                rel="noreferrer"
                className="border border-[#1DA1F2] hover:bg-[#1DA1F2]/5 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1DA1F2] text-center rounded-none transition-all"
              >
                Share on X →
              </a>
              <a
                href={`sms:?&body=${shareText}`}
                className="border border-brand-lime hover:bg-brand-lime/5 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-brand-lime text-center rounded-none transition-all"
              >
                Text a Friend →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes popupZoomIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popupZoomOut {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
    </>
  );
}
