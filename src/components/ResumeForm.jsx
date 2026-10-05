import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, Code, Award, 
  Globe2, Heart, Plus, Trash2, ChevronDown, ChevronUp, 
  Sparkles, Check, Eye, EyeOff, GripVertical, FileText,
  Sliders, Image as ImageIcon
} from 'lucide-react';
import PhotoUploader from './PhotoUploader';

export default function ResumeForm({
  resumeData,
  onChangeResumeData,
  withPhoto,
  onToggleWithPhoto,
  activeSection,
  setActiveSection,
}) {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    hobbies = [],
    customSection = { title: 'Custom Section', items: [] }
  } = resumeData;

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Advanced');
  const [newHobby, setNewHobby] = useState('');

  // Update nested helper
  const updatePersonalInfo = (field, value) => {
    onChangeResumeData({
      ...resumeData,
      personalInfo: {
        ...personalInfo,
        [field]: value
      }
    });
  };

  // Summary AI Tone Presets
  const tonePresets = [
    {
      label: '🚀 Tech Lead',
      text: 'Results-driven Senior Engineer with 7+ years of experience architecting resilient cloud systems, accelerating sprint velocity by 35%, and scaling microservices serving millions of active users.'
    },
    {
      label: '💼 Executive',
      text: 'Visionary Strategy Leader with a proven history of scaling high-growth teams, aligning product roadmaps with multimillion-dollar revenue targets, and driving enterprise digital transformation.'
    },
    {
      label: '🎨 Creative',
      text: 'Innovative Product Designer crafting human-centered digital experiences from concept to high-fidelity implementation, specializing in interactive design systems and accessible user journeys.'
    }
  ];

  // Calculate completion percentage
  const calculateProgress = () => {
    let score = 0;
    let total = 7;
    if (personalInfo.fullName && personalInfo.email && personalInfo.phone) score += 1;
    if (summary.length > 30) score += 1;
    if (experience.length > 0) score += 1;
    if (education.length > 0) score += 1;
    if (skills.length >= 3) score += 1;
    if (projects.length > 0) score += 1;
    if (certifications.length > 0 || achievements.length > 0 || languages.length > 0) score += 1;
    return Math.round((score / total) * 100);
  };

  const progressPercent = calculateProgress();

  // Experience handlers
  const addExperience = () => {
    const newItem = {
      id: 'exp_' + Date.now(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChangeResumeData({
      ...resumeData,
      experience: [newItem, ...experience]
    });
  };

  const updateExperienceItem = (id, field, value) => {
    const updated = experience.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChangeResumeData({ ...resumeData, experience: updated });
  };

  const removeExperience = (id) => {
    onChangeResumeData({
      ...resumeData,
      experience: experience.filter(item => item.id !== id)
    });
  };

  // Education handlers
  const addEducation = () => {
    const newItem = {
      id: 'edu_' + Date.now(),
      degree: '',
      school: '',
      location: '',
      year: '',
      grade: '',
      description: ''
    };
    onChangeResumeData({
      ...resumeData,
      education: [...education, newItem]
    });
  };

  const updateEducationItem = (id, field, value) => {
    const updated = education.map(item => item.id === id ? { ...item, [field]: value } : item);
    onChangeResumeData({ ...resumeData, education: updated });
  };

  const removeEducation = (id) => {
    onChangeResumeData({
      ...resumeData,
      education: education.filter(item => item.id !== id)
    });
  };

  // Skills handlers
  const addSkill = (e) => {
    e?.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill = {
      id: 'sk_' + Date.now(),
      name: newSkillName.trim(),
      level: newSkillLevel
    };
    onChangeResumeData({
      ...resumeData,
      skills: [...skills, newSkill]
    });
    setNewSkillName('');
  };

  const removeSkill = (id) => {
    onChangeResumeData({
      ...resumeData,
      skills: skills.filter(s => s.id !== id)
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj = {
      id: 'proj_' + Date.now(),
      name: '',
      tech: '',
      link: '',
      description: ''
    };
    onChangeResumeData({
      ...resumeData,
      projects: [...projects, newProj]
    });
  };

  const updateProject = (id, field, value) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    onChangeResumeData({ ...resumeData, projects: updated });
  };

  const removeProject = (id) => {
    onChangeResumeData({
      ...resumeData,
      projects: projects.filter(p => p.id !== id)
    });
  };

  // Certifications handlers
  const addCertification = () => {
    const newC = {
      id: 'cert_' + Date.now(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    };
    onChangeResumeData({
      ...resumeData,
      certifications: [...certifications, newC]
    });
  };

  const updateCertification = (id, field, value) => {
    const updated = certifications.map(c => c.id === id ? { ...c, [field]: value } : c);
    onChangeResumeData({ ...resumeData, certifications: updated });
  };

  const removeCertification = (id) => {
    onChangeResumeData({
      ...resumeData,
      certifications: certifications.filter(c => c.id !== id)
    });
  };

  // Achievements handlers
  const addAchievement = () => {
    const newA = {
      id: 'ach_' + Date.now(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    onChangeResumeData({
      ...resumeData,
      achievements: [...achievements, newA]
    });
  };

  const updateAchievement = (id, field, value) => {
    const updated = achievements.map(a => a.id === id ? { ...a, [field]: value } : a);
    onChangeResumeData({ ...resumeData, achievements: updated });
  };

  const removeAchievement = (id) => {
    onChangeResumeData({
      ...resumeData,
      achievements: achievements.filter(a => a.id !== id)
    });
  };

  // Languages handlers
  const addLanguage = () => {
    const newL = {
      id: 'lang_' + Date.now(),
      name: '',
      proficiency: 'Fluent'
    };
    onChangeResumeData({
      ...resumeData,
      languages: [...languages, newL]
    });
  };

  const updateLanguage = (id, field, value) => {
    const updated = languages.map(l => l.id === id ? { ...l, [field]: value } : l);
    onChangeResumeData({ ...resumeData, languages: updated });
  };

  const removeLanguage = (id) => {
    onChangeResumeData({
      ...resumeData,
      languages: languages.filter(l => l.id !== id)
    });
  };

  // Hobbies handlers
  const addHobby = (e) => {
    e?.preventDefault();
    if (!newHobby.trim()) return;
    onChangeResumeData({
      ...resumeData,
      hobbies: [...hobbies, newHobby.trim()]
    });
    setNewHobby('');
  };

  const removeHobby = (index) => {
    onChangeResumeData({
      ...resumeData,
      hobbies: hobbies.filter((_, i) => i !== index)
    });
  };

  // Custom Section handlers
  const addCustomItem = () => {
    const newItem = {
      id: 'custom_' + Date.now(),
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    onChangeResumeData({
      ...resumeData,
      customSection: {
        ...customSection,
        items: [...(customSection.items || []), newItem]
      }
    });
  };

  const updateCustomItem = (id, field, value) => {
    const updated = (customSection.items || []).map(item => item.id === id ? { ...item, [field]: value } : item);
    onChangeResumeData({
      ...resumeData,
      customSection: {
        ...customSection,
        items: updated
      }
    });
  };

  const removeCustomItem = (id) => {
    onChangeResumeData({
      ...resumeData,
      customSection: {
        ...customSection,
        items: (customSection.items || []).filter(item => item.id !== id)
      }
    });
  };

  const toggleAccordion = (name) => {
    setActiveSection(activeSection === name ? '' : name);
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Banner: Completion Progress & With Photo Switch */}
      <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          {/* Progress Indicator */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Resume Completeness</span>
              <span className="text-xs font-black text-amber-600 px-2 py-0.5 bg-amber-100 rounded-full">
                {progressPercent}%
              </span>
            </div>
            <div className="w-48 sm:w-56 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* With Photo / Without Photo Switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Format:</span>
            <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => onToggleWithPhoto(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  withPhoto 
                    ? 'bg-amber-400 text-slate-950 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>With Photo</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleWithPhoto(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  !withPhoto 
                    ? 'bg-amber-400 text-slate-950 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>No Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Photo Upload Area if withPhoto is active */}
        {withPhoto && (
          <PhotoUploader
            photoUrl={personalInfo.photoUrl}
            photoShape={personalInfo.photoShape}
            onChangePhoto={(url) => updatePersonalInfo('photoUrl', url)}
            onChangeShape={(shape) => updatePersonalInfo('photoShape', shape)}
          />
        )}
      </div>

      {/* Accordion Sections */}

      {/* 1. PERSONAL DETAILS */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('personal')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">1. Personal Information</span>
              <span className="text-[11px] text-slate-500">Contact, location & links</span>
            </div>
          </div>
          {activeSection === 'personal' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'personal' && (
          <div className="p-4 pt-0 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={personalInfo.fullName || ''}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="e.g. Alexander Vance"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Job / Target Title *</label>
              <input
                type="text"
                value={personalInfo.jobTitle || ''}
                onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                placeholder="e.g. Senior Cloud Architect"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={personalInfo.email || ''}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="alex@techcorp.io"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={personalInfo.phone || ''}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location (City, Country)</label>
              <input
                type="text"
                value={personalInfo.location || ''}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Portfolio / Website</label>
              <input
                type="text"
                value={personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="https://alexvance.dev"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/alexvance"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">GitHub / Code Repository</label>
              <input
                type="text"
                value={personalInfo.github || ''}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                placeholder="github.com/alexvance"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('summary')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">2. Professional Summary</span>
              <span className="text-[11px] text-slate-500">
                {summary.length} characters • High ATS impact
              </span>
            </div>
          </div>
          {activeSection === 'summary' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'summary' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-3">
            {/* AI Tone Suggestions */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">Quick AI Tone Inspiration:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tonePresets.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChangeResumeData({ ...resumeData, summary: t.text })}
                    className="text-[10.5px] px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg transition"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => onChangeResumeData({ ...resumeData, summary: e.target.value })}
                placeholder="Highlight your high-level achievements, years of experience, core technical specialties, and unique value proposition..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <div className="text-[10px] text-slate-400 text-right mt-1">
                {summary.length} / 500 characters
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('experience')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">3. Work Experience</span>
              <span className="text-[11px] text-slate-500">{experience.length} positions added</span>
            </div>
          </div>
          {activeSection === 'experience' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'experience' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Role #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition"
                    title="Remove experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Job Title (e.g. Staff Software Engineer)"
                    value={exp.role}
                    onChange={(e) => updateExperienceItem(exp.id, 'role', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (e.g. Google Cloud)"
                    value={exp.company}
                    onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Seattle, WA / Remote)"
                    value={exp.location}
                    onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Start (2020)"
                      value={exp.startDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                      className="w-1/2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <input
                      type="text"
                      placeholder={exp.current ? 'Present' : 'End (2023)'}
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                      className="w-1/2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`curr-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperienceItem(exp.id, 'current', e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor={`curr-${exp.id}`} className="text-[11px] text-slate-600 font-medium">
                    I currently work here
                  </label>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Key achievements and responsibilities (one bullet point per line):&#10;• Spearheaded migration of microservices reducing API latency by 30%&#10;• Led team of 6 engineers across high-throughput data pipelines"
                    value={exp.description}
                    onChange={(e) => updateExperienceItem(exp.id, 'description', e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-dashed border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Work Experience</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. EDUCATION */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('education')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">4. Education</span>
              <span className="text-[11px] text-slate-500">{education.length} degrees added</span>
            </div>
          </div>
          {activeSection === 'education' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'education' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-4">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Degree #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Degree (e.g. B.S. in Computer Science)"
                    value={edu.degree}
                    onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="University / Institute (e.g. Stanford University)"
                    value={edu.school}
                    onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Years (e.g. 2016 – 2020)"
                    value={edu.year}
                    onChange={(e) => updateEducationItem(edu.id, 'year', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Grade / CGPA (e.g. 3.9 / 4.0)"
                    value={edu.grade}
                    onChange={(e) => updateEducationItem(edu.id, 'grade', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-dashed border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Education Entry</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('skills')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">5. Skills & Competencies</span>
              <span className="text-[11px] text-slate-500">{skills.length} skills listed</span>
            </div>
          </div>
          {activeSection === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'skills' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-3">
            {/* Add skill input bar */}
            <form onSubmit={addSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add skill (e.g. React, Docker, Python)..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-slate-800"
                >
                  <span>{skill.name}</span>
                  {skill.level && <span className="text-[10px] text-amber-700">({skill.level})</span>}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. PROJECTS */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('projects')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">6. Projects</span>
              <span className="text-[11px] text-slate-500">{projects.length} projects showcased</span>
            </div>
          </div>
          {activeSection === 'projects' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'projects' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-4">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Project Name (e.g. AI Resume Builder)"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (e.g. React, Three.js, Supabase)"
                    value={proj.tech}
                    onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Live Link / GitHub (e.g. https://myproject.app)"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    className="sm:col-span-2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Project description, impact, metrics, or architecture notes..."
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-dashed border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS & ACHIEVEMENTS */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('certifications')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">7. Certifications & Honors</span>
              <span className="text-[11px] text-slate-500">{certifications.length + achievements.length} entries</span>
            </div>
          </div>
          {activeSection === 'certifications' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'certifications' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-4">
            {/* Certifications list */}
            <div>
              <span className="text-xs font-bold text-slate-800 mb-2 block">Certifications & Credentials</span>
              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Issuer (e.g. AWS)"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      className="w-32 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Certification</span>
                </button>
              </div>
            </div>

            {/* Achievements list */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 mb-2 block">Awards & Key Accolades</span>
              <div className="space-y-2.5">
                {achievements.map((ach) => (
                  <div key={ach.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Award Title (e.g. Hackathon Winner)"
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      value={ach.issuer}
                      onChange={(e) => updateAchievement(ach.id, 'issuer', e.target.value)}
                      className="w-32 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(ach.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Award</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 8. LANGUAGES & HOBBIES */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('languages')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">8. Languages & Interests</span>
              <span className="text-[11px] text-slate-500">{languages.length} languages • {hobbies.length} interests</span>
            </div>
          </div>
          {activeSection === 'languages' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'languages' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-4">
            {/* Languages */}
            <div>
              <span className="text-xs font-bold text-slate-800 mb-2 block">Languages Spoken</span>
              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Language (e.g. English)"
                      value={l.name}
                      onChange={(e) => updateLanguage(l.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Proficiency (e.g. Native, Fluent)"
                      value={l.proficiency}
                      onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value)}
                      className="w-36 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeLanguage(l.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Language</span>
                </button>
              </div>
            </div>

            {/* Hobbies / Interests */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 mb-2 block">Interests & Hobbies</span>
              <form onSubmit={addHobby} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  placeholder="e.g. Chess, Astronomy, Open Source..."
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Add
                </button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {hobbies.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full text-xs"
                  >
                    <span>{h}</span>
                    <button
                      type="button"
                      onClick={() => removeHobby(i)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 9. CUSTOM SECTION */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={() => toggleAccordion('custom')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                9. {customSection.title || 'Custom Section'}
              </span>
              <span className="text-[11px] text-slate-500">Patents, volunteer work, publications</span>
            </div>
          </div>
          {activeSection === 'custom' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {activeSection === 'custom' && (
          <div className="p-4 pt-0 border-t border-slate-100 mt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Section Title</label>
              <input
                type="text"
                value={customSection.title}
                onChange={(e) => onChangeResumeData({
                  ...resumeData,
                  customSection: { ...customSection, title: e.target.value }
                })}
                placeholder="e.g. Publications, Patents, Volunteering"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              {(customSection.items || []).map((it, idx) => (
                <div key={it.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomItem(it.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Patent US-11894291)"
                      value={it.title}
                      onChange={(e) => updateCustomItem(it.id, 'title', e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle / Issuer"
                      value={it.subtitle}
                      onChange={(e) => updateCustomItem(it.id, 'subtitle', e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Details or summary..."
                    value={it.description}
                    onChange={(e) => updateCustomItem(it.id, 'description', e.target.value)}
                    className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addCustomItem}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-dashed border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item to {customSection.title}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
