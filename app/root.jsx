import {Outlet, Links, Meta, Scripts, ScrollRestoration} from 'react-router';

export default function App() {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{__html: `
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Georgia', serif; color: #2c2c2c; background: #fafaf8; }
          a { color: inherit; text-decoration: none; }

          .site-header {
            background: #fafaf8;
            border-bottom: 1px solid #e8e4dc;
            padding: 18px 24px;
            text-align: center;
          }
          .site-header .logo {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.04em;
            color: #2c2c2c;
            font-family: 'Georgia', serif;
          }
          .site-header .logo span {
            color: #7a9e7e;
          }
          .site-header .tagline {
            font-size: 13px;
            color: #888;
            margin-top: 3px;
            letter-spacing: 0.08em;
            font-style: italic;
          }

          .site-footer {
            background: #2c2c2c;
            color: #ccc;
            padding: 40px 24px;
            margin-top: 60px;
            text-align: center;
            font-size: 13px;
            line-height: 1.8;
          }
          .site-footer a {
            color: #aaa;
            text-decoration: underline;
            margin: 0 8px;
          }
          .site-footer .footer-brand {
            font-size: 15px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 12px;
            letter-spacing: 0.04em;
          }
          .site-footer .footer-links {
            margin-bottom: 16px;
          }
          .site-footer .footer-copy {
            color: #666;
            font-size: 12px;
            margin-top: 12px;
          }
        `}} />
      </head>
      <body>
        <header className="site-header">
          <div className="logo">Barfuß<span>schuhe</span>.com</div>
          <div className="tagline">Natürlich gehen · Gesund leben · Frei bewegen</div>
        </header>

        <Outlet />

        <footer className="site-footer">
          <div className="footer-brand">Barfußschuhe.com</div>
          <div className="footer-links">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/versand-retouren">Versand & Retouren</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Barfußschuhe.com · Ein Projekt von ALPIN LOACKER GmbH</div>
        </footer>

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
