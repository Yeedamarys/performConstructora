/**
 * Illustrative Andean soil profile used by the hero drilling scene.
 * Not survey data from a specific project; the UI labels it "Perfil ilustrativo".
 */
export interface Stratum {
  name: string;
  from: number; // metres below ground
  to: number;
  color: string;
  grain: string; // speckle colour for the procedural texture
  pebbles?: boolean;
  cracks?: boolean;
}

export const STRATA: Stratum[] = [
  { name: 'Relleno', from: 0, to: 3, color: '#6f5a48', grain: '#4a3a2e' },
  { name: 'Limo arenoso', from: 3, to: 9, color: '#a88b67', grain: '#8a6f50' },
  { name: 'Cangahua', from: 9, to: 20, color: '#c4a46c', grain: '#a7854f' },
  { name: 'Arena / grava', from: 20, to: 28, color: '#8f8576', grain: '#5f574c', pebbles: true },
  { name: 'Roca', from: 28, to: 38, color: '#5d6266', grain: '#3f4346', cracks: true },
];

/** Maximum drilling depth stated across the site (Servicios, Proyectos). */
export const MAX_DEPTH = 35;
/** Bottom of the modelled block, a little past max depth so the tip sits inside rock. */
export const BLOCK_DEPTH = 38;
/** Vertical scale in scene units per metre. Horizontal sizes are exaggerated for legibility. */
export const Y_PER_M = 0.2;
export const DEPTH_TICKS = [0, 5, 10, 15, 20, 25, 30, 35];
