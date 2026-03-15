import { request } from './index'
import type { Profile, Skill, Experience, Project } from '@/types/profile'

export const getProfile = () => request<Profile>({ url: '/profile', method: 'GET' })

export const getSkills = () => request<Skill[]>({ url: '/profile/skills', method: 'GET' })

export const getExperiences = () => request<Experience[]>({ url: '/profile/experiences', method: 'GET' })

export const getProjects = () => request<Project[]>({ url: '/profile/projects', method: 'GET' })
