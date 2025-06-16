// import { Hono } from 'npm:hono@3'
import { Hono } from 'https://deno.land/x/hono@v3.12.7/mod.ts'

const app = new Hono()
app.get('/', (c) =>
  c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HuyHieu Badge Service</title>
      <style>
        body { font-family: system-ui, sans-serif; background: #f9f9f9; color: #222; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 2rem; }
        h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .badge-demo { margin: 1.5rem 0; }
        code, pre { background: #f4f4f4; border-radius: 4px; padding: 2px 6px; }
        a { color: #0077cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>HuyHieu - Minimalistic Badge Service</h1>
        <p>Create flat, minimalistic SVG badges with website favicon and custom text.</p>
        <div class="badge-demo">
          <img src="/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff" alt="Badge demo" height="28" />
        </div>
        <h2>Usage</h2>
        <pre><code>/huyhieu?url=&lt;website&gt;&label=&lt;label&gt;&value=&lt;value&gt;&color=&lt;color&gt;&text=&lt;textColor&gt;&size=&lt;size&gt;</code></pre>
        <ul>
          <li><b>url</b> (optional): Website to fetch favicon from</li>
          <li><b>label</b> (optional): Left text (default: 'huy' if both label and value are missing)</li>
          <li><b>value</b> (optional): Right text (default: 'hieu' if both label and value are missing)</li>
          <li><b>color</b> (optional): Right bg color (default: green, supports hex codes like %2300bfff)</li>
          <li><b>text</b> (optional): Right text color (default: white, supports hex codes)</li>
          <li><b>size</b> (optional): Badge size (<code>small</code>, <code>medium</code>, <code>large</code>, default: <code>small</code>)</li>
        </ul>
        <h2>Examples</h2>
        <ul>
          <li>Only favicon: <code>/huyhieu?url=https://github.com</code></li>
          <li>Favicon + label: <code>/huyhieu?url=https://github.com&label=GitHub</code></li>
          <li>Favicon + value: <code>/huyhieu?url=https://github.com&value=Online</code></li>
          <li>Favicon + both: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online</code></li>
          <li>Custom color: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff</code></li>
          <li>Small: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&size=small</code></li>
          <li>Large: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&size=large</code></li>
          <li>Default: <code>/huyhieu</code> → shows 'huy hieu'</li>
        </ul>
        <p style="margin-top:2rem;font-size:0.95em;color:#888;">Open source. Powered by <a href="https://deno.com/" target="_blank">Deno</a> &amp; <a href="https://hono.dev/" target="_blank">Hono</a>.<br>
        <b>This service is hosted on <a href='https://val.town/' target='_blank'>ValTown</a>.</b></p>
      </div>
    </body>
    </html>
  `)
)
app.get('/yeah', (c) => c.text('Routing!'))

// Badge service route
app.get('/huyhieu', async (c) => {
  const color = c.req.query('color') ?? 'green'
  const textColor = c.req.query('text') ?? 'white'
  const siteUrl = c.req.query('url')
  const label = c.req.query('label') ?? ''
  const value = c.req.query('value') ?? ''
  const size = c.req.query('size') ?? 'small'
  const radiusParam = c.req.query('radius')
  const shape = c.req.query('shape') ?? 'rect' // rect, trapezoid, right-trapezoid, middle-trapezoid, parallelogram
  let faviconDataUrl = null

  const sizeMap = {
    small: { fontSize: 9, height: 16, icon: 12, y: 11 },
    medium: { fontSize: 11, height: 20, icon: 16, y: 14 },
    large: { fontSize: 15, height: 28, icon: 22, y: 20 }
  }
  const s = sizeMap[size] ?? sizeMap.small
  const borderRadius = radiusParam !== undefined ? Number(radiusParam) : 0

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
  if (!labelText && !valueText && !faviconDataUrl) {
    labelText = 'huy'
    valueText = 'hieu'
  }
  // Use monospace font for easy width calculation
  const fontFamily = 'monospace'
  const monospaceFactor = 0.6 // adjust if needed for your font
  const labelWidth = labelText ? labelText.length * s.fontSize * monospaceFactor : 0
  const valueWidth = valueText ? valueText.length * s.fontSize * monospaceFactor : 0
  const iconPadL = 4
  const iconPadR = 4

  const iconLabelPad = 4 // Padding between icon and label
  const iconWidth = faviconDataUrl ? s.icon + iconPadL + iconPadR : 0
  const totalWidth = labelWidth + valueWidth + iconWidth || s.height * 2

  // Calculate parallelogram points
  const slant = Math.round(s.height * 0.5)
  let badgeBg = ''
  let valueBg = ''
  let iconX = 10
  let labelTextX = faviconDataUrl ? s.icon + iconLabelPad : labelWidth / 2
  if (shape === 'parallelogram') {
    badgeBg = `<polygon points='${slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} 0,${s.height}' fill="#eee"/>`
    if (valueText) {
      valueBg = `<polygon points='${labelWidth + iconWidth + slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} ${labelWidth + iconWidth},${s.height}' fill='${color}'/>`
    }
    iconX = slant + iconPadL
    labelTextX = faviconDataUrl ? slant + s.icon + iconPadL + iconLabelPad : slant + labelWidth / 2
  } else {
    badgeBg = `<rect width='${totalWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='#eee' />`
    if (valueText) {
      valueBg = `<rect x='${labelWidth + iconWidth}' width='${valueWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='${color}'/>`
    }
    iconX = iconPadL
    labelTextX = faviconDataUrl ? s.icon + iconPadL + iconLabelPad : labelWidth / 2
  }

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='${s.height}' style='font-family:${fontFamily};font-size:${s.fontSize}px;'>
      ${badgeBg}
      ${valueBg}
      ${faviconDataUrl ? `<image x='${iconX}' y='${Math.round((s.height - s.icon) / 2)}' width='${s.icon}' height='${s.icon}' href='${faviconDataUrl}'/>` : ''}
      ${labelText ? `<text x='${labelTextX}' y='${s.y}' fill='#333' text-anchor='${faviconDataUrl ? 'start' : 'middle'}'>${labelText}</text>` : ''}
      ${valueText ? `<text x='${labelWidth + iconWidth + valueWidth / 2}' y='${s.y}' fill='${textColor}' text-anchor='middle'>${valueText}</text>` : ''}
    </svg>
  `

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  })
})

export default app.fetch
// Serve the app in local to test
Deno.serve(app.fetch)
