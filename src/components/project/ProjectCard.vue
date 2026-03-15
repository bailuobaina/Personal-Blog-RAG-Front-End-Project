<template>
  <div class="project-card" @click="showDetail">
    <div class="card-cover">
      <img v-if="project.coverImage" :src="project.coverImage" :alt="project.name" loading="lazy" />
      <div v-else class="cover-placeholder">
        <el-icon :size="48"><FolderOpened /></el-icon>
      </div>
    </div>
    <div class="card-content">
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-desc">{{ project.description }}</p>
      <div class="project-tech">
        <el-tag v-for="tech in project.technologies" :key="tech" size="small" effect="plain">
          {{ tech }}
        </el-tag>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="project.name" width="600px">
      <div class="project-detail">
        <img v-if="project.coverImage" :src="project.coverImage" :alt="project.name" class="detail-cover" />
        <div class="detail-section">
          <h4>项目描述</h4>
          <p>{{ project.description }}</p>
        </div>
        <div class="detail-section">
          <h4>技术栈</h4>
          <div class="tech-tags">
            <el-tag v-for="tech in project.technologies" :key="tech">{{ tech }}</el-tag>
          </div>
        </div>
        <div v-if="project.highlights.length" class="detail-section">
          <h4>项目亮点</h4>
          <ul>
            <li v-for="(highlight, index) in project.highlights" :key="index">{{ highlight }}</li>
          </ul>
        </div>
        <div class="detail-links">
          <el-button v-if="project.githubUrl" type="primary" @click="openLink(project.githubUrl)">
            <el-icon><Link /></el-icon> GitHub
          </el-button>
          <el-button v-if="project.demoUrl" @click="openLink(project.demoUrl)">
            <el-icon><View /></el-icon> 在线演示
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FolderOpened, Link, View } from '@element-plus/icons-vue'
import type { Project } from '@/types/profile'

const props = defineProps<{
  project: Project
}>()

const dialogVisible = ref(false)

const showDetail = () => {
  dialogVisible.value = true
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped lang="scss">
.project-card {
  background: var(--bg-primary, #fff);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color, #e4e7ed);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.card-cover {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-secondary, #f5f7fa);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .project-card:hover & img {
    transform: scale(1.05);
  }
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #909399);
}

.card-content {
  padding: 16px;
}

.project-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #303133);
  margin-bottom: 8px;
}

.project-desc {
  font-size: 14px;
  color: var(--text-regular, #606266);
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-detail {
  .detail-cover {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .detail-section {
    margin-bottom: 20px;

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary, #303133);
      margin-bottom: 8px;
    }

    p {
      color: var(--text-regular, #606266);
      line-height: 1.6;
    }

    ul {
      padding-left: 20px;
      color: var(--text-regular, #606266);

      li {
        margin-bottom: 4px;
      }
    }
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .detail-links {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }
}
</style>
