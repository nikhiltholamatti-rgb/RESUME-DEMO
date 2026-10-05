export const sampleResumeData = {
  personalInfo: {
    fullName: 'Alexander Vance',
    jobTitle: 'Senior Full-Stack Cloud Architect',
    email: 'alex.vance@techcorp.io',
    phone: '+1 (555) 389-7241',
    location: 'San Francisco, CA, USA',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexandervance',
    github: 'github.com/alexvance-cloud',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    photoShape: 'circle', // 'circle' | 'square' | 'rounded'
  },
  summary: 'Innovative Full-Stack Architect with 8+ years architecting enterprise distributed microservices, AI workflow integrations, and high-throughput web applications. Proven track record leading cross-functional engineering teams, slashing API latency by 45%, and scaling cloud footprints to support 12M+ monthly active users.',
  experience: [
    {
      id: 'exp-1',
      role: 'Staff Solutions Engineer',
      company: 'Aether Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description: 'Spearheaded migration of legacy monolith to resilient Kubernetes microservices, achieving 99.99% system availability.\nEngineered real-time telemetry streaming pipeline processing over 4.5 billion events daily using Kafka and Go.\nMentored 14 junior and senior developers across 3 international time zones.',
    },
    {
      id: 'exp-2',
      role: 'Senior Frontend & Systems Engineer',
      company: 'Nexus Interactive Labs',
      location: 'Seattle, WA',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description: 'Built high-performance design system in React, TypeScript, and Three.js adopted across 8 enterprise web products.\nOptimized Lighthouse performance and Web Vitals score from 58 to 97 on main flagship dashboard.\nIntegrated Supabase and edge compute caching layer, reducing server costs by $180,000 annually.',
    },
    {
      id: 'exp-3',
      role: 'Full-Stack Developer',
      company: 'Vanguard Digital Solutions',
      location: 'Austin, TX',
      startDate: '2017',
      endDate: '2019',
      current: false,
      description: 'Developed responsive client-facing web applications with React, Node.js, and PostgreSQL for Fortune 500 financial clients.\nAutomated CI/CD deployment workflows with GitHub Actions, accelerating release cycles from bi-weekly to continuous daily deliveries.',
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (Distributed Systems)',
      school: 'University of Washington',
      location: 'Seattle, WA',
      year: '2015 - 2017',
      grade: 'GPA: 3.92 / 4.0',
      description: 'Graduate research focused on distributed consensus algorithms and low-latency cache invalidation.',
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Computer Engineering & Mathematics',
      school: 'University of Texas at Austin',
      location: 'Austin, TX',
      year: '2011 - 2015',
      grade: 'Summa Cum Laude (3.96)',
      description: 'Elected President of Association for Computing Machinery (ACM). Dean’s Exemplary Scholar.',
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
    { id: 'sk-2', name: 'TypeScript / JavaScript', category: 'Languages', level: 'Expert' },
    { id: 'sk-3', name: 'Node.js & Go', category: 'Backend', level: 'Advanced' },
    { id: 'sk-4', name: 'GraphQL & REST APIs', category: 'Backend', level: 'Advanced' },
    { id: 'sk-5', name: 'PostgreSQL & Supabase', category: 'Database', level: 'Expert' },
    { id: 'sk-6', name: 'Docker & Kubernetes', category: 'DevOps', level: 'Advanced' },
    { id: 'sk-7', name: 'Three.js & WebGL', category: 'Frontend', level: 'Intermediate' },
    { id: 'sk-8', name: 'AWS & Cloud Architecture', category: 'Cloud', level: 'Expert' },
    { id: 'sk-9', name: 'CI/CD & GitOps', category: 'DevOps', level: 'Advanced' },
    { id: 'sk-10', name: 'System Design', category: 'Architecture', level: 'Expert' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream Analytics Engine',
      tech: 'Go, Kafka, React, Tailwind, PostgreSQL',
      link: 'https://omnistream.io',
      github: 'github.com/alexvance/omnistream',
      description: 'Distributed real-time analytics engine visualizing high-velocity clickstream datasets with sub-100ms render latency. Received 2.4k GitHub stars.',
    },
    {
      id: 'proj-2',
      name: 'NeuralMesh AI Designer',
      tech: 'TypeScript, Three.js, Python, FastAPI',
      link: 'https://neuralmesh.app',
      github: 'github.com/alexvance/neural-mesh',
      description: 'Generative 3D CAD modeling studio powered by custom diffusion weights in the browser. Won Best Developer Tool at HackTech 2023.',
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023 - 2026',
      link: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022 - 2025',
      link: 'https://cncf.io/verify',
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Global Engineering Innovation Grand Prize',
      issuer: 'Aether Tech Summit',
      date: 'Nov 2023',
      description: 'Awarded to top 1% of global engineering initiatives for autonomous cloud resource balancer.',
    },
    {
      id: 'ach-2',
      title: 'Published Author — High Throughput Web Services',
      issuer: 'O’Reilly Media Guest Article',
      date: 'Jan 2022',
      description: 'Featured in O’Reilly Distributed Systems digest with 45,000+ reads.',
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-2', name: 'German', proficiency: 'Professional Working' },
    { id: 'lang-3', name: 'Japanese', proficiency: 'Conversational' }
  ],
  hobbies: ['High-Altitude Mountaineering', 'Modular Synthesizers', 'Open Source Maintainer', 'Specialty Coffee Brewing'],
  customSection: {
    title: 'Patents & Publications',
    items: [
      {
        id: 'cust-1',
        title: 'Patent US-11894291-B2: Edge Distributed Cache Consistency',
        subtitle: 'United States Patent Office',
        date: 'Issued March 2023',
        description: 'Novel protocol for predictive asynchronous cache synchronization across partitioned edge nodes.',
      }
    ]
  }
};

export const emptyResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
    photoShape: 'circle',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  hobbies: [],
  customSection: {
    title: 'Custom Section',
    items: []
  }
};

export const sampleAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
];
