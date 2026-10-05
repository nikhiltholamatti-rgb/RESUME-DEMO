import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, MessageSquareHeart, LogOut, User, 
  Sparkles, RotateCcw, Check, Cloud, Database, 
  ChevronDown, ExternalLink, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  onOpenFeedback, 
  onLoadSample, 
  onClearData, 
  saveStatus = 'saved' // 'saved' | 'saving' | 'local'
}) {
  const { user, logout, isDemoUser, isSupabaseConfigured } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setMenuOpen(false);
    } catch (e) {
      console.warn('Logout error:', e);
    } finally {
      setLoggingOut(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.user_metadata?.avatar_url || null;

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 bg-white/80 backdrop-blur-xl border-b border-amber-200/50 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-md shadow-amber-300/40 border border-amber-200">
            <FileText className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">
                Resume<span className="text-amber-500">Forge</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                Pro Builder
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium">
              3D Interactive ATS Resume Studio
            </p>
          </div>
        </div>

        {/* Center: Save state & Quick actions */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          {/* Sync indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/80">
            {saveStatus === 'saving' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span className="font-medium">Syncing...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span className="font-medium text-slate-700">Autosaved</span>
              </>
            )}
          </div>

          {/* Quick Load Sample Data */}
          <button
            type="button"
            onClick={onLoadSample}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold transition cursor-pointer"
            title="Populate builder with rich senior software architect sample data"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Load Sample Data</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onClick={onClearData}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition cursor-pointer"
            title="Reset form fields"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Right: Feedback & User Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Feedback Button */}
          <button
            type="button"
            onClick={onOpenFeedback}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-amber-50/80 border border-amber-300 text-slate-800 text-xs font-bold shadow-xs hover:shadow transition duration-150 cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Feedback & Reviews</span>
          </button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-1 pl-2 sm:pr-3 rounded-full sm:rounded-xl bg-slate-100 hover:bg-amber-100/60 border border-slate-200 text-xs font-semibold text-slate-800 transition cursor-pointer"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-7 h-7 rounded-full object-cover border border-amber-300"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden md:inline max-w-[110px] truncate">{userName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="p-3 bg-amber-50/70 rounded-xl mb-1.5 border border-amber-100">
                  <div className="font-bold text-slate-900 truncate">{userName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10.5px]">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-600 font-medium">
                      {isDemoUser ? 'Guest Session' : 'Verified Member'}
                    </span>
                  </div>
                </div>

                {/* Mobile Sample actions */}
                <div className="lg:hidden space-y-1 py-1 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => { onLoadSample(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-amber-50 hover:text-amber-900 font-medium text-left"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Load Sample Data</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onClearData(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium text-left"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Data</span>
                  </button>
                </div>

                {/* Database Backend Info */}
                <div className="px-3 py-2 text-[11px] text-slate-500 flex items-center justify-between border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-500" />
                    Supabase Cloud:
                  </span>
                  <span className="font-semibold text-slate-700">
                    {isSupabaseConfigured ? 'Connected' : 'Local Active'}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition text-left cursor-pointer disabled:opacity-60"
                >
                  {loggingOut ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      <span>Signing Out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
