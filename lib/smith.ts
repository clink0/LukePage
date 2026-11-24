/*
 * Smith chart / Riemann sphere math and a minimal Touchstone parser.
 *
 * The 3D Smith chart puts every normalized impedance z = r + jx on the unit
 * sphere. The flat Smith chart (|Gamma| <= 1) becomes one hemisphere
 * (r >= 0, Z <= 0 here), negative resistance fills the other, and r = 0 is
 * the equator. All constant-r and constant-x lines are circles that touch
 * at the open-circuit point (1, 0, 0).
 */

export type Vec3 = [number, number, number];
export type Complex = [number, number];

/** Point on the 3D Smith chart for normalized impedance r + jx. */
export function sphereFromZ(r: number, x: number): Vec3 {
  if (!Number.isFinite(r) || !Number.isFinite(x)) return [1, 0, 0];
  const s = r * r + x * x + 1;
  return [(r * r + x * x - 1) / s, (2 * x) / s, (-2 * r) / s];
}

/**
 * cot(a / 2). With a uniform in (0, 2pi), r = cotHalf(a) gives constant-r
 * circles evenly spaced along the real-axis great circle, and x = cotHalf(a)
 * gives constant-x circles evenly spaced along the equator. Both wrap
 * through infinity at a = 0.
 */
export const cotHalf = (a: number) => 1 / Math.tan(a / 2);

/** Normalized impedance from reflection coefficient. */
export function zFromGamma([re, im]: Complex): Complex {
  const d = (1 - re) * (1 - re) + im * im;
  if (d < 1e-15) return [Infinity, Infinity];
  return [(1 - re * re - im * im) / d, (2 * im) / d];
}

export const sphereFromGamma = (g: Complex): Vec3 => {
  const [r, x] = zFromGamma(g);
  return sphereFromZ(r, x);
};

export interface Touchstone {
  nPorts: number;
  z0: number;
  freqHz: number[];
  /** data[k][i][j] = S_(i+1)(j+1) at freqHz[k] */
  data: Complex[][][];
}

const FREQ_SCALE: Record<string, number> = { HZ: 1, KHZ: 1e3, MHZ: 1e6, GHZ: 1e9 };

/** Parses Touchstone v1 S-parameter files (RI, MA or DB). */
export function parseTouchstone(text: string, nPorts: number): Touchstone {
  let unit = 1e9;
  let format = 'MA';
  let z0 = 50;
  const nums: number[] = [];

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.split('!')[0].trim();
    if (!line) continue;
    if (line.startsWith('#')) {
      const tok = line.slice(1).trim().toUpperCase().split(/\s+/);
      for (let k = 0; k < tok.length; k++) {
        const t = tok[k];
        if (t in FREQ_SCALE) unit = FREQ_SCALE[t];
        else if (t === 'RI' || t === 'MA' || t === 'DB') format = t;
        else if (t === 'R' && tok[k + 1]) z0 = parseFloat(tok[++k]);
      }
      continue;
    }
    for (const t of line.split(/\s+/)) nums.push(parseFloat(t));
  }

  const toComplex = (a: number, b: number): Complex => {
    if (format === 'RI') return [a, b];
    const mag = format === 'DB' ? Math.pow(10, a / 20) : a;
    const ang = (b * Math.PI) / 180;
    return [mag * Math.cos(ang), mag * Math.sin(ang)];
  };

  const perRow = 1 + 2 * nPorts * nPorts;
  const freqHz: number[] = [];
  const data: Complex[][][] = [];
  for (let p = 0; p + perRow <= nums.length; p += perRow) {
    freqHz.push(nums[p] * unit);
    const m: Complex[][] = Array.from({ length: nPorts }, () => new Array<Complex>(nPorts));
    for (let k = 0; k < nPorts * nPorts; k++) {
      const c = toComplex(nums[p + 1 + 2 * k], nums[p + 2 + 2 * k]);
      // 2-port files are ordered S11 S21 S12 S22; larger ones are row-major.
      const i = nPorts === 2 ? k % 2 : Math.floor(k / nPorts);
      const j = nPorts === 2 ? Math.floor(k / 2) : k % nPorts;
      m[i][j] = c;
    }
    data.push(m);
  }
  return { nPorts, z0, freqHz, data };
}
