# HuyHieu - Minimalistic Badge Service

A simple, flat, and minimalistic badge generator that can embed a website's favicon and custom text. Built with [Hono](https://hono.dev/) and Deno.

> This service is hosted on [ValTown](https://val.town/) for instant, serverless deployment and sharing.

## Features
- Flat, modern SVG badges
- Embeds a website's favicon (ICO)
- Customizable label and value text
- Three badge sizes: small, medium, large
- Customizable border radius (default: 0)
- Sensible defaults (shows 'huy hieu' if no text provided)
- Fast and lightweight

## Usage
Start the server:
```sh
deno run --allow-net main.js
```

### HuyHieu API
```
/huyhieu?url=<website>&label=<label>&value=<value>&color=<color>&text=<textColor>&size=<size>&radius=<radius>
```
- `url` (optional): Website to fetch favicon from
- `label` (optional): Left text (default: 'huy' if both label and value are missing)
- `value` (optional): Right text (default: 'hieu' if both label and value are missing)
- `color` (optional): Right bg color (default: green, supports hex codes like %2300bfff)
- `text` (optional): Right text color (default: white, supports hex codes)
- `size` (optional): Badge size (`small`, `medium`, `large`, default: `small`)
- `radius` (optional): Border radius in px (default: 0, for square corners)

### Examples
- Only favicon: `/huyhieu?url=https://github.com` ![Example badge](https://huyhieu.val.run/huyhieu?url=https://github.com)
- Favicon + label: `/huyhieu?url=https://github.com&label=GitHub` ![Example badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub)
- Favicon + value: `/huyhieu?url=https://github.com&value=Online` ![Example badge](https://huyhieu.val.run/huyhieu?url=https://github.com&value=Online)
- Favicon + both: `/huyhieu?url=https://github.com&label=GitHub&value=Online` ![Example badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub&value=Online)
- Custom color: `/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff` ![Example badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub&value=Online&color=%2300bfff)
- Small size: `/huyhieu?url=https://github.com&label=GitHub&value=Online&size=small` ![Small badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub&value=Online&size=small)
- Large size: `/huyhieu?url=https://github.com&label=GitHub&value=Online&size=large` ![Large badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub&value=Online&size=large)
- Custom border radius: `/huyhieu?url=https://github.com&label=GitHub&value=Online&radius=10` ![Radius badge](https://huyhieu.val.run/huyhieu?url=https://github.com&label=GitHub&value=Online&radius=10)
- Default (no params): `/huyhieu` → shows 'huy hieu' ![Example badge](https://huyhieu.val.run/huyhieu)

## Development
- Requires [Deno](https://deno.com/)
- Uses [Hono](https://hono.dev/) for routing

## Notes
If you use Deno and ValTown for the first time, you may need to add it to your PATH:
```sh
# Set deno to path
set PATH=%PATH%;%USERPROFILE%\.deno\bin
# Install vt
deno install -grAf jsr:@valtown/vt
# Run in local
deno run --allow-net main.js
```
