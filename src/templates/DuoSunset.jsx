import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function DuoSunset({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};

  const primaryColor = theme?.palette?.primary || '#4C1D95'; // Deep Purple
  const secondaryColor = theme?.palette?.secondary || '#FB923C'; // Warm Sunset Orange
  const fontClass = theme?.fontFamily || "'Poppins', sans-serif";

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Top Header with Warm Gradient Accent Line */}
      <div className="relative pb-6">
        <div className="h-1.5 w-full rounded-full mb-6" style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }} />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            {withPhoto && personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={`w-24 h-24 object-cover ring-4 ring-offset-2 shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-2xl'}`}
                style={{ ringColor: secondaryColor }}
              />
            )}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: secondaryColor }}>
                {personalInfo.jobTitle || 'Career Title'}
              </p>
            </div>
          </div>

          {/* Contact Details in Warm Card */}
          <div className="rounded-xl p-3 text-xs space-y-1 bg-amber-50/50 border border-amber-100 sm:text-right text-slate-600 shrink-0">
            {personalInfo.email && <div className="font-medium">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="text-[11px]">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
            {personalInfo.website && <div className="text-[11px]">{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </div>
      </div>

      {/* Summary with Sunset Quote Style */}
      {summary && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/60 to-orange-50/60 border border-purple-100/60">
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {summary}
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Column: Experience */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1 border-b-2 mb-3" style={{ borderColor: secondaryColor }}>
                <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primaryColor }}>
                  Professional Journey
                </h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: primaryColor + '15', color: primaryColor }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11.5px] font-medium" style={{ color: secondaryColor }}>
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1 border-b-2 mb-3" style={{ borderColor: secondaryColor }}>
                <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primaryColor }}>
                  Projects & Innovations
                </h2>
              </div>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-xs">
                    <div className="flex justify-between font-bold" style={{ color: primaryColor }}>
                      <span>{proj.name}</span>
                      {proj.link && <span className="text-[10px] font-normal underline" style={{ color: secondaryColor }}>{proj.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {proj.tech && <div className="text-[10px] text-slate-500 font-mono mt-0.5">{proj.tech}</div>}
                    {proj.description && <p className="text-slate-600 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1 border-b-2 mb-3" style={{ borderColor: secondaryColor }}>
                <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: primaryColor }}>
                  {customSection.title}
                </h2>
              </div>
              <div className="space-y-2">
                {customSection.items.map((it, idx) => (
                  <div key={it.id || idx} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{it.title}</span>
                      {it.date && <span className="text-[10px] text-slate-500">{it.date}</span>}
                    </div>
                    {it.subtitle && <div className="text-[10.5px] italic text-slate-500">{it.subtitle}</div>}
                    {it.description && <p className="text-slate-600 mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Skills, Education, Certs */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 mb-3" style={{ color: primaryColor, borderColor: secondaryColor }}>
                Core Strengths
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={s.id || idx}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: secondaryColor + '20', color: primaryColor }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 mb-3" style={{ color: primaryColor, borderColor: secondaryColor }}>
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs">
                    <div className="font-bold text-slate-900 leading-tight">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] font-medium" style={{ color: secondaryColor }}>{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Awards */}
          {(certifications.length > 0 || achievements.length > 0) && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 mb-3" style={{ color: primaryColor, borderColor: secondaryColor }}>
                Recognitions
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((c, i) => (
                  <div key={c.id || i}>
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.issuer}</div>
                  </div>
                ))}
                {achievements.map((a, i) => (
                  <div key={a.id || i}>
                    <div className="font-semibold text-slate-800">{a.title}</div>
                    <div className="text-[10px] text-slate-500">{a.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider pb-1 border-b-2 mb-2" style={{ color: primaryColor, borderColor: secondaryColor }}>
                Languages
              </h2>
              <div className="text-xs space-y-1 text-slate-700">
                {languages.map((l, i) => (
                  <div key={l.id || i} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-[11px] text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
