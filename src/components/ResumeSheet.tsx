import React from "react";
import { ResumeData } from "../types";
import { Sparkles, MapPin, Mail, Phone, Github, Linkedin, Globe, CheckCircle2, Instagram } from "lucide-react";

interface ResumeSheetProps {
  data: ResumeData;
  slashedO: boolean;
  paperStyle: "grid" | "ruled" | "blank";
  clipColor: "black" | "silver" | "gold" | "blue";
  tapeColor: "translucent" | "yellow" | "pink";
  showAnnotations: boolean;
  themeStyle: "desivintage" | "notebook";
  layoutMode: "vertical" | "horizontal";
  primaryFont?: string;
  badgeFont?: string;
}

export const ResumeSheet: React.FC<ResumeSheetProps> = ({
  data,
  slashedO,
  paperStyle,
  clipColor,
  tapeColor,
  showAnnotations,
  themeStyle,
  layoutMode,
  primaryFont = "sans",
  badgeFont = "mono",
}) => {
  // Helper to map a font string to its tailwind CSS font-class
  const getFontClass = (fontKey?: string) => {
    switch (fontKey) {
      case "sans":
        return "font-sans";
      case "display":
        return "font-display";
      case "bricolage":
        return "font-bricolage";
      case "jakarta":
        return "font-jakarta";
      case "serif":
        return "font-serif";
      case "vintage":
        return "font-vintage";
      case "mono":
      default:
        return "font-mono";
    }
  };

  const getPrimaryFontClass = () => getFontClass(primaryFont);
  const getBadgeFontClass = () => getFontClass(badgeFont);

  // Helper to replace O with Ø if option is enabled
  const formatText = (text: string): string => {
    if (!text) return "";
    if (!slashedO) return text;
    // Replace uppercase O and lowercase o with slashed equivalents
    return text
      .replace(/O/g, "Ø")
      .replace(/o/g, "ø")
      .replace(/0/g, "Ø"); // Also replace zeros
  };

  // Get color values based on selection
  const getClipColors = () => {
    switch (clipColor) {
      case "silver":
        return { body: "bg-zinc-400 border-zinc-500", wire: "stroke-zinc-300" };
      case "gold":
        return { body: "bg-amber-600 border-amber-700", wire: "stroke-amber-400" };
      case "blue":
        return { body: "bg-blue-600 border-blue-700", wire: "stroke-blue-400" };
      case "black":
      default:
        return { body: "bg-zinc-900 border-zinc-950", wire: "stroke-zinc-400" };
    }
  };

  const getTapeClass = () => {
    switch (tapeColor) {
      case "yellow":
        return "bg-yellow-100/60 border-yellow-200/40 shadow-sm";
      case "pink":
        return "bg-pink-100/60 border-pink-200/40 shadow-sm";
      case "translucent":
      default:
        return "bg-zinc-100/40 border-zinc-200/20 shadow-sm backdrop-blur-[0.5px]";
    }
  };

  const clipStyle = getClipColors();

  // Create a 15-hole array down the left side
  const holes = Array.from({ length: 18 });

  return (
    <div className={`relative print-container w-full ${layoutMode === "horizontal" ? "max-w-[1150px]" : "max-w-[800px]"} mx-auto select-none transition-all duration-300`}>
      {themeStyle === "desivintage" ? (
        (() => {
          // Extract language group if exists, or fallback
          const languageGroup = data.skills.find(
            (s) => s.category.toUpperCase().includes("LANG")
          );
          const nonLanguageSkills = data.skills.filter(
            (s) => !s.category.toUpperCase().includes("LANG")
          );

          return (
            /* Outer Vintage Indian Folder / Box Cover (Terracotta / Madder Red) */
            <div className="outer-folder relative w-full rounded-2xl bg-[#8c2211] border-4 border-[#b85a3c] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 md:p-4 overflow-hidden">
              
              {/* Saffron & Yellow Retro Indian Stripe Borders (Decorative Side Rails) */}
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[repeating-linear-gradient(45deg,#d97706,#d97706_10px,#b45309_10px,#b45309_20px)] opacity-50 z-0" />
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[repeating-linear-gradient(45deg,#d97706,#d97706_10px,#b45309_10px,#b45309_20px)] opacity-50 z-0" />

              {/* Right-side matchbox striker pad mock */}
              <div className="absolute right-1 top-24 w-1.5 h-44 bg-[repeating-linear-gradient(0deg,#78350f,#78350f_4px,#451a03_4px,#451a03_8px)] rounded-sm border border-[#78350f]/60 opacity-80 z-10" title="striker pad" />

              {/* Inner Cream Paper - Beautiful Double Ruled Indian Vintage Document */}
              <div 
                className={`relative z-10 w-full ${layoutMode === "horizontal" ? "min-h-[780px]" : "min-h-[1150px]"} bg-[#FAF6EB] border-2 border-zinc-900 rounded-lg p-5 md:p-8 text-zinc-900 overflow-hidden print-page`}
                style={{
                  boxShadow: "inset 0 0 40px rgba(184,90,60,0.05)"
                }}
              >
                {/* Elegant Double Ruled Frame */}
                <div className="absolute inset-2 border border-zinc-900/30 pointer-events-none rounded" />
                <div className="absolute inset-2.5 border-2 border-zinc-900/80 pointer-events-none rounded" />

                {/* HANDWRITTEN ANNOTATIONS (if enabled) - beautiful Devanagari calligraphy accents */}
                {showAnnotations && (
                  <>
                    <div className="absolute top-[28%] right-10 font-hand text-lg text-red-700/80 -rotate-6 pointer-events-none select-none">
                      कलाकार // Pure Visual Design!
                    </div>
                    <div className="absolute bottom-[25%] left-8 font-hand text-lg text-amber-700/80 rotate-12 pointer-events-none select-none">
                      ✓ 3D Generalist
                    </div>
                  </>
                )}

                {/* Tilted Retro Inked circular postage stamp: "MUMBAI G.P.O. / DELIVERED" */}
                <div className="absolute top-[22%] right-24 w-24 h-24 rounded-full border-2 border-dashed border-teal-800/40 flex flex-col items-center justify-center font-mono text-[9px] text-teal-800/40 font-bold uppercase rotate-[18deg] pointer-events-none select-none mix-blend-multiply">
                  <div className="border border-teal-800/30 rounded-full w-[84px] h-[84px] flex flex-col items-center justify-center p-1 border-dashed">
                    <span>MUMBAI G.P.O.</span>
                    <span className="text-[12px] my-0.5">2026</span>
                    <span>★ REGISTERED ★</span>
                  </div>
                </div>

                {/* HEADER BLOCK: Majestic Vintage Indian Matchbox & Stamp Label Design */}
                <div className="relative bg-[#8c2211] text-white p-5 md:p-6 print:p-3 rounded-md border-4 print:border-2 border-zinc-950 shadow-[6px_6px_0px_#1A1A1A] print:shadow-[3px_3px_0px_#1A1A1A] mb-6 print:mb-3 overflow-hidden">
                  
                  {/* Decorative matchbox background sunburst / radial lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.15)_0%,transparent_70%)] pointer-events-none" />
                  
                  {/* Inner saffron yellow warning / border label strip */}
                  <div className="absolute inset-1.5 border-2 border-[#D97706]/70 pointer-events-none" />
                  
                  {/* Tiny Matchbox Text Stamps on margins */}
                  <div className="absolute top-2.5 left-4 font-mono text-[8px] text-amber-400 font-bold tracking-widest uppercase select-none opacity-80">
                    ★ THREE STARS ★ REG. TRADE MARK
                  </div>
                  <div className="absolute top-2.5 right-4 font-mono text-[8px] text-amber-400 font-bold tracking-widest uppercase select-none opacity-80">
                    SUPERIOR QUALITY · SAFETY MATCHES
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 print:gap-3 items-center relative z-10 pt-2 print:pt-1">
                    {/* Left block: Matchbox Branding Name & Title */}
                    <div className="md:col-span-7 print:col-span-7 space-y-2.5 print:space-y-1">
                      <div className="inline-block bg-[#D97706] text-black font-mono font-black text-[9px] print:text-[7.5px] uppercase tracking-widest px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] leading-none select-none">
                        MUMBAI, INDIA
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl print:text-3xl font-vintage font-black tracking-tight leading-none uppercase text-white drop-shadow-[3px_3px_0px_#000]">
                        {(() => {
                          const name = data.fullName || "CHIRAG RAI";
                          const parts = name.split(" ");
                          if (parts.length > 1) {
                            return (
                              <>
                                <span className="text-white">{formatText(parts[0])}</span>
                                <span className="text-amber-400 block sm:inline sm:ml-2">{formatText(parts.slice(1).join(" "))}</span>
                              </>
                            );
                          }
                          return <span className="text-white">{formatText(name)}</span>;
                        })()}
                      </h1>

                      {/* Title ribbon styled as a vintage matchbox company name ribbon */}
                      <div className="inline-block bg-white text-zinc-950 border-2 border-zinc-950 px-3 print:px-2 py-1 print:py-0.5 text-xs print:text-[9.5px] font-mono font-extrabold uppercase tracking-wide shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] print:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] select-none">
                        <span className="text-amber-600 mr-1.5">★</span>
                        {formatText(data.title || "VISUAL DESIGNER · MOTION GRAPHICS · UI/UX · 3D GENERALIST")}
                        <span className="text-amber-600 ml-1.5">★</span>
                      </div>

                      {/* Slogan style subtext */}
                      <p className="font-mono text-[9px] print:text-[7.5px] text-amber-200/90 tracking-wider uppercase font-bold">
                        ORIGINAL BRAND OF DESI JUGAAD & HIGH FIDELITY MULTIMEDIA CREATION
                      </p>
                    </div>

                    {/* Right block: Contact ticket stub + Beautiful Postage Stamp */}
                    <div className="md:col-span-5 print:col-span-5 flex flex-col sm:flex-row print:flex-row items-center gap-4 print:gap-2.5 border-t md:border-t-0 print:border-t-0 md:border-l print:border-l border-zinc-950/40 pt-4 md:pt-0 print:pt-0 md:pl-5 print:pl-5">
                      
                      {/* Left half of contact block: Post stub receipt */}
                      <div className="w-full sm:w-auto print:w-auto flex-1 grid grid-cols-1 gap-1.5 print:gap-0.5 text-[10px] print:text-[8px] font-mono text-zinc-200">
                        {data.contact.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">{data.contact.email}</span>
                          </div>
                        )}
                        {data.contact.website && (
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">{data.contact.website}</span>
                          </div>
                        )}
                        {data.contact.instagram && (
                          <div className="flex items-center gap-1.5">
                            <Instagram className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">@{data.contact.instagram}</span>
                          </div>
                        )}
                        {data.contact.github && (
                          <div className="flex items-center gap-1.5">
                            <Github className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">{data.contact.github}</span>
                          </div>
                        )}
                        {data.contact.linkedin && (
                          <div className="flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">{data.contact.linkedin}</span>
                          </div>
                        )}
                        {data.contact.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate hover:text-white transition-colors">{data.contact.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Right half of contact block: Scalloped Postage Stamp */}
                      <div className="relative w-20 print:w-16 h-24 print:h-20 bg-[#FAF6EB] text-zinc-900 border-2 border-zinc-950 shadow-[3px_3px_0px_#1A1A1A] p-1 flex flex-col justify-between rounded-sm shrink-0 select-none rotate-3 hover:rotate-0 transition-transform duration-300" title="Official India Postage Stamp">
                        {/* Stamp perforations mock (scalloped dots) */}
                        <div className="absolute -top-1 -bottom-1 left-2 right-2 flex justify-between pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                        </div>
                        <div className="absolute -left-1 -right-1 top-2 bottom-2 flex flex-col justify-between pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                          <div className="w-1.5 h-1.5 bg-[#8c2211] rounded-full" />
                        </div>

                        {/* Stamp Header */}
                        <div className="text-[6px] font-mono font-black text-[#8c2211] tracking-widest text-center uppercase leading-none">
                          भारत INDIA
                        </div>

                        {/* Stamp central emblem */}
                        <div className="flex-1 flex flex-col items-center justify-center text-[#8c2211]">
                          <span className="text-lg font-vintage tracking-tighter block leading-none font-black -mt-1 select-none">CR</span>
                          <span className="text-[14px] leading-none -mt-0.5 select-none text-amber-600">❂</span>
                        </div>

                        {/* Stamp footer (Price value) */}
                        <div className="flex items-center justify-between font-mono text-[7px] font-black text-[#8c2211] uppercase leading-none border-t border-zinc-300/60 pt-0.5">
                          <span>POSTAGE</span>
                          <span>₹ 5.00</span>
                        </div>

                        {/* Tilted Blue Inked cancellation stamp */}
                        <div className="absolute -top-1 -right-2 w-10 h-10 rounded-full border border-teal-800/30 flex flex-col items-center justify-center font-mono text-[4px] text-teal-800/40 font-bold uppercase rotate-[24deg] pointer-events-none mix-blend-multiply">
                          <span>MUMBAI</span>
                          <span>2026</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* BADGES BAR: Open to Work, Adobe Suite, etc. */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 print:gap-1.5 mb-6 print:mb-3.5 text-[10px] print:text-[8px] font-bold uppercase">
                  {data.quickBadges && data.quickBadges.filter(b => b && b.trim() !== "").map((badge, idx) => {
                    const isOpenToWork = badge.toLowerCase().includes("open to work");
                    return (
                      <div 
                        key={idx} 
                        className={`${
                          idx === 0 
                            ? "bg-[#D97706] text-white border-[#B45309]" 
                            : "bg-[#faf8e8] text-zinc-700 border-zinc-300"
                        } border px-3 print:px-1.5 py-1.5 print:py-0.5 rounded-sm shadow-sm tracking-wide ${
                          isOpenToWork ? "font-sans font-medium text-[10.5px] print:text-[8.5px] tracking-wide" : getBadgeFontClass()
                        }`}
                      >
                        {formatText(badge)}
                      </div>
                    );
                  })}
                </div>

                {/* COLUMN CONTENT */}
                {layoutMode === "horizontal" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 print:grid-cols-12 gap-6 print:gap-3.5 relative z-10">
                    
                    {/* LEFT COLUMN: Profile Summary & Skills (Spans 4 cols) */}
                    <div className="lg:col-span-4 print:col-span-4 flex flex-col gap-6 print:gap-3">
                      
                      {/* PROFILE SUMMARY */}
                      <div className={`border-2 border-zinc-950 rounded p-4 print:p-3 bg-[#FAF8EB] shadow-[3px_3px_0px_rgba(26,26,26,1)] print:shadow-[1.5px_1.5px_0px_rgba(26,26,26,1)] ${getPrimaryFontClass()}`}>
                        <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-sm text-[#8c2211]">विवरण</span>
                          <span className={`font-serif font-black italic text-[9px] text-zinc-500 uppercase tracking-widest`}>/ PROFILE SUMMARY</span>
                        </h3>
                        <p className={`text-[11px] print:text-[9.5px] text-zinc-800 leading-relaxed print:leading-normal pr-1 font-medium ${getPrimaryFontClass()}`}>
                          {formatText(data.profile)}
                        </p>
                      </div>

                      {/* SKILLS PANEL */}
                      <div>
                        <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-base text-[#8c2211]">कौशल</span>
                          <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ SKILLS</span>
                        </h3>
                        
                        <div className="space-y-4 print:space-y-2">
                          {nonLanguageSkills.map((grp, idx) => (
                            <div key={idx} className="space-y-1.5 print:space-y-0.5">
                              <span className="text-[10px] print:text-[8.5px] font-bold text-zinc-500 font-mono block tracking-wider uppercase">
                                {formatText(grp.category)}
                              </span>
                              <div className="flex flex-wrap gap-1.5 print:gap-1">
                                {grp.skills.map((skill, sIdx) => (
                                  <span 
                                    key={sIdx}
                                    className="text-[11px] print:text-[9px] font-mono text-zinc-800 bg-[#FAF8EB] hover:bg-white border border-zinc-300 px-2 print:px-1.5 py-1 print:py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-colors"
                                  >
                                    {formatText(skill)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LANGUAGES PANEL */}
                      <div>
                        <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-base text-[#8c2211]">भाषा</span>
                          <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ LANGUAGES</span>
                        </h3>

                        <div className="space-y-2 print:space-y-1 font-mono text-xs print:text-[10px]">
                          {languageGroup ? (
                            languageGroup.skills.map((lang, lIdx) => {
                              const parts = lang.split("(");
                              const name = parts[0].trim();
                              const level = parts[1] ? parts[1].replace(")", "").trim().toUpperCase() : "FLUENT";
                              return (
                                <div key={lIdx} className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1 last:border-0">
                                  <span className="font-bold text-zinc-800">{formatText(name)}</span>
                                  <span className="text-[10px] font-bold text-[#D97706] tracking-wider">{level}</span>
                                </div>
                              );
                            })
                          ) : (
                            <>
                              <div className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1">
                                <span className="font-bold text-zinc-800">ENGLISH</span>
                                <span className="text-[10px] font-bold text-[#D97706] tracking-wider">FLUENT</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1">
                                <span className="font-bold text-zinc-800">HINDI</span>
                                <span className="text-[10px] font-bold text-[#D97706] tracking-wider">FLUENT</span>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <span className="font-bold text-zinc-800">MARATHI</span>
                                <span className="text-[10px] font-bold text-[#D97706] tracking-wider">BASIC</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* MIDDLE COLUMN: Experience (Spans 5 cols) */}
                    <div className="lg:col-span-5 print:col-span-5 flex flex-col gap-6 print:gap-2.5">
                      <div>
                        <h3 className="border-b border-zinc-900 pb-1 mb-4 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-base text-[#8c2211]">अनुभव</span>
                          <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ EXPERIENCE</span>
                        </h3>

                        <div className="space-y-4 print:space-y-2.5">
                          {data.experience && data.experience.map((exp, idx) => {
                            const isSolidHeader = exp.company === "Chirag Studios" || exp.company === "Aethelcare" || exp.company === "ParrotAI";
                            
                            return (
                              <div key={idx} className="border-2 border-zinc-950 rounded bg-white/80 shadow-[3.5px_3.5px_0px_rgba(26,26,26,1)] print:shadow-[1.5px_1.5px_0px_rgba(26,26,26,1)] overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
                                {/* Card Header */}
                                <div className={`p-2.5 print:p-1.5 border-b-2 border-zinc-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
                                  isSolidHeader ? "bg-[#8c2211] text-white" : "bg-[#FAF8EB] text-zinc-900"
                                }`}>
                                  <div>
                                    <h4 className={`font-serif font-black text-[12px] print:text-[10.5px] uppercase flex items-center gap-1 ${isSolidHeader ? "text-amber-400" : "text-zinc-900"}`}>
                                      {formatText(exp.role)}
                                    </h4>
                                    <div className={`text-[10px] print:text-[8.5px] ${getPrimaryFontClass()} font-bold ${isSolidHeader ? "text-white/90" : "text-zinc-600"}`}>
                                      {formatText(exp.company)} {exp.location && `· ${formatText(exp.location)}`}
                                    </div>
                                  </div>
                                  <div className={`text-left sm:text-right ${getBadgeFontClass()} text-[10px] print:text-[8px] font-bold shrink-0`}>
                                    <span className={isSolidHeader ? "text-amber-400" : "text-[#8c2211] bg-amber-400/20 px-1.5 py-0.5 border border-amber-400/40 rounded-sm"}>{formatText(exp.dates)}</span>
                                  </div>
                                </div>
   
                                {/* Bullet Points */}
                                <div className="p-3 print:p-1.5 space-y-2 print:space-y-1 bg-[#FAF6EB]/40">
                                  {exp.description && exp.description.length > 0 && (
                                    <ul className={`list-none ${getPrimaryFontClass()} text-[10px] print:text-[8.5px] leading-relaxed print:leading-tight text-zinc-700 space-y-1.5 print:space-y-0.5`}>
                                      {exp.description.map((bullet, bIdx) => (
                                        <li key={bIdx} className={`relative pl-3.5 print:pl-2 leading-relaxed print:leading-tight flex items-start gap-1 ${getPrimaryFontClass()} text-[10px] print:text-[8.5px]`}>
                                          <span className="text-[#8c2211] font-bold select-none shrink-0">—</span>
                                          <span>{formatText(bullet)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
   
                                  {/* Tags at bottom */}
                                  {exp.company === "Chirag Studios" && (
                                    <div className="flex flex-wrap gap-1 mt-2.5 print:mt-1 pt-2 print:pt-1 border-t border-dashed border-zinc-300">
                                      {["PHOTOSHOP", "ILLUSTRATOR", "AFTER EFFECTS", "PREMIERE PRO", "BLENDER", "FIGMA"].map((t, tIdx) => (
                                        <span key={tIdx} className="text-[8px] print:text-[7px] font-mono font-bold bg-[#FAF8EB] text-zinc-800 border border-zinc-950 px-1.5 py-0.2 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {exp.company === "ParrotAI" && (
                                    <div className="flex flex-wrap gap-1 mt-2.5 print:mt-1 pt-2 print:pt-1 border-t border-dashed border-zinc-300">
                                      {["FIGMA", "ILLUSTRATOR", "REACT", "HTML / CSS"].map((t, tIdx) => (
                                        <span key={tIdx} className="text-[8px] print:text-[7px] font-mono font-bold bg-[#FAF8EB] text-zinc-800 border border-zinc-950 px-1.5 py-0.2 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}
   
                                  {exp.company === "Aethelcare" && (
                                    <div className="flex flex-wrap gap-1 mt-2.5 print:mt-1 pt-2 print:pt-1 border-t border-dashed border-zinc-300">
                                      <span className="text-[8px] print:text-[7px] font-mono font-bold bg-[#D97706] text-white border border-zinc-950 px-1.5 py-0.2 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                        HEALTH-TECH · EARLY STAGE
                                      </span>
                                    </div>
                                  )}
   
                                  {exp.company === "India Lawshield" && (
                                    <div className="flex flex-wrap gap-1 mt-2.5 print:mt-1 pt-2 print:pt-1 border-t border-dashed border-zinc-300">
                                      {["HTML5", "CSS", "JAVASCRIPT", "FIGMA", "AFTER EFFECTS"].map((t, tIdx) => (
                                        <span key={tIdx} className="text-[8px] print:text-[7px] font-mono font-bold bg-[#FAF8EB] text-zinc-800 border border-zinc-950 px-1.5 py-0.2 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Education & Projects (Spans 3 cols) */}
                    <div className="lg:col-span-3 print:col-span-3 flex flex-col gap-6 print:gap-3">
                      
                      {/* EDUCATION PANEL */}
                      <div>
                        <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-base text-[#8c2211]">शिक्षा</span>
                          <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ EDUCATION</span>
                        </h3>

                        <div className="space-y-4 print:space-y-2.5 font-mono">
                          {data.education && data.education.map((edu, idx) => (
                            <div key={idx} className="text-xs print:text-[10px]">
                              <span className="text-[#D97706] font-bold block text-[11px] print:text-[9.5px] mb-0.5">
                                {formatText(edu.dates)}
                              </span>
                              <h4 className="font-serif font-bold text-[12px] print:text-[10.5px] text-zinc-900 uppercase leading-snug">
                                {formatText(edu.degree)}
                              </h4>
                              <span className="text-zinc-600 text-[10px] print:text-[8.5px] block mt-0.5">
                                {formatText(edu.school)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SELECTED PROJECTS PANEL */}
                      <div>
                        <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                          <span className="font-vintage text-base text-[#8c2211]">परियोजनाएं</span>
                          <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ SELECTED PROJECTS</span>
                        </h3>

                        <div className="space-y-4 print:space-y-2.5">
                          {data.projects && data.projects.map((proj, idx) => (
                            <div key={idx} className="bg-[#FAF8EB] border-2 border-zinc-950 rounded p-2.5 print:p-1.5 flex flex-col justify-between shadow-[2.5px_2.5px_0px_rgba(26,26,26,1)] print:shadow-[1.5px_1.5px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 transition-transform duration-200 font-mono">
                              <div>
                                <div className="text-[8px] print:text-[7px] text-[#8c2211] font-extrabold uppercase tracking-widest mb-1 bg-amber-400/20 border border-[#D97706]/30 px-1 py-0.2 rounded-sm inline-block leading-none">
                                  {formatText(proj.role || "3D GENERALIST")}
                                </div>
                                <h4 className="font-serif font-black text-[11px] print:text-[9.5px] text-zinc-950 uppercase leading-snug mb-1">
                                  {formatText(proj.title)}
                                </h4>
                                <p className="text-[9px] print:text-[8px] text-zinc-600 leading-normal print:leading-tight mb-2 print:mb-1">
                                  {proj.description && formatText(proj.description[0])}
                                </p>
                              </div>
                              <div className="text-[8px] print:text-[7px] text-zinc-500 font-bold border-t border-dashed border-zinc-300 pt-1 mt-auto flex items-center justify-between">
                                <span>{formatText(proj.dates)}</span>
                                <span className="text-[#D97706] font-black">★</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-6 print:gap-3.5 relative z-10">
                  
                  {/* LEFT COLUMN: Skills, Education, Languages (Spans 4 cols) */}
                  <div className="md:col-span-4 print:col-span-4 flex flex-col gap-6 print:gap-3">
                    
                    {/* SKILLS PANEL */}
                    <div>
                      <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                        <span className="font-vintage text-base text-[#8c2211]">कौशल</span>
                        <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ SKILLS</span>
                      </h3>
                      
                      <div className="space-y-4 print:space-y-2">
                        {nonLanguageSkills.map((grp, idx) => (
                          <div key={idx} className="space-y-1.5 print:space-y-0.5">
                            <span className="text-[10px] print:text-[8.5px] font-bold text-zinc-500 font-mono block tracking-wider uppercase">
                              {formatText(grp.category)}
                            </span>
                            <div className="flex flex-wrap gap-1.5 print:gap-1">
                              {grp.skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="text-[11px] print:text-[9px] font-mono text-zinc-800 bg-[#FAF8EB] hover:bg-white border border-zinc-300 px-2 print:px-1.5 py-1 print:py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-colors"
                                >
                                  {formatText(skill)}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* EDUCATION PANEL */}
                    <div>
                      <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                        <span className="font-vintage text-base text-[#8c2211]">शिक्षा</span>
                        <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ EDUCATION</span>
                      </h3>

                      <div className="space-y-4 print:space-y-2.5 font-mono">
                        {data.education && data.education.map((edu, idx) => (
                          <div key={idx} className="text-xs print:text-[10px]">
                            <span className="text-[#D97706] font-bold block text-[11px] print:text-[9.5px] mb-0.5">
                              {formatText(edu.dates)}
                            </span>
                            <h4 className="font-serif font-bold text-[13px] print:text-[10.5px] text-zinc-900 uppercase leading-snug">
                              {formatText(edu.degree)}
                            </h4>
                            <span className="text-zinc-600 text-[11px] print:text-[9.5px] block mt-0.5">
                              {formatText(edu.school)}
                            </span>
                            {edu.details && (
                              <p className="text-[10px] print:text-[8.5px] text-zinc-500 italic leading-snug mt-1 pl-1.5 border-l border-zinc-300">
                                {formatText(edu.details)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LANGUAGES PANEL */}
                    <div>
                      <h3 className="border-b border-zinc-900 pb-1 mb-3 print:mb-2 flex items-baseline gap-1.5">
                        <span className="font-vintage text-base text-[#8c2211]">भाषा</span>
                        <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ LANGUAGES</span>
                      </h3>

                      <div className="space-y-2 print:space-y-1 font-mono text-xs print:text-[10px]">
                        {languageGroup ? (
                          languageGroup.skills.map((lang, lIdx) => {
                            const parts = lang.split("(");
                            const name = parts[0].trim();
                            const level = parts[1] ? parts[1].replace(")", "").trim().toUpperCase() : "FLUENT";
                            return (
                              <div key={lIdx} className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1 last:border-0">
                                <span className="font-bold text-zinc-800">{formatText(name)}</span>
                                <span className="text-[10px] font-bold text-[#D97706] tracking-wider">{level}</span>
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <div className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1">
                              <span className="font-bold text-zinc-800">ENGLISH</span>
                              <span className="text-[10px] font-bold text-[#D97706] tracking-wider">FLUENT</span>
                            </div>
                            <div className="flex justify-between items-baseline border-b border-dotted border-zinc-300 pb-1">
                              <span className="font-bold text-zinc-800">HINDI</span>
                              <span className="text-[10px] font-bold text-[#D97706] tracking-wider">FLUENT</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-zinc-800">MARATHI</span>
                              <span className="text-[10px] font-bold text-[#D97706] tracking-wider">BASIC</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Profile Quote, Work Experience, Projects (Spans 8 cols) */}
                  <div className="md:col-span-8 print:col-span-8 flex flex-col gap-6 print:gap-3">
                    
                    {/* PROFILE QUOTE */}
                    <div className="border-l-4 border-[#8c2211] pl-4 print:pl-3 py-1 print:py-0.5 italic text-zinc-800 text-xs print:text-[10.5px] md:text-[13px] leading-relaxed print:leading-normal font-mono">
                      <span className="font-display font-black text-2xl print:text-xl text-[#8c2211] select-none block h-2 leading-none">“</span>
                      {formatText(data.profile)}
                    </div>

                    {/* EXPERIENCE SECTION */}
                    <div>
                      <h3 className="border-b border-zinc-900 pb-1 mb-4 print:mb-2 flex items-baseline gap-1.5">
                        <span className="font-vintage text-base text-[#8c2211]">अनुभव</span>
                        <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ EXPERIENCE</span>
                      </h3>

                      <div className="space-y-5 print:space-y-2.5">
                        {data.experience && data.experience.map((exp, idx) => {
                          const isSolidHeader = exp.company === "Chirag Studios" || exp.company === "Aethelcare";
                          
                          return (
                            <div key={idx} className="border-2 border-zinc-950 rounded bg-white/80 shadow-[3.5px_3.5px_0px_rgba(26,26,26,1)] print:shadow-[1.5px_1.5px_0px_rgba(26,26,26,1)] overflow-hidden hover:-translate-y-0.5 transition-transform duration-200">
                              {/* Card Header */}
                              <div className={`p-3 print:p-1.5 border-b-2 border-zinc-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 print:gap-1 ${
                                isSolidHeader ? "bg-[#8c2211] text-white" : "bg-[#FAF8EB] text-zinc-900"
                              }`}>
                                <div>
                                  <h4 className={`font-serif font-black text-sm print:text-xs uppercase flex items-center gap-1.5 print:gap-1 ${isSolidHeader ? "text-amber-400" : "text-zinc-900"}`}>
                                    {formatText(exp.role)}
                                  </h4>
                                  <div className={`text-[11px] print:text-[9px] font-mono font-bold ${isSolidHeader ? "text-white/90" : "text-zinc-600"}`}>
                                    {formatText(exp.company)} {exp.location && `· ${formatText(exp.location)}`}
                                  </div>
                                </div>
                                <div className="text-left sm:text-right font-mono text-[11px] print:text-[9px] font-bold shrink-0">
                                  <span className={isSolidHeader ? "text-amber-400" : "text-[#8c2211] bg-amber-400/20 px-1.5 print:px-1 py-0.5 rounded-sm"}>{formatText(exp.dates)}</span>
                                </div>
                              </div>
 
                              {/* Bullet Points */}
                              <div className="p-3.5 print:p-2 space-y-2 print:space-y-1 bg-[#FAF6EB]/40">
                                {exp.description && exp.description.length > 0 && (
                                  <ul className="list-none font-mono text-[11px] print:text-[9.5px] md:text-xs text-zinc-700 space-y-2 print:space-y-0.5">
                                    {exp.description.map((bullet, bIdx) => (
                                      <li key={bIdx} className="relative pl-4 print:pl-2.5 leading-relaxed print:leading-tight flex items-start gap-1">
                                        <span className="text-[#8c2211] font-bold select-none shrink-0">—</span>
                                        <span>{formatText(bullet)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
 
                                {/* Tags at bottom of Chirag Studios or India Lawshield */}
                                {exp.company === "Chirag Studios" && (
                                  <div className="flex flex-wrap gap-1.5 print:gap-1 mt-3 print:mt-1.5 pt-2.5 print:pt-1.5 border-t border-dashed border-zinc-300">
                                    {["PHOTOSHOP", "ILLUSTRATOR", "AFTER EFFECTS", "PREMIERE PRO", "BLENDER", "FIGMA", "HTML / CSS / JS"].map((t, tIdx) => (
                                      <span key={tIdx} className="text-[9px] print:text-[7.5px] font-mono font-bold bg-[#FAF8EB] text-zinc-800 border border-zinc-950 px-1.5 py-0.5 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
 
                                {exp.company === "Aethelcare" && (
                                  <div className="flex flex-wrap gap-1.5 print:gap-1 mt-3 print:mt-1.5 pt-2.5 print:pt-1.5 border-t border-dashed border-zinc-300">
                                    <span className="text-[9px] print:text-[7.5px] font-mono font-bold bg-[#D97706] text-white border border-zinc-950 px-1.5 py-0.5 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                      HEALTH-TECH · EARLY STAGE
                                    </span>
                                  </div>
                                )}
 
                                {exp.company === "India Lawshield" && (
                                  <div className="flex flex-wrap gap-1.5 print:gap-1 mt-3 print:mt-1.5 pt-2.5 print:pt-1.5 border-t border-dashed border-zinc-300">
                                    {["HTML5", "CSS", "JAVASCRIPT", "FIGMA", "AFTER EFFECTS", "ILLUSTRATOR"].map((t, tIdx) => (
                                      <span key={tIdx} className="text-[9px] print:text-[7.5px] font-mono font-bold bg-[#FAF8EB] text-zinc-800 border border-zinc-950 px-1.5 py-0.5 rounded-sm shadow-[1px_1px_0px_#1A1A1A] select-none">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SELECTED PROJECTS / BENTO RETRO GRID */}
                    <div>
                      <h3 className="border-b border-zinc-900 pb-1 mb-4 print:mb-2 flex items-baseline gap-1.5">
                        <span className="font-vintage text-base text-[#8c2211]">परियोजना</span>
                        <span className="font-serif font-black italic text-[10px] text-zinc-500 uppercase tracking-widest">/ SELECTED PROJECTS</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:gap-2">
                        {data.projects && data.projects.map((proj, idx) => (
                          <div key={idx} className="bg-[#FAF8EB] border-2 border-zinc-950 rounded p-3.5 print:p-2 flex flex-col justify-between shadow-[3px_3px_0px_rgba(26,26,26,1)] print:shadow-[1.5px_1.5px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 transition-transform duration-200 font-mono">
                            <div>
                              <div className="text-[9px] print:text-[8px] text-[#8c2211] font-extrabold uppercase tracking-widest mb-1.5 print:mb-1 bg-amber-400/20 border border-[#D97706]/30 px-1.5 py-0.5 rounded-sm inline-block leading-none">
                                {formatText(proj.role || "3D GENERALIST")}
                              </div>
                              <h4 className="font-serif font-black text-[13px] print:text-[11px] text-zinc-950 uppercase leading-snug mb-1">
                                {formatText(proj.title)}
                              </h4>
                              <p className="text-[10px] print:text-[8.5px] text-zinc-600 leading-normal print:leading-tight mb-3 print:mb-1.5">
                                {proj.description && formatText(proj.description[0])}
                              </p>
                            </div>
                            <div className="text-[9px] print:text-[8px] text-zinc-500 font-bold border-t border-dashed border-zinc-300 pt-2 print:pt-1 mt-auto flex items-center justify-between">
                              <span>{formatText(proj.dates)}</span>
                              <span className="text-[#D97706] font-black">★</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

                {/* SEALS & FOOTER SECTION */}
                <div className="mt-10 print:mt-4 pt-6 print:pt-3 border-t-2 border-dashed border-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-6 print:gap-2 relative z-10">
                  
                  {/* Retro Post Stamp seal Mockup */}
                  <div className="flex items-center gap-4 print:gap-2 select-none self-start sm:self-center">
                    {/* CSS Scalloped/Perforated Stamp */}
                    <div className="relative w-14 print:w-10 h-16 print:h-12 bg-[#d97706] text-white border-2 border-zinc-950 shadow-[3px_3px_0px_#1A1A1A] print:shadow-[1.5px_1.5px_0px_#1A1A1A] p-1 flex flex-col items-center justify-between rounded-sm rotate-[-4deg] select-none">
                      <div className="text-[5px] print:text-[4px] font-mono tracking-widest uppercase font-black leading-none text-zinc-950">भारत INDIA</div>
                      {/* Stylized CSS lotus or star in center */}
                      <div className="w-6 print:w-4 h-6 print:h-4 border-2 border-zinc-950 rounded-full flex items-center justify-center text-zinc-950 text-xs print:text-[8px] bg-[#FAF6EB] font-bold shadow-[1px_1px_0px_#000]">
                        ❂
                      </div>
                      <div className="text-[6px] print:text-[4.5px] font-mono font-black leading-none text-zinc-950">₹ 5.00</div>
                    </div>

                    <div className="text-[9px] print:text-[7px] font-mono text-zinc-500 uppercase select-none rotate-[2deg] leading-none">
                      <span className="block border-2 border-zinc-950 bg-[#FAF8EB] text-zinc-900 px-1.5 py-1 print:py-0.5 font-black mb-1 print:mb-0.5 shadow-[1.5px_1.5px_0px_#000]">ISSUED OK</span>
                      <span className="font-bold">ESTD. 2023</span>
                    </div>
                  </div>

                  {/* STAMP BLOCK (Retro Woodcut ink stamp) */}
                  <div className="relative group select-none">
                    <div className="absolute inset-0 bg-red-700/5 rounded -rotate-[1deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="border-4 print:border-2 border-zinc-950 px-4 print:px-2.5 py-2 print:py-1 text-base lg:text-lg print:text-[13px] font-vintage font-black tracking-tight uppercase inline-block text-zinc-950 leading-none select-none text-center transform rotate-[-1.5deg] shadow-[4px_4px_0px_rgba(26,26,26,1)] print:shadow-[2px_2px_0px_rgba(26,26,26,1)] bg-[#FAF8EB]">
                      {formatText(data.signatureText || "CHIRAG RAI / DESIGNER")}
                      <div className="text-[8px] print:text-[6.5px] font-mono tracking-widest text-zinc-500 mt-1.5 print:mt-1 border-t-2 border-dashed border-zinc-950/20 pt-1 font-black">
                        CURRICULUM VITAE // TRADING MARK
                      </div>
                    </div>
                  </div>
                </div>

                {/* MINIMALIST FOOTER */}
                <div className="mt-8 print:mt-3 pt-4 print:pt-2 border-t border-zinc-300/50 flex justify-between items-center text-[10px] print:text-[8px] font-mono text-zinc-400 uppercase tracking-widest relative z-10">
                  <span>Chirag Rai · Curriculum Vitae · 2026</span>
                  <span>https://chiragstudios.online/</span>
                </div>

              </div>
            </div>
          );
        })()
      ) : (
        /* Older Sage Green Notebook Theme */
        <div className="outer-folder relative w-full rounded-2xl bg-[#cbd4c4] border border-[#a8b3a0] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-1 md:p-3 overflow-hidden">
        {/* Right-side folder tab */}
        <div className="absolute right-0 top-16 w-6 h-36 bg-[#cbd4c4] border-r border-t border-b border-[#a8b3a0] rounded-r-lg shadow-sm flex items-center justify-center -mr-2 z-0">
          <div className="rotate-90 text-[10px] font-mono tracking-widest text-[#5c6655] font-bold">
            RESUME FOLDER
          </div>
        </div>

        {/* 2. Main cream paper layer */}
        <div 
          className={`relative z-10 w-full min-h-[1050px] bg-[#fafaf6] border border-zinc-200 shadow-md rounded-md p-6 md:p-10 pl-14 md:pl-16 pr-6 md:pr-8 overflow-hidden print-page ${
            paperStyle === "grid" ? "notebook-grid" : paperStyle === "ruled" ? "notebook-ruled" : ""
          }`}
        >
          {/* Notebook Paper Punch Holes (Left margin) */}
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-between py-8 z-20">
            {holes.map((_, i) => (
              <div 
                key={i} 
                className="w-3.5 h-3.5 rounded-full bg-zinc-950 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),_1px_1px_1px_rgba(255,255,255,0.8)] border border-zinc-800/20" 
              />
            ))}
          </div>

          {/* Vertical Red Margin Rule (standard notebook feature) */}
          <div className="absolute left-11 md:left-14 top-0 bottom-0 w-[1px] bg-red-200/60" />

          {/* BLUE STICKER / PAPER CRAP on the top right */}
          <div className="absolute top-6 right-6 md:right-8 w-44 md:w-52 bg-[#2d62d3] text-white p-4 pt-8 shadow-md rotate-[1.5deg] z-20 transition-all hover:rotate-0 hover:scale-105 duration-300">
            {/* SVG Binder Clip holding the card */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-10 flex flex-col items-center pointer-events-none">
              {/* Binder wire */}
              <svg className="w-10 h-7 overflow-visible" viewBox="0 0 40 24" fill="none">
                <path 
                  d="M12,24 C12,4 28,4 28,24" 
                  className={clipStyle.wire} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
              {/* Binder clamp body */}
              <div className={`w-8 h-4 rounded-t shadow-sm border-b ${clipStyle.body}`} />
            </div>

            {/* Content inside blue badge */}
            <div className="text-center font-display font-bold leading-none tracking-tight flex flex-col gap-1.5 pt-1">
              {data.quickBadges && data.quickBadges.filter(b => b && b.trim() !== "").length > 0 ? (
                data.quickBadges.filter(b => b && b.trim() !== "").map((badge, idx) => {
                  const isOpenToWork = badge.toLowerCase().includes("open to work");
                  return (
                    <div key={idx} className="border-b border-blue-400/40 last:border-0 pb-1 last:pb-0">
                      <span className="text-[10px] text-blue-200 uppercase font-mono block tracking-wider">
                        STATUS // 0{idx + 1}
                      </span>
                      <span className={`text-xs md:text-sm tracking-wide uppercase font-bold block ${isOpenToWork ? "font-sans font-medium" : "font-display font-bold"}`}>
                        {formatText(badge)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <>
                  <span className="text-sm md:text-base">ACTIVE NØW</span>
                  <span className="text-xs text-blue-200 uppercase font-mono">REMØTE AVAILABLE</span>
                </>
              )}
            </div>
          </div>

          {/* HANDWRITTEN ANNOTATIONS (if enabled) */}
          {showAnnotations && (
            <>
              <div className="absolute top-52 right-12 font-hand text-xl text-red-600/80 -rotate-12 pointer-events-none select-none">
                ← Highly Adaptable!
              </div>
              <div className="absolute bottom-64 left-16 font-hand text-xl text-blue-600/80 rotate-6 pointer-events-none select-none">
                ✓ Verified Experience!
              </div>
            </>
          )}

          {/* HEADER SECTION */}
          <div className="mt-4 md:mt-6">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-black tracking-tight text-zinc-950 uppercase leading-none break-words max-w-[70%]">
              {formatText(data.fullName || "CHIRAG SHARMA")}
            </h1>
            
            <div className="mt-3 text-sm md:text-base font-mono font-semibold text-zinc-800 tracking-wide uppercase">
              {formatText(data.title || "CREATIVE FRONTEND DEV")}
            </div>

            {/* Dashed line divider */}
            <div className="border-t-2 border-dashed border-zinc-400/60 my-5" />

            {/* PROFILE SECTION */}
            <div className="font-mono text-xs md:text-sm text-zinc-800 leading-relaxed max-w-[80%] my-4 relative">
              <span className="text-zinc-500 mr-2 font-bold select-none">→</span>
              <span className="italic">{formatText(data.profile || "No profile bio structured yet.")}</span>
            </div>

            <div className="border-t border-dashed border-zinc-400/40 my-4" />
          </div>

          {/* COLUMN GRID CONTENT */}
          {layoutMode === "horizontal" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* COLUMN 1: Profile & Skills (Spans 4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-3 inline-block">
                    {formatText("PRØFILE")}
                  </h3>
                  <div className="font-mono text-xs text-zinc-800 leading-relaxed">
                    {formatText(data.profile || "No profile bio structured yet.")}
                  </div>
                </div>

                {/* SKILLS SECTION */}
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-3 inline-block">
                    {formatText("TECHNICAL SKILLS")}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {data.skills && data.skills.length > 0 ? (
                      data.skills.map((grp, idx) => (
                        <div key={idx} className="font-mono">
                          <div className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider mb-1">
                            // {formatText(grp.category)}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {grp.skills && grp.skills.map((skill, sIdx) => (
                              <span 
                                key={sIdx} 
                                className="text-[10px] text-zinc-800 bg-zinc-200/50 border border-zinc-300/40 px-1.5 py-0.5 font-mono rounded"
                              >
                                {formatText(skill)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="font-mono text-xs text-zinc-500 italic">No technical skills added yet.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* COLUMN 2: WORK EXPERIENCE (Spans 5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                    {formatText("WØRK EXPERIENCE")}
                  </h3>

                  <div className="flex flex-col gap-5">
                    {data.experience && data.experience.length > 0 ? (
                      data.experience.map((exp, idx) => (
                        <div key={idx} className="group relative">
                          {/* Company & Location */}
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-display font-bold text-sm text-zinc-950 uppercase">
                              {formatText(exp.company)}
                            </h4>
                            <span className="font-mono text-[9px] text-zinc-500 uppercase bg-zinc-200/40 px-1 rounded">
                              {formatText(exp.location || "Remote")}
                            </span>
                          </div>

                          {/* Role & Dates */}
                          <div className="flex justify-between items-baseline text-[11px] text-zinc-700 font-mono mt-0.5 mb-1.5 font-medium">
                            <span>→ {formatText(exp.role)}</span>
                            <span className="text-zinc-600 font-bold">{formatText(exp.dates)}</span>
                          </div>

                          {/* Bullet Points */}
                          <ul className="list-none pl-2.5 font-mono text-[10px] text-zinc-700 space-y-1">
                            {exp.description && exp.description.map((bullet, bIdx) => (
                              <li key={bIdx} className="relative pl-3.5 leading-relaxed">
                                <span className="absolute left-0 top-0 text-zinc-400 select-none">•</span>
                                {formatText(bullet)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="font-mono text-xs text-zinc-500 italic">No work experience listed yet.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* COLUMN 3: SELECTED PROJECTS & EDUCATION (Spans 3 cols) */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                {/* EDUCATION SECTION */}
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                    {formatText("EDUCATIØN")}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {data.education && data.education.length > 0 ? (
                      data.education.map((edu, idx) => (
                        <div key={idx} className="font-mono text-[11px]">
                          <div className="font-display font-bold text-zinc-950 uppercase leading-snug">
                            {formatText(edu.school)}
                          </div>
                          <div className="text-zinc-700 font-medium mt-0.5">
                            {formatText(edu.degree)}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-bold mt-0.5">
                            {formatText(edu.dates)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="font-mono text-xs text-zinc-500 italic">No education history added yet.</div>
                    )}
                  </div>
                </div>

                {/* PROJECTS SECTION */}
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                    {formatText("SELECTED PRØJECTS")}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {data.projects && data.projects.map((proj, idx) => (
                      <div key={idx} className="text-[11px]">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-display font-bold text-xs text-zinc-950 uppercase">
                            {formatText(proj.title)}
                          </h4>
                          <span className="font-mono text-[9px] text-zinc-600 font-bold">{formatText(proj.dates)}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-600 mb-1">Role: {formatText(proj.role || "Creator")}</div>
                        
                        <p className="font-mono text-[10px] text-zinc-700 leading-normal">
                          {formatText(proj.description[0])}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
            
            {/* LEFT COLUMN: WORK EXPERIENCE (Spans 7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                  {formatText("WØRK EXPERIENCE")}
                </h3>

                <div className="flex flex-col gap-5">
                  {data.experience && data.experience.length > 0 ? (
                    data.experience.map((exp, idx) => (
                      <div key={idx} className="group relative">
                        {/* Company & Location */}
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-display font-bold text-sm md:text-base text-zinc-950 uppercase">
                            {formatText(exp.company)}
                          </h4>
                          <span className="font-mono text-[10px] text-zinc-500 uppercase bg-zinc-200/40 px-1 rounded">
                            {formatText(exp.location || "Remote")}
                          </span>
                        </div>

                        {/* Role & Dates */}
                        <div className="flex justify-between items-baseline text-xs text-zinc-700 font-mono mt-0.5 mb-2 font-medium">
                          <span>→ {formatText(exp.role)}</span>
                          <span className="text-zinc-600 font-bold">{formatText(exp.dates)}</span>
                        </div>

                        {/* Bullet Points */}
                        <ul className="list-none pl-3 font-mono text-[11px] md:text-xs text-zinc-700 space-y-1">
                          {exp.description && exp.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="relative pl-3.5 leading-relaxed">
                              <span className="absolute left-0 top-0 text-zinc-400 select-none">•</span>
                              {formatText(bullet)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="font-mono text-xs text-zinc-500 italic">No work experience listed yet. Use the editor to add items.</div>
                  )}
                </div>
              </div>

              {/* PROJECTS SECTION (Under Experience) */}
              <div className="mt-2">
                <h3 className="text-lg font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                  {formatText("SELECTED PRØJECTS")}
                </h3>

                <div className="flex flex-col gap-4">
                  {data.projects && data.projects.length > 0 ? (
                    data.projects.map((proj, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-display font-bold text-xs md:text-sm text-zinc-950 uppercase">
                            {formatText(proj.title)}
                          </h4>
                          <span className="font-mono text-[10px] text-zinc-600 font-bold">{formatText(proj.dates)}</span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-600 mb-1.5">Role: {formatText(proj.role || "Creator")}</div>
                        
                        <ul className="list-none pl-3 font-mono text-[11px] md:text-xs text-zinc-700 space-y-1">
                          {proj.description && proj.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="relative pl-3.5 leading-relaxed">
                              <span className="absolute left-0 top-0 text-zinc-400 select-none">•</span>
                              {formatText(bullet)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="font-mono text-xs text-zinc-500 italic">No selected projects listed yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: EDUCATION & SKILLS & STAMPS (Spans 5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              {/* SKILLS SECTION */}
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                  {formatText("TECHNICAL SKILLS")}
                </h3>

                <div className="flex flex-col gap-4">
                  {data.skills && data.skills.length > 0 ? (
                    data.skills.map((grp, idx) => (
                      <div key={idx} className="font-mono">
                        <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                          // {formatText(grp.category)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {grp.skills && grp.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="text-[10px] md:text-xs text-zinc-800 bg-zinc-200/50 border border-zinc-300/40 px-1.5 py-0.5 font-mono rounded"
                            >
                              {formatText(skill)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="font-mono text-xs text-zinc-500 italic">No technical skills added yet.</div>
                  )}
                </div>
              </div>

              {/* EDUCATION SECTION */}
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-950 uppercase tracking-tight border-b-2 border-zinc-950 pb-1 mb-4 inline-block">
                  {formatText("EDUCATIØN")}
                </h3>

                <div className="flex flex-col gap-4">
                  {data.education && data.education.length > 0 ? (
                    data.education.map((edu, idx) => (
                      <div key={idx} className="font-mono text-xs">
                        <div className="font-display font-bold text-zinc-950 uppercase leading-snug">
                          {formatText(edu.school)}
                        </div>
                        <div className="text-zinc-700 font-medium mt-0.5">
                          {formatText(edu.degree)}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold mt-0.5">
                          {formatText(edu.dates)}
                        </div>
                        {edu.details && (
                          <div className="text-[11px] text-zinc-600 mt-1 pl-2 border-l border-zinc-300 leading-normal italic">
                            {formatText(edu.details)}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="font-mono text-xs text-zinc-500 italic">No education history added yet.</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

          {/* SPACE FILLER / STAMP AREA */}
          <div className="mt-14 flex flex-col md:flex-row items-end justify-between gap-6 pt-6 border-t border-dashed border-zinc-300/60">
            
            {/* Placeholder spacing for the overlapping Sticky Note */}
            <div className="w-full md:w-64 h-32 md:h-12 no-print" />

            {/* STAMP BLOCK ON BOTTOM-RIGHT */}
            <div className="flex items-center gap-4 self-end z-20">
              {/* Minor stamps */}
              <div className="hidden sm:flex flex-col items-center justify-center font-mono text-[9px] text-zinc-400 uppercase select-none leading-none rotate-[6deg]">
                <div className="w-10 h-10 rounded-full border border-zinc-300/80 flex items-center justify-center font-bold">
                  2026
                </div>
                <span className="mt-1">ISSUED // STAMP</span>
              </div>

              {/* Major stamp - BAZAR DE DISCOS equivalent */}
              <div className="relative group select-none">
                <div className="absolute inset-0 bg-red-600/5 rounded -rotate-[1deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="border-[4px] border-zinc-950 px-4 py-2 text-xl lg:text-2xl font-black tracking-tight uppercase inline-block font-display text-zinc-950 leading-none select-none text-center transform rotate-[-2deg] shadow-sm">
                  {formatText(data.signatureText || "CHIRAG / CREATIVE DEV")}
                  <div className="text-[10px] font-mono tracking-widest text-zinc-500 mt-1 border-t border-zinc-300 pt-0.5 font-bold">
                    RESUME EDITION // TODO EL DÍA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. OVERLAPPING YELLOW STICKY NOTE (BOTTOM LEFT) - CONTAINING CONTACT INFO */}
          <div className="absolute bottom-10 left-6 md:left-8 w-64 h-56 bg-[#fbf8e4] border border-[#ebdcb3] shadow-md rotate-[-1.5deg] hover:rotate-0 hover:scale-[1.03] transition-all duration-300 z-30 flex flex-col p-4 sticky-grid">
            
            {/* Frosted / aged translucent tape effect at the top */}
            <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-7 opacity-85 border-l border-r shadow-[0_1px_2px_rgba(0,0,0,0.05)] rotate-[-1.5deg] pointer-events-none ${getTapeClass()}`} />

            <div className="w-full flex items-center justify-between border-b border-dashed border-[#d8cba1] pb-1.5 mb-2 font-mono text-[10px] font-bold text-zinc-500">
              <span>CØNTACT & LØGISTICS</span>
              <span>[01/01]</span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs text-zinc-800 leading-normal flex-1 justify-center">
              {data.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">{data.contact.phone}</span>
                </div>
              )}
              {data.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate underline font-medium">{data.contact.email}</span>
                </div>
              )}
              {data.contact.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">{data.contact.location}</span>
                </div>
              )}
              {data.contact.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">{data.contact.github}</span>
                </div>
              )}
              {data.contact.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">{data.contact.linkedin}</span>
                </div>
              )}
              {data.contact.instagram && (
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">@{data.contact.instagram}</span>
                </div>
              )}
              {data.contact.website && (
                <div className="flex items-center gap-2 border-t border-[#ebdcb3]/60 pt-1.5 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate text-zinc-900 font-bold">{data.contact.website}</span>
                </div>
              )}
            </div>
            
            <div className="text-[8px] font-mono text-zinc-400 text-right mt-2 select-none">
              SECURE CONNECTED ✓
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
};
