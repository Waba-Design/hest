// Kandidat 166 · JULESTALDEN — kalenderens billedscene (opgave-2026-11-16-kandidat-166.md; Fables kalenderdesign 16/11 §2–§3 og §6, T1/T2/T5/T7).
// En HENTET fil som skins/skin-motor.js: siderne bærer kun indlæseren i waba-doer.js (W.kalender), og filen melder sig med WABA.kalender.sceneKlar(API) og har
// sin CSS i sig. Kan filen ikke hentes (net, gammel side, den enkle demo uden filer ved siden af), tegner W.kalender den nuværende kalender — faldskærmen.
// Scenen: ét billede af stalden i sne (to lys: aften = mørk, vintermorgen = lys) og 24 låger i fem størrelser, skåret ud af billedet som i en papirkalender
// (lågens forside er udsnittet af scenen bag den). Tallene står spredt (Fable D4, produktejerens valg 16/11); DOM-rækkefølgen er 1–24. Lyskæden hænger i scenens
// overkant. Alt i scenen har FASTE farver (det er et billede); alt uden om bruger appens tokens. «Bevægelse» fra / prefers-reduced-motion: alt står færdigt.
// Lågebilledet (billede/tag/alt) kommer KUN med facit fra serveren (Fable A3) og har et filnavn, der ikke kan gættes (A4). Mangler et billede, tegnes reserven.
(function (rod) {
  'use strict';
  /* BILLEDER START — skrives af lav-kalenderbilleder.js (kør det igen, når der kommer billeder; ingen kodeændring). Tom = den tegnede reservescene. */
  var SCENER = {'aften-bred':'scene-aften-bred.webp','aften-hoej':'scene-aften-hoej.webp','dag-bred':'scene-dag-bred.webp','dag-hoej':'scene-dag-hoej.webp','l25':'l25-6537fe44'};
  /* BILLEDER SLUT */
  var MAPPE = 'kalender/2026/';
  // Fast «tilfældighed» (samme tegning hver gang — skærmbilleder og prøver kan sammenlignes).
  var rnd = function (n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  // Lågernes plads (Fable §6.3, talt efter: 24 låger, ingen overlap, 5 tomme felter): [dag, kolonne, række, bredde, højde]. Telefon 6 × 9, bred (fra 700 px) 9 × 6.
  var PLAN = [[13,1,1,2,2],[17,3,1,1,1],[3,4,1,2,1],[11,6,1,1,2],[8,3,2,2,1],[22,1,3,1,2],[15,2,3,2,1],[6,4,3,2,2],[5,6,3,1,1],[1,3,4,1,1],[19,6,4,1,1],
    [21,1,5,2,1],[10,4,5,1,1],[23,5,5,2,1],[7,1,6,1,2],[24,2,6,3,2],[20,5,6,2,2],[2,1,8,2,1],[14,3,8,1,1],[18,4,8,1,1],[9,5,8,2,1],[12,1,9,1,1],[16,2,9,2,1],[4,4,9,2,1]];
  var PLAN_BRED = [[13,1,1,2,2],[17,3,1,1,1],[3,4,1,2,1],[8,7,1,2,1],[11,9,1,1,2],[15,3,2,2,1],[1,5,2,1,1],[21,6,2,2,1],[5,8,2,1,1],[22,1,3,1,2],[6,2,3,2,2],[19,4,3,1,1],[10,5,3,1,1],[20,7,3,2,2],[7,9,3,1,2],
    [24,4,4,3,2],[2,1,5,2,1],[14,3,5,1,1],[18,7,5,1,1],[9,8,5,2,1],[12,1,6,1,1],[16,2,6,2,1],[23,5,6,2,1],[4,8,6,2,1]];
  // De tomme felter (talt efter 16/11: 4 pr. plan, ikke 5 som i Fables §6.3 — 8×1 + 9×2 + 3×(1×2) + 3×(2×2) + 3×2 = 50 af 54): telefon (5,2) (2,4) (3,5) (6,9),
  // bred (6,1) (6,3) (4,6) (7,6). T7: nissedøren nederst (Fable E1), låge 25 midt i scenen (E9) → [kolonne, række].
  var TOM = { nisse: { hoej: [6, 9], bred: [7, 6] }, l25: { hoej: [3, 5], bred: [6, 3] } };
  function plads(dag, bred) { var p = null, L = bred ? PLAN_BRED : PLAN; for (var i = 0; i < L.length; i++) if (L[i][0] === dag) { p = L[i]; break; } return { c: p[1], r: p[2], w: p[3], h: p[4] }; }
  // Reservens farver bag en åbnet låge uden billede (Fable §4.5: «en farvet flade med lågens tal») — én rolig farve pr. låge, samme par som prototypens pladsholdere.
  var FARVE = ['#3b2f4f,#7b5ea7', '#12324a,#2f7fa3', '#2d4a3a,#6fa37f', '#28405e,#5d86b8', '#4a2f12,#c98a2b', '#5a3a12,#e6a03a', '#3f3524,#8a7a4a', '#40243a,#a85a8a',
    '#1f3550,#4f7fb0', '#2a3f2a,#5f8a4f', '#3a1f1f,#b0453a', '#2f3a3f,#7a8f96', '#06101f,#1a3355', '#4a3a5a,#9a7fb8', '#3f4a1f,#93a84a', '#1f3f4a,#4fa3b8',
    '#4a2a1f,#b8704f', '#1a1a1a,#555555', '#3a2f1f,#a88a5a', '#1f3a2a,#3f7a55', '#2a2f55,#f0a66a', '#1f3f2a,#5fa86f', '#0a1a33,#27477a', '#3a1212,#a8322b'];
  var HOVED = 'M8 50 L10 31 C10 20 15 12 22 8 L23 1 L28 8 C34 12 38 20 39 28 L41 37 C41 40 37 42 34 40 L28 33 C26 38 24 44 24 50 Z';
  var SKO = '<svg viewBox="0 0 28 26" aria-hidden="true" focusable="false"><path d="M3 2 C2 14.0 6 24 14 24 C22 24 26 14.0 25 2 L19.5 2 C20 12 18 18 14 18 C10 18 8 12 8.5 2 Z" fill="FARVE" stroke="#7a5a12" stroke-width="1.2" stroke-linejoin="round"/><g fill="#7a5a12"><circle cx="5.6" cy="8" r="1"/><circle cx="6.6" cy="14" r="1"/><circle cx="22.4" cy="8" r="1"/><circle cx="21.4" cy="14" r="1"/></g></svg>';
  var sko = function (f) { return SKO.replace('FARVE', f || '#f2c14e'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  // ── Reservescenen (Fable §4.5): tegnet her, så prod aldrig venter på billeder. Afløses af kalender/2026/scene-*.webp, når billedrøret har lagt dem (SCENER). ──
  function tegnScene(bred, dagslys) {
    var w = bred ? 900 : 600, h = bred ? 600 : 900, P = dagslys
      ? { h1: '#9cc7e8', h2: '#dcecf7', h3: '#fbe6cf', sne: '#ffffff', sne2: '#e3edf5', skov: '#7d9a94', skov2: '#55756c', vaeg: '#a8382f', vaeg2: '#8a2b24', tag: '#f4f8fb', vin: '#f6d98a', port: '#5a3a22', stj: 0 }
      : { h1: '#081327', h2: '#16294d', h3: '#40507c', sne: '#c9d6ea', sne2: '#98abc9', skov: '#16263f', skov2: '#0d1a2e', vaeg: '#5b211e', vaeg2: '#451815', tag: '#b7c7df', vin: '#ffd670', port: '#2c1c12', stj: 1 };
    var gy = h * .78, sy = h * .5, sx = w * .1, sw = w * .8, sh = gy - sy, i, s;
    s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><defs><linearGradient id="hi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.h1 + '"/><stop offset=".6" stop-color="' + P.h2 + '"/><stop offset="1" stop-color="' + P.h3 + '"/></linearGradient>' +
      '<radialGradient id="gl"><stop offset="0" stop-color="#ffd670" stop-opacity=".55"/><stop offset="1" stop-color="#ffd670" stop-opacity="0"/></radialGradient></defs><rect width="' + w + '" height="' + h + '" fill="url(#hi)"/>';
    if (P.stj) { for (i = 0; i < 70; i++) s += '<circle cx="' + (rnd(i) * w).toFixed(0) + '" cy="' + (rnd(i + 99) * h * .5).toFixed(0) + '" r="' + (rnd(i + 5) * 1.6 + .5).toFixed(1) + '" fill="#fff" opacity="' + (.35 + rnd(i + 3) * .6).toFixed(2) + '"/>';
      s += '<circle cx="' + w * .78 + '" cy="' + h * .13 + '" r="' + h * .06 + '" fill="url(#gl)"/><circle cx="' + w * .78 + '" cy="' + h * .13 + '" r="' + h * .032 + '" fill="#fdf3d0"/><circle cx="' + (w * .78 + h * .012) + '" cy="' + (h * .13 - h * .008) + '" r="' + h * .028 + '" fill="' + P.h1 + '"/>'; }
    else s += '<circle cx="' + w * .24 + '" cy="' + h * .3 + '" r="' + h * .1 + '" fill="#fff3c9" opacity=".5"/><circle cx="' + w * .24 + '" cy="' + h * .3 + '" r="' + h * .045 + '" fill="#fff6dc"/>';
    s += '<path d="M0 ' + h * .47 + ' Q' + w * .25 + ' ' + h * .38 + ' ' + w * .5 + ' ' + h * .45 + ' T' + w + ' ' + h * .42 + ' V' + h + ' H0Z" fill="' + P.sne2 + '"/>';
    for (i = 0; i < 26; i++) { var x = rnd(i + 200) * w, y = h * (.44 + rnd(i + 300) * .05), k = h * (.05 + rnd(i + 400) * .05);
      s += '<path d="M' + x + ' ' + (y - k) + ' l' + k * .32 + ' ' + k + ' h' + -k * .64 + 'z" fill="' + (i % 2 ? P.skov : P.skov2) + '"/><path d="M' + x + ' ' + (y - k) + ' l' + k * .14 + ' ' + k * .42 + ' h' + -k * .28 + 'z" fill="' + P.sne + '" opacity=".75"/>'; }
    s += '<path d="M0 ' + h * .56 + ' Q' + w * .3 + ' ' + h * .5 + ' ' + w * .6 + ' ' + h * .55 + ' T' + w + ' ' + h * .53 + ' V' + h + ' H0Z" fill="' + P.sne + '"/>';
    s += '<rect x="' + sx + '" y="' + sy + '" width="' + sw + '" height="' + sh + '" fill="' + P.vaeg + '"/>';
    for (i = 1; i < 30; i++) s += '<path d="M' + (sx + sw * i / 30) + ' ' + sy + ' v' + sh + '" stroke="' + P.vaeg2 + '" stroke-width="' + w * .003 + '"/>';
    var ty = sy - sh * .62;
    s += '<path d="M' + (sx - w * .04) + ' ' + sy + ' L' + (sx + sw * .16) + ' ' + ty + ' H' + (sx + sw * .84) + ' L' + (sx + sw + w * .04) + ' ' + sy + 'Z" fill="' + P.vaeg2 + '"/>' +
      '<path d="M' + (sx - w * .04) + ' ' + sy + ' L' + (sx + sw * .16) + ' ' + ty + ' H' + (sx + sw * .84) + ' L' + (sx + sw + w * .04) + ' ' + sy + ' l' + -w * .02 + ' ' + h * .012 + ' Q' + w * .5 + ' ' + (sy - h * .012) + ' ' + (sx - w * .02) + ' ' + (sy + h * .012) + 'Z" fill="' + P.tag + '"/>' +
      '<path d="M' + (sx + sw * .16) + ' ' + ty + ' H' + (sx + sw * .84) + ' l' + w * .02 + ' ' + h * .03 + ' H' + (sx + sw * .14) + 'Z" fill="' + P.sne + '"/>';
    var kx = w * .5, kw = sw * .16;
    s += '<path d="M' + (kx - kw / 2) + ' ' + (sy - sh * .2) + ' L' + kx + ' ' + (sy - sh * .5) + ' L' + (kx + kw / 2) + ' ' + (sy - sh * .2) + 'Z" fill="' + P.sne + '"/><rect x="' + (kx - kw * .32) + '" y="' + (sy - sh * .22) + '" width="' + kw * .64 + '" height="' + sh * .2 + '" fill="' + P.vaeg + '"/><circle cx="' + kx + '" cy="' + (sy - sh * .13) + '" r="' + kw * .14 + '" fill="' + P.vin + '"/>';
    var pw = sw * .2, ph = sh * .78, px = kx - pw / 2, py = gy - ph;
    s += '<circle cx="' + kx + '" cy="' + (gy - ph * .4) + '" r="' + pw * 1.1 + '" fill="url(#gl)"/><path d="M' + px + ' ' + gy + ' V' + (py + pw * .3) + ' Q' + kx + ' ' + (py - pw * .25) + ' ' + (px + pw) + ' ' + (py + pw * .3) + ' V' + gy + 'Z" fill="' + P.port + '"/><rect x="' + (kx - pw * .03) + '" y="' + (py + pw * .12) + '" width="' + pw * .06 + '" height="' + (ph - pw * .12) + '" fill="' + P.vin + '"/>' +
      '<path d="M' + (px + pw * .08) + ' ' + (gy - ph * .08) + ' L' + (kx - pw * .08) + ' ' + (py + pw * .4) + ' M' + (px + pw * .92) + ' ' + (gy - ph * .08) + ' L' + (kx + pw * .08) + ' ' + (py + pw * .4) + '" stroke="' + P.vaeg2 + '" stroke-width="' + w * .006 + '" opacity=".8"/>';
    [.1, .27, .73, .9].forEach(function (f, j) { var x2 = sx + sw * f, vw = sw * .09, vh = sh * .36, y2 = sy + sh * .22;
      s += '<circle cx="' + x2 + '" cy="' + (y2 + vh / 2) + '" r="' + vw * 1.2 + '" fill="url(#gl)"/><rect x="' + (x2 - vw / 2) + '" y="' + y2 + '" width="' + vw + '" height="' + vh + '" rx="' + vw * .1 + '" fill="' + (j % 3 ? P.vin : P.port) + '" stroke="' + P.tag + '" stroke-width="' + w * .005 + '"/>';
      if (j % 3) s += '<path d="M' + x2 + ' ' + y2 + ' v' + vh + ' M' + (x2 - vw / 2) + ' ' + (y2 + vh / 2) + ' h' + vw + '" stroke="' + P.vaeg2 + '" stroke-width="' + w * .004 + '"/>';
      else s += '<g transform="translate(' + (x2 - vw * .42) + ' ' + (y2 + vh * .08) + ') scale(' + vw / 48 + ')"><path d="' + HOVED + '" fill="' + (j ? '#3a2a1c' : '#c9a57a') + '"/></g><rect x="' + (x2 - vw / 2) + '" y="' + (y2 + vh * .62) + '" width="' + vw + '" height="' + vh * .38 + '" fill="' + P.vaeg2 + '" stroke="' + P.tag + '" stroke-width="' + w * .004 + '"/>'; });
    s += '<path d="M0 ' + gy + ' Q' + w * .2 + ' ' + (gy - h * .025) + ' ' + w * .45 + ' ' + (gy + h * .01) + ' T' + w + ' ' + (gy - h * .01) + ' V' + h + ' H0Z" fill="' + P.sne + '"/><path d="M0 ' + (gy + h * .09) + ' Q' + w * .35 + ' ' + (gy + h * .04) + ' ' + w * .7 + ' ' + (gy + h * .1) + ' T' + w + ' ' + (gy + h * .07) + ' V' + h + ' H0Z" fill="' + P.sne2 + '" opacity=".55"/>';
    for (i = 0; i < 7; i++) { var hx = w * (.02 + i * .055), hy = gy + h * .05; s += '<rect x="' + hx + '" y="' + (hy - h * .05) + '" width="' + w * .012 + '" height="' + h * .07 + '" fill="' + P.port + '"/><rect x="' + (hx - w * .004) + '" y="' + (hy - h * .056) + '" width="' + w * .02 + '" height="' + h * .008 + '" rx="2" fill="' + P.sne + '"/>'; }
    s += '<rect x="' + w * .02 + '" y="' + (gy + h * .012) + '" width="' + w * .345 + '" height="' + h * .008 + '" fill="' + P.port + '"/><rect x="' + w * .02 + '" y="' + (gy + h * .04) + '" width="' + w * .345 + '" height="' + h * .008 + '" fill="' + P.port + '"/>';
    var jx = w * .84, jy = gy + h * .1, jk = h * .2;
    s += '<rect x="' + (jx - jk * .04) + '" y="' + (jy - jk * .1) + '" width="' + jk * .08 + '" height="' + jk * .12 + '" fill="' + P.port + '"/>';
    [[1, .34], [.72, .27], [.44, .2]].forEach(function (t, j) { var y3 = jy - jk * .1 - jk * j * .27; s += '<path d="M' + jx + ' ' + (y3 - jk * .42) + ' l' + jk * t[1] + ' ' + jk * .42 + ' h' + -jk * t[1] * 2 + 'z" fill="' + (dagslys ? '#2f6b4a' : '#1d4a36') + '"/><path d="M' + jx + ' ' + (y3 - jk * .42) + ' l' + jk * t[1] * .45 + ' ' + jk * .19 + ' q' + -jk * t[1] * .45 + ' ' + jk * .06 + ' ' + -jk * t[1] * .9 + ' 0z" fill="' + P.sne + '"/>'; });
    ['#ffd670', '#ff6b5e', '#6cb8ff', '#ffd670', '#ff6b5e'].forEach(function (c, j) { s += '<circle cx="' + (jx + (rnd(j + 60) - .5) * jk * .34) + '" cy="' + (jy - jk * (.2 + j * .13)) + '" r="' + jk * .022 + '" fill="' + c + '"/>'; });
    s += '<path d="M' + jx + ' ' + (jy - jk * 1.12) + ' l' + jk * .03 + ' ' + jk * .07 + ' l' + jk * .07 + ' 0 l' + -jk * .055 + ' ' + jk * .045 + ' l' + jk * .02 + ' ' + jk * .07 + ' l' + -jk * .065 + ' ' + -jk * .04 + ' l' + -jk * .065 + ' ' + jk * .04 + ' l' + jk * .02 + ' ' + -jk * .07 + ' l' + -jk * .055 + ' ' + -jk * .045 + ' l' + jk * .07 + ' 0z" fill="#ffd670"/>';
    for (i = 0; i < 60; i++) s += '<circle cx="' + (rnd(i + 700) * w).toFixed(0) + '" cy="' + (rnd(i + 800) * h).toFixed(0) + '" r="' + (1 + rnd(i + 900) * 2.2).toFixed(1) + '" fill="#fff" opacity="' + (.5 + rnd(i) * .4).toFixed(2) + '"/>';
    return s + '</svg>';
  }
  var URL_CACHE = {};
  // Scenens billede som CSS-værdi: Grok-billedet, hvis billedrøret har lagt det (SCENER), ellers reserven som data-adresse (tegnes én gang pr. lys og format).
  function sceneUrl(c, bred) {
    var dag = c.wt === 'l', n = (dag ? 'dag' : 'aften') + '-' + (bred ? 'bred' : 'hoej');
    if (SCENER[n]) return 'url("' + c.fil(MAPPE + SCENER[n]) + '")';
    return URL_CACHE[n] || (URL_CACHE[n] = 'url("data:image/svg+xml,' + encodeURIComponent(tegnScene(bred, dag)).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29') + '")');
  }
  // Lågebilledet (kun når serveren har sendt det med facit): 256 i scenen, 768 i lågens ark. Uden billede: reservens farvede flade.
  function billede(c, l, str) { return l && /^l\d\d-[0-9a-f]{8}$/.test(String(l.billede || '')) ? c.fil(MAPPE + l.billede + '-' + str + '.webp') : ''; }
  function reserve(l, stor) { var f = FARVE[(l.dag - 1) % 24].split(',');
    return '<span class="wkr" style="background:radial-gradient(ellipse at 50% 40%,' + f[1] + ' 0%,' + f[0] + ' 100%)"><b' + (stor ? ' class="wkr-stor"' : '') + '>' + l.dag + '</b><span class="wkr-sko">' + sko() + '</span></span>'; }
  function bag(c, l, str, stor) { var u = billede(c, l, str);
    return u ? '<span class="wkb"><i role="img" aria-label="' + esc(l.alt || '') + '" style="background-image:url(&quot;' + esc(u) + '&quot;)"></i></span>' : '<span class="wkb" aria-hidden="true">' + reserve(l, stor) + '</span>'; }
  var rigtig = function (l) { return !!(l && l.mit && l.facit && (l.facit.rigtigt == null ? true : l.mit.valg === l.facit.rigtigt)); };

  // ── Lyskæden (Fable D8): en ledning med 24 pærer i scenens overkant (gul, rød, grøn, blå). Tændte lyser; slukkede er gråt glas. Pære i = lyskædens pære i. ──
  var PFARVE = ['#ffd670', '#ff6b5e', '#7fe0a0', '#7cc0ff'];
  function kaede(st, w) {
    var n = 24, sw = 6, d = '', pp = '', on = st.paerer || [];
    for (var k = 0; k < sw; k++) { var x0 = w * k / sw, x1 = w * (k + 1) / sw; d += (k ? '' : 'M0 10 ') + 'Q' + (x0 + x1) / 2 + ' 44 ' + x1 + ' 10 '; }
    for (var i = 0; i < n; i++) { var u = (i + .5) / n * sw, kk = Math.floor(u), t = u - kk, a = w * kk / sw, b = w * (kk + 1) / sw, x = (1 - t) * (1 - t) * a + 2 * (1 - t) * t * (a + b) / 2 + t * t * b,
        y = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 44 + t * t * 10, til = !!on[i], c = PFARVE[i % 4];
      pp += '<g class="wkp" data-paere="' + (i + 1) + '" data-taendt="' + (til ? 1 : 0) + '" style="--c:' + c + ';--i:' + i + '"><rect x="' + (x - 2) + '" y="' + (y - 1) + '" width="4" height="4" fill="#2b2118"/>' +
        '<ellipse cx="' + x.toFixed(1) + '" cy="' + (y + 9).toFixed(1) + '" rx="5.2" ry="7" fill="' + (til ? c : 'rgba(150,160,180,.38)') + '" stroke="' + (til ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.6)') + '" stroke-width="1"/></g>'; }
    return '<svg data-kal-paerer="1" class="wkk" viewBox="0 0 ' + w + ' 50" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '" fill="none" stroke="#1d1a17" stroke-width="2"/>' + pp + '</svg>';
  }

  // ── Scenen (T1): 24 låger i gitteret over billedet. c = { T, wt, bred, fil, navn(l), tilstand(l), valgt, aeg } fra W.kalender. ──
  function scene(st, c) {
    var bred = !!c.bred, h = '<div class="wks' + (bred ? ' bred' : '') + (st.julestalden ? ' jul' : '') + '" data-kal-scene="' + (bred ? 'bred' : 'hoej') + '" data-kal-scene-kilde="' + (SCENER[(c.wt === 'l' ? 'dag' : 'aften') + '-' + (bred ? 'bred' : 'hoej')] ? 'billede' : 'reserve') + '" style="--kal-scene:' + esc(sceneUrl(c, bred)) + '">';
    h += '<div data-kal-gitter="scene" role="list">';
    (st.laager || []).forEach(function (l) {
      var p = plads(l.dag, bred), t = c.tilstand(l), kl = l.dag === 24 ? ' xl' : (p.w * p.h >= 4 ? ' stor' : ''), aabnet = t === 'aabnet' || (st.fase === 'arkiv' && l.aaben);
      var mk = (l.mit && rigtig(l) && l.tag && l.facit && l.facit.rigtigt != null) ? '<span class="wkm" aria-hidden="true">' + esc(l.tag) + '</span>' : '';   // Grok Bots mærkat: kun ens EGET rigtige gæt
      h += '<div role="listitem" style="grid-area:' + p.r + '/' + p.c + '/span ' + p.h + '/span ' + p.w + ';display:flex">' +
        '<button type="button" class="wkl' + kl + (aabnet ? ' wko' : '') + (st.fase === 'arkiv' && !l.mit ? ' wkg' : '') + (c.valgt === l.dag ? ' wkv' : '') + '" data-laage="' + l.dag + '" data-laage-tilstand="' + t + '" aria-label="' + esc(c.navn(l)) + '">' +
        (aabnet ? bag(c, l, 256, false) : '<span class="wkb wkb-glod" aria-hidden="true"></span>') +
        '<span class="wkbl" aria-hidden="true"><span class="wkn">' + l.dag + '</span></span><span class="wkhj" aria-hidden="true">' + l.dag + '</span>' + mk + '</button></div>';
    });
    // T7 · kalenderens æg (Fable §8, E1/E9) — ingen hestesko, ingen hukommelse (hovedbogen kommer i januar): nissedøren i et tomt felt; låge 25 for den, der har åbnet alle 24.
    if (c.aeg) { var tn = TOM.nisse[bred ? 'bred' : 'hoej'];
      h += '<div class="wkt" style="grid-area:' + tn[1] + '/' + tn[0] + '"><button type="button" class="wknd" data-kal-aeg="nisse" aria-label="' + esc(c.T('kal.aeg.nisse')) + '"><span class="wknd-d"></span><span class="wknd-n">' + NISSE + '</span>' + (String(st.dag).slice(5) === '12-20' ? '<span class="wknd-s">' + esc(c.T('kal.aeg.nisse.seddel')) + '</span>' : '') + '</button></div>';
      if (c.l25) { var t25 = TOM.l25[bred ? 'bred' : 'hoej']; h += '<div class="wkt" style="grid-area:' + t25[1] + '/' + t25[0] + '"><button type="button" class="wkl wk25" data-kal-aeg="l25" aria-label="' + esc(c.T('kal.aeg.l25')) + '"><span class="wkb wkb-glod" aria-hidden="true"></span><span class="wkbl" aria-hidden="true"><span class="wkn">25</span></span></button></div>'; } }
    h += '</div>' + kaede(st, bred ? 900 : 600) + (st.julestalden ? '<div class="wkbaand" data-kal-baand="1">' + esc(c.T('kal.julestalden.baand')) + '</div>' : '') + '<div class="wksne" aria-hidden="true"></div></div>';
    return h;
  }
  var NISSE = '<svg viewBox="0 0 20 24" aria-hidden="true" focusable="false"><path d="M3 12 C4 4 9 1 15 1 c1 4 0 8-2 11z" fill="#c8232c"/><circle cx="15" cy="1.5" r="1.6" fill="#fff"/><circle cx="9" cy="14" r="5" fill="#f2c9a0"/><path d="M3 15 q6 10 12 0 q-2 6-6 6 q-4 0-6-6z" fill="#fff"/><path d="M2 12 h13 v2.4 h-13z" fill="#fff"/><circle cx="9" cy="16" r="1.2" fill="#e08a7a"/></svg>';
  // Lågens forside ER billedet (Fable D2): hvert blad viser udsnittet af scenen bag det — regnet af lågens faktiske plads, så det virker med ethvert billede.
  function udsnit(rodEl) {
    var sc = rodEl.querySelector('[data-kal-scene]'); if (!sc) return; var R = sc.getBoundingClientRect(); if (!(R.width > 0)) return;
    Array.prototype.forEach.call(sc.querySelectorAll('.wkl'), function (b) { var r = b.getBoundingClientRect(), bl = b.querySelector('.wkbl'); if (!bl || !(r.width > 0)) return;
      var wf = r.width / R.width, hf = r.height / R.height; bl.style.backgroundSize = (100 / wf) + '% ' + (100 / hf) + '%';
      bl.style.backgroundPosition = (R.width > r.width ? (r.left - R.left) / (R.width - r.width) * 100 : 0) + '% ' + (R.height > r.height ? (r.top - R.top) / (R.height - r.height) * 100 : 0) + '%'; });
  }

  // ── Lågens dør øverst i arket (T2, Fable D15/D16): lukket med stort talskilt; efter svaret svinger den op og viser dagens billede. Graffitien bærer facit-ordet. ──
  function helt(st, l, c, nu) {
    var mit = !!(l.mit || (st.fase === 'arkiv' && l.facit)), op = mit && !nu, r = rigtig(l);
    var h = '<div class="wkh' + (op ? ' aaben' : '') + (l.dag === 24 ? ' xl' : '') + '" data-kal-helt="' + l.dag + '" data-kal-aaben="' + (mit ? 1 : 0) + '" style="--kal-scene:' + esc(sceneUrl(c, true)) + '">';
    h += mit ? bag(c, l, 768, true) : '<span class="wkb wkb-glod" aria-hidden="true"></span>';
    if (mit && l.dag === 24 && c.bev) h += '<span class="wkfnug" aria-hidden="true">' + fnug(22) + '</span>';   // T5 · låge 24: sne i billedet
    h += '<span class="wkbl" aria-hidden="true"><span class="wkn">' + l.dag + '</span></span>';
    if (mit && l.tag) h += graffiti(l, l.mit ? r : false, nu && c.bev, c, l.mit && l.facit && l.facit.rigtigt != null && r);
    return h + '</div>';
  }
  // T7 · E9: låge 25 (kun klienten — serveren kender 1–24): en åben dør med reservens flade (eller et billede l25, når billedrøret har lagt det) og sne.
  function helt25(c) { var l = { dag: 25, billede: SCENER.l25 || '' };
    return '<div class="wkh aaben" data-kal-helt="25" style="--kal-scene:' + esc(sceneUrl(c, true)) + '">' + bag(c, l, 768, true) + (c.bev ? '<span class="wkfnug" aria-hidden="true">' + fnug(22) + '</span>' : '') + '<span class="wkbl" aria-hidden="true"><span class="wkn">25</span></span></div>'; }
  function fnug(n) { var s = ''; for (var i = 0; i < n; i++) s += '<i style="left:' + (rnd(i + 11) * 100).toFixed(0) + '%;--dx:' + ((rnd(i) - .5) * 60).toFixed(0) + 'px;animation-duration:' + (3.5 + rnd(i + 2) * 4).toFixed(1) + 's;animation-delay:-' + (rnd(i + 5) * 6).toFixed(1) + 's;width:' + (4 + rnd(i + 8) * 5).toFixed(0) + 'px;height:' + (4 + rnd(i + 8) * 5).toFixed(0) + 'px"></i>'; return s; }
  // Graffitien (Fable §3, S4): ordet sprayes hen over billedet — gul med mørk kant ved et rigtigt gæt, hvid ved et forkert. Ingen skrifttype hentes: appens Manrope 800
  // kursiv med kontur (Grok Bot F-15) + et filter, der gør kanten ujævn; dryp og stænk tegnes. Pynt (aria-hidden) — det rigtige svar står som tekst nedenfor.
  function graffiti(l, gul, lige, c, stempel) {
    var t = String(l.tag || ''), fs = Math.min(70, 520 / Math.max(5, Array.from(t).length)), f = gul ? '#ffd23f' : '#ffffff', dr = '', st = '', i;
    for (i = 0; i < 5; i++) dr += '<rect class="wkd" x="' + (70 + rnd(l.dag * 7 + i) * 360).toFixed(0) + '" y="196" width="5" height="' + (14 + rnd(l.dag + i * 3) * 34).toFixed(0) + '" rx="2.5" fill="' + f + '"/>';
    for (i = 0; i < 26; i++) st += '<circle cx="' + (30 + rnd(l.dag + i * 13) * 440).toFixed(0) + '" cy="' + (90 + rnd(l.dag * 3 + i) * 150).toFixed(0) + '" r="' + (1 + rnd(i + l.dag) * 3.4).toFixed(1) + '" fill="' + f + '" opacity="' + (.35 + rnd(i) * .5).toFixed(2) + '"/>';
    var fam = "Manrope,'Arial Black',system-ui,sans-serif";
    return '<span class="wktag' + (lige ? '' : ' fast') + '" data-kal-graffiti="' + (gul ? 'gul' : 'hvid') + '" aria-hidden="true"><svg viewBox="0 0 500 312" preserveAspectRatio="xMidYMid meet"><defs><filter id="wkru' + l.dag + '" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="' + l.dag + '"/><feDisplacementMap in="SourceGraphic" scale="6"/></filter></defs>' +
      '<g class="wks-spray" filter="url(#wkru' + l.dag + ')"><g transform="rotate(-7 250 170)">' + st +
      '<text x="250" y="198" text-anchor="middle" font-family="' + fam + '" font-weight="800" font-style="italic" font-size="' + fs.toFixed(1) + '" fill="' + f + '" stroke="#17130f" stroke-width="12" stroke-linejoin="round" paint-order="stroke" letter-spacing="1">' + esc(t) + '</text>' +
      '<text x="246" y="194" text-anchor="middle" font-family="' + fam + '" font-weight="800" font-style="italic" font-size="' + fs.toFixed(1) + '" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5" letter-spacing="1">' + esc(t) + '</text>' + dr + '</g></g>' +
      (stempel ? '<g class="wkst"><g transform="translate(378 62)"><rect x="-96" y="-27" width="192" height="54" rx="10" fill="#e6205a" stroke="#fff" stroke-width="4"/><text x="0" y="12" text-anchor="middle" font-family="' + fam + '" font-weight="800" font-size="32" fill="#fff" letter-spacing="2">' + esc(c.T('kal.stempel')) + '</text></g></g>' : '') + '</svg></span>';
  }
  // Dom-linjen (Fable §3 «tekst»): én af tre pr. udfald, valgt af lågens nummer (samme låge siger altid det samme). Jagt: «Du fandt den!». Låge 21: ingen dom.
  function dom(l, c) {
    if (!l.mit || !l.facit) return '';
    var n = (l.dag % 3) + 1, t = l.svar ? (rigtig(l) ? c.T('kal.plet.' + n) : c.T('kal.naesten.' + n)) : (l.type === 'jagt' ? c.T('kal.fundet') : '');
    return t ? '<div data-kal-dom="' + (l.svar ? (rigtig(l) ? 'rigtigt' : 'forkert') : 'fundet') + '" class="wkdom">' + esc(t) + '</div>' : '';
  }

  // ── Festen (T2, Fable §3 + Astras korte tider: facit står straks, alt står stille inden for ca. 1,2 s): lågen svinger op, graffitien sprayes, et rigtigt gæt
  // udløser hestesko-eksplosionen og stemplet; én hestesko flyver op i pungen (alle får den). Kun efter 200 på EGET svar (W.kalender) — aldrig ved 409/netfejl/genåbning.
  // Partiklerne er almindelige elementer i arkets eget lag (ikke skinnets #skin-for, som ligger under arket — Grok Bot F-02), flyttet med Web Animations (transform,
  // opacity) og fjernet, når de er færdige. Bevægelse fra: intet af det (W.kalender kalder slet ikke start).
  function start(rodEl, l, c, x, y) {
    var tm = [], fx = rodEl.querySelector('[data-kal-fx]'), dod = false;
    var efter = function (ms, f) { tm.push(setTimeout(function () { if (!dod) f(); }, ms)); };
    var hl = rodEl.querySelector('[data-kal-helt="' + l.dag + '"]');
    if (hl) { void hl.offsetWidth; hl.classList.add('aaben'); }
    var r = rigtig(l), gaet = !!l.svar, eks = r && (gaet || l.type === 'jagt');   // låge 21 (intet at gætte): ingen eksplosion
    if (eks && fx && hl) efter(260, function () { var b = hl.getBoundingClientRect(); eksplosion(fx, b.left + b.width / 2, b.top + b.height * .55, l.dag === 24 ? 40 : 24);
      if (navigator.vibrate) try { navigator.vibrate([14, 40, 22]); } catch (e) {} });
    if (fx) tilPung(fx, rodEl, x, y, efter);
    return function () { dod = true; tm.forEach(clearTimeout); tm = []; if (fx) fx.innerHTML = ''; };
  }
  function eksplosion(fx, x, y, antal) {
    for (var i = 0; i < antal; i++) (function (i) {
      var e = document.createElement('div'); e.className = 'wkhs'; e.innerHTML = sko(i % 4 === 3 ? '#dfe4ea' : '#f2c14e'); fx.appendChild(e);
      var v = -Math.PI / 2 + (rnd(i * 3.1 + x) - .5) * 2.6, kraft = 120 + rnd(i * 7.7 + y) * 200, dx = Math.cos(v) * kraft, dy = Math.sin(v) * kraft, rot = (rnd(i + 1.3) - .5) * 720, s = .7 + rnd(i * 2.2) * .8;
      var a = e.animate([{ transform: 'translate(' + (x - 13) + 'px,' + (y - 13) + 'px) scale(.3) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + (x - 13 + dx) + 'px,' + (y - 13 + dy) + 'px) scale(' + s + ') rotate(' + rot * .6 + 'deg)', opacity: 1, offset: .45, easing: 'cubic-bezier(.3,0,.8,.6)' },
        { transform: 'translate(' + (x - 13 + dx * 1.3) + 'px,' + (y - 13 + dy + 300) + 'px) scale(' + s + ') rotate(' + rot + 'deg)', opacity: 0 }], { duration: 700 + rnd(i * 5.5) * 180, easing: 'cubic-bezier(.1,.7,.3,1)', delay: rnd(i * 9.1) * 50 });
      a.onfinish = a.oncancel = function () { if (e.parentNode) e.parentNode.removeChild(e); };
    })(i);
  }
  function tilPung(fx, rodEl, x, y, efter) {
    var p = rodEl.querySelector('[data-kal-pung]'); if (!p || !(x > 0)) return; var r = p.getBoundingClientRect(), e = document.createElement('div'); e.className = 'wkhs'; e.innerHTML = sko(); fx.appendChild(e);
    var a = e.animate([{ transform: 'translate(' + (x - 13) + 'px,' + (y - 13) + 'px) scale(1.2)', opacity: 1 }, { transform: 'translate(' + ((x + r.left) / 2 - 40) + 'px,' + (Math.min(y, r.top) - 60) + 'px) scale(1.4) rotate(200deg)', opacity: 1, offset: .5 },
      { transform: 'translate(' + (r.left + 6) + 'px,' + (r.top + 8) + 'px) scale(.75) rotate(360deg)', opacity: 1 }], { duration: 650, delay: 150, easing: 'ease-in-out' });
    a.onfinish = function () { if (e.parentNode) e.parentNode.removeChild(e); p.classList.remove('wkbump'); void p.offsetWidth; p.classList.add('wkbump'); };
    a.oncancel = function () { if (e.parentNode) e.parentNode.removeChild(e); };
  }

  // ── T7 · kalenderens æg (Fable §8: E1 nissedøren, E2 træk i lyskæden, E5 snekuglen via strøg, E9 låge 25). Ren leg i klienten: intet kald, ingen hestesko. ──
  function klik(t, rodEl, c) {
    var a = t.getAttribute && t.getAttribute('data-kal-aeg');
    if (a === 'nisse') { var n = (Number(t.getAttribute('data-tryk')) || 0) + 1; t.setAttribute('data-tryk', String(n));
      if (n >= 3) { t.setAttribute('data-tryk', '0'); t.classList.remove('aaben'); void t.offsetWidth; t.classList.add('aaben'); if (!c.bev) t.classList.add('fast'); setTimeout(function () { t.classList.remove('aaben', 'fast'); }, c.bev ? 2600 : 4000); }
      return true; }
    if (a === 'l25') return 'l25';
    return false;
  }
  // E2: tryk på en pære → den gynger (tændt: skifter farve). Alle tændte trykket fra venstre mod højre → et lys løber hele kæden igennem.
  function paere(nr, rodEl, c) {
    var g = rodEl.querySelector('[data-kal-paerer] [data-paere="' + nr + '"]'); if (!g) return; var on = g.getAttribute('data-taendt') === '1';
    if (c.bev) { g.classList.remove('wkgyng'); void g.getBoundingClientRect(); g.classList.add('wkgyng'); }
    if (on) { var el = g.querySelector('ellipse'), i = (Number(g.getAttribute('data-farve')) || PFARVE.indexOf(el.getAttribute('fill'))) + 1; g.setAttribute('data-farve', String(i)); el.setAttribute('fill', PFARVE[i % 4]); g.style.setProperty('--c', PFARVE[i % 4]); }
    var tf = rodEl.__wkTraek || (rodEl.__wkTraek = []), taendte = Array.prototype.map.call(rodEl.querySelectorAll('[data-kal-paerer] [data-taendt="1"]'), function (x) { return Number(x.getAttribute('data-paere')); });
    if (!on) { tf.length = 0; return; }
    if (tf.length && taendte.indexOf(nr) !== taendte.indexOf(tf[tf.length - 1]) + 1) tf.length = 0;
    if (!tf.length && nr !== taendte[0]) return; tf.push(nr);
    if (tf.length === taendte.length && taendte.length >= 2) { tf.length = 0; if (!c.bev) return;
      taendte.forEach(function (p, k) { var e = rodEl.querySelector('[data-kal-paerer] [data-paere="' + p + '"]'); setTimeout(function () { if (e) { e.classList.remove('wkloeb'); void e.getBoundingClientRect(); e.classList.add('wkloeb'); } }, k * 90); }); }
  }
  // E5: hurtige strøg frem og tilbage hen over scenen (computer og iPhone uden rystetilladelse) → det sner tæt i seks sekunder.
  function stroeg(rodEl, c) {
    var sc = rodEl.querySelector('[data-kal-scene]'); if (!sc || !c.bev) return function () {};
    var sidst = null, retning = 0, vend = [], tm = null;
    var fl = function (e) { var x = e.touches ? e.touches[0].clientX : e.clientX, t = Date.now(); if (sidst == null) { sidst = x; return; } var d = x - sidst; if (Math.abs(d) < 12) return; sidst = x;
      var nyR = d > 0 ? 1 : -1; if (nyR !== retning) { retning = nyR; vend.push(t); vend = vend.filter(function (v) { return t - v < 1200; });
        if (vend.length >= 5 && !sc.classList.contains('wksnor')) { vend = []; var sn = sc.querySelector('.wksne'); if (sn) sn.innerHTML = fnug(40); sc.classList.add('wksnor'); clearTimeout(tm); tm = setTimeout(function () { sc.classList.remove('wksnor'); if (sn) sn.innerHTML = ''; }, 6000); } } };
    var slut = function () { sidst = null; };
    sc.addEventListener('pointermove', fl); sc.addEventListener('touchmove', fl, { passive: true }); sc.addEventListener('pointerleave', slut); sc.addEventListener('touchend', slut);
    return function () { clearTimeout(tm); sc.removeEventListener('pointermove', fl); sc.removeEventListener('touchmove', fl); sc.removeEventListener('pointerleave', slut); sc.removeEventListener('touchend', slut); };
  }

  // ── T6 · forsidekortets minibillede (Fable D21): dagens låge på klem med gyldent tal; når den er åbnet, dagens billede. Kortets tekst og prik er uændrede. ──
  function mini(st, c) {
    if (!st || !st.laager || !st.laager.length) return '';
    var n = Math.max(1, Math.min(24, Number(st.dagNr) || 1)), l = st.laager[n - 1] || { dag: n }, mit = !!l.mit;
    return '<span class="wkmini" data-kal-mini="' + n + '" aria-hidden="true" style="--kal-scene:' + esc(sceneUrl(c, false)) + '">' + (mit ? bag(c, l, 256, false) : '<span class="wkb wkb-glod"></span><span class="wkbl"><span class="wkn">' + n + '</span></span>') + '</span>';
  }

  // ── CSS (lagt én gang af indlæseren; alt under [data-kalender] / .wkmini, så intet andet på siden rammes). Talskiltet: cremehvid plade, mørkt tal (≈ 13:1). ──
  var CSS = [
    '[data-kalender] .wks-ramme{width:100%;display:flex;justify-content:center}',
    '[data-kalender] .wks{position:relative;width:min(100%,calc((100vh - 250px) * 2 / 3));width:min(100%,calc((100dvh - 250px) * 2 / 3));min-width:min(100%,300px);aspect-ratio:2/3;border-radius:18px;background:#16253f var(--kal-scene) center/100% 100% no-repeat;box-shadow:0 6px 24px rgba(0,0,0,.35),0 0 0 1.5px rgba(255,255,255,.08) inset;flex:none;box-sizing:border-box;touch-action:pan-y}',
    '[data-kalender] .wks.bred{aspect-ratio:3/2;width:min(100%,calc((100vh - 190px) * 3 / 2));width:min(100%,calc((100dvh - 190px) * 3 / 2))}',
    '[data-kalender] .wk2 .wks.bred{width:min(100%,calc((100vh - 120px) * 3 / 2));width:min(100%,calc((100dvh - 120px) * 3 / 2))}',
    '[data-kalender] .wks [data-kal-gitter]{position:absolute;inset:36px 8px 8px 8px;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(9,minmax(0,1fr));gap:5px}',
    '[data-kalender] .wks.bred [data-kal-gitter]{grid-template-columns:repeat(9,minmax(0,1fr));grid-template-rows:repeat(6,minmax(0,1fr));inset:42px 10px 10px 10px;gap:7px}',
    '[data-kalender] .wkl{position:relative;flex:1;border:none;padding:0;margin:0;background:transparent;cursor:pointer;perspective:520px;min-width:0;min-height:0;border-radius:9px;font-family:inherit;color:inherit}',
    '[data-kalender] .wkl:focus-visible{outline:3px solid #f2c14e;outline-offset:2px}',
    '[data-kalender] .wkb{position:absolute;inset:0;border-radius:9px;overflow:hidden;background:#2a1c10;box-shadow:inset 0 0 0 1.5px rgba(0,0,0,.45),inset 0 3px 10px rgba(0,0,0,.55)}',
    '[data-kalender] .wkb i{position:absolute;inset:0;background:center/cover no-repeat}',
    '[data-kalender] .wkb-glod,.wkmini .wkb-glod{background:radial-gradient(ellipse at 30% 50%,#ffe7a3 0%,#f2b23e 45%,#7a4a12 100%)}',
    '[data-kalender] .wkr,.wkmini .wkr{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}',
    '[data-kalender] .wkr b{font-family:var(--serif,Georgia,serif);font-weight:700;font-size:22px;color:rgba(255,255,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.5)}',
    '[data-kalender] .wkr b.wkr-stor{font-size:64px}',
    '[data-kalender] .wkr-sko,.wkmini .wkr-sko{position:absolute;right:8%;bottom:8%;width:22%;max-width:34px;opacity:.85}.wkr-sko svg{display:block;width:100%;height:auto}',
    '[data-kalender] .wkbl{position:absolute;inset:0;border-radius:9px;background:var(--kal-scene) no-repeat;transform-origin:left center;transition:transform .45s cubic-bezier(.3,.9,.3,1);box-shadow:inset 0 0 0 100px rgba(255,255,255,.05),0 0 0 1px rgba(20,30,50,.42),0 1px 4px rgba(0,0,0,.45);backface-visibility:hidden}',
    '[data-kalender] .wkbl::after{content:"";position:absolute;inset:2.5px;border-radius:7px;border:1.5px dashed rgba(255,255,255,.62)}',
    '[data-kalender] .wkn,.wkmini .wkn{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:30px;height:30px;padding:0 7px;border-radius:15px;background:#fbf3e1;color:#2b2118;font-family:var(--serif,Georgia,serif);font-weight:700;font-size:18px;line-height:30px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.5);box-sizing:border-box}',
    '[data-kalender] .stor .wkn{min-width:40px;height:40px;border-radius:20px;font-size:24px;line-height:40px}',
    '[data-kalender] .xl .wkn{min-width:52px;height:52px;border-radius:26px;font-size:31px;line-height:52px;background:#c8232c;color:#fff}',
    '[data-kalender] .bred .wkn{min-width:36px;height:36px;border-radius:18px;font-size:21px;line-height:36px}',
    '[data-kalender] .bred .stor .wkn{min-width:48px;height:48px;border-radius:24px;font-size:28px;line-height:48px}',
    '[data-kalender] .bred .xl .wkn{min-width:62px;height:62px;border-radius:31px;font-size:36px;line-height:62px}',
    /* Kandidat 166 · fundlisten 16/11 12:5x: «på klem» er en flad låge med en tynd mørk sprække ved åbningskanten og en lys ring — ikke et sving, der forskyder udsnittet og viser et felt bag lågen; med 23 låger på klem skal stalden og hestene stadig ses (kandidat166-vagt B10). Dagens låge har den samme klem + den pulserende guldring og det gyldne tal (D6). */
    '[data-kalender] .wkl[data-laage-tilstand="klar"] .wkbl,[data-kalender] .wkl[data-laage-tilstand="idag"] .wkbl{transform:none;box-shadow:inset 0 0 0 100px rgba(255,255,255,.03),0 0 0 1.5px rgba(255,238,200,.92),0 0 0 2.5px rgba(30,20,10,.35)}',
    '[data-kalender] .wkl[data-laage-tilstand="klar"] .wkbl::after,[data-kalender] .wkl[data-laage-tilstand="idag"] .wkbl::after{border:none}',
    '[data-kalender] .wkl[data-laage-tilstand="klar"] .wkbl::before,[data-kalender] .wkl[data-laage-tilstand="idag"] .wkbl::before{content:"";position:absolute;top:12%;bottom:12%;right:2px;width:3px;border-radius:2px;background:linear-gradient(180deg,rgba(14,9,4,0),rgba(14,9,4,.82) 22%,rgba(14,9,4,.82) 78%,rgba(14,9,4,0))}',
    '[data-kalender] .wkl[data-laage-tilstand="idag"]{z-index:2}',
    '[data-kalender] .wkl[data-laage-tilstand="idag"]::after{content:"";position:absolute;inset:-4px;border-radius:12px;border:3px solid #f2c14e;box-shadow:0 0 14px 3px rgba(242,193,78,.75);animation:wkPuls 1.8s ease-in-out infinite;pointer-events:none}',
    '[data-kalender] .wkl[data-laage-tilstand="idag"] .wkn{background:#f2c14e}',
    '@keyframes wkPuls{50%{box-shadow:0 0 22px 8px rgba(242,193,78,.9);transform:scale(1.03)}}',
    '[data-kalender] .wkl.wko .wkbl{transform:rotateY(-104deg)}[data-kalender] .wkl.wko .wkbl .wkn{display:none}',
    '[data-kalender] .wkl.wkg .wkb{filter:saturate(.45) brightness(.85)}',
    '[data-kalender] .wkl.wkv::before{content:"";position:absolute;inset:-4px;border-radius:12px;border:3px solid var(--acc,#e6b45c);pointer-events:none;z-index:3}',
    '[data-kalender] .wkhj{position:absolute;right:4px;top:4px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:rgba(20,14,8,.78);color:#fff;font-size:13px;font-weight:800;line-height:22px;text-align:center;display:none;box-sizing:border-box}',
    '[data-kalender] .wkl.wko .wkhj{display:block}',
    // mærkatet (Grok Bot): et klistermærke, der må stikke ud over en lille låges kant (højst 160 % af lågen) — åbnede låger ligger over naboerne
    '[data-kalender] .wkl.wko{z-index:1}',
    '[data-kalender] .wkm{position:absolute;left:50%;bottom:4px;max-width:160%;padding:1px 5px;border-radius:4px;background:#ffd23f;color:#17130f;font-family:Manrope,system-ui,sans-serif;font-size:13px;font-weight:800;font-style:italic;line-height:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transform:translateX(-50%) rotate(-6deg);box-shadow:0 1px 3px rgba(0,0,0,.45);box-sizing:border-box;z-index:3}',
    '[data-kalender] .wkl.rasl .wkbl{animation:wkRasl .45s ease-in-out}',
    '@keyframes wkRasl{20%{transform:rotateY(-9deg)}45%{transform:rotateY(4deg)}70%{transform:rotateY(-5deg)}100%{transform:none}}',
    '[data-kalender] .wkk{position:absolute;left:0;top:-6px;width:100%;height:50px;overflow:visible;pointer-events:none}',
    '[data-kalender] .wkk .wkp{pointer-events:auto;cursor:pointer;transform-box:fill-box;transform-origin:50% 0}',
    '[data-kalender] .wkk .wkp[data-taendt="1"]{filter:drop-shadow(0 0 5px var(--c))}',
    '[data-kalender] .wks.jul .wkk .wkp[data-taendt="1"]{animation:wkBlink 2.4s ease-in-out infinite;animation-delay:calc(var(--i) * -.37s)}',
    '@keyframes wkBlink{50%{opacity:.55}}',
    '[data-kalender] .wkk .wkp.wkgyng{animation:wkGyng .7s ease-out}@keyframes wkGyng{25%{transform:rotate(14deg)}55%{transform:rotate(-9deg)}80%{transform:rotate(4deg)}}',
    '[data-kalender] .wkk .wkp.wkloeb{animation:wkLoeb .5s ease-out}@keyframes wkLoeb{40%{filter:drop-shadow(0 0 12px #fff) brightness(1.8)}}',
    '[data-kalender] .wkbaand{position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);background:#c8232c;color:#fff;font-weight:800;font-size:14px;padding:5px 14px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.4);white-space:nowrap;z-index:3;max-width:calc(100% - 16px);overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}',
    '[data-kalender] .wksne{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:18px;z-index:4}',
    '[data-kalender] .wksne i,[data-kalender] .wkfnug i{position:absolute;top:-10px;border-radius:50%;background:#fff;opacity:.9;animation:wkFald linear infinite;pointer-events:none}',
    '@keyframes wkFald{to{transform:translate(var(--dx),640px);opacity:.2}}',
    '[data-kalender] .wkfnug{position:absolute;inset:0;overflow:hidden;border-radius:16px;pointer-events:none}',
    '[data-kalender] .wkt{display:flex;align-items:flex-end;justify-content:center;min-width:0;min-height:0}',
    '[data-kalender] .wknd{position:relative;width:44px;height:44px;border:none;padding:0;background:transparent;cursor:pointer;display:block}',
    '[data-kalender] .wknd-d{position:absolute;left:50%;bottom:2px;width:15px;height:21px;margin-left:-7.5px;border-radius:7.5px 7.5px 1px 1px;background:#6b3d1d;box-shadow:0 0 0 1.5px #2b1a0c,inset -3px 0 0 rgba(0,0,0,.25);transform-origin:left center;transition:transform .35s;z-index:2}',
    '[data-kalender] .wknd-d::after{content:"";position:absolute;right:3px;top:10px;width:2.5px;height:2.5px;border-radius:50%;background:#f2c14e}',
    '[data-kalender] .wknd-n{position:absolute;left:50%;bottom:2px;width:16px;margin-left:-8px;opacity:0;transform:translateY(4px);transition:opacity .25s,transform .35s;z-index:1}.wknd-n svg{display:block;width:100%;height:auto}',
    '[data-kalender] .wknd.aaben .wknd-d{transform:perspective(60px) rotateY(-80deg)}[data-kalender] .wknd.aaben .wknd-n{opacity:1;transform:none;animation:wkVink .8s .4s ease-in-out 2}',
    '@keyframes wkVink{50%{transform:rotate(-12deg)}}',
    '[data-kalender] .wknd-s{position:absolute;left:50%;bottom:24px;transform:translateX(-50%) rotate(-4deg);background:#fbf3e1;color:#2b2118;font-size:13px;font-weight:800;padding:1px 4px;border-radius:2px;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,.4);z-index:3}',
    '[data-kalender] .wkunder{width:100%;max-width:560px;display:flex;flex-direction:column;gap:4px;padding:0 4px;box-sizing:border-box}',
    '[data-kalender] .wk2 .wkunder{max-width:none}',
    '[data-kalender] .wkpung{display:flex;align-items:center;gap:6px;min-height:44px;padding:0 12px;border-radius:999px;background:var(--card,#24201a);border:1.5px solid var(--line,#353028);font-weight:800;font-size:16px;color:var(--ink,#f2ece1);box-sizing:border-box;white-space:nowrap}',
    '[data-kalender] .wkpung svg{width:20px;height:20px;display:block}',
    '[data-kalender] .wkpung.wkbump{animation:wkBump .35s ease-out}@keyframes wkBump{30%{transform:scale(1.22)}100%{transform:none}}',
    '[data-kalender] .wksr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
    '[data-kalender] .wk2{display:flex;gap:24px;align-items:flex-start;width:100%;box-sizing:border-box}',
    '[data-kalender] .wk2-venstre{flex:1 1 0;min-width:0;max-width:980px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;position:sticky;top:0}',
    '[data-kalender] .wk2-panel{flex:0 0 400px;min-width:0;display:flex;flex-direction:column;gap:14px;padding-bottom:16px}',
    '[data-kalender] .wkh{position:relative;width:100%;aspect-ratio:16/10;border-radius:16px;perspective:900px;flex:none}',
    '[data-kalender] .wkh .wkb,[data-kalender] .wkh .wkbl{border-radius:16px}',
    '[data-kalender] .wkh .wkbl{background-size:cover;background-position:center 70%}',
    '[data-kalender] .wkh .wkbl::after{inset:5px;border-radius:12px;border-width:2px}',
    '[data-kalender] .wkh .wkn{min-width:64px;height:64px;border-radius:32px;font-size:36px;line-height:64px}',
    '[data-kalender] .wkh.xl .wkn{background:#c8232c;color:#fff}',
    '[data-kalender] .wkh.aaben .wkbl{transform:rotateY(-108deg)}',
    '[data-kalender] .wkh .wkr{align-items:flex-start;justify-content:flex-start;padding:12px 18px;box-sizing:border-box}[data-kalender] .wkh .wkr b.wkr-stor{font-size:40px;opacity:.6}',   /* reservens tal i hjørnet — graffitien står midt på */
    '[data-kalender] .wktag{position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:2}',
    '[data-kalender] .wktag svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
    '[data-kalender] .wktag .wks-spray{clip-path:inset(-20% 100% -40% -10%);animation:wkSpray .35s .25s ease-out forwards}',
    '@keyframes wkSpray{to{clip-path:inset(-20% -10% -40% -10%)}}',
    '[data-kalender] .wktag .wkd{transform-origin:top;transform:scaleY(0);transform-box:fill-box;animation:wkDryp .4s .5s ease-out forwards}',
    '@keyframes wkDryp{to{transform:scaleY(1)}}',
    '[data-kalender] .wktag .wkst{transform-origin:center;transform-box:fill-box;opacity:0;animation:wkStempel .25s .55s cubic-bezier(.2,1.6,.4,1) forwards}',
    '@keyframes wkStempel{from{opacity:0;transform:scale(2.2) rotate(-14deg)}to{opacity:1;transform:scale(1) rotate(8deg)}}',
    '[data-kalender] .wktag.fast .wks-spray{clip-path:none;animation:none}[data-kalender] .wktag.fast .wkd{transform:none;animation:none}[data-kalender] .wktag.fast .wkst{opacity:1;transform:rotate(8deg);animation:none}',
    '[data-kalender] [data-kal-titel]{line-height:1.2}',
    '[data-kalender] .wkdom{font-family:var(--serif,Georgia,serif);font-size:20px;font-weight:700;line-height:1.3}',
    '[data-kalender] .wkhs{position:fixed;left:0;top:0;width:26px;height:26px;pointer-events:none;z-index:5;will-change:transform,opacity}.wkhs svg{display:block;width:100%;height:100%}',
    '[data-kalender] [data-kal-fx]{position:fixed;inset:0;pointer-events:none;z-index:6;overflow:hidden}',
    '[data-kalender] .wkkort{position:relative;border-radius:6px;padding:20px 18px 16px;background:#fbf3e1;color:#2b2118;font-family:var(--serif,Georgia,serif);font-size:18px;font-style:italic;line-height:1.5;box-shadow:0 3px 10px rgba(0,0,0,.25);transform:rotate(-1.2deg);margin:10px 4px 4px;white-space:pre-wrap}',
    '[data-kalender] .wkkort::before{content:"";position:absolute;left:50%;top:-9px;width:74px;height:20px;transform:translateX(-50%) rotate(2deg);background:rgba(200,35,44,.75);border-radius:2px}',
    '[data-kalender] .wkkort small{display:block;font-family:Manrope,system-ui,sans-serif;font-style:normal;font-size:13px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#7a5a2a;margin-bottom:4px}',
    '[data-kalender] [data-kal-soejle] .wkgro{animation:wkGro .5s .3s ease-out backwards}@keyframes wkGro{from{width:0}}',
    '.wkmini{position:relative;flex:0 0 72px;width:72px;height:72px;border-radius:12px;perspective:300px;overflow:hidden;display:block}',
    '.wkmini .wkb,.wkmini .wkbl{position:absolute;inset:0;border-radius:12px}.wkmini .wkb{overflow:hidden;background:#2a1c10}.wkmini .wkb i{position:absolute;inset:0;background:center/cover no-repeat}',
    '.wkmini .wkbl{background:var(--kal-scene) 60% 70%/cover no-repeat;transform-origin:left center;transform:rotateY(-28deg);box-shadow:0 0 0 1px rgba(20,30,50,.42)}',
    '.wkmini .wkn{background:#f2c14e;min-width:28px;height:28px;line-height:28px;font-size:17px}.wkmini .wkr b{font-family:var(--serif,Georgia,serif);font-size:20px;color:#fff}',
    // Bevægelse fra (appens kontakt) og systemets ønske: intet sving, ingen puls, ingen sne — graffiti og stempel står færdige (W.kalender starter heller ingen partikler).
    'html[data-bevaegelse="fra"] [data-kalender] .wktag .wks-spray{clip-path:none}html[data-bevaegelse="fra"] [data-kalender] .wktag .wkd{transform:none}html[data-bevaegelse="fra"] [data-kalender] .wktag .wkst{opacity:1;transform:rotate(8deg)}',
    'html[data-bevaegelse="fra"] .wkmini *{animation:none!important;transition:none!important}',
    '@media (prefers-reduced-motion:reduce){[data-kalender] .wktag .wks-spray{clip-path:none}[data-kalender] .wktag .wkd{transform:none}[data-kalender] .wktag .wkst{opacity:1;transform:rotate(8deg)}.wkmini *{animation:none!important;transition:none!important}}'
  ].join('\n');

  var API = { version: 1, css: CSS, scene: scene, udsnit: udsnit, helt: helt, helt25: helt25, dom: dom, start: start, klik: klik, paere: paere, stroeg: stroeg, mini: mini, plads: plads, sko: sko, tom: TOM,
    scener: function () { return Object.keys(SCENER); } };
  rod.WABA_KAL_SCENE = API;
  try { if (rod.WABA && rod.WABA.kalender && rod.WABA.kalender.sceneKlar) rod.WABA.kalender.sceneKlar(API); } catch (e) {}
})(typeof window !== 'undefined' ? window : this);
