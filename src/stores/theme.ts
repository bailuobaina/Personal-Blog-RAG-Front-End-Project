import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeMode>((localStorage.getItem('theme') as ThemeMode) || 'light')

  const setTheme = (mode: ThemeMode) => {
    theme.value = mode
    localStorage.setItem('theme', mode)
    updateTheme(mode)
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const updateTheme = (mode: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', mode)
  }

  const initTheme = () => {
    updateTheme(theme.value)
  }

  watch(
    theme,
    (newTheme) => {
      updateTheme(newTheme)
    },
    { immediate: true }
  )

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
})
