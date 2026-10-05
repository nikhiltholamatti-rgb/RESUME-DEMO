import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, FileText, Image as ImageIcon, Printer, 
  CheckCircle, ArrowLeft, Sparkles, Shield, AlertCircle, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from '../context/AuthContext';
import TemplateRenderer from '../templates/TemplateRenderer';

export default function BuildAndDownloadModal({
  isOpen,
  onClose,
  resumeData,
  theme,
  templateId,
  withPhoto,
  onEditAgain
}) {
  const { user } = useAuth();
  const [phase, setPhase] = useState('building'); // 'building' | 'success' | 'downloading'
  const [downloadProgress, setDownloadProgress] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('pdf'); // 'pdf' | 'png' | 'print'
  const [validationError, setValidationError] = useState('');

  const personalInfo = resumeData?.personalInfo || {};
  const firstName = personalInfo.fullName?.split(' ')[0] || 'My';
  const lastName = personalInfo.fullName?.split(' ').slice(1).join('_') || 'Resume';
  const fileNameBase = `${firstName}_${lastName}_Resume`.replace(/[^a-zA-Z0-9_-]/g, '');

  useEffect(() => {
    if (isOpen) {
      // Validate required fields
      if (!personalInfo.fullName?.trim() || !personalInfo.email?.trim() || !personalInfo.phone?.trim()) {
        setValidationError('Please complete the required fields (Full Name, Email, and Phone) before building your resume.');
        setPhase('error');
        return;
      }

      setValidationError('');
      setPhase('building');

      // Forge simulation animation
      const timer = setTimeout(() => {
        setPhase('success');
        // Trigger celebratory confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F5D100', '#FFE45C', '#18181B', '#3B82F6', '#10B981']
          });
        } catch (e) {
          // ignore if canvas-confetti is not loaded
        }
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleDownload = async (format = 'pdf') => {
    setDownloadFormat(format);
    setPhase('downloading');
    setDownloadProgress('Capturing high-resolution document...');

    const element = document.getElementById('modal-resume-render');
    if (!element) {
      alert('Could not locate resume element for rendering.');
      setPhase('success');
      return;
    }

    try {
      // High-res canvas rendering with scale: 2 for print clarity
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      if (format === 'png') {
        setDownloadProgress('Exporting crisp PNG image...');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `${fileNameBase}.png`;
        link.click();
      } else if (format === 'print') {
        window.print();
      } else {
        // PDF default
        setDownloadProgress('Generating ATS-compliant A4 PDF...');
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        // Additional pages if content overflows past 1 A4 page
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pdfHeight;
        }

        pdf.save(`${fileNameBase}.pdf`);
      }
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to generate export file. Please try again or use direct print.');
    } finally {
      setPhase('success');
      setDownloadProgress('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {phase === 'building' ? 'Forging Your Resume...' : 'Resume Ready for Export'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Target: {fileNameBase}.pdf
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {/* 1. Validation Error State */}
          {phase === 'error' && (
            <div className="py-8 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Missing Required Fields</h4>
              <p className="text-xs text-slate-600 mb-6">{validationError}</p>
              <button
                type="button"
                onClick={() => { onClose(); onEditAgain(); }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-500 transition"
              >
                Go Back & Complete Information
              </button>
            </div>
          )}

          {/* 2. Building Loading State */}
          {phase === 'building' && (
            <div className="py-14 text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-600 animate-bounce" />
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-1">
                Forging your resume with ATS-ready precision...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Aligning typography, applying color tokens, and validating section layout for maximum recruiter impact.
              </p>
            </div>
          )}

          {/* 3. Success & Download Controls */}
          {(phase === 'success' || phase === 'downloading') && (
            <div>
              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Resume Built Successfully!</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Choose your export format below or click edit to make adjustments.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Download PDF Button */}
                  <button
                    type="button"
                    disabled={phase === 'downloading'}
                    onClick={() => handleDownload('pdf')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF (Recommended)</span>
                  </button>

                  {/* Download PNG */}
                  <button
                    type="button"
                    disabled={phase === 'downloading'}
                    onClick={() => handleDownload('png')}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>PNG Image</span>
                  </button>

                  {/* Print */}
                  <button
                    type="button"
                    disabled={phase === 'downloading'}
                    onClick={() => handleDownload('print')}
                    className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Progress message if exporting */}
              {phase === 'downloading' && (
                <div className="flex items-center justify-center gap-2 p-3 mb-4 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{downloadProgress}</span>
                </div>
              )}

              {/* Full-size High-Res Document Preview Box */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-100 max-h-[500px] overflow-y-auto flex justify-center">
                <div 
                  id="modal-resume-render"
                  className="w-[210mm] min-h-[297mm] bg-white shadow-xl origin-top transform scale-85 sm:scale-95"
                >
                  <TemplateRenderer
                    templateId={templateId}
                    resumeData={resumeData}
                    theme={theme}
                    withPhoto={withPhoto}
                  />
                </div>
              </div>

              {/* Bottom footer button: Edit Again */}
              <div className="mt-5 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => { onClose(); onEditAgain(); }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Again</span>
                </button>

                <div className="text-[11px] text-slate-400">
                  Logged in as <span className="font-semibold text-slate-700">{user?.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
