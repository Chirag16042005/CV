export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  instagram?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  dates: string;
  location: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  details: string;
}

export interface Project {
  title: string;
  role: string;
  dates: string;
  description: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ResumeData {
  fullName: string;
  title: string;
  profile: string;
  contact: ContactInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  quickBadges: string[]; // e.g. ["AVAILABLE", "REMOTE", "5+ YR EXP"] - maps to blue card
  signatureText: string; // e.g. "CHIRAG / CREATIVE DEV" - maps to the bold stamp
}
