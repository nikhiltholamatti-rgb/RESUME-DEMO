import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import Background3D from './components/Background3D';
import LoginModal from './components/LoginModal';
import ResetPasswordModal from './components/ResetPasswordModal';
import Navbar from './components/Navbar';
import FeedbackModal from './components/FeedbackModal';
import ResumeForm from './components/ResumeForm';
import CustomizationBar from './components/CustomizationBar';
import LivePreview from './components/LivePreview';
import BuildAndDownloadModal from './components/BuildAndDownloadModal';
import { sampleResumeData, emptyResumeData } from './data/initialResumeData';
import { COLOR_PALETTES } from './data/templateConfig';
import { databaseService } from './lib/supabaseClient';

export default function App() {
  const { user, loading: authLoading, isDemoUser, isRecoveryMode } = useAuth();

  // Resume Form Data State
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeforge_active_resume');
    return saved ? JSON.parse(saved) : sampleResumeData;
  });

  // Template & Theme Customization State
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('resumeforge_active_template') || 'duo-blue';
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('resumeforge_active_theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        // fallback
      }
    }
    return {
      palette: COLOR_PALETTES[0], // Navy
      fontId: 'Inter',
      fontFamily: "'Inter', sans-serif",
      fontSizeId: 'md',
      lineSpacingId: 'normal',
    };
  });

  const [withPhoto, setWithPhoto] = useState(() => {
    const savedWithPhoto = localStorage.getItem('resumeforge_with_photo');
    return savedWithPhoto !== null ? JSON.parse(savedWithPhoto) : true;
  });

  // UI Interactive States
  const [activeSection, setActiveSection] = useState('personal');
  const [zoom, setZoom] = useState(0.85);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);

  // Autosave Timer Reference
  const autosaveTimerRef = useRef(null);

  // Route URL Synchronization & Protection
  useEffect(() => {
    if (authLoading) return;
    const path = window.location.pathname;

    if (user) {
      if (path === '/login' || path === '/reset-password') {
        window.history.replaceState({}, document.title, '/');
      }
    } else {
      if (path === '/workspace' || path === '/dashboard') {
        window.history.replaceState({}, document.title, '/login');
      }
    }
  }, [user, authLoading]);

  // Debounced Autosave to localStorage and Supabase for authenticated user
  useEffect(() => {
    setSaveStatus('saving');

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(async () => {
      // 1. UI Preferences in localStorage
      localStorage.setItem('resumeforge_active_resume', JSON.stringify(resumeData));
      localStorage.setItem('resumeforge_active_template', selectedTemplate);
      localStorage.setItem('resumeforge_active_theme', JSON.stringify(theme));
      localStorage.setItem('resumeforge_with_photo', JSON.stringify(withPhoto));

      // 2. Real Supabase save if user is genuinely authenticated
      if (user?.id && !isDemoUser) {
        try {
          await databaseService.saveResume({
            userId: user.id,
            title: `${resumeData.personalInfo?.fullName || 'My'} Resume`,
            resumeData,
            theme,
            templateId: selectedTemplate,
          });
        } catch (err) {
          console.warn('Supabase autosave error:', err);
        }
      }

      setSaveStatus('saved');
    }, 900);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [resumeData, selectedTemplate, theme, withPhoto, user, isDemoUser]);

  // Load user's saved resume from Supabase upon login
  useEffect(() => {
    let isCancelled = false;

    const loadUserData = async () => {
      if (user?.id && !isDemoUser) {
        try {
          const remoteResume = await databaseService.loadResume(user.id);
          if (!isCancelled && remoteResume && remoteResume.resume_data) {
            setResumeData(remoteResume.resume_data);
            if (remoteResume.template_id) setSelectedTemplate(remoteResume.template_id);
            if (remoteResume.theme) setTheme(remoteResume.theme);
          }
        } catch (e) {
          console.warn('Could not load user resume from Supabase:', e);
        }
      } else if (!user) {
        // Reset when signed out
        const saved = localStorage.getItem('resumeforge_active_resume');
        setResumeData(saved ? JSON.parse(saved) : sampleResumeData);
      }
    };

    loadUserData();

    return () => {
      isCancelled = true;
    };
  }, [user, isDemoUser]);

  // Handlers
  const handleLoadSample = () => {
    if (window.confirm('Load sample senior developer profile? Current changes will be replaced.')) {
      setResumeData(sampleResumeData);
      setWithPhoto(true);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Clear all resume fields and start from scratch?')) {
      setResumeData(emptyResumeData);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* 1. Fixed 3D Animated Ribbon Background */}
      <Background3D />

      {/* 2. Loading Gate: Subtle splash spinner while checking Supabase session */}
      {authLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-300/50 animate-bounce mb-3 border border-amber-200">
            <span className="text-slate-950 font-black text-xl">RF</span>
          </div>
          <div className="text-slate-700 font-bold text-sm tracking-wide">Loading ResumeForge...</div>
        </div>
      )}

      {/* 3. Password Recovery Gate */}
      {isRecoveryMode && <ResetPasswordModal />}

      {/* 4. Login Gate: Modal shown over blurred background if user is not logged in */}
      {!authLoading && !user && !isRecoveryMode && <LoginModal />}

      {/* 5. Top Navbar (Rendered for authenticated user or demo user) */}
      {user && (
        <Navbar
          onOpenFeedback={() => setIsFeedbackOpen(true)}
          onLoadSample={handleLoadSample}
          onClearData={handleClearData}
          saveStatus={saveStatus}
        />
      )}

      {/* 6. Main Two-Column Workspace (Protected: Visible only once authenticated) */}
      {user && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Resume Form (5 cols on lg) */}
            <div className="lg:col-span-5 w-full">
              <div className="sticky top-20">
                <ResumeForm
                  resumeData={resumeData}
                  onChangeResumeData={setResumeData}
                  withPhoto={withPhoto}
                  onToggleWithPhoto={setWithPhoto}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Customization + Live A4 Preview (7 cols on lg) */}
            <div className="lg:col-span-7 w-full flex flex-col">
              {/* Template Picker & Style Controls */}
              <CustomizationBar
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                theme={theme}
                onChangeTheme={setTheme}
                zoom={zoom}
                onZoomChange={setZoom}
                onResetZoom={() => setZoom(0.85)}
              />

              {/* Live A4 Sheet Preview */}
              <div className="w-full">
                <LivePreview
                  templateId={selectedTemplate}
                  resumeData={resumeData}
                  theme={theme}
                  withPhoto={withPhoto}
                  zoom={zoom}
                  onBuildResume={() => setIsBuildModalOpen(true)}
                />
              </div>
            </div>

          </div>
        </main>
      )}

      {/* 7. Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 8. Build & Download Export Modal */}
      <BuildAndDownloadModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        resumeData={resumeData}
        theme={theme}
        templateId={selectedTemplate}
        withPhoto={withPhoto}
        onEditAgain={() => setIsBuildModalOpen(false)}
      />
    </div>
  );
}
