<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  try {
    const html = marked.parse(props.content, { async: false }) as string
    return DOMPurify.sanitize(html)
  } catch {
    return props.content
  }
})
</script>

<style scoped lang="scss">
.markdown-content {
  font-size: 14px;
  line-height: 1.6;

  :deep(p) {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(code) {
    background: rgba(0, 0, 0, 0.06);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
  }

  :deep(pre) {
    background: #f6f8fa;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 8px 0;

    code {
      background: none;
      padding: 0;
    }
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 20px;
    margin: 8px 0;
  }

  :deep(li) {
    margin: 4px 0;
  }

  :deep(a) {
    color: inherit;
    text-decoration: underline;
  }

  :deep(blockquote) {
    border-left: 3px solid #ddd;
    padding-left: 12px;
    margin: 8px 0;
    color: #666;
  }
}

[data-theme='dark'] .markdown-content {
  :deep(code) {
    background: rgba(255, 255, 255, 0.1);
  }

  :deep(pre) {
    background: #2d2d2d;
  }
}
</style>
