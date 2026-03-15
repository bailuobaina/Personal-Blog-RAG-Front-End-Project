import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile, Skill, Experience, Project } from '@/types/profile'
import { getProfile, getSkills, getExperiences, getProjects } from '@/api/profile'

const mockProfile: Profile = {
  id: 1,
  name: '个人主页',
  avatar: '',
  title: '全栈开发者',
  bio: '热爱编程，专注于 Web 开发。喜欢分享技术，共同成长。',
  location: '中国',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: '掘金', url: 'https://juejin.cn', icon: 'link' }
  ]
}

const mockSkills: Skill[] = [
  { id: 1, name: 'Vue 3', category: 'frontend', level: 5 },
  { id: 2, name: 'TypeScript', category: 'frontend', level: 4 },
  { id: 3, name: 'Node.js', category: 'backend', level: 4 },
  { id: 4, name: 'Python', category: 'backend', level: 3 },
  { id: 5, name: 'Docker', category: 'tools', level: 3 },
  { id: 6, name: 'Git', category: 'tools', level: 4 }
]

const mockProjects: Project[] = [
  {
    id: 1,
    name: '个人主页项目',
    description: '基于 Vue 3 + Vite + RAG 技术的个人主页',
    coverImage: '',
    technologies: ['Vue 3', 'Vite', 'TypeScript', 'Pinia'],
    githubUrl: 'https://github.com',
    highlights: ['RAG 智能问答', '响应式设计', '暗黑模式']
  }
]

const mockExperiences: Experience[] = [
  {
    id: 1,
    title: '前端开发工程师',
    organization: '某科技公司',
    startDate: '2022-01-01',
    endDate: '',
    description: '负责前端项目开发与维护',
    type: 'work'
  },
  {
    id: 2,
    title: '计算机科学与技术',
    organization: '某大学',
    startDate: '2018-09-01',
    endDate: '2022-06-01',
    description: '本科学习',
    type: 'education'
  }
]

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(mockProfile)
  const skills = ref<Skill[]>(mockSkills)
  const experiences = ref<Experience[]>(mockExperiences)
  const projects = ref<Project[]>(mockProjects)
  const loading = ref(false)

  const fetchProfile = async () => {
    try {
      loading.value = true
      const data = await getProfile()
      profile.value = data
    } catch (error) {
      console.error('获取个人资料失败:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchSkills = async () => {
    try {
      const data = await getSkills()
      skills.value = data
    } catch (error) {
      console.error('获取技能列表失败:', error)
    }
  }

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences()
      experiences.value = data
    } catch (error) {
      console.error('获取经历列表失败:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const data = await getProjects()
      projects.value = data
    } catch (error) {
      console.error('获取项目列表失败:', error)
    }
  }

  const fetchAll = async () => {
    await Promise.all([fetchProfile(), fetchSkills(), fetchExperiences(), fetchProjects()])
  }

  return {
    profile,
    skills,
    experiences,
    projects,
    loading,
    fetchProfile,
    fetchSkills,
    fetchExperiences,
    fetchProjects,
    fetchAll
  }
})
