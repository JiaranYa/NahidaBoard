<script setup lang="ts">

import { onMounted } from 'vue'
import { useInfoStore } from './stores/info'

onMounted(() => {
  const { ipcRenderer } = window.require('electron')

  ipcRenderer.send('init-load')

  ipcRenderer.on('init-load-response', (_event: any, msg: object) => {
    console.log(msg)

    if ("uid" in msg) {
      useInfoStore().data = msg
    }
  })
})
</script>

<template>
  <div class="topbar">
    <div class="button">
      <router-link to="/"><button>主页</button></router-link>
    </div>
    <div class="button">
      <router-link to="/case"><button>我的角色</button></router-link>
    </div>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.topbar {
  height: 50px;
  background-color: #333;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

/* 侧边栏按钮样式 */
.topbar .button {
  width: 100%;
  height: 100%;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.main {
  height: 100%;
  position: fixed;
  left: 0;
  top: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
