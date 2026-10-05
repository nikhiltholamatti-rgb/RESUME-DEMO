import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

export default function MinimalMono({ resumeData, theme, withPhoto }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [], languages = [], hobbies = [], customSection = {} } = resumeData || {};
  const fontClass = theme?.fontFamily || "'Inter', sans-serif";

  return (
    <div 
      className="w-full bg-white text-black p-8 sm:p-10 leading-normal"
      style={{ fontFamily: fontClass }}
    >
      {/* Top Header Grid */}
      <div className="flex flex-col sm:flex-row items-start justify-between border-b border-black pb-6 gap-6">
        <div className="flex items-center gap-5">
          {withPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className={`w-20 h-20 object-cover border border-black grayscale contrast-125 shrink-0 ${personalInfo.photoShape === 'circle' ? 'rounded-full' : 'rounded-none'}`}
            />
          )}
          <div>
            <h1 className="text-3xl font-light tracking-widest uppercase">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs tracking-[0.2em] uppercase font-mono text-neutral-600 mt-1">
              {personalInfo.jobTitle || 'PROFESSIONAL TITLE'}
            </p>
          </div>
        </div>

        {/* Contact Minimalist Monospace Column */}
        <div className="text-[11px] font-mono text-neutral-700 space-y-0.5 sm:text-right shrink-0">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && <div>{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
          {personalInfo.github && <div>{personalInfo.github.replace(/^https?:\/\//, '')}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="py-4 border-b border-neutral-200">
          <p className="text-xs text-neutral-800 leading-relaxed font-light">
            {summary}
          </p>
        </div>
      )}

      {/* Main Two Columns for Minimalist Mono */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Column (Experience & Projects) */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">01 // EXPERIENCE</span>
              </div>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-semibold">{exp.role}</h3>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-600 font-mono mb-1">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-[11.5px] text-neutral-700 leading-relaxed whitespace-pre-line font-light">
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
              <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">02 // SELECTED PROJECTS</span>
              </div>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-xs">
                    <div className="flex justify-between items-baseline font-semibold">
                      <span>{proj.name}</span>
                      {proj.link && (
                        <span className="text-[10px] font-mono text-neutral-500">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {proj.tech && <div className="text-[10px] font-mono text-neutral-500">{proj.tech}</div>}
                    {proj.description && <p className="text-[11px] text-neutral-700 mt-1 font-light">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Section */}
          {customSection?.items?.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">03 // {customSection.title.toUpperCase()}</span>
              </div>
              <div className="space-y-2.5">
                {customSection.items.map((item, idx) => (
                  <div key={item.id || idx} className="text-xs">
                    <div className="flex justify-between items-baseline font-semibold">
                      <span>{item.title}</span>
                      {item.date && <span className="text-[10px] font-mono text-neutral-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-[10px] font-mono text-neutral-500">{item.subtitle}</div>}
                    {item.description && <p className="text-[11px] text-neutral-700 mt-0.5 font-light">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Education, Skills, Accolades) */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">EDUCATION</span>
              </div>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs">
                    <div className="font-semibold text-neutral-900 leading-tight">{edu.degree}</div>
                    <div className="text-neutral-600 text-[11px]">{edu.school}</div>
                    <div className="text-[10px] font-mono text-neutral-500">{edu.year} {edu.grade ? `| ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">CAPABILITIES</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span 
                    key={skill.id || idx} 
                    className="text-[10.5px] border border-neutral-300 px-2 py-0.5 font-mono text-neutral-800"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <div className="border-b border-black pb-1 mb-3">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">CREDENTIALS</span>
              </div>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={c.id || idx} className="text-xs">
                    <div className="font-medium text-neutral-900 leading-tight">{c.name}</div>
                    <div className="text-[10px] font-mono text-neutral-500">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages & Hobbies */}
          {(languages.length > 0 || hobbies.length > 0) && (
            <div>
              <div className="border-b border-black pb-1 mb-2">
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">ADDITIONAL</span>
              </div>
              {languages.length > 0 && (
                <div className="text-[11px] text-neutral-700 mb-2">
                  <span className="font-semibold font-mono text-[10px] block text-black">LANGUAGES</span>
                  {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                </div>
              )}
              {hobbies.length > 0 && (
                <div className="text-[11px] text-neutral-700">
                  <span className="font-semibold font-mono text-[10px] block text-black">FOCUS & INTERESTS</span>
                  {hobbies.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
