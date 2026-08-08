export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}
