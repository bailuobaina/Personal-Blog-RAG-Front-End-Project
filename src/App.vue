<template>
  <div id="app">
    <app-header />
    <main class="main">
      <router-view />
    </main>
    <app-footer />
    <chat-widget />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>
