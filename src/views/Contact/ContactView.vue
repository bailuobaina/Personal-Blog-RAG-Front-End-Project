<template>
  <div class="contact-view">
    <div class="page-header">
      <h1 class="page-title">联系我</h1>
      <p class="page-desc">期待与您的交流与合作</p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <div class="info-card">
          <div class="info-item">
            <el-icon :size="24"><Message /></el-icon>
            <div class="info-text">
              <span class="info-label">邮箱</span>
              <a :href="`mailto:${email}`">{{ email }}</a>
            </div>
          </div>
          <div class="info-item">
            <el-icon :size="24"><Location /></el-icon>
            <div class="info-text">
              <span class="info-label">位置</span>
              <span>{{ location }}</span>
            </div>
          </div>
        </div>

        <div class="social-section">
          <h3>社交媒体</h3>
          <div class="social-links">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              class="social-link"
            >
              <el-icon :size="20"><component :is="getIcon(link.icon)" /></el-icon>
              <span>{{ link.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入您的姓名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入您的邮箱" />
          </el-form-item>
          <el-form-item label="消息" prop="message">
            <el-input
              v-model="form.message"
              type="textarea"
              :rows="5"
              placeholder="请输入您想说的话..."
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="submitting" @click="handleSubmit">
              发送消息
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Message, Location, Github, Link } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const email = 'example@email.com'
const location = '中国'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: '掘金', url: 'https://juejin.cn', icon: 'link' },
  { name: '知乎', url: 'https://zhihu.com', icon: 'link' }
]

const iconMap: Record<string, any> = {
  github: Github,
  link: Link
}

const getIcon = (icon: string) => iconMap[icon] || Link

const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  message: [{ required: true, message: '请输入消息', trigger: 'blur' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      setTimeout(() => {
        ElMessage.success('消息发送成功！')
        form.name = ''
        form.email = ''
        form.message = ''
        submitting.value = false
      }, 1000)
    }
  })
}
</script>

<style scoped lang="scss">
.contact-view {
  max-width: 1000px;
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.contact-info {
  .info-card {
    background: var(--bg-primary, #fff);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid var(--border-color, #e4e7ed);
    margin-bottom: 24px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color, #e4e7ed);
    }

    .el-icon {
      color: var(--accent-color, #409eff);
    }
  }

  .info-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .info-label {
    font-size: 12px;
    color: var(--text-secondary, #909399);
  }

  .info-text a,
  .info-text span:last-child {
    font-size: 15px;
    color: var(--text-primary, #303133);
  }
}

.social-section {
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary, #303133);
    margin-bottom: 16px;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-color, #e4e7ed);
  border-radius: 8px;
  color: var(--text-primary, #303133);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-color, #409eff);
    color: var(--accent-color, #409eff);
  }
}

.contact-form {
  background: var(--bg-primary, #fff);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color, #e4e7ed);
}
</style>
