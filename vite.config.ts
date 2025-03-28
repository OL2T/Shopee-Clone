import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), visualizer()],
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
