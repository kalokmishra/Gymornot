"use client";

import React, { useState } from "react";

const TEMPLATE_PRESETS = [
  {
    label: "— Select a Template Preset —",
    value: "",
    body: null,
  },
  {
    label: "The Philosophical Departure",
    value: "philosophical",
    body: `I have realized that gravity is free, and my couch exerts a much stronger gravitational pull than your dumbbell rack. Physics, not personal failing, compels my departure.`,
  },
  {
    label: "The Asset Liquidation",
    value: "liquidation",
    body: `I am redirecting my monthly membership fee away from your unused stair-masters and into streaming services. This will result in a much higher return on my physical comfort.`,
  },
  {
    label: "The Legally Binding Sloth",
    value: "sloth",
    body: `I am legally adopting my bed and must remain within 10 feet of it at all times for custody reasons. My legal team has advised that a gym membership would constitute a breach of this arrangement.`,
  },
];

export default function ResignationGenerator() {
  const [gymName, setGymName] = useState("");
  const [fee, setFee] = useState("");
  const [reason, setReason] = useState("The music is too loud.");
  const [templateKey, setTemplateKey] = useState("");
  const [copied, setCopied] = useState(false);

  const finalGymName = gymName.trim() || "[Insert Gym Name]";
  const finalFee = fee.trim() || "[$XX]";

  const selectedTemplate = TEMPLATE_PRESETS.find((t) => t.value === templateKey);
  const letterBody = selectedTemplate?.body
    ? selectedTemplate.body
    : `it has come to my attention that ${reason.toLowerCase()}

I will be replacing this membership with a 15-minute daily walk in my neighborhood, which is absolutely free and involves 100% less unsolicited fitness advice.`;

  const letterText = `To: ${finalGymName} Management
Subject: Immediate Membership Termination

To Whom It May Concern,

Please accept this as formal notice that I am terminating my membership, effective immediately.

For the past several months, I have been generously donating ${finalFee} to your facility. ${letterBody}

Do not contact me with counter-offers.

Regards,
A Free Human`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(
    `I just fired my gym using the GymOrNot Resignation Generator. ${selectedTemplate?.body ? `"${selectedTemplate.body.slice(0, 80)}..."` : `Because ${reason.toLowerCase()}`} Claim your freedom: https://gymornot.com/dont-wanna-gym`
  );

  return (
    <section className="border border-zinc-800 bg-void rounded-none">
      {/* Section header */}
      <div className="border-b border-zinc-800 px-6 sm:px-8 py-5">
        <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-2">
          RESIGNATION PROTOCOL
        </p>
        <h2 className="font-display font-black text-2xl uppercase text-ink">
          Resignation Letter Generator
        </h2>
        <p className="mt-2 font-mono text-xs text-zinc-500">
          Fill this out. Reclaim your time and money.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Form inputs */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 px-6 sm:px-8 py-8 space-y-0">
          {[
            {
              label: "NAME OF THE TRAP (GYM NAME)",
              type: "text",
              value: gymName,
              onChange: (v: string) => setGymName(v),
              placeholder: "e.g. Mega Fitplex",
            },
            {
              label: "MONTHLY DONATION (FEE)",
              type: "text",
              value: fee,
              onChange: (v: string) => setFee(v),
              placeholder: "e.g. $89",
            },
          ].map((field, i) => (
            <div key={i} className="border-b border-zinc-800 py-5">
              <label className="block font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3">
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="bg-void border border-zinc-700 w-full px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
          ))}

          {/* Template Presets Dropdown */}
          <div className="border-b border-zinc-800 py-5">
            <label className="block font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3">
              TEMPLATE PRESET (PICK YOUR WEAPON)
            </label>
            <select
              value={templateKey}
              onChange={(e) => setTemplateKey(e.target.value)}
              className="bg-void border border-zinc-700 w-full px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none"
            >
              {TEMPLATE_PRESETS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {templateKey && (
              <p className="font-mono text-[10px] text-brand-lime mt-2 uppercase tracking-widest">
                ✓ Template active — reason field below is overridden
              </p>
            )}
          </div>

          <div className="py-5">
            <label className="block font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3">
              REASON FOR LEAVING {templateKey && <span className="text-zinc-700">(overridden by template)</span>}
            </label>
            <select
              value={reason}
              onChange={(e) => { setReason(e.target.value); setTemplateKey(""); }}
              disabled={!!templateKey}
              className="bg-void border border-zinc-700 w-full px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option>The music is too loud.</option>
              <option>Someone grunted too close to my ear.</option>
              <option>I'm tired of paying to stand in line to touch cold metal.</option>
              <option>Existential dread from the locker room scent.</option>
              <option>The sales reps won't stop texting me like an ex.</option>
            </select>
          </div>
        </div>

        {/* Generated letter */}
        <div className="px-6 sm:px-8 py-8">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">OFFICIAL NOTICE</h2>
            <span className="font-mono text-[9px] bg-zinc-800 text-zinc-400 px-2 py-1 tracking-widest uppercase">DRAFT</span>
          </div>

          {/* Letter paper */}
          <div className="border border-dashed border-zinc-600 bg-zinc-900 font-mono text-sm leading-relaxed space-y-4 text-zinc-300 p-6">
            <p><span className="text-zinc-600">To:</span> {finalGymName} Management</p>
            <p><span className="text-zinc-600">Subject:</span> Immediate Membership Termination</p>
            <p className="text-zinc-500">To Whom It May Concern,</p>
            <p>Please accept this as formal notice that I am terminating my membership, effective immediately.</p>
            <p>
              For the past several months, I have been generously donating{" "}
              <span className="text-brand-red font-bold">{finalFee}</span> to your facility.{" "}
              {selectedTemplate?.body ? (
                <span className="text-zinc-300">{selectedTemplate.body}</span>
              ) : (
                <>
                  However, it has come to my attention that{" "}
                  <span className="text-zinc-400 italic">{reason.toLowerCase()}</span>
                </>
              )}
            </p>
            {!selectedTemplate?.body && (
              <p>I will be replacing this membership with a 15-minute daily walk in my neighborhood, which is absolutely free and involves 100% less unsolicited fitness advice.</p>
            )}
            <p className="text-zinc-400">Do not contact me with counter-offers.</p>
            <p className="text-zinc-500">Regards,<br />A Free Human</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="bg-brand-lime text-void font-display font-black text-xs uppercase px-5 py-3 flex-1 hover:bg-white transition-colors rounded-none"
            >
              {copied ? "✓ COPIED" : "COPY LETTER"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-700 hover:border-zinc-400 px-5 py-3 flex-1 font-mono text-xs uppercase text-zinc-400 hover:text-ink text-center transition-colors rounded-none"
            >
              Share on X →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
