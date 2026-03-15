export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  references?: ChatReference[]
}

export interface ChatReference {
  title: string
  url?: string
  snippet?: string
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface ChatRequest {
  question: string
  sessionId?: string
}

export interface ChatResponse {
  answer: string
  references?: ChatReference[]
  sessionId: string
}
