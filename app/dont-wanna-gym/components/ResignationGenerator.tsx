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
    <section className="mt-12 grid lg:grid-cols-2 gap-8 items-start font-mono">
      {/* Form Input */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#111] p-6 sm:p-8 space-y-6 transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#111]">
        <h2 className="text-2xl font-bold uppercase border-b-4 border-black pb-4 text-black">
          Resignation Letter Generator
        </h2>
        <p className="text-sm font-bold text-black">Fill this out. Reclaim your time and money.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-black">Name of the Trap (Gym Name)</label>
            <input 
              type="text" 
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              placeholder="e.g. Mega Fitplex" 
              className="bg-[#f9f9f9] border-4 border-black rounded-none w-full p-3 font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-black">Monthly Donation (Fee)</label>
            <input 
              type="text" 
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="e.g. $89" 
              className="bg-[#f9f9f9] border-4 border-black rounded-none w-full p-3 font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-black">Reason for Leaving</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-[#f9f9f9] border-4 border-black rounded-none w-full p-3 font-bold text-black focus:outline-none focus:bg-white focus:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]"
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
      <div className="bg-anti-purple-glow border-4 border-black shadow-[8px_8px_0px_#111] p-6 sm:p-8 transform lg:rotate-1">
        <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6">
          <h2 className="text-xl font-bold uppercase text-black">Official Notice</h2>
          <span className="text-xs font-bold bg-white text-black px-2 py-1 border-2 border-black">DRAFT</span>
        </div>
        
        <div className="font-mono text-sm leading-relaxed space-y-4 bg-white text-black p-6 border-4 border-black border-dashed">
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
            className="bg-white border-4 border-black shadow-[4px_4px_0px_#111] px-4 py-3 flex-1 text-sm font-bold uppercase text-black hover:bg-gray-50 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            {copied ? "✓ Copied!" : "Copy Letter"}
          </button>
          <a 
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] border-4 border-black shadow-[4px_4px_0px_#111] px-4 py-3 flex-1 text-sm font-bold uppercase text-black text-center hover:bg-[#1a91da] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            Share on X
          </a>
        </div>
      </div>
    </section>
  );
}
