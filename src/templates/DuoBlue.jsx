import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function DuoBlue({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};
  
  const primaryColor = theme?.palette?.primary || '#1E3A8A';
  const secondaryColor = theme?.palette?.secondary || '#38BDF8';
  const fontClass = theme?.fontFamily || "'Inter', sans-serif";

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Top Banner Header with Two Tone */}
      <div className="relative pb-6 border-b-2" style={{ borderColor: primaryColor }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {withPhoto && personalInfo.photoUrl && (
            <div className="relative shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={`w-28 h-28 object-cover shadow-md border-4 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}
                style={{ borderColor: primaryColor }}
              />
              <span 
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: secondaryColor }}
              />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-base font-semibold mt-1 tracking-wide" style={{ color: secondaryColor }}>
              {personalInfo.jobTitle || 'Professional Role'}
            </p>

            {/* Contact Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600 font-medium">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-5 p-3.5 rounded-lg border-l-4 bg-slate-50/70" style={{ borderColor: secondaryColor }}>
          <p className="text-xs text-slate-700 leading-relaxed">
            {summary}
          </p>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Column: Experience & Projects */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 border-b mb-3.5" style={{ borderColor: primaryColor + '40' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Work Experience
                </h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-3 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: secondaryColor + '20', color: primaryColor }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-medium" style={{ color: primaryColor }}>
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-inside mt-1.5 text-xs text-slate-600 space-y-1">
                        {exp.description.split('\n').filter(Boolean).map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet.replace(/^[-•]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 border-b mb-3" style={{ borderColor: primaryColor + '40' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Featured Projects
                </h2>
              </div>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-xs p-2.5 rounded bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-baseline font-bold" style={{ color: primaryColor }}>
                      <span>{proj.name}</span>
                      {proj.link && <span className="text-[10px] text-blue-600 underline font-normal">{proj.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {proj.tech && <span className="text-[10px] font-medium block mt-0.5" style={{ color: secondaryColor }}>{proj.tech}</span>}
                    {proj.description && <p className="text-slate-600 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 pb-1.5 border-b mb-3" style={{ borderColor: primaryColor + '40' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                  {customSection.title}
                </h2>
              </div>
              <div className="space-y-2">
                {customSection.items.map((item, idx) => (
                  <div key={item.id || idx} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{item.title}</span>
                      {item.date && <span className="text-[10px] text-slate-500 font-normal">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-[10px] text-slate-500 italic">{item.subtitle}</div>}
                    {item.description && <p className="text-slate-600 mt-0.5">{item.description}</p>}
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
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b mb-3" style={{ color: primaryColor, borderColor: primaryColor + '40' }}>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span
                    key={skill.id || idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: secondaryColor + '18', color: primaryColor, border: `1px solid ${secondaryColor}40` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b mb-3" style={{ color: primaryColor, borderColor: primaryColor + '40' }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs">
                    <div className="font-bold text-slate-900 leading-tight">{edu.degree}</div>
                    <div className="text-slate-600 mt-0.5">{edu.school}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{edu.year} {edu.grade ? `• ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b mb-3" style={{ color: primaryColor, borderColor: primaryColor + '40' }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={c.id || idx} className="text-xs">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-[10.5px] text-slate-500">{c.issuer} {c.date ? `(${c.date})` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b mb-3" style={{ color: primaryColor, borderColor: primaryColor + '40' }}>
                Achievements
              </h2>
              <div className="space-y-2">
                {achievements.map((a, idx) => (
                  <div key={a.id || idx} className="text-xs">
                    <div className="font-semibold text-slate-800">{a.title}</div>
                    <div className="text-[10.5px] text-slate-500">{a.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b mb-2" style={{ color: primaryColor, borderColor: primaryColor + '40' }}>
                Languages
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                {languages.map((l, i) => (
                  <div key={l.id || i} className="flex justify-between">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
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
