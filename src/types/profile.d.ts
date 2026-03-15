export interface Profile {
  id: number
  name: string
  avatar: string
  title: string
  bio: string
  location?: string
  socialLinks: SocialLink[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Skill {
  id: number
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
  level?: number
}

export interface Experience {
  id: number
  title: string
  organization: string
  startDate: string
  endDate?: string
  description: string
  type: 'education' | 'work'
}

export interface Project {
  id: number
  name: string
  description: string
  coverImage: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  highlights: string[]
}
