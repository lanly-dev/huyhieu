// api.js
// Simple script to test the Visual Studio Marketplace extension query endpoint

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

async function testMarketplaceAPI(namespace = 'ms-python.python') {
  const apiUrl = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'
  const requestBody = {
    filters: [
      {
        criteria: [
          {
            filterType: 7,
            value: namespace
          }
        ]
      }
    ],
    flags: 914
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json;api-version=6.0-preview.1',
      'Content-Type': 'application/json',
      'User-Agent': 'Marketplace API Test Script'
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    console.error('API request failed:', response.status, await response.text())
    return
  }

  const data = await response.json()
  const extensions = data.results?.[0]?.extensions
  if (!extensions || extensions.length === 0) {
    console.log('No extension found for namespace:', namespace)
    return
  }
  const extension = extensions[0]
  console.log('Extension displayName:', extension.displayName)
  console.log('Statistics:')
  for (const stat of extension.statistics) {
    console.log(`  ${stat.statisticName}: ${stat.value}`)
  }
}

// Run the test with a default or provided namespace
const namespace = process.argv[2] || 'ms-python.python'
testMarketplaceAPI(namespace)
