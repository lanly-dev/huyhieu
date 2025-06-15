// import { Hono } from 'npm:hono@3'
import { Hono } from 'https://deno.land/x/hono@v3.12.7/mod.ts'

const app = new Hono()
app.get('/', (c) => c.text('Hello from Hono!'))
app.get('/yeah', (c) => c.text('Routing!'))

// Badge service route
app.get('/huyhieu', async (c) => {
  const color = c.req.query('color') ?? 'green'
  const textColor = c.req.query('text') ?? 'white'
  const siteUrl = c.req.query('url')
  const label = c.req.query('label') ?? ''
  const value = c.req.query('value') ?? ''
  const size = c.req.query('size') ?? 'small'
  let faviconDataUrl = null

  const sizeMap = {
    small: { fontSize: 9, height: 16, icon: 12, y: 11 },
    medium: { fontSize: 11, height: 20, icon: 16, y: 14 },
    large: { fontSize: 15, height: 28, icon: 22, y: 20 }
  }
  const s = sizeMap[size] ?? sizeMap.small

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
      console.error('HuyHieu: Failed to fetch favicon:', siteUrl)
    }
  }

  let labelText = label
  let valueText = value
  if (!labelText && !valueText) {
    labelText = 'huy'
    valueText = 'hieu'
  }
  const labelWidth = labelText ? 10 + labelText.length * s.fontSize : 0
  const valueWidth = valueText ? 10 + valueText.length * s.fontSize : 0
  const iconWidth = faviconDataUrl ? s.icon + 6 : 0
  const totalWidth = labelWidth + valueWidth + iconWidth || s.height * 2

  return new Response(
    `
    <svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='${s.height}' style='font-family:Verdana,sans-serif;font-size:${s.fontSize}px;'>
      <rect width='${totalWidth}' height='${s.height}' rx='${Math.round(s.height / 5)}' fill='#eee' />
      ${valueText ? `<rect x='${labelWidth + iconWidth}' width='${valueWidth}' height='${s.height}' rx='0 ${Math.round(s.height / 5)} ${Math.round(s.height / 5)} 0' fill='${color}'/>` : ''}
      ${faviconDataUrl ? `<image x='4' y='${Math.round((s.height - s.icon) / 2)}' width='${s.icon}' height='${s.icon}' href='${faviconDataUrl}'/>` : ''}
      ${labelText ? `<text x='${faviconDataUrl ? s.icon + 10 : labelWidth / 2}' y='${s.y}' fill='#333' text-anchor='${faviconDataUrl ? 'start' : 'middle'}'>${labelText}</text>` : ''}
      ${valueText ? `<text x='${labelWidth + iconWidth + valueWidth / 2}' y='${s.y}' fill='${textColor}' text-anchor='middle'>${valueText}</text>` : ''}
    </svg>
    `,
    {
      headers: { 'Content-Type': 'image/svg+xml' },
    },
  )
})

export default app.fetch
// Serve the app in local to test
Deno.serve(app.fetch)
