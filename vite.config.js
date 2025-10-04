import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: isProduction ? '/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['axios', '@vueuse/core', 'gsap', 'marked']
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            let ext = info[info.length - 1]
            if (/\png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              ext = 'img'
            }
            return `assets/${ext}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 3000,
      host: true,
      fs: {
        strict: true,
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    }
  }
})
