import React from 'react';
import { Mail, Phone, MapPin, Globe, BookOpen, Star } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function CreativeSidebar({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};

  const primaryColor = theme?.palette?.primary || '#1E293B';
  const secondaryColor = theme?.palette?.secondary || '#F5D100';
  const fontClass = theme?.fontFamily || "'Montserrat', sans-serif";

  return (
    <div 
      className="w-full min-h-[297mm] bg-white text-slate-800 flex flex-col sm:flex-row"
      style={{ fontFamily: fontClass }}
    >
      {/* LEFT SIDEBAR (Approx 33% width) */}
      <div 
        className="w-full sm:w-[33%] text-white p-6 sm:p-7 flex flex-col justify-between shrink-0"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-6">
          {/* Photo */}
          {withPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className={`w-32 h-32 object-cover border-4 shadow-xl ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}
                style={{ borderColor: secondaryColor }}
              />
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b mb-3"
              style={{ color: secondaryColor, borderColor: secondaryColor + '60' }}
            >
              Contact
            </h3>
            <div className="space-y-2 text-xs text-slate-200">
              {personalInfo.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: secondaryColor }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: secondaryColor }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: secondaryColor }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: secondaryColor }} />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: secondaryColor }} />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills with sleek visual level bars */}
          {skills.length > 0 && (
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b mb-3"
                style={{ color: secondaryColor, borderColor: secondaryColor + '60' }}
              >
                Skills & Stack
              </h3>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={skill.id || idx} className="text-xs">
                    <div className="flex justify-between text-slate-200 text-[11px] mb-0.5">
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-slate-400">{skill.level || 'Expert'}</span>
                    </div>
                    <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: secondaryColor,
                          width: skill.level === 'Beginner' ? '35%' : skill.level === 'Intermediate' ? '60%' : skill.level === 'Advanced' ? '85%' : '95%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b mb-3"
                style={{ color: secondaryColor, borderColor: secondaryColor + '60' }}
              >
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs text-slate-200">
                    <div className="font-semibold text-white leading-tight">{edu.degree}</div>
                    <div className="text-slate-300 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{edu.year} {edu.grade ? `| ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b mb-2"
                style={{ color: secondaryColor, borderColor: secondaryColor + '60' }}
              >
                Languages
              </h3>
              <div className="space-y-1 text-xs text-slate-200">
                {languages.map((l, i) => (
                  <div key={l.id || i} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-slate-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div>
              <h3 
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b mb-2"
                style={{ color: secondaryColor, borderColor: secondaryColor + '60' }}
              >
                Interests
              </h3>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-300">
                {hobbies.map((h, i) => (
                  <span key={i} className="bg-white/10 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT MAIN PANEL (Approx 67% width) */}
      <div className="w-full sm:w-[67%] p-7 sm:p-8 space-y-6">
        {/* Header Name & Title */}
        <div className="border-b pb-4 border-slate-200">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: primaryColor }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-semibold tracking-wider uppercase mt-1 text-slate-600">
            {personalInfo.jobTitle || 'Executive Professional'}
          </p>
        </div>

        {/* Profile Summary */}
        {summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2">
              Executive Summary
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">
                    {exp.company} {exp.location ? `| ${exp.location}` : ''}
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-3">
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.name}</span>
                    {proj.link && <span className="text-[10px] text-blue-600 underline font-normal">{proj.link.replace(/^https?:\/\//, '')}</span>}
                  </div>
                  {proj.tech && <span className="text-[10.5px] text-slate-500 font-mono block">{proj.tech}</span>}
                  {proj.description && <p className="text-slate-600 mt-0.5">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Achievements */}
        {(certifications.length > 0 || achievements.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2">
                  Certifications
                </h2>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {certifications.map((c, i) => (
                    <div key={c.id || i}>
                      <span className="font-semibold block">{c.name}</span>
                      <span className="text-[10px] text-slate-500">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2">
                  Achievements
                </h2>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {achievements.map((a, i) => (
                    <div key={a.id || i}>
                      <span className="font-semibold block">{a.title}</span>
                      <span className="text-[10px] text-slate-500">{a.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Section */}
        {customSection?.items?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2">
              {customSection.title}
            </h2>
            <div className="space-y-2 text-xs">
              {customSection.items.map((it, i) => (
                <div key={it.id || i}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{it.title}</span>
                    {it.date && <span className="text-[10px] text-slate-500">{it.date}</span>}
                  </div>
                  {it.subtitle && <p className="text-[10.5px] text-slate-500 italic">{it.subtitle}</p>}
                  {it.description && <p className="text-slate-600 mt-0.5">{it.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
