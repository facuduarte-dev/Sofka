import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages publica el sitio en https://<usuario>.github.io/Sofka/
  // así que todos los archivos se piden desde /Sofka/
  base: '/Sofka/',
})
