const UPLOAD = '/image/upload/';

/**
 * Cloudinary delivery URL with automatic format (WebP/AVIF) and quality, optionally resized.
 * Replaces any transformation already present so helpers never stack.
 */
export function cld(url: string, opts: { w?: number; h?: number; crop?: 'fill' | 'limit' } = {}) {
  const i = url.indexOf(UPLOAD);
  if (i < 0) return url;
  const head = url.slice(0, i + UPLOAD.length);
  let rest = url.slice(i + UPLOAD.length);
  const first = rest.split('/')[0];
  // A transformation segment looks like "f_auto,q_auto" or "w_800"; a version looks like "v123".
  if (rest.includes('/') && /^[a-z]{1,3}_[^/]*$/.test(first)) rest = rest.slice(first.length + 1);
  const t = ['f_auto', 'q_auto', opts.w && `w_${opts.w}`, opts.h && `h_${opts.h}`, opts.crop && `c_${opts.crop}`]
    .filter(Boolean)
    .join(',');
  return `${head}${t}/${rest}`;
}

/** Responsive `srcSet` so phones download a fraction of the desktop file. */
export const cldSrcSet = (url: string, widths = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${cld(url, { w, crop: 'limit' })} ${w}w`).join(', ');
