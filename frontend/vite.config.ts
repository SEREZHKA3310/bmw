import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve} from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.docx'],
  resolve: {
    alias: {
      '~common': resolve(__dirname, 'src', 'common'),
    },
  },
})
