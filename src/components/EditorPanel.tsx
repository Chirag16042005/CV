import React, { useState } from "react";
import { ResumeData, WorkExperience, Project, SkillGroup, Education } from "../types";
import { 
  Sparkles, RotateCcw, Printer, Trash2, Plus, ArrowUp, ArrowDown, 
  Settings, Briefcase, FileText, User, Clipboard, AlertCircle, RefreshCw,
  CheckCircle2
} from "lucide-react";

interface EditorPanelProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  onReset: () => void;
  onClear: () => void;
  onPrint: () => void;
  slashedO: boolean;
  setSlashedO: (val: boolean) => void;
  paperStyle: "grid" | "ruled" | "blank";
  setPaperStyle: (style: "grid" | "ruled" | "blank") => void;
  clipColor: "black" | "silver" | "gold" | "blue";
  setClipColor: (color: "black" | "silver" | "gold" | "blue") => void;
  tapeColor: "translucent" | "yellow" | "pink";
  setTapeColor: (color: "translucent" | "yellow" | "pink") => void;
  showAnnotations: boolean;
  setShowAnnotations: (val: boolean) => void;
  themeStyle: "desivintage" | "notebook";
  setThemeStyle: (style: "desivintage" | "notebook") => void;
  layoutMode: "vertical" | "horizontal";
  setLayoutMode: (mode: "vertical" | "horizontal") => void;
  primaryFont: string;
  setPrimaryFont: (font: string) => void;
  badgeFont: string;
  setBadgeFont: (font: string) => void;
  printZoom: number;
  setPrintZoom: (zoom: number) => void;
}

type TabType = "ai" | "fields" | "styles";
type SectionType = "general" | "contact" | "experience" | "projects" | "skills" | "education" | "badges";

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  onReset,
  onClear,
  onPrint,
  slashedO,
  setSlashedO,
  paperStyle,
  setPaperStyle,
  clipColor,
  setClipColor,
  tapeColor,
  setTapeColor,
  showAnnotations,
  setShowAnnotations,
  themeStyle,
  setThemeStyle,
  layoutMode,
  setLayoutMode,
  primaryFont,
  setPrimaryFont,
  badgeFont,
  setBadgeFont,
  printZoom,
  setPrintZoom,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("ai");
  const [activeSection, setActiveSection] = useState<SectionType>("general");
  
  // AI Parser States
  const [rawText, setRawText] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parseSuccess, setParseSuccess] = useState(false);

  // Parse resume with Gemini
  const handleAiParse = async () => {
    if (!rawText.trim()) return;
    setIsParsing(true);
    setParseError(null);
    setParseSuccess(false);

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });

      const parsedResult = await response.json();

      if (!response.ok) {
        throw new Error(parsedResult.error || "Failed to parse the resume.");
      }

      onChange(parsedResult);
      setParseSuccess(true);
      // Automatically switch to manual fields to review
      setTimeout(() => {
        setActiveTab("fields");
        setActiveSection("general");
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || "Something went wrong while connecting to the AI parser.");
    } finally {
      setIsParsing(false);
    }
  };

  // State update helper
  const updateData = (fields: Partial<ResumeData>) => {
    onChange({ ...data, ...fields });
  };

  const updateContact = (fields: Partial<ResumeData["contact"]>) => {
    onChange({
      ...data,
      contact: { ...data.contact, ...fields }
    });
  };

  // List Management Helpers
  // Work Experience
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      company: "NEW COMPANY",
      role: "Role Title",
      dates: "2025 - PRESENT",
      location: "City, ST",
      description: ["Core responsibility or achievement point."]
    };
    updateData({ experience: [...data.experience, newExp] });
  };

  const handleUpdateExperience = (idx: number, fields: Partial<WorkExperience>) => {
    const list = [...data.experience];
    list[idx] = { ...list[idx], ...fields };
    updateData({ experience: list });
  };

  const handleDeleteExperience = (idx: number) => {
    updateData({ experience: data.experience.filter((_, i) => i !== idx) });
  };

  const handleAddExpBullet = (expIdx: number) => {
    const list = [...data.experience];
    list[expIdx].description = [...list[expIdx].description, "New achievement point."];
    updateData({ experience: list });
  };

  const handleUpdateExpBullet = (expIdx: number, bulletIdx: number, text: string) => {
    const list = [...data.experience];
    const desc = [...list[expIdx].description];
    desc[bulletIdx] = text;
    list[expIdx].description = desc;
    updateData({ experience: list });
  };

  const handleDeleteExpBullet = (expIdx: number, bulletIdx: number) => {
    const list = [...data.experience];
    list[expIdx].description = list[expIdx].description.filter((_, i) => i !== bulletIdx);
    updateData({ experience: list });
  };

  // Projects
  const handleAddProject = () => {
    const newProj: Project = {
      title: "NEW PROJECT",
      role: "Creator",
      dates: "2025",
      description: ["Brief project description point."]
    };
    updateData({ projects: [...data.projects, newProj] });
  };

  const handleUpdateProject = (idx: number, fields: Partial<Project>) => {
    const list = [...data.projects];
    list[idx] = { ...list[idx], ...fields };
    updateData({ projects: list });
  };

  const handleDeleteProject = (idx: number) => {
    updateData({ projects: data.projects.filter((_, i) => i !== idx) });
  };

  const handleAddProjBullet = (projIdx: number) => {
    const list = [...data.projects];
    list[projIdx].description = [...list[projIdx].description, "New project detail point."];
    updateData({ projects: list });
  };

  const handleUpdateProjBullet = (projIdx: number, bulletIdx: number, text: string) => {
    const list = [...data.projects];
    const desc = [...list[projIdx].description];
    desc[bulletIdx] = text;
    list[projIdx].description = desc;
    updateData({ projects: list });
  };

  const handleDeleteProjBullet = (projIdx: number, bulletIdx: number) => {
    const list = [...data.projects];
    list[projIdx].description = list[projIdx].description.filter((_, i) => i !== bulletIdx);
    updateData({ projects: list });
  };

  // Skills
  const handleAddSkillGroup = () => {
    const newGrp: SkillGroup = {
      category: "CATEGORY NAME",
      skills: ["Skill 1", "Skill 2"]
    };
    updateData({ skills: [...data.skills, newGrp] });
  };

  const handleUpdateSkillGroup = (idx: number, fields: Partial<SkillGroup>) => {
    const list = [...data.skills];
    list[idx] = { ...list[idx], ...fields };
    updateData({ skills: list });
  };

  const handleDeleteSkillGroup = (idx: number) => {
    updateData({ skills: data.skills.filter((_, i) => i !== idx) });
  };

  // Education
  const handleAddEducation = () => {
    const newEdu: Education = {
      school: "SCHOOL NAME",
      degree: "Degree / Specialization",
      dates: "2021 - 2025",
      details: "Additional achievements, GPA, or honors."
    };
    updateData({ education: [...data.education, newEdu] });
  };

  const handleUpdateEducation = (idx: number, fields: Partial<Education>) => {
    const list = [...data.education];
    list[idx] = { ...list[idx], ...fields };
    updateData({ education: list });
  };

  const handleDeleteEducation = (idx: number) => {
    updateData({ education: data.education.filter((_, i) => i !== idx) });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 border-r border-zinc-800 text-zinc-300 select-none overflow-hidden no-print">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-display font-black text-lg select-none">
            R
          </div>
          <div>
            <h2 className="text-sm font-display font-black tracking-tight text-white select-none">
              BRUTALIST WORKSPACE
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Interactive Editor</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={onReset}
            title="Reset to Sample Resume"
            className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Workspace Navigation Tabs */}
      <div className="flex border-b border-zinc-800 bg-zinc-900/50">
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold border-b-2 transition-all ${
            activeTab === "ai" 
              ? "border-red-600 text-white bg-zinc-800/40" 
              : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/10"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>AI PARSER</span>
        </button>
        <button
          onClick={() => setActiveTab("fields")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold border-b-2 transition-all ${
            activeTab === "fields" 
              ? "border-red-600 text-white bg-zinc-800/40" 
              : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/10"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>FIELDS</span>
        </button>
        <button
          onClick={() => setActiveTab("styles")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold border-b-2 transition-all ${
            activeTab === "styles" 
              ? "border-red-600 text-white bg-zinc-800/40" 
              : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/10"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>STYLES</span>
        </button>
      </div>

      {/* 3. Tab Contents Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* ================= AI PARSER TAB ================= */}
        {activeTab === "ai" && (
          <div className="space-y-4">
            <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-2">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Gemini-Powered Resume Mapper</span>
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                Paste the raw text of your latest resume below. Our server-side Gemini AI model will parse, clean, and map your text directly into the notebook layout structure instantly.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                RAW RESUME TEXT
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste work history, roles, dates, school achievements, contact details, and core skills here..."
                className="w-full h-80 p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-zinc-200 focus:outline-none focus:border-red-600 resize-none leading-relaxed"
              />
            </div>

            {parseError && (
              <div className="bg-red-950/45 border border-red-900/50 p-3.5 rounded text-red-200 font-mono text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <span className="font-bold block mb-1">PARSING ERROR</span>
                  <span className="text-[11px] text-red-300">{parseError}</span>
                  <span className="text-[10px] text-zinc-500 block mt-2">
                    Note: If the Gemini API Key is missing, you can still edit all resume sections manually under the <strong>Fields</strong> tab!
                  </span>
                </div>
              </div>
            )}

            {parseSuccess && (
              <div className="bg-emerald-950/45 border border-emerald-900/50 p-3.5 rounded text-emerald-200 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <div>
                  <span className="font-bold block">MAGIC COMPLETE!</span>
                  <span className="text-[11px] text-emerald-300">Resume structured. Switching tabs to review...</span>
                </div>
              </div>
            )}

            <button
              onClick={handleAiParse}
              disabled={isParsing || !rawText.trim()}
              className={`w-full py-3 font-mono font-bold text-xs uppercase rounded transition-all flex items-center justify-center gap-2 shadow-md ${
                isParsing || !rawText.trim()
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500 text-white font-black"
              }`}
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>PARSING WITH GEMINI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>MAGIC PARSE WITH AI</span>
                </>
              )}
            </button>
            
            <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-zinc-500">
              <button onClick={onClear} className="hover:text-red-400 transition-colors uppercase font-bold">
                Clear All Fields
              </button>
              <span>SERVER ENGINE: GEMINI 3.5 FLASH</span>
            </div>
          </div>
        )}

        {/* ================= MANUAL FIELDS TAB ================= */}
        {activeTab === "fields" && (
          <div className="space-y-6">
            
            {/* Section Sub-Navigator */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-950 rounded border border-zinc-800">
              {(["general", "contact", "experience", "projects", "skills", "education", "badges"] as SectionType[]).map((sect) => (
                <button
                  key={sect}
                  onClick={() => setActiveSection(sect)}
                  className={`py-1.5 rounded font-mono text-[9px] font-bold uppercase transition-all truncate ${
                    activeSection === sect
                      ? "bg-red-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  {sect}
                </button>
              ))}
            </div>

            {/* --- GENERAL SECTION --- */}
            {activeSection === "general" && (
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                  General Info
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">FULL NAME</label>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => updateData({ fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">PROFESSIONAL TITLE</label>
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e) => updateData({ title: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">BIO PROFILE SUMMARY</label>
                    <textarea
                      value={data.profile}
                      onChange={(e) => updateData({ profile: e.target.value })}
                      className="w-full h-24 p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600 resize-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">BOTTOM STAMP TEXT</label>
                    <input
                      type="text"
                      value={data.signatureText}
                      onChange={(e) => updateData({ signatureText: e.target.value })}
                      placeholder="e.g. NAME / DESIGNER"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- CONTACT SECTION --- */}
            {activeSection === "contact" && (
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                  Contact Details (Sticky Note)
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={data.contact.phone}
                      onChange={(e) => updateContact({ phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">EMAIL ADDRESS</label>
                    <input
                      type="text"
                      value={data.contact.email}
                      onChange={(e) => updateContact({ email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">LOCATION (CITY, STATE)</label>
                    <input
                      type="text"
                      value={data.contact.location}
                      onChange={(e) => updateContact({ location: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">GITHUB PROFILE</label>
                    <input
                      type="text"
                      value={data.contact.github}
                      onChange={(e) => updateContact({ github: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">LINKEDIN PROFILE</label>
                    <input
                      type="text"
                      value={data.contact.linkedin}
                      onChange={(e) => updateContact({ linkedin: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">WEBSITE / PORTFOLIO</label>
                    <input
                      type="text"
                      value={data.contact.website}
                      onChange={(e) => updateContact({ website: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 mb-1">INSTAGRAM PROFILE</label>
                    <input
                      type="text"
                      value={data.contact.instagram || ""}
                      onChange={(e) => updateContact({ instagram: e.target.value })}
                      placeholder="e.g. Chirag_Studios_"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- WORK EXPERIENCE SECTION --- */}
            {activeSection === "experience" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                    Work Experience
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 px-2 py-1 bg-zinc-850 hover:bg-zinc-800 rounded font-mono text-[10px] text-white transition-all border border-zinc-700"
                  >
                    <Plus className="w-3 h-3 text-red-500" />
                    <span>ADD CO.</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 rounded border border-zinc-800/80 space-y-3 relative group">
                      
                      <button
                        onClick={() => handleDeleteExperience(idx)}
                        className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500 rounded hover:bg-zinc-900 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Company"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">COMPANY NAME</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdateExperience(idx, { company: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">LOCATION</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleUpdateExperience(idx, { location: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">ROLE TITLE</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleUpdateExperience(idx, { role: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">DATES</label>
                          <input
                            type="text"
                            value={exp.dates}
                            onChange={(e) => handleUpdateExperience(idx, { dates: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      {/* Bullet list */}
                      <div className="space-y-1.5 pt-1.5 border-t border-zinc-900">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Bullet achievements</span>
                          <button
                            onClick={() => handleAddExpBullet(idx)}
                            className="text-[9px] font-mono text-red-500 hover:text-red-400 flex items-center gap-0.5"
                          >
                            <Plus className="w-2.5 h-2.5" /> ADD BULLET
                          </button>
                        </div>
                        
                        {exp.description.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleUpdateExpBullet(idx, bIdx, e.target.value)}
                              className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] text-zinc-300 focus:outline-none focus:border-red-600"
                            />
                            <button
                              onClick={() => handleDeleteExpBullet(idx, bIdx)}
                              className="p-1 hover:bg-zinc-900 text-zinc-500 hover:text-red-500 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SELECTED PROJECTS SECTION --- */}
            {activeSection === "projects" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                    Selected Projects
                  </h3>
                  <button
                    onClick={handleAddProject}
                    className="flex items-center gap-1 px-2 py-1 bg-zinc-850 hover:bg-zinc-800 rounded font-mono text-[10px] text-white transition-all border border-zinc-700"
                  >
                    <Plus className="w-3 h-3 text-red-500" />
                    <span>ADD PROJ.</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.projects.map((proj, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 rounded border border-zinc-800/80 space-y-3 relative group">
                      
                      <button
                        onClick={() => handleDeleteProject(idx)}
                        className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500 rounded hover:bg-zinc-900 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">PROJECT TITLE</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(idx, { title: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">DATES / YEAR</label>
                          <input
                            type="text"
                            value={proj.dates}
                            onChange={(e) => handleUpdateProject(idx, { dates: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">ROLE IN PROJECT</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => handleUpdateProject(idx, { role: e.target.value })}
                          className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>

                      {/* Bullet list */}
                      <div className="space-y-1.5 pt-1.5 border-t border-zinc-900">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Project detail lines</span>
                          <button
                            onClick={() => handleAddProjBullet(idx)}
                            className="text-[9px] font-mono text-red-500 hover:text-red-400 flex items-center gap-0.5"
                          >
                            <Plus className="w-2.5 h-2.5" /> ADD LINE
                          </button>
                        </div>
                        
                        {proj.description.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleUpdateProjBullet(idx, bIdx, e.target.value)}
                              className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] text-zinc-300 focus:outline-none focus:border-red-600"
                            />
                            <button
                              onClick={() => handleDeleteProjBullet(idx, bIdx)}
                              className="p-1 hover:bg-zinc-900 text-zinc-500 hover:text-red-500 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SKILLS SECTION --- */}
            {activeSection === "skills" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                    Skill Groups
                  </h3>
                  <button
                    onClick={handleAddSkillGroup}
                    className="flex items-center gap-1 px-2 py-1 bg-zinc-850 hover:bg-zinc-800 rounded font-mono text-[10px] text-white transition-all border border-zinc-700"
                  >
                    <Plus className="w-3 h-3 text-red-500" />
                    <span>ADD GROUP</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.skills.map((grp, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3 relative group">
                      
                      <button
                        onClick={() => handleDeleteSkillGroup(idx)}
                        className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500 rounded hover:bg-zinc-900 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Group"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">CATEGORY TITLE</label>
                        <input
                          type="text"
                          value={grp.category}
                          onChange={(e) => handleUpdateSkillGroup(idx, { category: e.target.value })}
                          className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">SKILLS (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          value={grp.skills.join(", ")}
                          onChange={(e) => {
                            const list = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
                            handleUpdateSkillGroup(idx, { skills: list });
                          }}
                          className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- EDUCATION SECTION --- */}
            {activeSection === "education" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                    Education History
                  </h3>
                  <button
                    onClick={handleAddEducation}
                    className="flex items-center gap-1 px-2 py-1 bg-zinc-850 hover:bg-zinc-800 rounded font-mono text-[10px] text-white transition-all border border-zinc-700"
                  >
                    <Plus className="w-3 h-3 text-red-500" />
                    <span>ADD SCHOOL</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3 relative group">
                      
                      <button
                        onClick={() => handleDeleteEducation(idx)}
                        className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500 rounded hover:bg-zinc-900 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete School"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">SCHOOL / INST.</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleUpdateEducation(idx, { school: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">DATES</label>
                          <input
                            type="text"
                            value={edu.dates}
                            onChange={(e) => handleUpdateEducation(idx, { dates: e.target.value })}
                            className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">DEGREE / STUDY</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(idx, { degree: e.target.value })}
                          className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 mb-0.5">ADDITIONAL DETAILS (GPA/HONORS)</label>
                        <input
                          type="text"
                          value={edu.details}
                          onChange={(e) => handleUpdateEducation(idx, { details: e.target.value })}
                          className="w-full px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- QUICK BADGES SECTION --- */}
            {activeSection === "badges" && (
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
                  Sticker Badges
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 leading-normal">
                  Configure up to 6 short values to display on the sticker badges bar and status widget.
                </p>
 
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, bIdx) => (
                    <div key={bIdx}>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1 uppercase">BADGE 0{bIdx + 1}</label>
                      <input
                        type="text"
                        value={data.quickBadges[bIdx] || ""}
                        maxLength={35}
                        onChange={(e) => {
                          const list = [...data.quickBadges];
                          list[bIdx] = e.target.value;
                          updateData({ quickBadges: list });
                        }}
                        placeholder="e.g. Remote Available"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= CUSTOM STYLES TAB ================= */}
        {activeTab === "styles" && (
          <div className="space-y-6">
            
            <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">
              Visual Style Customizer
            </h3>

            {/* Theme Selector */}
            <div className="space-y-2 bg-zinc-950 p-3.5 border border-zinc-800 rounded">
              <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">
                APP VISUAL THEME ARCHITECTURE
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                   onClick={() => setThemeStyle("desivintage")}
                  className={`py-2 px-1.5 border font-mono text-xs uppercase rounded transition-all flex flex-col items-center justify-center text-center leading-tight ${
                    themeStyle === "desivintage"
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm font-bold"
                      : "bg-[#8d2a1c] text-white border-[#b85a3c]"
                  }`}
                >
                  <span className="text-xs">INDI-VINTAGE</span>
                  <span className="text-[8px] opacity-85 font-normal">MATCHBOX & STAMP</span>
                </button>
                <button
                  onClick={() => setThemeStyle("notebook")}
                  className={`py-2 px-1.5 border font-mono text-xs uppercase rounded transition-all flex flex-col items-center justify-center text-center leading-tight ${
                    themeStyle === "notebook"
                      ? "bg-red-600 text-white border-red-500 shadow-sm font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  <span className="text-xs">BRUTALIST LAB</span>
                  <span className="text-[8px] opacity-75 font-normal">NOTEBOOK WRITER</span>
                </button>
              </div>
            </div>

            {/* Layout Orientation Selector */}
            <div className="space-y-2 bg-zinc-950 p-3.5 border border-zinc-800 rounded">
              <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">
                RESUME LAYOUT ORIENTATION
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLayoutMode("horizontal")}
                  className={`py-2 px-1.5 border font-mono text-xs uppercase rounded transition-all flex flex-col items-center justify-center text-center leading-tight ${
                    layoutMode === "horizontal"
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  <span className="text-xs">HORIZONTAL</span>
                  <span className="text-[8px] opacity-85 font-normal">LANDSCAPE SHAPE</span>
                </button>
                <button
                  onClick={() => setLayoutMode("vertical")}
                  className={`py-2 px-1.5 border font-mono text-xs uppercase rounded transition-all flex flex-col items-center justify-center text-center leading-tight ${
                    layoutMode === "vertical"
                      ? "bg-red-600 text-white border-red-500 shadow-sm font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  <span className="text-xs">VERTICAL</span>
                  <span className="text-[8px] opacity-75 font-normal">PORTRAIT SHAPE</span>
                </button>
              </div>
            </div>

            {/* Print Scale Customizer (New) */}
            <div className="space-y-2.5 bg-zinc-950 p-3.5 border border-zinc-800 rounded">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  PRINT EXPORT SCALE (ZOOM)
                </label>
                <span className="text-xs font-mono text-red-500 font-bold bg-red-950/40 px-1.5 py-0.5 border border-red-900/50 rounded animate-pulse">
                  {printZoom}%
                </span>
              </div>
              <p className="text-[9px] font-mono text-zinc-500 leading-relaxed">
                Reduce this value to scale down margins, padding, and text, forcing a long resume onto exactly <strong className="text-zinc-300">ONE PAGE</strong> when saving/printing to PDF.
              </p>
              
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] font-mono text-zinc-500">50%</span>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={printZoom}
                  onChange={(e) => setPrintZoom(Number(e.target.value))}
                  className="flex-1 accent-red-600 bg-zinc-850 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-zinc-500">100%</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 mt-2 pt-1 border-t border-zinc-900/50">
                <button
                  type="button"
                  onClick={() => setPrintZoom(100)}
                  className={`py-1 border font-mono text-[9px] uppercase rounded transition-all text-center cursor-pointer ${
                    printZoom === 100
                      ? "bg-red-600 text-white border-red-500 font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-850"
                  }`}
                  title="Full 100% normal scale"
                >
                  Full (100%)
                </button>
                <button
                  type="button"
                  onClick={() => setPrintZoom(80)}
                  className={`py-1 border font-mono text-[9px] uppercase rounded transition-all text-center cursor-pointer ${
                    printZoom === 80
                      ? "bg-red-600 text-white border-red-500 font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-850"
                  }`}
                  title="Slightly compact 80% scale"
                >
                  Mid (80%)
                </button>
                <button
                  type="button"
                  onClick={() => setPrintZoom(68)}
                  className={`py-1 border font-mono text-[9px] uppercase rounded transition-all text-center cursor-pointer ${
                    printZoom === 68
                      ? "bg-red-600 text-white border-red-500 font-bold"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-850"
                  }`}
                  title="Optimized 1-page fit scale"
                >
                  1-Page Fit (68%)
                </button>
              </div>
            </div>

            {/* Typography & Font Families Customizer */}
            <div className="space-y-3 bg-zinc-950 p-3.5 border border-zinc-800 rounded">
              <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                TYPOGRAPHY & FONT FAMILIES
              </label>
              
              <div className="space-y-2.5">
                <div>
                  <span className="block text-[10px] font-mono text-zinc-500 mb-1 uppercase">PRIMARY BODY TEXT FONT</span>
                  <select
                    value={primaryFont}
                    onChange={(e) => setPrimaryFont(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {[
                      { value: "sans", label: "Inter (Sans-Serif)" },
                      { value: "jakarta", label: "Plus Jakarta (Modern Tech)" },
                      { value: "display", label: "Space Grotesk (Brutalist)" },
                      { value: "bricolage", label: "Bricolage (Quirky & Trendy)" },
                      { value: "serif", label: "Playfair Display (Elegant Serif)" },
                    ].map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white font-sans">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-zinc-500 mb-1 uppercase">BADGE & METADATA FONT</span>
                  <select
                    value={badgeFont}
                    onChange={(e) => setBadgeFont(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-white focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {[
                      { value: "mono", label: "JetBrains Mono" },
                      { value: "sans", label: "Inter Sans" },
                      { value: "jakarta", label: "Plus Jakarta" },
                      { value: "display", label: "Space Grotesk" },
                      { value: "bricolage", label: "Bricolage" },
                    ].map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white font-mono">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              
              {/* Slashed O Toggle */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded">
                <div>
                  <label className="font-mono text-xs font-bold text-white block">SLØPED BRUTALIST HEADING</label>
                  <span className="text-[10px] font-mono text-zinc-500">Replaces Os with Øs for a post-punk look</span>
                </div>
                <input
                  type="checkbox"
                  checked={slashedO}
                  onChange={(e) => setSlashedO(e.target.checked)}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
              </div>

              {/* Handwritten Annotations */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded">
                <div>
                  <label className="font-mono text-xs font-bold text-white block">HANDWRITTEN SCRIBBLes</label>
                  <span className="text-[10px] font-mono text-zinc-500">Overlay cute designer scribbles around borders</span>
                </div>
                <input
                  type="checkbox"
                  checked={showAnnotations}
                  onChange={(e) => setShowAnnotations(e.target.checked)}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
              </div>

              {/* Paper selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  NOTEBOOK PAPER BACKGROUND
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["grid", "ruled", "blank"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setPaperStyle(style)}
                      className={`py-2 border font-mono text-xs uppercase rounded transition-all ${
                        paperStyle === style
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Binder Clip Color selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  METALLIC BINDER CLIP COLOR
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["black", "silver", "gold", "blue"] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setClipColor(color)}
                      className={`py-1.5 border font-mono text-[10px] uppercase rounded transition-all ${
                        clipColor === color
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tape Style selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  STICKY-NOTE TAPE STYLE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["translucent", "yellow", "pink"] as const).map((tape) => (
                    <button
                      key={tape}
                      onClick={() => setTapeColor(tape)}
                      className={`py-1.5 border font-mono text-[10px] uppercase rounded transition-all ${
                        tapeColor === tape
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {tape}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 4. Footer controls */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950 text-[10px] font-mono text-zinc-500 flex justify-between items-center">
        <span>© 2026 BRUTALIST ENGINE</span>
        <button 
          onClick={onReset}
          className="hover:text-white transition-colors"
        >
          RESET SYSTEM
        </button>
      </div>

    </div>
  );
};
