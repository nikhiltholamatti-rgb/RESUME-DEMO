import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Terminal } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function CrazyGradient({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};

  const primaryColor = theme?.palette?.primary || '#7C3AED'; // Vibrant Violet
  const secondaryColor = theme?.palette?.secondary || '#EC4899'; // Hot Fuchsia/Pink
  const fontClass = theme?.fontFamily || "'Poppins', sans-serif";

  return (
    <div 
      className="w-full bg-slate-50/50 text-slate-800 p-6 sm:p-8 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Eye-catching Gradient Header Banner */}
      <div 
        className="relative rounded-2xl p-6 sm:p-8 text-white shadow-lg overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` 
        }}
      >
        {/* Soft background glow circles */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-black/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {withPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`w-28 h-28 object-cover border-4 border-white/80 shadow-2xl shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-2xl'}`}
            />
          )}

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Verified Professional
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-medium opacity-90 mt-1">
              {personalInfo.jobTitle || 'Lead Software Specialist'}
            </p>

            {/* Contact Pills in Header */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 text-xs">
              {personalInfo.email && (
                <span className="bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Linkedin className="w-3 h-3" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {summary && (
        <div className="mt-5 p-4 rounded-xl bg-white shadow-sm border border-slate-200/80">
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </div>
      )}

      {/* Main Grid: Rounded Cards */}
      <div className="grid grid-cols-12 gap-5 mt-5">
        {/* Left Column (8 cols): Experience & Projects */}
        <div className="col-span-12 sm:col-span-8 space-y-5">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h2 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Terminal className="w-4 h-4" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="pb-3 last:pb-0 border-b last:border-0 border-slate-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span 
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: secondaryColor + '18', color: secondaryColor }}
                      >
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11.5px] font-semibold text-slate-700 mt-0.5">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h2 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-baseline font-bold text-xs" style={{ color: primaryColor }}>
                      <span>{proj.name}</span>
                      {proj.link && <span className="text-[10px] font-normal underline" style={{ color: secondaryColor }}>{proj.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {proj.tech && <div className="text-[10px] font-mono text-slate-500 mt-0.5">{proj.tech}</div>}
                    {proj.description && <p className="text-xs text-slate-600 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h2 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                {customSection.title}
              </h2>
              <div className="space-y-2 text-xs">
                {customSection.items.map((it, idx) => (
                  <div key={it.id || idx}>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{it.title}</span>
                      {it.date && <span className="text-[10px] text-slate-500">{it.date}</span>}
                    </div>
                    {it.subtitle && <p className="text-[10.5px] text-slate-500">{it.subtitle}</p>}
                    {it.description && <p className="text-slate-600 mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Skills, Education, Certs */}
        <div className="col-span-12 sm:col-span-4 space-y-5">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h3 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Tech & Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span
                    key={skill.id || idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-full text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h3 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs">
                    <div className="font-bold text-slate-900 leading-tight">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] font-semibold text-slate-500 mt-0.5">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              <h3 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
                Certifications
              </h3>
              <div className="space-y-2 text-xs">
                {certifications.map((c, i) => (
                  <div key={c.id || i}>
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages & Hobbies */}
          {(languages.length > 0 || hobbies.length > 0) && (
            <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
              {languages.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                    Languages
                  </h3>
                  <div className="space-y-1 text-xs text-slate-700">
                    {languages.map((l, i) => (
                      <div key={l.id || i} className="flex justify-between">
                        <span>{l.name}</span>
                        <span className="text-[10.5px] text-slate-500">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {hobbies.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                    {hobbies.map((h, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
