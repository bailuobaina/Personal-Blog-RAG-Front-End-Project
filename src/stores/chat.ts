import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage, ChatSession } from '@/types/chat'
import { sendChat, getChatHistory, deleteChatSession } from '@/api/chat'

const STORAGE_KEY = 'chat_sessions'

export const useChatStore = defineStore('chat', () => {
  const sessions = ref<ChatSession[]>(loadSessions())
  const currentSessionId = ref<string | null>(null)
  const isLoading = ref(false)

  const currentSession = computed(() =>
    sessions.value.find((s) => s.id === currentSessionId.value)
  )

  const currentMessages = computed(() => currentSession.value?.messages || [])

  function loadSessions(): ChatSession[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  function saveSessions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.value))
  }

  function createSession(): ChatSession {
    const session: ChatSession = {
      id: `session_${Date.now()}`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    sessions.value.unshift(session)
    currentSessionId.value = session.id
    saveSessions()
    return session
  }

  function selectSession(sessionId: string) {
    currentSessionId.value = sessionId
  }

  function addMessage(message: ChatMessage) {
    const session = currentSession.value
    if (!session) {
      createSession()
    }
    const current = currentSession.value
    if (current) {
      current.messages.push(message)
      current.updatedAt = Date.now()
      saveSessions()
    }
  }

  async function sendMessage(content: string) {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content,
      timestamp: Date.now()
    }
    addMessage(userMessage)

    isLoading.value = true
    try {
      const response = await sendChat({
        question: content,
        sessionId: currentSessionId.value || undefined
      })

      const aiMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: response.answer,
        timestamp: Date.now(),
        references: response.references
      }
      addMessage(aiMessage)

      if (response.sessionId && !currentSessionId.value) {
        currentSessionId.value = response.sessionId
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: '抱歉，我暂时无法回答这个问题。请稍后再试。',
        timestamp: Date.now()
      }
      addMessage(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  async function clearCurrentSession() {
    if (currentSessionId.value) {
      try {
        await deleteChatSession(currentSessionId.value)
      } catch {
        // ignore
      }
    }
    const index = sessions.value.findIndex((s) => s.id === currentSessionId.value)
    if (index > -1) {
      sessions.value.splice(index, 1)
    }
    currentSessionId.value = sessions.value[0]?.id || null
    saveSessions()
  }

  return {
    sessions,
    currentSessionId,
    currentSession,
    currentMessages,
    isLoading,
    createSession,
    selectSession,
    sendMessage,
    clearCurrentSession
  }
})
