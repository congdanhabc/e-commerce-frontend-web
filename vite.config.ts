import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      "74e07de6c737.ngrok-free.app" // Dán URL của ngrok của bạn vào đây
    ]
  }
})
