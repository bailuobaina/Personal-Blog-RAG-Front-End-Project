<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-text">{{ siteName }}</span>
      </router-link>
      <nav class="nav-menu">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: currentPath === item.path }"
        >
          {{ item.name }}
        </router-link>
      </nav>
      <div class="header-actions">
        <el-button
          :icon="themeStore.theme === 'dark' ? Sunny : Moon"
          circle
          @click="themeStore.toggleTheme()"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const themeStore = useThemeStore()

const siteName = '个人主页'

const navItems = [
  { name: '首页', path: '/' },
  { name: '项目', path: '/projects' },
  { name: '经历', path: '/timeline' },
  { name: '联系', path: '/contact' }
]

const currentPath = computed(() => route.path)
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-primary, #fff);
  border-bottom: 1px solid var(--border-color, #e4e7ed);
  backdrop-filter: blur(10px);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--accent-color, #409eff);
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  color: var(--text-regular, #606266);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color, #409eff);
    background-color: var(--bg-secondary, #f5f7fa);
  }

  &.active {
    color: var(--accent-color, #409eff);
    background-color: var(--bg-secondary, #f5f7fa);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 4px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>
