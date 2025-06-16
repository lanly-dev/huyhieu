# HuyHieu - Minimalistic Badge Service

A simple, flat, and minimalistic badge generator that can embed a website's favicon and custom text. Built with [Hono](https://hono.dev/) and Deno.

> This service is hosted on [ValTown](https://val.town/) for instant, serverless deployment and sharing.

## Features
- Flat, modern SVG badges
- Embeds a website's favicon (ICO)
- Customizable label and value text
- Three badge sizes: small, medium, large
- Customizable border radius (default: 0)
- Parallelogram shape support
- VS Code Marketplace integration

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

## VS Marketplace
```
/huyhieu/vsmarketplace/<statType>/<namespace>?label=<true|false>&color=<color>&size=<size>&shape=<shape>
```

#### Parameters
- `statType`: The type of statistic to display
  - `download` / `install` - Total installations (173M)
  - `rating` - Average rating (4.2)
- `namespace`: Extension identifier (e.g., `ms-python.python`)
- `label` (optional): Show label text (default: `true`)
- `color`, `size`, `shape`, etc.: Same styling options as regular badges

#### VS Marketplace Examples
- Downloads: `/huyhieu/vsmarketplace/download/ms-python.python` ![Downloads](https://huyhieu.val.run/huyhieu/vsmarketplace/download/ms-python.python)
- Installs: `/huyhieu/vsmarketplace/install/ms-python.python` ![install](https://huyhieu.val.run/huyhieu/vsmarketplace/install/ms-python.python)
- Rating: `/huyhieu/vsmarketplace/rating/ms-python.python` ![Rating](https://huyhieu.val.run/huyhieu/vsmarketplace/rating/ms-python.python)
- No Label: `/huyhieu/vsmarketplace/download/ms-python.python?label=false` ![No Label](https://huyhieu.val.run/huyhieu/vsmarketplace/download/ms-python.python?label=false)
- Custom Style: `/huyhieu/vsmarketplace/download/ms-python.python?color=purple&shape=parallelogram` ![Custom](https://huyhieu.val.run/huyhieu/vsmarketplace/download/ms-python.python?color=purple&size=large&shape=parallelogram)

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
