import React from 'react';
import { Mail, Phone, MapPin, Globe, Zap } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function BoldYellow({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};

  // Signature Butter-Yellow and Deep Charcoal
  const yellowColor = theme?.palette?.secondary || '#F5D100';
  const blackColor = theme?.palette?.primary || '#18181B';
  const fontClass = theme?.fontFamily || "'Space Grotesk', sans-serif";

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Top Banner: Signature Yellow Accent */}
      <div 
        className="p-6 sm:p-7 rounded-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm border-2 border-black"
        style={{ backgroundColor: yellowColor }}
      >
        <div className="flex items-center gap-5 text-center sm:text-left">
          {withPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`w-24 h-24 object-cover border-3 border-black shadow-md shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
            />
          )}
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded mb-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              Verified Profile
            </div>
            <h1 className="text-3xl font-black tracking-tight text-black">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-sm font-bold tracking-wide uppercase text-slate-900 mt-0.5">
              {personalInfo.jobTitle || 'LEAD ARCHITECT'}
            </p>
          </div>
        </div>

        {/* Contact info inside solid black badge */}
        <div className="bg-black text-amber-100 p-3.5 rounded-lg text-xs space-y-1 sm:text-right shrink-0">
          {personalInfo.email && <div className="font-mono">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="font-mono">{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="text-[11px] font-mono text-amber-300">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
          {personalInfo.website && <div className="text-[11px] font-mono text-amber-300">{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-5 p-4 rounded-lg bg-amber-50/70 border-l-4 border-black">
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {summary}
          </p>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Column (8 cols): Experience & Projects */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black rounded-sm" />
                  Work Experience
                </h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-black">{exp.role}</span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black text-yellow-300">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11.5px] font-bold text-amber-800">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed whitespace-pre-line font-medium">
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
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black rounded-sm" />
                  Projects & Works
                </h2>
              </div>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-xs p-2.5 rounded border border-slate-300 bg-slate-50">
                    <div className="flex justify-between font-bold text-black">
                      <span>{proj.name}</span>
                      {proj.link && <span className="text-[10px] underline font-mono text-slate-700">{proj.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {proj.tech && <div className="text-[10px] font-mono text-amber-800 mt-0.5">{proj.tech}</div>}
                    {proj.description && <p className="text-slate-700 mt-1 font-medium">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div>
              <div className="border-b-2 border-black pb-1 mb-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-black">
                  {customSection.title}
                </h2>
              </div>
              <div className="space-y-2 text-xs">
                {customSection.items.map((it, idx) => (
                  <div key={it.id || idx}>
                    <div className="flex justify-between font-bold text-black">
                      <span>{it.title}</span>
                      {it.date && <span className="text-[10px] text-slate-500 font-mono">{it.date}</span>}
                    </div>
                    {it.subtitle && <p className="text-[10.5px] text-slate-600">{it.subtitle}</p>}
                    {it.description && <p className="text-slate-700 mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Skills, Education, Certs */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="border-b-2 border-black pb-1 mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Skills & Tools
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={s.id || idx}
                    className="text-xs font-bold px-2.5 py-0.5 rounded border border-black bg-amber-100 text-black shadow-xs"
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
              <div className="border-b-2 border-black pb-1 mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Education
                </h3>
              </div>
              <div className="space-y-2.5 text-xs">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx}>
                    <div className="font-bold text-black leading-tight">{edu.degree}</div>
                    <div className="text-slate-700 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] font-mono text-slate-600 mt-0.5">{edu.year} {edu.grade ? `| ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Awards */}
          {(certifications.length > 0 || achievements.length > 0) && (
            <div>
              <div className="border-b-2 border-black pb-1 mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Accolades
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                {certifications.map((c, i) => (
                  <div key={c.id || i}>
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-600">{c.issuer}</div>
                  </div>
                ))}
                {achievements.map((a, i) => (
                  <div key={a.id || i}>
                    <div className="font-bold text-slate-900">{a.title}</div>
                    <div className="text-[10px] text-slate-600">{a.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div className="border-b-2 border-black pb-1 mb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Languages
                </h3>
              </div>
              <div className="text-xs space-y-1 text-slate-800">
                {languages.map((l, i) => (
                  <div key={l.id || i} className="flex justify-between">
                    <span className="font-bold">{l.name}</span>
                    <span className="text-[11px] text-slate-600">{l.proficiency}</span>
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
