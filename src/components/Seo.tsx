import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta, SITE_URL } from '../seo/meta';

function setTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps head tags in sync during in-app navigation. The server already rendered the
 * same tags for the first request (see server.ts), from the same routeMeta().
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = routeMeta(pathname);
    document.title = m.title;
    setTag('name', 'description', m.description);
    setTag('name', 'robots', m.robots);
    setTag('property', 'og:title', m.title);
    setTag('property', 'og:description', m.description);
    setTag('property', 'og:url', m.canonical ?? `${SITE_URL}${pathname}`);
    setTag('property', 'og:image', m.image);
    setTag('name', 'twitter:title', m.title);
    setTag('name', 'twitter:description', m.description);
    setTag('name', 'twitter:image', m.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (m.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = m.canonical;
    } else {
      canonical?.remove();
    }

    let ld = document.getElementById('route-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'route-jsonld';
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(m.jsonLd);
  }, [pathname]);

  return null;
}
