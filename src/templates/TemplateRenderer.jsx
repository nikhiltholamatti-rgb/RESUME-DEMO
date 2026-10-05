import React from 'react';
import Classic from './Classic';
import MinimalMono from './MinimalMono';
import DuoBlue from './DuoBlue';
import DuoSunset from './DuoSunset';
import CreativeSidebar from './CreativeSidebar';
import ModernTimeline from './ModernTimeline';
import CrazyGradient from './CrazyGradient';
import BoldYellow from './BoldYellow';

export const TEMPLATE_COMPONENTS = {
  'classic': Classic,
  'minimal-mono': MinimalMono,
  'duo-blue': DuoBlue,
  'duo-sunset': DuoSunset,
  'creative-sidebar': CreativeSidebar,
  'modern-timeline': ModernTimeline,
  'crazy-gradient': CrazyGradient,
  'bold-yellow': BoldYellow,
};

export default function TemplateRenderer({ 
  templateId = 'duo-blue', 
  resumeData, 
  theme, 
  withPhoto = true 
}) {
  const Component = TEMPLATE_COMPONENTS[templateId] || DuoBlue;

  return (
    <Component 
      resumeData={resumeData} 
      theme={theme} 
      withPhoto={withPhoto} 
    />
  );
}
