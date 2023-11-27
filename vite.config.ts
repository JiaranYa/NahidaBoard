import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    electron({
      entry: 'electron/main.ts',
    }),
  ],
}

