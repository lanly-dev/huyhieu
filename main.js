// import { Hono } from 'npm:hono@3'
import { Hono } from 'https://deno.land/x/hono@v3.12.7/mod.ts'

const app = new Hono()
app.get('/', (c) => c.text('Hello from Hono!'))
app.get('/yeah', (c) => c.text('Routing!'))

// Badge service route
app.get('/badge', async (c) => {
  const color = c.req.query('color') || '#4c1'
  const textColor = c.req.query('text') || '#fff'
  const siteUrl = c.req.query('url')
  const label = c.req.query('label') || ''
  const value = c.req.query('value') || ''
  let faviconDataUrl = null

  if (siteUrl) {
    try {
      const urlObj = new URL(siteUrl)
      const faviconUrl = `${urlObj.origin}/favicon.ico`
      const res = await fetch(faviconUrl)
      if (res.ok) {
        const buffer = new Uint8Array(await res.arrayBuffer())
        const base64 = btoa(String.fromCharCode(...buffer))
        faviconDataUrl = `data:image/x-icon;base64,${base64}`
      }
    } catch {
      // Ignore favicon errors
    }
  }

  let labelText = label
  let valueText = value
  if (!labelText && !valueText) {
    labelText = 'huy'
    valueText = 'hieu'
  }
  const labelWidth = labelText ? 10 + labelText.length * 7 : 0
  const valueWidth = valueText ? 10 + valueText.length * 7 : 0
  const iconWidth = faviconDataUrl ? 22 : 0
  const totalWidth = labelWidth + valueWidth + iconWidth || 32

  return new Response(
    `
    <svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='20' style='font-family:Verdana,sans-serif;font-size:11px;'>
      <rect width='${totalWidth}' height='20' rx='4' fill='#eee'/>
      ${valueText ? `<rect x='${labelWidth + iconWidth}' width='${valueWidth}' height='20' rx='0 4 4 0' fill='${color}'/>` : ''}
      ${faviconDataUrl ? `<image x='4' y='2' width='16' height='16' href='${faviconDataUrl}'/>` : ''}
      ${labelText ? `<text x='${faviconDataUrl ? 24 : labelWidth / 2}' y='14' fill='#333' text-anchor='${faviconDataUrl ? 'start' : 'middle'}'>${labelText}</text>` : ''}
      ${valueText ? `<text x='${labelWidth + iconWidth + valueWidth / 2}' y='14' fill='${textColor}' text-anchor='middle'>${valueText}</text>` : ''}
    </svg>
    `,
    {
      headers: { 'Content-Type': 'image/svg+xml' },
    },
  )
})

export default app.fetch
Deno.serve(app.fetch)
