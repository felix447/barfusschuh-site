import {Outlet, Links, Meta, Scripts, ScrollRestoration} from 'react-router';

export default function App() {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="de">
      <head><title>Fehler</title></head>
      <body><p>Seite nicht gefunden.</p></body>
    </html>
  );
}
