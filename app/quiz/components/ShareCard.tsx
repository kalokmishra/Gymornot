"use client";

export default function ShareCard({ archetypeId, headline }: { archetypeId: string, headline: string }) {
  const badgeMap: Record<string, string> = {
    "january-idealist": "/january_idealist_badge.png",
    "closet-athlete": "/closet_athlete_badge.png",
    "gym-crusader": "/gym_crusader_badge.png",
    "smoothie-socialite": "/smoothie_socialite_badge.png"
  };

  const badgeUrl = badgeMap[archetypeId] || badgeMap["gym-crusader"];
  const shareText = encodeURIComponent(headline + " See your GymOrNot diagnosis: https://gymornot.com");

  return (
    <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#111827]/80 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
      <h3 className="eyebrow mb-4">Roast a Friend</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-white/10">
          <img src={badgeUrl} alt="Archetype Badge" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-ink-dim mb-4">Share your diagnosis and challenge your friends to face their own fitness reality.</p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noreferrer" className="cta-secondary px-4 py-2 text-sm text-[#1DA1F2] border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/10">
              Share on X
            </a>
            <a href={`sms:?&body=${shareText}`} className="cta-secondary px-4 py-2 text-sm text-gym-green border-gym-green/20 hover:bg-gym-green/10">
              Text a Friend
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
