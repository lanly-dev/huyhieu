# huyhieu - Minimalistic Favicon Badge Service

A simple, flat, and minimalistic badge generator that can embed a website's favicon and custom text. Built with [Hono](https://hono.dev/) and Deno.

## Features
- Flat, modern SVG badges
- Embeds a website's favicon (ICO)
- Customizable label and value text (optional)
- Sensible defaults (shows 'huy hieu' if no text provided)
- Fast and lightweight

## Usage
Start the server:
```sh
deno run --allow-net main.js
```

### Badge API
```
/badge?url=<website>&label=<label>&value=<value>&color=<color>&text=<textColor>
```
- `url` (optional): Website to fetch favicon from
- `label` (optional): Left text (default: 'huy' if both label and value are missing)
- `value` (optional): Right text (default: 'hieu' if both label and value are missing)
- `color` (optional): Badge color (default: #4c1)
- `text` (optional): Value text color (default: #fff)

### Examples
- Only favicon: `/badge?url=https://github.com`![Example badge](https://huyhieu.val.run/badge?url=https://github.com)
- Favicon + label: `/badge?url=https://github.com&label=GitHub`![Example badge](https://huyhieu.val.run/badge?url=https://github.com&label=GitHub)
- Favicon + value: `/badge?url=https://github.com&value=Online`![Example badge](https://huyhieu.val.run/badge?url=https://github.com&value=Online)
- Favicon + both: `/badge?url=https://github.com&label=GitHub&value=Online`![Example badge](https://huyhieu.val.run/badge?url=https://github.com&label=GitHub&value=Online)
- Custom color: `/badge?url=https://github.com&label=GitHub&value=Online&color=blue`![Example badge](https://huyhieu.val.run/badge?url=https://github.com&label=GitHub&value=Online&color=blue)

- Default (no params): `/badge` → shows 'huy hieu' ![Example badge](https://huyhieu.val.run/badge)

## Example Output
![Example badge](https://huyhieu.val.run/badge?url=https://github.com&label=GitHub&value=Online&color=%234c1)

## Development
- Requires [Deno](https://deno.com/)
- Uses [Hono](https://hono.dev/) for routing

## Notes
If you use Deno and ValTown for the first time, you may need to add it to your PATH:
```sh
set PATH=%PATH%;%USERPROFILE%\.deno\bin
deno install -grAf jsr:@valtown/vt
deno run --allow-net main.js
```

---
MIT License