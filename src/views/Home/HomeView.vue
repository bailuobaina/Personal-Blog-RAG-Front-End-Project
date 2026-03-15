<template>
  <div class="home">
    <section class="hero">
      <div class="avatar">
        <div class="avatar-placeholder">个</div>
      </div>
      <h1 class="name">{{ profile?.name || '个人主页' }}</h1>
      <p class="title">{{ profile?.title || '全栈开发者' }}</p>
      <p class="bio">{{ profile?.bio || '热爱编程，专注于 Web 开发' }}</p>
      <div class="actions">
        <a href="/projects" class="btn btn-primary">查看项目</a>
        <a href="/contact" class="btn">联系我</a>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">技能栈</h2>
      <div class="skills">
        <span v-for="skill in skills" :key="skill.id" class="skill-tag">
          {{ skill.name }}
        </span>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">精选项目</h2>
      <div class="projects">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="techs">
            <span v-for="tech in project.technologies" :key="tech" class="tech">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const profile = computed(() => profileStore.profile)
const skills = computed(() => profileStore.skills)
const projects = computed(() => profileStore.projects)
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px;
}

.hero {
  text-align: center;
  padding: 40px 0;
}

.avatar {
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.name {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.title {
  font-size: 18px;
  color: #409eff;
  margin-bottom: 12px;
}

.bio {
  font-size: 15px;
  color: #666;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s;
}

.btn-primary {
  background: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background: #66b1ff;
}

.btn {
  background: #f5f7fa;
  color: #666;
  border: 1px solid #eee;
}

.btn:hover {
  background: #e9eef3;
}

.section {
  padding: 40px 0;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.skill-tag {
  padding: 8px 16px;
  background: #f0f2f5;
  color: #606266;
  border-radius: 4px;
  font-size: 14px;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.project-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.project-card h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

.project-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech {
  padding: 4px 8px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 3px;
  font-size: 12px;
}
</style>
