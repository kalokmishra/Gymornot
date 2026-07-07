"use client";

import React, { useState } from "react";

export default function ResignationGenerator() {
  const [gymName, setGymName] = useState("");
  const [fee, setFee] = useState("");
  const [reason, setReason] = useState("The music is too loud.");
  const [copied, setCopied] = useState(false);

  const finalGymName = gymName.trim() || "[Insert Gym Name]";
  const finalFee = fee.trim() || "[$XX]";

  const letterText = `To: ${finalGymName} Management
Subject: Immediate Membership Termination

To Whom It May Concern,

Please accept this as formal notice that I am terminating my membership, effective immediately.

For the past several months, I have been generously donating ${finalFee} to your facility. However, it has come to my attention that ${reason.toLowerCase()}

I will be replacing this membership with a 15-minute daily walk in my neighborhood, which is absolutely free and involves 100% less unsolicited fitness advice.

Do not contact me with counter-offers.

Regards,
A Free Human`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`I just fired my gym using the GymOrNot Resignation Generator because ${reason.toLowerCase()} Claim your freedom: https://gymornot.com/dont-wanna-gym`);

  return (
    <section className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
      {/* Form Input */}
      <div className="border border-hairline bg-surface p-6 sm:p-8 space-y-6 rounded-2xl">
        <h2 className="font-display font-black text-2xl uppercase border-b border-hairline pb-4 text-ink">
          Resignation Letter Generator
        </h2>
        <p className="text-sm font-bold text-ink-dim uppercase">Fill this out. Reclaim your time and money.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-ink-dim">Name of the Trap (Gym Name)</label>
            <input 
              type="text" 
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              placeholder="e.g. Mega Fitplex" 
              className="bg-void border border-hairline w-full p-3 font-body font-bold text-ink rounded-xl focus:outline-none focus:border-brand-lime" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-ink-dim">Monthly Donation (Fee)</label>
            <input 
              type="text" 
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="e.g. $89" 
              className="bg-void border border-hairline w-full p-3 font-body font-bold text-ink rounded-xl focus:outline-none focus:border-brand-lime" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-ink-dim">Reason for Leaving</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-void border border-hairline w-full p-3 font-body font-bold text-ink rounded-xl focus:outline-none focus:border-brand-lime"
            >
              <option>The music is too loud.</option>
              <option>Someone grunted too close to my ear.</option>
              <option>I'm tired of paying to stand in line to touch cold metal.</option>
              <option>Existential dread from the locker room scent.</option>
              <option>The sales reps won't stop texting me like an ex.</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Letter Output */}
      <div className="border border-hairline bg-surface p-6 sm:p-8 rounded-2xl">
        <div className="flex justify-between items-center border-b border-hairline pb-4 mb-6">
          <h2 className="font-display font-black text-xl uppercase text-ink">Official Notice</h2>
          <span className="text-xs font-bold bg-[#f4f4f0] text-black px-2 py-1 rounded-md">DRAFT</span>
        </div>
        
        <div className="font-mono text-sm leading-relaxed space-y-4 bg-[#f4f4f0] text-[#111111] p-6 border border-[#d4d4d0] border-dashed rounded-xl">
          <p><strong>To:</strong> {finalGymName} Management</p>
          <p><strong>Subject:</strong> Immediate Membership Termination</p>
          <p>To Whom It May Concern,</p>
          <p>
            Please accept this as formal notice that I am terminating my membership, effective immediately. 
          </p>
          <p>
            For the past several months, I have been generously donating <strong>{finalFee}</strong> to your facility. However, it has come to my attention that <em>{reason.toLowerCase()}</em> 
          </p>
          <p>
            I will be replacing this membership with a 15-minute daily walk in my neighborhood, which is absolutely free and involves 100% less unsolicited fitness advice.
          </p>
          <p>Do not contact me with counter-offers.</p>
          <p>Regards,<br/>A Free Human</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleCopy}
            className="bg-brand-lime text-void font-display font-black text-xs uppercase px-4 py-3 flex-1 hover:bg-ink hover:text-void rounded-full transition-all"
          >
            {copied ? "✓ Copied!" : "Copy Letter"}
          </button>
          <a 
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brand-lime hover:bg-brand-lime/5 px-4 py-3 flex-1 text-xs font-display font-black uppercase text-brand-lime text-center rounded-full transition-all"
          >
            Share on X
          </a>
        </div>
      </div>
    </section>
  );
}
