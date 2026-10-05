import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function Classic({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};
  const fontClass = theme?.fontFamily || "'Inter', sans-serif";

  return (
    <div 
      className="w-full bg-white text-slate-900 p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Header */}
      <div className={`pb-5 border-b-2 border-slate-900 ${withPhoto && personalInfo.photoUrl ? 'flex items-center gap-6' : 'text-center'}`}>
        {withPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className={`w-24 h-24 object-cover border-2 border-slate-900 shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-md'}`}
          />
        )}
        <div className={withPhoto && personalInfo.photoUrl ? 'flex-1 text-left' : 'w-full text-center'}>
          <h1 className="text-3xl font-bold tracking-tight uppercase text-slate-950 font-serif">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm font-semibold tracking-wide uppercase text-slate-700 mt-1">
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-700">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-serif">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-3 font-serif">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                  <span>{exp.role} <span className="font-normal text-slate-700">| {exp.company}</span></span>
                  <span className="text-[11px] font-normal text-slate-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-[10px] text-slate-500 italic">{exp.location}</p>}
                {exp.description && (
                  <ul className="list-disc list-inside mt-1.5 text-xs text-slate-800 space-y-1 leading-relaxed">
                    {exp.description.split('\n').filter(Boolean).map((bullet, bIdx) => (
                      <li key={bIdx} className="text-justify">{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-3 font-serif">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={edu.id || idx}>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="text-[11px] font-normal text-slate-600">{edu.year}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-700">
                  <span>{edu.school}{edu.location ? `, ${edu.location}` : ''}</span>
                  {edu.grade && <span className="text-[11px] italic font-medium">{edu.grade}</span>}
                </div>
                {edu.description && <p className="text-[11px] text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Skills */}
      {skills.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-serif">
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-800">
            {skills.map((skill, idx) => (
              <span key={skill.id || idx} className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-[11px]">
                {skill.name} {skill.level ? `(${skill.level})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-3 font-serif">
            Notable Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.name} {proj.tech && <span className="font-normal text-slate-600">[{proj.tech}]</span>}</span>
                  {proj.link && <span className="text-[11px] font-normal text-slate-600 underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                </div>
                {proj.description && <p className="text-slate-800 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Awards Grid */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-serif">
                Certifications
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {certifications.map((c, i) => (
                  <li key={c.id || i}>
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-[11px] text-slate-600 block">{c.issuer} {c.date ? `(${c.date})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-serif">
                Honors & Achievements
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {achievements.map((a, i) => (
                  <li key={a.id || i}>
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-[11px] text-slate-600 block">{a.issuer} {a.date ? `• ${a.date}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Languages & Hobbies */}
      {(languages.length > 0 || hobbies.length > 0) && (
        <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap gap-6 text-xs text-slate-700">
          {languages.length > 0 && (
            <div>
              <span className="font-bold text-slate-900">Languages: </span>
              {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
            </div>
          )}
          {hobbies.length > 0 && (
            <div>
              <span className="font-bold text-slate-900">Interests: </span>
              {hobbies.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Custom Section */}
      {customSection?.items?.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-serif">
            {customSection.title || 'Additional Information'}
          </h2>
          <div className="space-y-2 text-xs">
            {customSection.items.map((it, i) => (
              <div key={it.id || i}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{it.title}</span>
                  {it.date && <span className="font-normal text-slate-600">{it.date}</span>}
                </div>
                {it.subtitle && <p className="text-[11px] text-slate-600 italic">{it.subtitle}</p>}
                {it.description && <p className="text-slate-800 mt-0.5">{it.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
