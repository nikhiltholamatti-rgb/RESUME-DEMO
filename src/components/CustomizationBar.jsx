import React, { useState } from 'react';
import { 
  Palette, Type, ZoomIn, ZoomOut, Maximize2, 
  RotateCcw, Sliders, Check, Sparkles, ChevronRight, ChevronLeft
} from 'lucide-react';
import { 
  TEMPLATES_LIST, COLOR_PALETTES, FONT_OPTIONS, 
  FONT_SIZES, LINE_SPACINGS 
} from '../data/templateConfig';

export default function CustomizationBar({
  selectedTemplate,
  onSelectTemplate,
  theme,
  onChangeTheme,
  zoom,
  onZoomChange,
  onResetZoom
}) {
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);

  const activeTemplateObj = TEMPLATES_LIST.find(t => t.id === selectedTemplate) || TEMPLATES_LIST[0];
  const isMonochrome = activeTemplateObj.isMonochrome;

  return (
    <div className="space-y-4 mb-4">
      {/* 1. TEMPLATE PICKER: Horizontal Scrollable Cards */}
      <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Select Template
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
              {TEMPLATES_LIST.length} ATS Designs
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Active: <span className="font-bold text-slate-900">{activeTemplateObj.name}</span>
          </span>
        </div>

        {/* Scrollable Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-amber-300">
          {TEMPLATES_LIST.map((template) => {
            const isSelected = template.id === selectedTemplate;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelectTemplate(template.id)}
                className={`flex-shrink-0 w-36 text-left p-2.5 rounded-xl border-2 transition-all relative group cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                {/* Visual miniature mockup */}
                <div className={`h-20 rounded-lg p-2 flex flex-col justify-between mb-2 shadow-xs border ${template.previewBg}`}>
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-3.5 h-3.5 rounded-full shrink-0" 
                      style={{ backgroundColor: template.headerColor }} 
                    />
                    <div className="h-1.5 w-12 bg-slate-300 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                    <div className="h-1 w-3/5 bg-slate-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                    <span>A4</span>
                    {template.isMonochrome ? (
                      <span className="text-slate-600">B&W</span>
                    ) : (
                      <span className="text-amber-600">Color</span>
                    )}
                  </div>
                </div>

                {/* Template metadata */}
                <div className="text-xs font-bold text-slate-900 truncate">
                  {template.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {template.badge}
                </div>

                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CUSTOMIZATION TOOLBAR: Fonts, Colors, Sizing, Zoom */}
      <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* FONT SELECTOR */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-amber-500" />
              <span>Font Style</span>
            </label>
            <select
              value={theme.fontId}
              onChange={(e) => {
                const selected = FONT_OPTIONS.find(f => f.id === e.target.value);
                onChangeTheme({
                  ...theme,
                  fontId: selected.id,
                  fontFamily: selected.family
                });
              }}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.id} value={f.id} style={{ fontFamily: f.family }}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* FONT SIZE & SPACING */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Scale & Line Height
            </label>
            <div className="flex items-center gap-2">
              {/* Size */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {FONT_SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => onChangeTheme({ ...theme, fontSizeId: sz.id })}
                    className={`px-2 py-1 text-[11px] font-bold rounded ${
                      theme.fontSizeId === sz.id 
                        ? 'bg-amber-400 text-slate-950 shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sz.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Spacing */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {LINE_SPACINGS.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => onChangeTheme({ ...theme, lineSpacingId: sp.id })}
                    className={`px-2 py-1 text-[11px] font-bold rounded ${
                      theme.lineSpacingId === sp.id 
                        ? 'bg-amber-400 text-slate-950 shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={sp.label}
                  >
                    {sp.id === 'tight' ? 'S' : sp.id === 'normal' ? 'M' : 'L'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLOR PALETTES */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-500" />
                <span>Color Theme</span>
              </label>
              <button
                type="button"
                onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
                className="text-[10px] text-amber-700 hover:underline font-bold"
              >
                {showCustomColorPicker ? 'Presets' : 'Custom'}
              </button>
            </div>

            {isMonochrome ? (
              <div className="text-[11px] text-slate-500 italic py-1">
                Monochrome ATS Template (Colors disabled)
              </div>
            ) : showCustomColorPicker ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span>Main:</span>
                  <input
                    type="color"
                    value={theme.palette?.primary || '#1E3A8A'}
                    onChange={(e) => onChangeTheme({
                      ...theme,
                      palette: { ...theme.palette, primary: e.target.value }
                    })}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span>Accent:</span>
                  <input
                    type="color"
                    value={theme.palette?.secondary || '#3B82F6'}
                    onChange={(e) => onChangeTheme({
                      ...theme,
                      palette: { ...theme.palette, secondary: e.target.value }
                    })}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLOR_PALETTES.map((pal) => {
                  const isActive = theme.palette?.name === pal.name || theme.palette?.id === pal.id;
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => onChangeTheme({ ...theme, palette: pal })}
                      className={`w-5 h-5 rounded-full relative transition-transform hover:scale-110 shadow-xs border ${
                        isActive ? 'ring-2 ring-amber-500 ring-offset-1 scale-110' : 'border-slate-300'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${pal.primary} 50%, ${pal.secondary} 50%)`
                      }}
                      title={pal.name}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* ZOOM & SCALE CONTROLS */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-[11px] font-bold text-slate-500">Zoom:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => onZoomChange(Math.max(0.45, zoom - 0.1))}
                className="p-1 hover:bg-white rounded text-slate-700 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onResetZoom}
                className="px-2 py-0.5 text-[11px] font-bold text-slate-800 hover:bg-white rounded transition"
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
                className="p-1 hover:bg-white rounded text-slate-700 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
