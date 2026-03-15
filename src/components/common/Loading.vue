<template>
  <div v-if="fullscreen" class="loading-overlay" :class="{ visible: loading }">
    <div class="loading-spinner">
      <el-icon class="is-loading" :size="size">
        <Loading />
      </el-icon>
      <p v-if="text" class="loading-text">{{ text }}</p>
    </div>
  </div>
  <div v-else class="loading-container">
    <el-skeleton :rows="rows" animated :throttle="500">
      <template #template>
        <el-skeleton-item
          v-for="i in rows"
          :key="i"
          variant="text"
          style="width: 100%; margin-bottom: 8px"
        />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'

defineProps<{
  loading?: boolean
  fullscreen?: boolean
  text?: string
  size?: number
  rows?: number
}>()
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .el-icon.is-loading {
    color: var(--accent-color, #409eff);
  }
}

.loading-text {
  font-size: 14px;
  color: var(--text-secondary, #909399);
}

.loading-container {
  padding: 16px;
}

[data-theme='dark'] .loading-overlay {
  background-color: rgba(26, 26, 26, 0.8);
}
</style>
