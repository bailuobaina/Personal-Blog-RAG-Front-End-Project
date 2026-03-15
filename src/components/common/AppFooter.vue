<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-social">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          :title="link.name"
          class="social-link"
        >
          <component :is="getIcon(link.icon)" />
        </a>
      </div>
      <p class="footer-copyright">
        © {{ currentYear }} {{ name }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Github, Message, Connection } from '@element-plus/icons-vue'

const name = '个人主页'
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: '掘金', url: 'https://juejin.cn', icon: 'message' },
  { name: '知乎', url: 'https://zhihu.com', icon: 'connection' }
]

const iconMap: Record<string, any> = {
  github: Github,
  message: Message,
  connection: Connection
}

const getIcon = (icon: string) => iconMap[icon] || Message
</script>

<style scoped lang="scss">
.app-footer {
  background-color: var(--bg-secondary, #f5f7fa);
  border-top: 1px solid var(--border-color, #e4e7ed);
  padding: 24px 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--bg-primary, #fff);
  color: var(--text-regular, #606266);
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color, #409eff);
    transform: translateY(-2px);
  }
}

.footer-copyright {
  font-size: 14px;
  color: var(--text-secondary, #909399);
}
</style>
