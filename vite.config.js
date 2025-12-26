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
      assetsInlineLimit: 4096, // 4kb
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['axios', '@vueuse/core', 'gsap', 'marked']
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            let ext = info[info.length - 1].toLowerCase()
            
            // Handle different asset types
            if (ext.match(/(png|jpe?g|svg|gif|webp|avif)$/i)) {
              return 'assets/img/[name]-[hash][extname]'
            }
            if (ext.match(/(woff|woff2|eot|ttf|otf)$/i)) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            if (ext.match(/(css|scss|sass|less|styl)$/i)) {
              return 'assets/css/[name]-[hash][extname]'
            }
            return 'assets/[ext]/[name]-[hash][extname]'
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
      proxy: {
        '/api/chat': {
          target: 'https://web-production-80b7.up.railway.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/chat/, '/query'),
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    }
  }
})
