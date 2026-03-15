import { request } from './index'
import type { ChatRequest, ChatResponse, ChatSession } from '@/types/chat'

export const sendChat = (data: ChatRequest) =>
  request<ChatResponse>({
    url: '/chat',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const getChatHistory = (sessionId?: string) =>
  request<ChatSession[]>({
    url: '/chat/history',
    method: 'GET',
    params: sessionId ? { sessionId } : undefined
  })

export const deleteChatSession = (sessionId: string) =>
  request<void>({
    url: `/chat/sessions/${sessionId}`,
    method: 'DELETE'
  })
