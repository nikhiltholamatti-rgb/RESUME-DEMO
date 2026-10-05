import React, { useRef } from 'react';
import { Upload, Trash2, Camera, User, Check, RefreshCw } from 'lucide-react';
import { sampleAvatars } from '../data/initialResumeData';

export default function PhotoUploader({ 
  photoUrl, 
  photoShape = 'circle', 
  onChangePhoto, 
  onChangeShape 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        onChangePhoto(uploadEvent.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/80 mb-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Photo Preview Container */}
        <div className="relative group shrink-0">
          {photoUrl ? (
            <div className="relative">
              <img
                src={photoUrl}
                alt="Profile Preview"
                className={`w-20 h-20 object-cover border-2 border-amber-400 shadow-sm ${
                  photoShape === 'circle' 
                    ? 'rounded-full' 
                    : photoShape === 'rounded' 
                    ? 'rounded-2xl' 
                    : 'rounded-none'
                }`}
              />
              <button
                type="button"
                onClick={() => onChangePhoto('')}
                className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
                title="Remove photo"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`w-20 h-20 bg-white border-2 border-dashed border-amber-300 hover:border-amber-500 flex flex-col items-center justify-center text-amber-700 cursor-pointer transition ${
                photoShape === 'circle' 
                  ? 'rounded-full' 
                  : photoShape === 'rounded' 
                  ? 'rounded-2xl' 
                  : 'rounded-none'
              }`}
            >
              <Camera className="w-6 h-6 text-amber-500 mb-0.5" />
              <span className="text-[10px] font-bold">Upload</span>
            </div>
          )}
        </div>

        {/* Controls & Shapes */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{photoUrl ? 'Change Image' : 'Select Photo'}</span>
            </button>

            {photoUrl && (
              <button
                type="button"
                onClick={() => onChangePhoto('')}
                className="px-2.5 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          {/* Shape Selector */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Shape:</span>
            <div className="flex bg-white p-0.5 rounded-lg border border-amber-200">
              <button
                type="button"
                onClick={() => onChangeShape('circle')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                  photoShape === 'circle' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-600'
                }`}
              >
                Circle
              </button>
              <button
                type="button"
                onClick={() => onChangeShape('rounded')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                  photoShape === 'rounded' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-600'
                }`}
              >
                Rounded
              </button>
              <button
                type="button"
                onClick={() => onChangeShape('square')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                  photoShape === 'square' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-600'
                }`}
              >
                Square
              </button>
            </div>
          </div>

          {/* Sample Avatars one-click */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2.5">
            <span className="text-[10px] text-slate-400 font-medium">Sample Headshots:</span>
            <div className="flex gap-1.5">
              {sampleAvatars.map((av, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChangePhoto(av)}
                  className="w-5 h-5 rounded-full overflow-hidden border border-amber-300 hover:scale-110 transition"
                  title="Use sample avatar"
                >
                  <img src={av} alt="Sample" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
