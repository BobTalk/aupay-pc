import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import vitePluginImp from 'vite-plugin-imp'
import WindiCSS from 'vite-plugin-windicss'
const proxyUrl = 'http://192.168.50.162:9000'
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, "src"),
      }
    ]
  },
  build:{
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 8089,
    host: true,
    https: false,
    open: true,
    proxy: {
      "/admin": {
        target: `${proxyUrl}`,
        changeOrigin: true,
        // rewrite: (path) => path.replace('/admin', '')
      },
      "/operate": {
        target: proxyUrl,
        changeOrigin: true,
      },
      "/wallet": {
        target: proxyUrl,
        changeOrigin: true,
      },
      "/user": {
        target: proxyUrl,
        changeOrigin: true,
      }
    }
  }
})
