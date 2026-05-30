// import { Hono } from 'npm:hono@3'
import { Hono } from 'https://deno.land/x/hono@v3.12.7/mod.ts'
import { IndexPage } from './index.jsx'

const app = new Hono()
app.get('/', (_c) => IndexPage())

// Badge service route
app.get('/huyhieu', async (c) => {
  const color = c.req.query('color') ?? 'green'
  const textColor = c.req.query('textcolor') ?? 'white'
  const siteUrl = c.req.query('url')
  const label = c.req.query('label') ?? ''
  const value = c.req.query('value') ?? ''
  const size = c.req.query('size') ?? 'small'
  const radiusParam = c.req.query('radius')
  const shape = c.req.query('shape') ?? 'rect' // rect, parallelogram
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
      const urlObj = new URL('https://' + siteUrl)
      const faviconUrl = `${urlObj.origin}/favicon.ico`
      const res = await fetch(faviconUrl)
      if (res.ok) {
        const buffer = new Uint8Array(await res.arrayBuffer())
        const base64 = btoa(String.fromCharCode(...buffer))
        faviconDataUrl = `data:image/x-icon;base64,${base64}`
      }
    } catch {
      console.error('HuyHieu: Failed to fetch favicon:', siteUrl)
      faviconDataUrl = null // Fallback to no favicon if fetch fails
    }
  }

  let labelText = label
  let valueText = value

  if (!labelText && !valueText && !faviconDataUrl) {
    labelText = 'huy'
    valueText = 'hieu'
  }

  const fontFamily = 'monospace'
  const monospaceFactor = 0.6 // adjust if needed for your font
  let labelWidth = labelText ? labelText.length * s.fontSize * monospaceFactor : 0
  let valueWidth = valueText ? valueText.length * s.fontSize * monospaceFactor : 0
  let iconPadL = 4
  const iconPadR = 4

  const iconLabelPad = 4 // Padding between icon and label
  const iconWidth = faviconDataUrl ? s.icon + iconPadL + iconPadR : 0
  let totalWidth = labelWidth + valueWidth + iconWidth || s.height * 2

  // Calculate parallelogram points
  const slant = Math.round(s.height * 0.5)
  let badgeBg = ''
  let valueBg = ''
  let iconX = 10
  let labelTextX = faviconDataUrl ? s.icon + iconLabelPad : labelWidth / 2
  if (shape === 'parallelogram') {
    // Fix some spacing issues
    iconPadL = labelText ? 0 : 3
    totalWidth += slant + 6
    valueWidth += slant + 4
    if (!faviconDataUrl) {
      labelWidth += 5
      totalWidth += 3
    }
    // End fix
    badgeBg = `<polygon points='${slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} 0,${s.height}' fill="#eee"/>`
    if (valueText) valueBg = `<polygon points='${labelWidth + iconWidth + slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} ${labelWidth + iconWidth},${s.height}' fill='${color}'/>`
    iconX = slant + iconPadL
    labelTextX = faviconDataUrl ? slant + s.icon + iconPadL + iconLabelPad : slant + labelWidth / 2 - 4 // 4 is label padding without icon
  } else {
    badgeBg = `<rect width='${totalWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='#eee' />`
    if (valueText) valueBg = `<rect x='${labelWidth + iconWidth}' width='${valueWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='${color}'/>`
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

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
})

// VS Marketplace stats badge route
app.get('/huyhieu/vsmarketplace/:statType/:namespace', async (c) => {
  const namespace = c.req.param('namespace')
  const statType = c.req.param('statType') // download, install, rating
  const color = c.req.query('color') ?? 'blue'
  const textColor = c.req.query('textcolor') ?? 'white'
  const size = c.req.query('size') ?? 'small'
  const radiusParam = c.req.query('radius')
  const shape = c.req.query('shape') ?? 'rect'
  const showLabel = c.req.query('label') !== 'false' // Default to showing label
  // Map stat types to labels and API statistic names
  const statMap = {
    download: { label: 'downloads', apiStat: 'install' },
    install: { label: 'installs', apiStat: 'install' },
    rating: { label: 'rating', apiStat: 'averagerating' }
  }

  const statConfig = statMap[statType] || statMap.download
  const label = showLabel ? statConfig.label : ''
  let value = 'Something went wrong'
  let faviconDataUrl = null

  console.log('Processing VS Marketplace request:', { namespace, statType, statConfig })

  const sizeMap = {
    small: { fontSize: 9, height: 16, icon: 12, y: 11 },
    medium: { fontSize: 11, height: 20, icon: 16, y: 14 },
    large: { fontSize: 15, height: 28, icon: 22, y: 20 }
  }
  const s = sizeMap[size] ?? sizeMap.small
  const borderRadius = radiusParam !== undefined ? Number(radiusParam) : 0

  // Fetch VS Marketplace favicon
  try {
    const faviconUrl = 'https://marketplace.visualstudio.com/favicon.ico'
    const res = await fetch(faviconUrl)
    if (res.ok) {
      const buffer = new Uint8Array(await res.arrayBuffer())
      const base64 = btoa(String.fromCharCode(...buffer))
      faviconDataUrl = `data:image/x-icon;base64,${base64}`
    }
  } catch (error) {
    console.error('Failed to fetch VS Marketplace favicon:', error)
  }

  // Fetch stats from VS Marketplace API
  try {
    // Use the correct VS Marketplace Gallery API with POST method
    const apiUrl = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'
    console.log('Fetching extension stats for:', namespace)

    const requestBody = {
      filters: [
        {
          criteria: [
            {
              filterType: 7,
              value: namespace // Use the namespace as the filter value
            }
          ]
        }
      ],
      flags: 914 // Include statistics
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json;api-version=6.0-preview.1',
        'Content-Type': 'application/json',
        'User-Agent': 'HuyHieu Badge Service'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      statValue = errorText
    }

    const data = await response.json()
    console.log('API Response structure:', Object.keys(data))

    const extensions = data.results?.[0]?.extensions
    if (!extensions || extensions.length === 0) {
      console.warn('No extensions found in API response')
      statValue = 'ExtensionNotFound'
    }

    const extension = extensions[0]
    const targetStat = extension.statistics?.find((stat) => stat.statisticName === statConfig.apiStat)
    let statValue = targetStat?.value
    if (!targetStat) {
      console.log(`Statistic '${statConfig.apiStat}' not found. Available:`, extension.statistics?.map((s) => s.statisticName))
      statValue = 0
    }

    // Format the value based on stat type using switch statement
    switch (statType) {
      case 'rating':
        if (!statValue) value = 'None'
        break
      case 'download':
      case 'install':
        if (statValue >= 1000000) value = (statValue / 1000000).toFixed(1) + 'M'
        else if (statValue >= 1000) value = (statValue / 1000).toFixed(1) + 'K'
        else value = statValue.toString()
    }
  } catch (error) {
    console.error('Failed to fetch VS Marketplace stats:', error)
    value = 'Error'
  }

  const fontFamily = 'monospace'
  const monospaceFactor = 0.6
  let labelWidth = label.length * s.fontSize * monospaceFactor
  let valueWidth = value.length * s.fontSize * monospaceFactor
  let iconPadL = 4
  const iconPadR = 4

  const iconLabelPad = 4
  const iconWidth = faviconDataUrl ? s.icon + iconPadL + iconPadR : 0
  let totalWidth = labelWidth + valueWidth + iconWidth || s.height * 2

  // Calculate parallelogram points
  const slant = Math.round(s.height * 0.5)
  let badgeBg = ''
  let valueBg = ''
  let iconX = 10
  let labelTextX = faviconDataUrl ? s.icon + iconLabelPad : labelWidth / 2

  if (shape === 'parallelogram') {
    iconPadL = label ? 0 : 3
    totalWidth += slant + 6
    valueWidth += slant + 4
    if (!faviconDataUrl) {
      labelWidth += 5
      totalWidth += 3
    }
    badgeBg = `<polygon points='${slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} 0,${s.height}' fill="#eee"/>`
    if (value) valueBg = `<polygon points='${labelWidth + iconWidth + slant},0 ${totalWidth},0 ${totalWidth - slant},${s.height} ${labelWidth + iconWidth},${s.height}' fill='${color}'/>`
    iconX = slant + iconPadL
    labelTextX = faviconDataUrl ? slant + s.icon + iconPadL + iconLabelPad : slant + labelWidth / 2 - 4
  } else {
    badgeBg = `<rect width='${totalWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='#eee' />`
    if (value) valueBg = `<rect x='${labelWidth + iconWidth}' width='${valueWidth}' height='${s.height}' rx='${borderRadius}' ry='${borderRadius}' fill='${color}'/>`
    iconX = iconPadL
    labelTextX = faviconDataUrl ? s.icon + iconPadL + iconLabelPad : labelWidth / 2
  }

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='${s.height}' style='font-family:${fontFamily};font-size:${s.fontSize}px;'>
      ${badgeBg}
      ${valueBg}
      ${faviconDataUrl ? `<image x='${iconX}' y='${Math.round((s.height - s.icon) / 2)}' width='${s.icon}' height='${s.icon}' href='${faviconDataUrl}'/>` : ''}
      ${label ? `<text x='${labelTextX}' y='${s.y}' fill='#333' text-anchor='${faviconDataUrl ? 'start' : 'middle'}'>${label}</text>` : ''}
      ${value ? `<text x='${labelWidth + iconWidth + valueWidth / 2}' y='${s.y}' fill='${textColor}' text-anchor='middle'>${value}</text>` : ''}
    </svg>
  `
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
})

export default app.fetch

console.log('➡️➡️', import.meta)
if (import.meta.main) {
  // Only runs when executed directly (not imported as a module)
  Deno.serve(app.fetch)
}
