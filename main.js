// import { Hono } from 'npm:hono@3'
import { Hono } from "https://deno.land/x/hono@v3.12.7/mod.ts";

const app = new Hono();
app.get("/", (c) => c.text("Hello from Hono!"));
app.get("/yeah", (c) => c.text("Routing!"));

// Badge service route
app.get("/badge", (c) => {
  const color = c.req.query("color") === "white" ? "#fff" : "#000";
  const textColor = c.req.query("text") || "#fff";
  return new Response(
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
      <rect width="100" height="20" fill="#555"/>
      <rect x="50" width="50" height="20" fill="${color}"/>
      <text x="25" y="14" fill="${textColor}" font-family="Verdana" font-size="11" text-anchor="middle">badge</text>
      <text x="75" y="14" fill="${textColor}" font-family="Verdana" font-size="11" text-anchor="middle">active</text>
    </svg>
  `,
    {
      headers: { "Content-Type": "image/svg+xml" },
    },
  );
});

export default app.fetch;
Deno.serve(app.fetch);