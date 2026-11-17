import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build dedicado: gera dist/export.html com todo o JS e CSS inline em um único
// arquivo. Roda depois do build principal (npm run build), por isso
// emptyOutDir: false, para não apagar os arquivos do app.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'export.html',
    },
  },
})
