<template>
  <div class="chat-widget" :class="{ expanded: isExpanded }">
    <div class="chat-button" @click="toggleChat">
      <el-badge :value="unreadCount" :hidden="unreadCount === 0" :max="9">
        <el-button :icon="isExpanded ? Close : ChatDotRound" circle type="primary" />
      </el-badge>
    </div>
    <transition name="slide-up">
      <div v-if="isExpanded" class="chat-panel">
        <div class="chat-header">
          <span class="chat-title">有问题？问我吧</span>
          <el-button text @click="clearChat">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
        <div ref="messageContainer" class="chat-messages">
          <div v-if="messages.length === 0" class="chat-empty">
            <p>你好！我是AI助手</p>
            <p>可以问我关于主页主人的任何问题</p>
          </div>
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message"
            :class="msg.role"
          >
            <div class="message-content">
              <markdown-render :content="msg.content" />
              <div v-if="msg.references?.length" class="message-references">
                <p class="references-title">参考来源:</p>
                <a
                  v-for="ref in msg.references"
                  :key="ref.title"
                  :href="ref.url"
                  target="_blank"
                  class="reference-item"
                >
                  {{ ref.title }}
                </a>
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="message assistant">
            <div class="message-content">
              <div class="loading-indicator">
                <span>正在思考...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input-area">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="2"
            placeholder="输入你的问题..."
            resize="none"
            @keydown.enter.exact.prevent="handleSend"
          />
          <el-button
            type="primary"
            :loading="isLoading"
            :disabled="!inputMessage.trim()"
            @click="handleSend"
          >
            发送
          </el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { ChatDotRound, Close, Delete } from '@element-plus/icons-vue'
import { useChatStore } from '@/stores/chat'
import MarkdownRender from './MarkdownRender.vue'

const chatStore = useChatStore()

const isExpanded = ref(false)
const inputMessage = ref('')
const messageContainer = ref<HTMLElement | null>(null)

const messages = computed(() => chatStore.currentMessages)
const isLoading = computed(() => chatStore.isLoading)
const unreadCount = computed(() => 0)

const toggleChat = () => {
  isExpanded.value = !isExpanded.value
}

const handleSend = async () => {
  const content = inputMessage.value.trim()
  if (!content || isLoading.value) return

  inputMessage.value = ''
  await chatStore.sendMessage(content)
  scrollToBottom()
}

const clearChat = () => {
  chatStore.clearCurrentSession()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped lang="scss">
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-button {
  cursor: pointer;
}

.chat-panel {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 400px;
  max-width: calc(100vw - 48px);
  height: 500px;
  max-height: calc(100vh - 100px);
  background: var(--bg-primary, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color, #e4e7ed);
  background: var(--bg-secondary, #f5f7fa);
}

.chat-title {
  font-weight: 600;
  color: var(--text-primary, #303133);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.chat-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary, #909399);

  p {
    margin-bottom: 8px;
  }
}

.message {
  margin-bottom: 16px;
  display: flex;

  &.user {
    justify-content: flex-end;

    .message-content {
      background: var(--accent-color, #409eff);
      color: #fff;
      border-radius: 12px 12px 4px 12px;
    }
  }

  &.assistant {
    justify-content: flex-start;

    .message-content {
      background: var(--bg-secondary, #f5f7fa);
      border-radius: 12px 12px 12px 4px;
    }
  }
}

.message-content {
  max-width: 80%;
  padding: 10px 14px;
  word-break: break-word;
  white-space: pre-wrap;
}

.message-references {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border-color, #e4e7ed);
  font-size: 12px;
}

.references-title {
  color: var(--text-secondary, #909399);
  margin-bottom: 4px;
}

.reference-item {
  display: block;
  color: var(--accent-color, #409eff);
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
  }
}

.loading-indicator {
  color: var(--text-secondary, #909399);
  font-size: 14px;
}

.chat-input-area {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--border-color, #e4e7ed);

  .el-textarea {
    flex: 1;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 480px) {
  .chat-widget {
    bottom: 16px;
    right: 16px;
  }

  .chat-panel {
    width: calc(100vw - 32px);
    height: calc(100vh - 100px);
  }
}
</style>
