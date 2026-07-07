import { useState, useEffect } from "react";
import { defaultResumeData } from "./defaultData";
import { ResumeData } from "./types";
import { EditorPanel } from "./components/EditorPanel";
import { ResumeSheet } from "./components/ResumeSheet";
import { Edit, Eye, Sparkles, Printer, Download } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function App() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [slashedO, setSlashedO] = useState(true);
  const [paperStyle, setPaperStyle] = useState<"grid" | "ruled" | "blank">("blank");
  const [clipColor, setClipColor] = useState<"black" | "silver" | "gold" | "blue">("black");
  const [tapeColor, setTapeColor] = useState<"translucent" | "yellow" | "pink">("translucent");
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [themeStyle, setThemeStyle] = useState<"desivintage" | "notebook">("desivintage");
  const [layoutMode, setLayoutMode] = useState<"vertical" | "horizontal">("horizontal");
  const [primaryFont, setPrimaryFont] = useState<string>("sans");
  const [badgeFont, setBadgeFont] = useState<string>("mono");
  const [printZoom, setPrintZoom] = useState<number>(64); // default to 64% to fit A4 gracefully
  
  // Automatically adjust optimal print zoom when switching layout modes
  useEffect(() => {
    setPrintZoom(layoutMode === "horizontal" ? 64 : 54); // vertical is taller, needs 54% to fit exactly on A4
  }, [layoutMode]);
  
  // Show/hide sidebar editor (Default to false for full screen print-centric view!)
  const [showEditor, setShowEditor] = useState(false);
  const [showPrintIframeModal, setShowPrintIframeModal] = useState(false);

  const handlePrint = () => {
    const isIFrame = typeof window !== "undefined" && window.self !== window.top;
    if (isIFrame) {
      setShowPrintIframeModal(true);
    } else {
      window.focus();
      window.print();
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("resume-pdf-target");
    if (!element) return;
    
    // Save original styles
    const originalTransform = element.style.transform;
    const originalZoom = element.style.zoom;
    
    // Reset any scaling that might mess up canvas rendering
    element.style.transform = "none";
    element.style.zoom = "1";
    
    try {
      const isLandscape = layoutMode === "horizontal";
      
      const opt = {
        margin:       0,
        filename:     `resume_${data.fullName.replace(/\\s+/g, '_').toLowerCase() || 'document'}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: (isLandscape ? 'landscape' : 'portrait') as 'landscape' | 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error: any) {
      console.error("PDF generation failed:", error);
      alert("Failed: " + error.message);
    } finally {
      // Restore styles
      element.style.transform = originalTransform;
      element.style.zoom = originalZoom;
    }
  };

  const handleReset = () => {
    setData(defaultResumeData);
  };

  const handleClear = () => {
    setData({
      fullName: "",
      title: "",
      profile: "",
      contact: {
        phone: "",
        email: "",
        location: "",
        github: "",
        linkedin: "",
        website: ""
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      quickBadges: ["", "", "", "", "", ""],
      signatureText: ""
    });
  };

  return (
    <div id="app-root-container" className="flex h-screen bg-zinc-950 overflow-hidden relative">
      
      {/* LEFT PANE: Resume Editor & AI Parser (Toggled via showEditor, hidden by default on screen) */}
      <div 
        className={`h-full shrink-0 border-r border-zinc-800/80 transition-all duration-300 no-print ${
          showEditor ? "w-full md:w-[420px] block" : "hidden"
        }`}
      >
        <EditorPanel 
          data={data}
          onChange={setData}
          onReset={handleReset}
          onClear={handleClear}
          onPrint={handlePrint}
          slashedO={slashedO}
          setSlashedO={setSlashedO}
          paperStyle={paperStyle}
          setPaperStyle={setPaperStyle}
          clipColor={clipColor}
          setClipColor={setClipColor}
          tapeColor={tapeColor}
          setTapeColor={setTapeColor}
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
          themeStyle={themeStyle}
          setThemeStyle={setThemeStyle}
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          primaryFont={primaryFont}
          setPrimaryFont={setPrimaryFont}
          badgeFont={badgeFont}
          setBadgeFont={setBadgeFont}
          printZoom={printZoom}
          setPrintZoom={setPrintZoom}
        />
      </div>

      {/* RIGHT PANE: Clean Mockup Live Previewer & Print Core */}
      <div 
        id="resume-print-pane"
        className={`flex-1 h-full overflow-y-auto bg-zinc-950 p-4 md:p-8 flex flex-col items-center justify-start print-pane-container ${
          showEditor ? "hidden md:flex" : "flex"
        }`}
      >
        {/* TOP CONTROL BAR (Only visible on screen, hidden on physical or file printing) */}
        <div className="w-full max-w-[800px] mb-6 px-4 py-3 bg-zinc-900 border border-zinc-800/80 rounded-lg flex items-center justify-between no-print shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white font-display font-black text-sm select-none">
              R
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-200 uppercase tracking-wider font-bold block leading-none">
                RESUME DOCUMENT
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mt-1 leading-none">
                {showEditor ? "CO-EDITING DETAILS" : "CLEAN PREVIEW & SAVE"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono text-xs font-bold rounded-md border border-zinc-700/40 transition-all cursor-pointer"
              title={showEditor ? "Close editor sidebar" : "Open editor sidebar"}
            >
              <Edit className="w-3.5 h-3.5 text-amber-500" />
              <span>{showEditor ? "HIDE EDITOR" : "EDIT RESUME"}</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold rounded-md transition-all shadow-md cursor-pointer"
              title="Download as PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-md transition-all shadow-md cursor-pointer animate-pulse hover:animate-none"
              title="Print via Browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
          </div>
        </div>

        {/* Dynamic PDF printing landscape/portrait orientation override and zoom scaling style injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: ${layoutMode === "horizontal" ? "A4 landscape" : "A4 portrait"};
              margin: 0 !important;
            }
            html, body, #root {
              margin: 0 !important;
              padding: 0 !important;
              background-color: transparent !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-container {
              width: 100% !important;
              display: block !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print-scale-wrapper {
              width: 100% !important;
              max-width: none !important;
              display: flex !important;
              justify-content: center !important;
              zoom: ${printZoom}% !important;
            }
            .outer-folder {
              max-height: none !important;
              margin: 0 auto !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .print-page {
              width: 100% !important;
              height: 100% !important;
              min-height: 0 !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              overflow: hidden !important;
              border-radius: 0 !important;
            }
            /* Avoid any awkward layout splits */
            .border-2.border-zinc-950, .outer-folder, .print-page {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          }
        `}} />

        {/* Centered Resume Sheet */}
        <div className={`print-scale-wrapper w-full ${layoutMode === "horizontal" ? "max-w-[1150px]" : "max-w-[800px]"} py-2 transition-all duration-300`}>
          <div id="resume-pdf-target" className="w-full flex justify-center">
            <ResumeSheet 
              data={data}
              slashedO={slashedO}
              paperStyle={paperStyle}
              clipColor={clipColor}
              tapeColor={tapeColor}
              showAnnotations={showAnnotations}
              themeStyle={themeStyle}
              layoutMode={layoutMode}
              primaryFont={primaryFont}
              badgeFont={badgeFont}
            />
          </div>
        </div>
      </div>

      {/* FLOATING RESPONSIVE TOGGLE BAR (Only visible on mobile screens, hidden on print) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md z-50 md:hidden no-print">
        <button
          onClick={() => setShowEditor(true)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
            showEditor 
              ? "bg-red-600 text-white shadow-sm" 
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Edit className="w-3.5 h-3.5" />
          <span>EDIT</span>
        </button>
        <div className="w-[1px] h-4 bg-zinc-800" />
        <button
          onClick={() => setShowEditor(false)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
            !showEditor 
              ? "bg-red-600 text-white shadow-sm" 
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>PREVIEW</span>
        </button>
      </div>

      {showPrintIframeModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] p-4 no-print animate-fade-in">
          <div className="bg-zinc-900 border-2 border-red-600 max-w-md w-full rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(220,38,38,0.25)] font-mono text-zinc-300">
            <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0 animate-bounce" />
                <span>Iframe Print Security Blocked</span>
              </div>
              <button 
                onClick={() => setShowPrintIframeModal(false)}
                className="text-white hover:text-red-200 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Because you are currently viewing inside the <strong className="text-white">AI Studio preview frame</strong>, your web browser blocks direct print/save requests for security.
              </p>
              
              <div className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">HOW TO EXPORT IN SECONDS:</span>
                <ol className="text-[11px] text-zinc-400 space-y-1.5 list-decimal pl-4">
                  <li>Click the <strong className="text-white">OPEN IN NEW TAB NOW</strong> button below (or use the ↗ arrow at the top right of your preview).</li>
                  <li>Click the red <strong className="text-white">PRINT / SAVE AS PDF</strong> button on that page.</li>
                  <li>In the browser printer menu, set Destination to <strong className="text-white">"Save as PDF"</strong>, ensure background graphics are enabled, and hit Save!</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    window.open(window.location.href, "_blank");
                    setShowPrintIframeModal(false);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 py-2 px-4 rounded font-bold text-xs text-center transition-all cursor-pointer shadow-md"
                >
                  OPEN IN NEW TAB NOW ↗
                </button>
                
                <button
                  onClick={() => setShowPrintIframeModal(false)}
                  className="bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white py-2 px-4 rounded font-bold text-xs transition-all cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
