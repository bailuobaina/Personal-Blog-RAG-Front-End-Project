<template>
  <div class="timeline-view">
    <div class="page-header">
      <h1 class="page-title">工作经历</h1>
      <p class="page-desc">记录我的成长历程</p>
    </div>
    <div class="timeline">
      <div v-for="exp in experiences" :key="exp.id" class="timeline-item" :class="exp.type">
        <div class="timeline-marker">
          <el-icon><component :is="exp.type === 'education' ? School : Briefcase" /></el-icon>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3 class="timeline-title">{{ exp.title }}</h3>
            <span class="timeline-date">
              {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : '至今' }}
            </span>
          </div>
          <p class="timeline-org">{{ exp.organization }}</p>
          <p class="timeline-desc">{{ exp.description }}</p>
        </div>
      </div>
    </div>
    <el-empty v-if="experiences.length === 0" description="暂无经历" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { School, Briefcase } from '@element-plus/icons-vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const experiences = computed(() => profileStore.experiences)

const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

onMounted(() => {
  if (experiences.value.length === 0) {
    profileStore.fetchExperiences()
  }
})
</script>

<style scoped lang="scss">
.timeline-view {
  max-width: 800px;
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

.timeline {
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color, #e4e7ed);
  }
}

.timeline-item {
  position: relative;
  padding-bottom: 32px;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-marker {
  position: absolute;
  left: -40px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-primary, #fff);
  border: 2px solid var(--accent-color, #409eff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color, #409eff);
  z-index: 1;
}

.timeline-content {
  background: var(--bg-primary, #fff);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--border-color, #e4e7ed);
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #303133);
}

.timeline-date {
  font-size: 14px;
  color: var(--text-secondary, #909399);
}

.timeline-org {
  font-size: 15px;
  color: var(--accent-color, #409eff);
  margin-bottom: 8px;
}

.timeline-desc {
  font-size: 14px;
  color: var(--text-regular, #606266);
  line-height: 1.6;
}

.timeline-item.education {
  .timeline-marker {
    border-color: var(--success-color, #67c23a);
    color: var(--success-color, #67c23a);
  }
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
