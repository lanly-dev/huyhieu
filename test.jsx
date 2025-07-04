/** @jsxImportSource npm:hono@3/jsx */

export const honoExample = () => {
  const jsx = <div>Test {1 + 1}</div>

  return new Response(jsx.toString(), {
    headers: {
      'Content-Type': 'text/html'
    }
  })
}
