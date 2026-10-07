/**
 * Build-time render of the site in Node (vite build --ssr). scripts/prerender.mjs calls render()
 * for every sitemap URL and writes the result into that route's HTML; the browser then hydrates it.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { renderDocument } from './seo/document';

/** The app's markup for one URL, after every lazy route chunk has resolved. */
export async function render(url: string) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      onError(error) {
        throw error;
      },
    },
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
