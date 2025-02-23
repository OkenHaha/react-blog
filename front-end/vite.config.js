import { defineConfig } from 'vite'
import { config } from 'dotenv'
import react from '@vitejs/plugin-react'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }

})
