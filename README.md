# HuyHieu - Minimalistic Badge Service

A simple, flat, and minimalistic badge generator that can embed a website's favicon and custom text. Built with [Hono](https://hono.dev/) and Deno.

> This service is hosted on [ValTown](https://val.town/) for instant, serverless deployment and sharing.

## Features
- Flat, modern SVG badges
- Embeds a website's favicon (ICO)
- Customizable label and value text
- Three badge sizes: small, medium, large
- Customizable border radius (default: 0)
- Parallelogram shape
- Sensible defaults (shows 'huy hieu' if no text provided)
- Fast and lightweight

### HuyHieu API
```
/huyhieu?url=<website>&label=<label>&value=<value>&color=<color>&textcolor=<textcolor>&size=<size>&radius=<radius>&shape=<shape>
```
- `url` (optional): Website to fetch favicon from
- `label` (optional): Left text (default: 'huy' if both label and value are missing)
- `value` (optional): Right text (default: 'hieu' if both label and value are missing)
- `color` (optional): Right background color (default: green, supports hex codes)
- `textcolor` (optional): Right text color (default: white, supports hex codes)
- `size` (optional): Badge size (`small`, `medium`, `large`, default: `small`)
- `radius` (optional): Border radius in px (default: 0, only for `rect`)
- `shape` (optional): Badge shape (`rect`, `parallelogram`, etc.; default: `rect`)

### Examples
- Only favicon: `/huyhieu?url=github.com` ![Example badge](https://huyhieu.val.run/huyhieu?url=github.com)
- Favicon + label: `/huyhieu?url=github.com&label=GitHub` ![Example badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub)
- Favicon + value: `/huyhieu?url=github.com&value=Text` ![Example badge](https://huyhieu.val.run/huyhieu?url=github.com&value=Text)
- Favicon + both: `/huyhieu?url=github.com&label=GitHub&value=Text` ![Example badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text)
- Custom color: `/huyhieu?url=github.com&label=GitHub&value=Text&color=blue&textcolor=cyan` ![Example badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text&color=blue&textcolor=cyan)
- Small size: `/huyhieu?url=github.com&label=GitHub&value=Text&size=small` ![Small badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text&size=small)
- Large size: `/huyhieu?url=github.com&label=GitHub&value=Text&size=large` ![Large badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text&size=large)
- Custom border radius: `/huyhieu?url=github.com&label=GitHub&value=Text&radius=10` ![Radius badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text&radius=10)
- Parallelogram shape: `/huyhieu?url=github.com&label=GitHub&value=Text&shape=parallelogram` ![Parallelogram badge](https://huyhieu.val.run/huyhieu?url=github.com&label=GitHub&value=Text&shape=parallelogram)
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
