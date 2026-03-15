<template>
  <div class="projects-view">
    <div class="page-header">
      <h1 class="page-title">项目作品</h1>
      <p class="page-desc">以下是 我参与和完成的一些项目</p>
    </div>
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <el-empty v-if="projects.length === 0" description="暂无项目" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import ProjectCard from '@/components/project/ProjectCard.vue'

const profileStore = useProfileStore()

const projects = computed(() => profileStore.projects)

onMounted(() => {
  if (projects.value.length === 0) {
    profileStore.fetchProjects()
  }
})
</script>

<style scoped lang="scss">
.projects-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary, #303133);
  margin-bottom: 12px;
}

.page-desc {
  font-size: 16px;
  color: var(--text-secondary, #909399);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
