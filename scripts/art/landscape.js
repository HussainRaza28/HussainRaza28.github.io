/*
  Blue-hour landscape: the Blue Ridge from Charlottesville, with the
  Rotunda lit in the valley. Painted procedurally on a canvas so the
  same scene can be rendered at any size; scripts/render-art.mjs turns
  it into the optimized images in public/images.
*/
function paintLandscape(ctx, W, H, portrait) {
  let seed = 271828;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`; };
  const U = Math.min(W, H) / 1000; // scale unit

  const horizon = H * (portrait ? 0.7 : 0.69);

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, horizon + H * 0.04);
  sky.addColorStop(0.0, '#11164a');
  sky.addColorStop(0.28, '#1d2470');
  sky.addColorStop(0.5, '#33388c');
  sky.addColorStop(0.68, '#5d4a9c');
  sky.addColorStop(0.8, '#9c5f9d');
  sky.addColorStop(0.9, '#d9848f');
  sky.addColorStop(1.0, '#f0a58f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Afterglow low over the ridges
  const gx = W * (portrait ? 0.62 : 0.66);
  const glow = ctx.createRadialGradient(gx, horizon, 0, gx, horizon, W * (portrait ? 0.9 : 0.55));
  glow.addColorStop(0, 'rgba(255,176,150,0.45)');
  glow.addColorStop(0.5, 'rgba(214,120,160,0.18)');
  glow.addColorStop(1, 'rgba(214,120,160,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Stars, only in the darker upper sky
  for (let i = 0; i < (portrait ? 160 : 260); i++) {
    const y = Math.pow(rand(), 1.6) * horizon * 0.55;
    ctx.globalAlpha = (0.15 + rand() * 0.55) * (1 - y / (horizon * 0.6));
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(rand() * W, y, (rand() < 0.92 ? 0.7 : 1.3) * U * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Clouds: long, thin, lit from below near the horizon
  ctx.save();
  ctx.filter = `blur(${Math.round(10 * U)}px)`;
  for (let i = 0; i < (portrait ? 26 : 38); i++) {
    const y = horizon * (0.5 + rand() * 0.42);
    const near = (y / horizon - 0.5) / 0.42; // 0 high, 1 low
    const w = W * (0.12 + rand() * 0.35);
    const h = H * (0.004 + rand() * 0.012);
    const x = rand() * W;
    ctx.fillStyle = near > 0.55
      ? `rgba(255,${150 + Math.round(rand() * 40)},${150 + Math.round(rand() * 30)},${0.18 + rand() * 0.22})`
      : `rgba(${60 + Math.round(rand() * 50)},${50 + Math.round(rand() * 40)},${130 + Math.round(rand() * 50)},${0.25 + rand() * 0.25})`;
    ctx.beginPath();
    ctx.ellipse(x, y, w / 2, h, (rand() - 0.5) * 0.03, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Ridges, far to near, each fading into valley haze at its foot
  const ridgeColors = ['#7a68ae', '#6457a5', '#4b4796', '#363b84', '#262d6b', '#1a2154'];
  const haze = '#b49ccc';
  const lines = [];
  const step = Math.max(2, Math.round(3 * U));
  for (let i = 0; i < ridgeColors.length; i++) {
    const base = horizon + H * (portrait ? 0.022 : 0.028) * i - H * 0.01;
    const amp = H * (portrait ? 0.05 : 0.07) * (1 - i * 0.09);
    const waves = Array.from({ length: 5 }, (_, k) => ({
      f: ((0.5 + rand() * 0.9) * (k + 1) * Math.PI * 2) / W * (portrait ? 0.7 : 1),
      p: rand() * Math.PI * 2,
      a: amp / Math.pow(k + 1, 1.25),
    }));
    const pts = [];
    for (let x = -step; x <= W + step; x += step) {
      let y = base;
      for (const wv of waves) y -= wv.a * (0.5 + 0.5 * Math.sin(wv.f * x + wv.p));
      y += Math.sin(x * 0.09 / U + i) * 0.6 * U + (rand() - 0.5) * 0.9 * U;
      pts.push([x, y]);
    }
    lines.push(pts);
    const top = Math.min(...pts.map((p) => p[1]));
    const g = ctx.createLinearGradient(0, top, 0, base + H * 0.06);
    g.addColorStop(0, ridgeColors[i]);
    g.addColorStop(1, mix(ridgeColors[i], haze, 0.5 - i * 0.07));
    ctx.save();
    if (i < 2) ctx.filter = `blur(${(1.4 - i * 0.6) * U}px)`;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], H);
    for (const [x, y] of pts) ctx.lineTo(x, y);
    ctx.lineTo(pts[pts.length - 1][0], H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // a band of mist settling in front of this ridge
    const mist = ctx.createLinearGradient(0, base - H * 0.012, 0, base + H * 0.03);
    mist.addColorStop(0, 'rgba(190,165,215,0)');
    mist.addColorStop(0.6, `rgba(190,165,215,${0.16 - i * 0.02})`);
    mist.addColorStop(1, 'rgba(190,165,215,0)');
    ctx.fillStyle = mist;
    ctx.fillRect(0, base - H * 0.012, W, H * 0.045);
  }

  // Valley floor where the town sits
  const floorTop = horizon + H * (portrait ? 0.15 : 0.175);
  const floor = ctx.createLinearGradient(0, floorTop - H * 0.03, 0, H);
  floor.addColorStop(0, '#141a45');
  floor.addColorStop(1, '#0a0e2a');
  ctx.fillStyle = floor;
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += step * 4) ctx.lineTo(x, floorTop + Math.sin(x / (W * 0.18)) * H * 0.008 - (x / W) * H * 0.012);
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();

  // Rotunda
  const rx = W * (portrait ? 0.66 : 0.795);
  const rs = portrait ? W * 0.15 : W * 0.05; // building width
  const rb = floorTop + rs * 0.42; // ground line of the building
  const light = (x, y, r, a, color = '255,196,120') => {
    const lg = ctx.createRadialGradient(x, y, 0, x, y, r);
    lg.addColorStop(0, `rgba(${color},${a})`);
    lg.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = lg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };

  // Town lights scattered across the valley, thicker near the Rotunda
  for (let i = 0; i < (portrait ? 170 : 320); i++) {
    const cluster = rand() < 0.55;
    const x = cluster ? rx + (rand() - 0.5) * rs * (portrait ? 3.2 : 6) : rand() * W;
    const y = floorTop + H * 0.01 + rand() * (H - floorTop) * 0.55 + (cluster ? 0 : rand() * H * 0.02);
    const r = (0.5 + rand() * 0.9) * U * 1.2;
    light(x, y, r * 5, 0.2);
    ctx.fillStyle = rand() < 0.7 ? '#ffd58a' : '#fff1d0';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  light(rx, rb - rs * 0.3, rs * 1.5, 0.26);
  // terrace
  ctx.fillStyle = '#2b2440';
  ctx.fillRect(rx - rs * 0.85, rb, rs * 1.7, rs * 0.06);
  // drum
  const drum = ctx.createLinearGradient(rx - rs * 0.48, 0, rx + rs * 0.48, 0);
  drum.addColorStop(0, '#9a6a45');
  drum.addColorStop(0.45, '#f2c789');
  drum.addColorStop(1, '#a8714a');
  ctx.fillStyle = drum;
  ctx.fillRect(rx - rs * 0.48, rb - rs * 0.4, rs * 0.96, rs * 0.4);
  // windows in the drum
  ctx.fillStyle = '#fff2cf';
  for (const dx of [-0.38, -0.3, 0.3, 0.38]) ctx.fillRect(rx + dx * rs - rs * 0.018, rb - rs * 0.3, rs * 0.036, rs * 0.12);
  // dome
  const dome = ctx.createLinearGradient(rx - rs * 0.42, 0, rx + rs * 0.42, 0);
  dome.addColorStop(0, '#7d5240');
  dome.addColorStop(0.42, '#f0d2a0');
  dome.addColorStop(1, '#86563e');
  ctx.fillStyle = dome;
  ctx.beginPath();
  ctx.ellipse(rx, rb - rs * 0.4, rs * 0.42, rs * 0.3, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,240,210,0.7)';
  ctx.fillRect(rx - rs * 0.44, rb - rs * 0.42, rs * 0.88, rs * 0.025);
  // portico: pediment and six lit columns
  ctx.fillStyle = '#f7dcaa';
  ctx.beginPath();
  ctx.moveTo(rx - rs * 0.32, rb - rs * 0.34);
  ctx.lineTo(rx, rb - rs * 0.47);
  ctx.lineTo(rx + rs * 0.32, rb - rs * 0.34);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#5b3a2e';
  ctx.fillRect(rx - rs * 0.3, rb - rs * 0.32, rs * 0.6, rs * 0.32);
  ctx.fillStyle = '#fff4da';
  for (let c = 0; c < 6; c++) ctx.fillRect(rx - rs * 0.28 + c * rs * 0.106, rb - rs * 0.32, rs * 0.036, rs * 0.32);
  ctx.fillStyle = '#f7dcaa';
  ctx.fillRect(rx - rs * 0.33, rb - rs * 0.345, rs * 0.66, rs * 0.03);
  // steps glow
  light(rx, rb + rs * 0.02, rs * 0.5, 0.4, '255,214,150');

  // Foreground trees: a leafy silhouette along the bottom, rising on the left
  const treeColor = '#080b24';
  const edge = portrait ? 0.42 : 0.26;
  const contour = (x) => {
    const leftness = Math.max(0, 1 - x / (W * edge));
    let y = H - H * 0.05 - Math.sin(x / (W * 0.05)) * H * 0.008 - leftness * leftness * H * (portrait ? 0.16 : 0.22);
    if (Math.abs(x - rx) < rs * 1.15) y = Math.max(y, rb + rs * 0.1);
    return y;
  };
  ctx.fillStyle = treeColor;
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += step * 2) ctx.lineTo(x, contour(x) + 6 * U);
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
  for (let x = -10 * U; x < W + 10 * U; x += (2.2 + rand() * 3.5) * U) {
    const leftness = Math.max(0, 1 - x / (W * edge));
    const y = contour(x) + (rand() - 0.5) * 6 * U;
    const r = (3.5 + rand() * 6) * U * (1 + leftness * 0.8);
    ctx.beginPath();
    if (rand() < 0.18) {
      const th = r * (2.2 + rand() * 1.8);
      ctx.moveTo(x, y - th);
      ctx.lineTo(x + r * 0.75, y + r);
      ctx.lineTo(x - r * 0.75, y + r);
      ctx.closePath();
    } else {
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  // a few lit windows among the trees on the right
  for (let i = 0; i < (portrait ? 14 : 24); i++) {
    const x = W * (0.45 + rand() * 0.55);
    if (Math.abs(x - rx) < rs * 1.2) continue;
    const y = H - rand() * H * 0.04 - H * 0.012;
    light(x, y, 7 * U, 0.4);
    ctx.fillStyle = '#ffcf80';
    ctx.fillRect(x, y, 2 * U, 2 * U);
  }

  // Grain
  const grain = document.createElement('canvas');
  grain.width = grain.height = 128;
  const g2 = grain.getContext('2d');
  const img = g2.createImageData(128, 128);
  for (let p = 0; p < img.data.length; p += 4) {
    const v = rand() < 0.5 ? 0 : 255;
    img.data[p] = img.data[p + 1] = img.data[p + 2] = v;
    img.data[p + 3] = Math.round(rand() * 14);
  }
  g2.putImageData(img, 0, 0);
  ctx.fillStyle = ctx.createPattern(grain, 'repeat');
  ctx.fillRect(0, 0, W, H);
}
