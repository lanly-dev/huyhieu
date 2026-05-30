/** @jsxImportSource npm:hono@3/jsx */

export const IndexPage = () => {
  const jsx = (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>HuyHieu Badge Service</title>
        <style>
          {`
            body { font-family: system-ui, sans-serif; background: #f9f9f9; color: #222; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 2rem; }
            h1 { font-size: 2rem; margin-bottom: 0.5rem; }
            .badge-demo { margin: 1.5rem 0; }
            code, pre { background: #f4f4f4; border-radius: 4px; padding: 2px 6px; }
            a { color: #0077cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
          `}
        </style>
      </head>
      <body>
        <div class='container'>
          <h1>HuyHieu - Minimalistic Badge Service</h1>
          <p>Create flat, minimalistic SVG badges with website favicon and custom text.</p>
          <div class='badge-demo'>
            <img src='/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff' alt='Badge demo' height='28' />
          </div>
          <h2>Usage</h2>
          <pre><code>/huyhieu?url=&lt;website&gt;&label=&lt;label&gt;&value=&lt;value&gt;&color=&lt;color&gt;&text=&lt;textColor&gt;&size=&lt;size&gt;</code></pre>
          <ul>
            <li>
              <b>url</b> (optional): Website to fetch favicon from
            </li>
            <li>
              <b>label</b> (optional): Left text (default: 'huy' if both label and value are missing)
            </li>
            <li>
              <b>value</b> (optional): Right text (default: 'hieu' if both label and value are missing)
            </li>
            <li>
              <b>color</b> (optional): Right bg color (default: green, supports hex codes like %2300bfff)
            </li>
            <li>
              <b>text</b> (optional): Right text color (default: white, supports hex codes)
            </li>
            <li>
              <b>size</b> (optional): Badge size (<code>small</code>, <code>medium</code>, <code>large</code>, default: <code>small</code>)
            </li>
          </ul>
          <h2>Examples</h2>
          <ul>
            <li>
              Only favicon: <code>/huyhieu?url=https://github.com</code>
            </li>
            <li>
              Favicon + label: <code>/huyhieu?url=https://github.com&label=GitHub</code>
            </li>
            <li>
              Favicon + value: <code>/huyhieu?url=https://github.com&value=Online</code>
            </li>
            <li>
              Favicon + both: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online</code>
            </li>
            <li>
              Custom color: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff</code>
            </li>
            <li>
              Small: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&size=small</code>
            </li>
            <li>
              Large: <code>/huyhieu?url=https://github.com&label=GitHub&value=Online&size=large</code>
            </li>
            <li>
              Default: <code>/huyhieu</code> → shows 'huy hieu'
            </li>
          </ul>

          <h2>VS Marketplace Stats</h2>
          <p>Get VS Code extension statistics with automatic favicon and formatting.</p>
          <pre><code>/huyhieu/vsmarketplace/&lt;statType&gt;/&lt;namespace&gt;?label=&lt;true|false&gt;&color=&lt;color&gt;&size=&lt;size&gt;</code></pre>
          <ul>
            <li>
              <b>statType</b>: <code>download</code>, <code>install</code>, or <code>rating</code>
            </li>
            <li>
              <b>namespace</b>: Extension identifier (e.g., ms-python.python)
            </li>
            <li>
              <b>label</b> (optional): Show label text (default: true)
            </li>
            <li>
              <b>color</b>, <b>size</b>, etc.: Same styling options as regular badges
            </li>
          </ul>
          <h3>VS Marketplace Examples</h3>
          <ul>
            <li>
              Downloads: <code>/huyhieu/vsmarketplace/download/ms-python.python</code>
            </li>
            <li>
              Installs: <code>/huyhieu/vsmarketplace/install/ms-python.python</code>
            </li>
            <li>
              Rating: <code>/huyhieu/vsmarketplace/rating/ms-python.python</code>
            </li>
            <li>
              No label: <code>/huyhieu/vsmarketplace/download/ms-python.python?label=false</code>
            </li>
          </ul>

          <p style='margin-top:2rem;font-size:0.95em;color:#888;'>
            Open source. Powered by <a href='https://deno.com/' target='_blank'>Deno</a> &amp; <a href='https://hono.dev/' target='_blank'>Hono</a>.<br />
            <b>
              This service is hosted on <a href='https://val.town/' target='_blank'>ValTown</a>.
            </b>
          </p>
        </div>
      </body>
    </html>
  )
  return new Response(jsx.toString(), { headers: { 'Content-Type': 'text/html' } })
}
