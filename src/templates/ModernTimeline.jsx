import React from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, Award } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function ModernTimeline({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};

  const primaryColor = theme?.palette?.primary || '#065F46'; // Emerald default
  const secondaryColor = theme?.palette?.secondary || '#10B981';
  const fontClass = theme?.fontFamily || "'Inter', sans-serif";

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between pb-6 border-b border-slate-200 gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          {withPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`w-24 h-24 object-cover ring-2 ring-offset-2 shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-2xl'}`}
              style={{ ringColor: primaryColor }}
            />
          )}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wide uppercase mt-1 text-slate-600">
              {personalInfo.jobTitle || 'Senior Professional'}
            </p>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-wrap sm:flex-col items-center sm:items-end gap-1.5 text-xs text-slate-600">
          {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: secondaryColor }} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: secondaryColor }} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: secondaryColor }} /> {personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" style={{ color: secondaryColor }} /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-5 text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3.5 rounded-lg border-l-4" style={{ borderColor: primaryColor }}>
          "{summary}"
        </div>
      )}

      {/* Two Column Layout: Left Column with Timeline, Right with Meta Info */}
      <div className="grid grid-cols-12 gap-8 mt-6">
        {/* Left Column (Timeline Experience & Education) */}
        <div className="col-span-12 sm:col-span-8 space-y-7">
          {/* Work Experience with Continuous Timeline */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
                Career Milestones
              </h2>
              <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative group">
                    {/* Timeline Node dot */}
                    <div 
                      className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                        <span className="text-[10.5px] font-semibold text-slate-500">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11.5px] font-medium" style={{ color: secondaryColor }}>
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Timeline */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
                Academic Background
              </h2>
              <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="relative">
                    <div 
                      className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <div className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{edu.degree}</span>
                        <span className="text-[10.5px] text-slate-500 font-normal">{edu.year}</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">{edu.school} {edu.grade ? `• ${edu.grade}` : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-xs border-l-2 pl-3" style={{ borderColor: secondaryColor }}>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.name}</span>
                      {proj.link && <span className="text-[10px] font-normal underline" style={{ color: primaryColor }}>{proj.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {proj.tech && <span className="text-[10px] text-slate-500 block font-mono">{proj.tech}</span>}
                    {proj.description && <p className="text-slate-600 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Skills, Certifications, Languages) */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ color: primaryColor }}>
                Expertise
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={s.id || idx}
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: secondaryColor + '20', color: primaryColor }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Awards */}
          {(certifications.length > 0 || achievements.length > 0) && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ color: primaryColor }}>
                Accreditations
              </h3>
              <div className="space-y-2.5 text-xs">
                {certifications.map((c, i) => (
                  <div key={c.id || i}>
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                  </div>
                ))}
                {achievements.map((a, i) => (
                  <div key={a.id || i}>
                    <div className="font-semibold text-slate-900">{a.title}</div>
                    <div className="text-[10px] text-slate-500">{a.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ color: primaryColor }}>
                Languages
              </h3>
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

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ color: primaryColor }}>
                {customSection.title}
              </h3>
              <div className="space-y-2 text-xs">
                {customSection.items.map((it, i) => (
                  <div key={it.id || i}>
                    <div className="font-semibold text-slate-800">{it.title}</div>
                    {it.subtitle && <p className="text-[10.5px] text-slate-500">{it.subtitle}</p>}
                    {it.description && <p className="text-slate-600 mt-0.5">{it.description}</p>}
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
