// Shopify → barfusschuhe.com Generator
// Ausführen: node generate.mjs
// Holt alle Pages aus Feelgrounds und erstellt HTML-Dateien

import fs from 'fs';
import path from 'path';

const SHOP = process.env.SHOPIFY_SHOP;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

// Nur diese Page-Handles werden generiert (whitelist)
const ALLOWED_HANDLES = [
  'advertorial-barfussschuhe-test',
  // weitere Handles hier einfügen
];

async function getToken() {
  const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'client_credentials' }),
  });
  const { access_token } = await res.json();
  return access_token;
}

async function getPage(token, handle) {
  const res = await fetch(`https://${SHOP}/admin/api/2025-04/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query: `{ pages(first: 50) { edges { node { title handle body } } } }` }),
  });
  const data = await res.json();
  return data.data.pages.edges.map(e => e.node).find(p => p.handle === handle);
}

function buildHtml(page) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
</head>
<body>
${page.body}
</body>
</html>`;
}

async function main() {
  console.log('🔑 Token holen...');
  const token = await getToken();

  for (const handle of ALLOWED_HANDLES) {
    console.log(`📄 Page abrufen: ${handle}`);
    const page = await getPage(token, handle);
    if (!page) { console.log(`  ⚠️  Nicht gefunden: ${handle}`); continue; }

    const dir = path.join('.', handle);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildHtml(page));
    console.log(`  ✅ Erstellt: ${handle}/index.html`);
  }

  console.log('\n✅ Fertig! Ordner auf Netlify hochladen.');
}

main();
