<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">个人主页</div>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/projects">项目</router-link>
          <router-link to="/timeline">经历</router-link>
          <router-link to="/contact">联系</router-link>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <p>© 2024 个人主页. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav a {
  color: #666;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav a:hover,
.nav a.router-link-active {
  color: #409eff;
  background: #f5f7fa;
}

.main {
  flex: 1;
}

.footer {
  background: #f5f7fa;
  border-top: 1px solid #eee;
  padding: 24px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
