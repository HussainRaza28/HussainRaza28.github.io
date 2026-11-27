/*
  Renders the procedural landscape in scripts/art/landscape.js and writes
  optimized AVIF, WebP and JPEG files to public/images.
  Run with: node scripts/render-art.mjs  (needs Playwright with Chromium)
*/
import { readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const root = fileURLToPath(new URL('..', import.meta.url))
const painter = await readFile(new URL('./art/landscape.js', import.meta.url), 'utf8')
const outDir = `${root}public/images`
await mkdir(outDir, { recursive: true })

const variants = [
  { name: 'landscape-wide', w: 2880, h: 1440, portrait: false, widths: [960, 1440, 1920, 2880] },
  { name: 'landscape-tall', w: 1170, h: 2340, portrait: true, widths: [585, 828, 1170] },
]

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(`<canvas id="c"></canvas><script>${painter}</script>`)
for (const v of variants) {
  const dataUrl = await page.evaluate(({ w, h, portrait }) => {
    const c = document.getElementById('c')
    c.width = w
    c.height = h
    paintLandscape(c.getContext('2d'), w, h, portrait)
    return c.toDataURL('image/png')
  }, v)
  const png = Buffer.from(dataUrl.split(',')[1], 'base64')
  for (const width of v.widths) {
    const base = sharp(png).resize({ width })
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${outDir}/${v.name}-${width}.avif`)
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(`${outDir}/${v.name}-${width}.webp`)
    if (width === v.widths[v.widths.length - 2] || v.widths.length === 1) {
      await base.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${outDir}/${v.name}-${width}.jpg`)
    }
  }
  console.log('rendered', v.name)
}
await browser.close()
