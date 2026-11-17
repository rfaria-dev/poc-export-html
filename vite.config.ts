import react from '@vitejs/plugin-react'
import { createReadStream, existsSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'

// Em dev, o Vite transformaria /export.html como página de dev (com caminhos
// absolutos do servidor), e o arquivo baixado quebraria offline. Este plugin
// serve o arquivo único já buildado (dist/export.html), então o botão de
// download funciona também em dev — desde que o build já tenha sido rodado.
function serveBuiltExportHtml(): Plugin {
  const file = new URL('./dist/export.html', import.meta.url)

  return {
    name: 'serve-built-export-html',
    configureServer(server) {
      server.middlewares.use('/export.html', (_req, res) => {
        if (!existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('export.html ainda não foi gerado. Rode "npm run build".')
          return
        }
        res.setHeader('Content-Type', 'text/html')
        createReadStream(file).pipe(res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveBuiltExportHtml()],
})
