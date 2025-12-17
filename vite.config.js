import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //base: '/', // Sets the base to /my-app/
  base: '/daily-bread/', // Sets the base to /my-app/
  plugins: [react()],
})
