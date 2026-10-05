import React, { useRef, useEffect, useState } from 'react';
import { Hammer, Sparkles, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import TemplateRenderer from '../templates/TemplateRenderer';

export default function LivePreview({
  templateId,
  resumeData,
  theme,
  withPhoto,
  zoom,
  onBuildResume
}) {
  const sheetRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Monitor sheet height to warn on page overflow
  useEffect(() => {
    if (sheetRef.current) {
      setContentHeight(sheetRef.current.offsetHeight);
    }
  });

  // A4 at 96 DPI is approx 794px width x 1123px height
  const standardA4HeightPx = 1123;
  const isOverflowing = contentHeight > standardA4HeightPx + 40;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Page Overflow Status Indicator */}
      <div className="w-full max-w-2xl mb-3 flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/80 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          {isOverflowing ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-amber-900">
                2-Page Layout: Content extends beyond standard 1-page A4 limit
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-800">
                Single Page Perfection: Fits standard A4 format (210 × 297mm)
              </span>
            </>
          )}
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Ratio: 1:1.414 (A4)
        </span>
      </div>

      {/* Sheet Preview Workspace with Zoom Transform */}
      <div className="w-full overflow-x-auto flex justify-center py-4 min-h-[600px] scrollbar-thin">
        <div 
          className="transition-transform duration-200 origin-top flex justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Printable A4 Paper Container */}
          <div
            id="resume-print-area"
            ref={sheetRef}
            className="resume-sheet shadow-sheet rounded-sm border border-slate-200/80 bg-white"
          >
            <TemplateRenderer
              templateId={templateId}
              resumeData={resumeData}
              theme={theme}
              withPhoto={withPhoto}
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar: Build Resume */}
      <div className="sticky bottom-6 z-30 w-full max-w-md mx-auto mt-4 px-4">
        <button
          type="button"
          onClick={onBuildResume}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer border border-amber-300"
        >
          <Hammer className="w-5 h-5 text-slate-950" />
          <span>Build Resume & Generate ATS PDF</span>
          <Sparkles className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
}
