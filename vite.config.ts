import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { caseStudyPath, caseStudySlugs } from './src/data/routes.ts'

/* Give every route its own index.html so deep links work on a static
   host without rewrites, plus a 404.html that loads the app. */
function staticRoutes(): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      const html = await readFile(`${outDir}/index.html`, 'utf8')
      for (const slug of caseStudySlugs) {
        const dir = `${outDir}${caseStudyPath(slug)}`
        await mkdir(dir, { recursive: true })
        await writeFile(`${dir}/index.html`, html)
      }
      await writeFile(`${outDir}/404.html`, html)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), staticRoutes()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
