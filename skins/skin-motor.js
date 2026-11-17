// LAG-MOTOREN (skins 20, 8/11 2026 — out/fable-skins/mekanisme-skins.md §2–5; reglerne i docs/skins.md). Et aktiv: hentes af registret (waba-temaer.js) FØRST, når et skin eller et
// sæsonlag er tændt, og melder sig med WABA_TEMAER.motorKlar(m). Ikke i bundlen (administrationens grænse).
// Tre lag uden for Reacts rod, søskende til #dc-root på body: #skin-bag (fast, z 0, bag appen — skallen gøres gennemsigtig af skin-basis.css), #skin-for (fast, z 0, bag appen — 167,
// aldrig trykbar) og #skin-maskot (z 51, placeret over fanebjælken — det eneste med pointer-events). Alt liv er skinnets CSS-keyframes på transform/opacity. Motoren har INGEN timere
// i hvile: fanebjælken måles én gang pr. render (rAF efter anvend) og ved resize; fanen skjult → html[data-skin-pause]; Rolig → html[data-bevaegelse="fra"] (registret).
// Aktiverne (skinnets og sæsonlagets CSS/JS) hentes med <link>/<script>, når de vælges — én adresse pr. udgave (?v=byggestempel); fejler et aktiv, står skinnet som farvetema uden lag.
(function (rod) {
  'use strict';
  var R = rod.WABA_TEMAER; if (!R || !R.motorKlar) return;
  var d = rod.document, AKTIVER = {}, HENTER = {}, LAG = { noegle: '', planlagt: false, nik: null };
  // Kandidat 164 · S-1: maskotten hviler (html[data-maskot-hvil], skin-basis.css) efter MASKOT_HVIL ms uden tryk, tast, rul eller skærmskift (167: + rul, tilbage på fanen) — strøm.
  var MASKOT_HVIL = 30000;
  function vaek() { var h = d.documentElement; if (h.hasAttribute('data-maskot-hvil')) h.removeAttribute('data-maskot-hvil'); if (LAG.hvil) clearTimeout(LAG.hvil);
    LAG.hvil = setTimeout(function () { LAG.hvil = null; h.setAttribute('data-maskot-hvil', '1'); }, MASKOT_HVIL); }
  // Rækkefølgen i <head> er basis → skin → sæson (sæsonen vinder — mekanisme §7); «foer» = de id'er, et nyt link stilles før (det første, der findes).
  function link(id, href, foer) { var l = d.getElementById(id); if (!href) { if (l) l.parentNode.removeChild(l); return null; }
    if (!l) { l = d.createElement('link'); l.id = id; l.rel = 'stylesheet'; var hoved = d.head || d.documentElement, f = null; (foer || []).some(function (x) { return (f = d.getElementById(x)); }); hoved.insertBefore(l, f); }
    if (l.getAttribute('href') !== href) l.setAttribute('href', href); return l; }
  function script(noegle, src) { if (AKTIVER[noegle] || HENTER[noegle]) return; HENTER[noegle] = 1; var s = d.createElement('script'); s.src = src; s.async = true;
    s.onerror = function () { AKTIVER[noegle] = { fejl: true }; HENTER[noegle] = 0; LAG.noegle = ''; try { R.anvend(); } catch (e) {} }; (d.head || d.documentElement).appendChild(s); }
  function skinAktiv(id, def) { AKTIVER[id] = def || {}; HENTER[id] = 0; LAG.noegle = ''; try { R.anvend(); } catch (e) {} }
  function saesonAktiv(id, def) { AKTIVER['saeson-' + id] = def || {}; HENTER['saeson-' + id] = 0; LAG.noegle = ''; try { R.anvend(); } catch (e) {} }
  function lag(id) { var e = d.getElementById(id); if (!e) { if (!d.body) return null; e = d.createElement('div'); e.id = id; e.setAttribute('aria-hidden', 'true'); d.body.appendChild(e); } return e; }
  // Partikler: n elementer <i class="p klasse vN"> med tilfældig vandret plads, forsinkelse (negativ: i gang fra start), varighed og skala som CSS-variabler — alt andet er skinnets CSS.
  function partikler(n, klasse, o) {
    o = o || {}; var ud = [], v = o.varighed || 12, va = o.varianter || 1;
    for (var i = 0; i < n; i++) ud.push('<i class="p ' + klasse + ' v' + (i % va) + '" style="--x:' + Math.round(Math.random() * 100) + '%;--dl:-' + (Math.random() * v).toFixed(1) + 's;--dur:' + (v * (0.7 + Math.random() * 0.6)).toFixed(1) + 's;--sc:' + (0.6 + Math.random() * 0.8).toFixed(2) + ';--i:' + i + '"></i>');
    return ud.join('');
  }
  function loft() { return rod.innerWidth >= 1024 ? 40 : 24; }   // partikelloftet (mekanisme §5): 24 på telefon, 40 på desktop — deles mellem lagene
  function lagHtml(L, max) { var rest = max, ud = { bag: '', fo: '' }; L = L || {};
    ['bag', 'fo'].forEach(function (k) { (L[k] || []).forEach(function (p) { var n = Math.max(0, Math.min(p[1] | 0, rest)); rest -= n; ud[k] += partikler(n, p[0], p[2]); }); }); return ud; }
  function kald(x) { return typeof x === 'function' ? (x(partikler) || '') : (x || ''); }
  // Hvem fylder lagene: sæsonens lag i perioden (erstatter skinnets), ellers skinnets. Tegnes kun, når kilden eller et aktiv skifter — ikke pr. render.
  // fl (skins 27) = fødselsdagens lag: lægges OVEN I skinnets/sæsonens lag (balloner bag, konfetti foran), maskotten røres ikke; aktiver som en sæson (saeson-foedselsdag).
  function opdater(sk, sl, fl) {
    var h = d.documentElement;
    if (sk || sl || fl) { link('waba-skin-basis', R.aktivSti('', 'skin-basis.css'), ['waba-skin-css', 'waba-saeson-css', 'waba-fest-css']); if (!h.hasAttribute('data-skin-lag')) h.setAttribute('data-skin-lag', '1'); } else if (h.hasAttribute('data-skin-lag')) h.removeAttribute('data-skin-lag');
    link('waba-skin-css', sk ? R.aktivSti(sk, 'skin.css') : null, ['waba-saeson-css', 'waba-fest-css']);
    link('waba-saeson-css', sl ? R.aktivSti('saeson-' + sl.id, 'saeson.css') : null, ['waba-fest-css']);
    link('waba-fest-css', fl ? R.aktivSti('saeson-' + fl.id, 'saeson.css') : null);
    if (sk) script(sk, R.aktivSti(sk, 'skin.js')); if (sl) script('saeson-' + sl.id, R.aktivSti('saeson-' + sl.id, 'saeson.js')); if (fl) script('saeson-' + fl.id, R.aktivSti('saeson-' + fl.id, 'saeson.js'));
    var cfg = sl || (sk ? R.skinAf(sk) : null), def = sl ? AKTIVER['saeson-' + sl.id] : (sk ? AKTIVER[sk] : null), fdef = fl ? AKTIVER['saeson-' + fl.id] : null;
    var noegle = (sk || '') + '|' + (sl ? sl.id : '') + '|' + (def && !def.fejl ? 1 : 0) + '|' + (fl ? fl.id : '') + (fdef && !fdef.fejl ? 1 : 0);
    if (noegle !== LAG.noegle && d.body) { LAG.noegle = noegle;
      var bag = lag('skin-bag'), fo = lag('skin-for'), mk = lag('skin-maskot'); lag('skin-glas');
      if (!cfg && !fl) { bag.innerHTML = ''; fo.innerHTML = ''; mk.innerHTML = ''; }
      else { var max = loft(), p = cfg ? lagHtml(cfg.lag, max) : { bag: '', fo: '' }, D = (def && !def.fejl) ? def : {}, F = (fdef && !fdef.fejl) ? fdef : null, pf = F ? lagHtml(fl.lag, Math.max(8, max - (p.bag + p.fo).split('<i ').length + 1)) : { bag: '', fo: '' };
        bag.innerHTML = (cfg ? kald(D.bag) + p.bag : '') + (F ? kald(F.bag) + pf.bag : ''); fo.innerHTML = (cfg ? kald(D.fo) + p.fo : '') + (F ? kald(F.fo) + pf.fo : ''); mk.innerHTML = cfg ? (D.maskot || '') : '';
        if (D.efter) try { D.efter(); } catch (e) {} } }
    planMaal();
  }
  // Måling efter render: maskotten over fanebjælken (telefon: [data-bundmenu]; tablet/desktop: nederst i [data-sidemenu]); et åbent ark skjuler den (html[data-skin-ark]).
  function maal() {
    LAG.planlagt = false; var h = d.documentElement, mk = d.getElementById('skin-maskot'); if (!d.body) return;
    var skm = d.querySelector('#dc-root [data-screen-label]'), skl = skm ? skm.getAttribute('data-screen-label') : ''; if (skl !== LAG.skaerm) { LAG.skaerm = skl; vaek(); }   // S-1
    var ark = !!d.querySelector('[data-dialog]'); if (ark !== h.hasAttribute('data-skin-ark')) { if (ark) h.setAttribute('data-skin-ark', '1'); else h.removeAttribute('data-skin-ark'); }
    // Fødselsdagen (skins 27): viser skærmen en fødselsdagshest (temaer 02: [data-fest="1"]), tændes fest-laget — og slukkes igen på en skærm uden (én querySelector pr. render).
    // Punkt 13 (kandidat 162): data-skin-fest="vis" er demoens forhåndsvisning (registret sætter og fjerner den) — motoren rører kun sit eget "1".
    if (R.festLag && R.festLag() && h.getAttribute('data-skin-fest') !== 'vis') { var fest = !!d.querySelector('[data-fest="1"]'); if (fest !== h.hasAttribute('data-skin-fest')) { if (fest) h.setAttribute('data-skin-fest', '1'); else h.removeAttribute('data-skin-fest'); try { R.anvend(); } catch (e) {} } }
    // Uden skin (sæsonlag/fest alene): skallen er gennemsigtig, så body må bære temaets egen --bg (læst én gang pr. render fra skærmroden) — ellers er siden mørk bag et lyst tema.
    if (!h.hasAttribute('data-skin')) { var rw = d.querySelector('#dc-root [data-wt]'); if (rw) { var bg = getComputedStyle(rw).getPropertyValue('--bg').trim(); if (bg && h.style.getPropertyValue('--skin-sidebg') !== bg) h.style.setProperty('--skin-sidebg', bg); } }
    jubel(); glas();
    // 159: en høj fanebjælke er en sidemenu (personalet ≥ 1024 px); en skjult (0 × 0) tæller ikke
    var bm = d.querySelector('[data-bundmenu]'), rb = bm ? bm.getBoundingClientRect() : null; if (rb && (!rb.width || !rb.height)) bm = null;
    var hoej = !!(bm && rb.height > rb.width), fb = bm && !hoej ? bm : null, sm = fb ? null : (hoej ? bm : d.querySelector('[data-sidemenu]')), el = fb || sm;
    var r = el ? el.getBoundingClientRect() : null;
    // … og forgrunden klippes ved menuens højre kant (--skin-venstre)
    var venstre = (sm && r && r.width && r.height && r.left < rod.innerWidth / 2) ? Math.round(r.right) + 'px' : '0px'; if (h.style.getPropertyValue('--skin-venstre') !== venstre) h.style.setProperty('--skin-venstre', venstre);
    if (!mk || !mk.firstChild) { if (h.hasAttribute('data-skin-fb')) h.removeAttribute('data-skin-fb'); return; }
    if (!r || !r.width || !r.height) { mk.style.display = 'none'; mk.removeAttribute('data-fb'); h.removeAttribute('data-skin-fb'); return; } mk.style.display = '';
    var skal = d.querySelector('[data-skal],[data-app-rod]'), sr = skal ? skal.getBoundingClientRect() : r, H = rod.innerHeight;
    if (!!fb !== mk.hasAttribute('data-fb')) { if (fb) mk.setAttribute('data-fb', '1'); else mk.removeAttribute('data-fb'); } if (!!fb !== h.hasAttribute('data-skin-fb')) { if (fb) h.setAttribute('data-skin-fb', '1'); else h.removeAttribute('data-skin-fb'); }   // punkt 6: på en bundbjælke (ikke sidemenuen) — Springbanes forhindring; punkt 10: listernes bund toner ud (skin-basis)
    var bh = 0; if (fb) [].forEach.call(mk.children, function (s) { var c = /^svg$/i.test(s.tagName) && getComputedStyle(s); if (c && c.display !== 'none') bh = Math.max(bh, (parseFloat(c.height) || 0) + (parseFloat(c.bottom) || 0)); });
    var bd = fb ? Math.ceil(bh + 4) + 'px' : '';   // 167 · den sikre zone: figurens bånd over bjælken (skin-basis.css); ændret → mål igen (glaspladen)
    if (h.style.getPropertyValue('--skin-baand') !== bd) { if (bd) h.style.setProperty('--skin-baand', bd); else h.style.removeProperty('--skin-baand'); planMaal(); }
    if (fb) { mk.style.bottom = Math.round(H - r.top) + 'px'; mk.style.left = Math.round(sr.left) + 'px'; mk.style.width = Math.round(sr.width) + 'px'; h.style.setProperty('--fane-h', Math.round(H - r.top) + 'px'); }
    else { mk.style.bottom = Math.round(H - r.bottom + 12) + 'px'; mk.style.left = Math.round(r.left) + 'px'; mk.style.width = Math.round(r.width) + 'px'; h.style.setProperty('--fane-h', '0px'); }
    h.style.setProperty('--w', mk.style.width); h.style.setProperty('--skin-mk-l', mk.style.left);   // 166 · F-4: på html — Springbanes bom i scenen
  }
  // GLASPLADEN (punkt 1, kandidat 162 — reglerne i docs/skins.md §11): ÉT felt pr. skærmkolonne bag den tekst, der står direkte på verdenen (element og forfædre op til #dc-root
  // gennemsigtige; undtaget ikoner og tekst, der ikke kontrasterer med kortet ≥ 3:1), i sit eget faste lag #skin-glas lige bag appen. Bredden er listens; følger rulningen.
  function farve(s) { var m = /rgba?\(([^)]+)\)/.exec(s || ''); if (m) { var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; }
    m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(s || '').trim()); if (!m) return null; var x = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1];
    return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16), a: 1 }; }
  function lys(c) { function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); } return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
  var GLAS = { kol: [], farve: '', planlagt: false };
  function glas() {
    var h = d.documentElement, rodE = d.getElementById('dc-root'), lagG = d.getElementById('skin-glas'); GLAS.kol = [];
    if (!rodE || !rod.getComputedStyle || (!h.hasAttribute('data-skin') && !h.hasAttribute('data-skin-lag'))) { if (lagG) lagG.innerHTML = ''; return; }
    var dk = new Map(), set = new Set(), kol = new Map();
    function egen(x) { var cs = getComputedStyle(x); if (cs.backgroundImage && cs.backgroundImage !== 'none') return true; var c = farve(cs.backgroundColor); return !!c && c.a >= 0.85; }
    function daekket(x) { if (!x || x === rodE || x.nodeType !== 1) return false; if (dk.has(x)) return dk.get(x); var v = egen(x) || daekket(x.parentElement); dk.set(x, v); return v; }
    // Kolonnen: det nærmeste rulleområde under skærmen, ellers skærmens direkte barn (den faste overskrift), ellers skærmen selv.
    function kolonne(e) { var sk = e.closest('[data-screen-label]'); if (!sk) return null;
      for (var x = e.parentElement; x && x !== sk; x = x.parentElement) { var oy = getComputedStyle(x).overflowY; if (oy === 'auto' || oy === 'scroll') return x; if (x.parentElement === sk) return x; }
      return sk; }
    // Et halvgennemsigtigt kort (egen flade under 85 % — fx administrationens «Ændret siden i går» i dangsoft) står på pladen i sin HELE højde: pladen måles på kortet, ikke på teksten (punkt 3).
    function kort(e, k) { var ud = e; for (var x = e.parentElement; x && x !== k; x = x.parentElement) { var cs = getComputedStyle(x), c = farve(cs.backgroundColor); if ((c && c.a > 0.04) || parseFloat(cs.borderTopWidth) > 0) ud = x; } return ud; }
    function rulle(sk) { var oy = getComputedStyle(sk).overflowY; if (oy === 'auto' || oy === 'scroll') return sk; var q = [].slice.call(sk.children), dybde = 0;
      while (q.length && dybde++ < 3) { var n = []; for (var i = 0; i < q.length; i++) { var o = getComputedStyle(q[i]).overflowY; if ((o === 'auto' || o === 'scroll') && q[i].clientHeight > 100) return q[i]; n = n.concat([].slice.call(q[i].children)); } q = n; } return null; }
    var tw = d.createTreeWalker(rodE, 4 /* NodeFilter.SHOW_TEXT */), nd, kc = null;
    while ((nd = tw.nextNode())) { var e = nd.parentElement; if (!e || set.has(e) || nd.nodeValue.replace(/\s+/g, '').length < 2) continue; set.add(e);
      if (!e.getClientRects().length || daekket(e)) continue; var cs = getComputedStyle(e); if (cs.visibility === 'hidden' || /Material Symbols/.test(cs.fontFamily)) continue;
      var tc = farve(cs.color); kc = kc || farve(cs.getPropertyValue('--card')); if (!tc || !kc || tc.a < 0.2) continue;
      var a = lys(tc), b = lys(kc); if ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) < 3) continue;
      var q = e.getBoundingClientRect(); if (d.elementsFromPoint && d.elementsFromPoint(q.left + q.width / 2, q.top + q.height / 2).some(function (x) { return /^(IMG|VIDEO|CANVAS|IMAGE-SLOT)$/.test(x.tagName); })) continue;   // på hestens foto (image-slot), ikke på verdenen
      var k = kolonne(e); if (!k) continue; if (!kol.has(k)) kol.set(k, []); kol.get(k).push(kort(e, k)); }
    // Bredden er listens: skærmens rulleområde (punkt 3 — overskriftsbåndet flugter med listen, også når kun overskriften står på verdenen).
    var ruM = new Map(); kol.forEach(function (el, k) { var sk = k.closest('[data-screen-label]'); if (!ruM.has(sk)) ruM.set(sk, rulle(sk)); GLAS.kol.push({ k: k, el: el, ru: ruM.get(sk) || k }); });
    // Pladens farve: verdenens --card (skærmrodens token) med skinnets dækning (--skin-glas-a, standard .88 — 167), læst én gang pr. render.
    var rw = d.querySelector('#dc-root [data-wt]'), cs2 = rw ? getComputedStyle(rw) : null, bg = farve(cs2 ? cs2.getPropertyValue('--card').trim() : ''), al = parseFloat(cs2 ? cs2.getPropertyValue('--skin-glas-a') : '') || 0.88;
    GLAS.farve = bg ? 'rgba(' + bg.r + ',' + bg.g + ',' + bg.b + ',' + al + ')' : '';
    placerGlas();
  }
  // Listens bredde i kolonnen: rækkerne (kolonnens børn — og et enkelt indpaknings-barns børn — der er mindst 60 % af kolonnens bredde).
  function bredde(k, kr) { var l = Infinity, r = -Infinity, ko = k.children.length === 1 && k.firstElementChild.children.length ? k.firstElementChild.children : k.children;
    for (var i = 0; i < ko.length; i++) { var q = ko[i].getBoundingClientRect(); if (q.width >= kr.width * 0.6 && q.height > 0) { l = Math.min(l, q.left); r = Math.max(r, q.right); } }
    return l < r ? [l, r] : [kr.left + 16, kr.right - 16]; }
  function placerGlas() {
    GLAS.planlagt = false; var lagG = d.getElementById('skin-glas'); if (!lagG && GLAS.kol.length) lagG = lag('skin-glas'); if (!lagG) return;
    var felter = [], skal = d.querySelector('[data-skal],[data-app-rod]'), sr = skal ? skal.getBoundingClientRect() : null;
    GLAS.kol.forEach(function (x) { if (!x.k.isConnected) return; var kr = x.k.getBoundingClientRect(), t = Infinity, b = -Infinity;
      x.el.forEach(function (e) { if (!e.isConnected) return; var q = e.getBoundingClientRect(); if (q.height) { t = Math.min(t, q.top); b = Math.max(b, q.bottom); } });
      if (t >= b) return; var lr = bredde(x.ru, x.ru.getBoundingClientRect()); t = Math.max(kr.top, t - 10); b = Math.min(kr.bottom, b + 10); if (b - t < 8) return;
      felter.push({ l: lr[0], r: lr[1], t: t, b: b }); });
    // Felter, der står over hinanden (samme spalte), slås sammen til ÉT; side om side (desktopens to spalter) bliver de to.
    var ud = []; felter.sort(function (a, b) { return a.t - b.t; }).forEach(function (f) { var m = ud.filter(function (g) { return Math.min(g.r, f.r) - Math.max(g.l, f.l) > 40; })[0];
      if (m) { m.l = Math.min(m.l, f.l); m.r = Math.max(m.r, f.r); m.t = Math.min(m.t, f.t); m.b = Math.max(m.b, f.b); } else ud.push(f); });
    var html = ud.map(function (f) { return '<i style="left:' + Math.round(f.l) + 'px;top:' + Math.round(f.t) + 'px;width:' + Math.round(f.r - f.l) + 'px;height:' + Math.round(f.b - f.t) + 'px"></i>'; }).join('');
    if (lagG.innerHTML !== html) lagG.innerHTML = html; if (GLAS.farve && lagG.style.getPropertyValue('--skin-glas') !== GLAS.farve) lagG.style.setProperty('--skin-glas', GLAS.farve);
  }
  function rulGlas() { if (!GLAS.kol.length || GLAS.planlagt || !rod.requestAnimationFrame) return; GLAS.planlagt = true; rod.requestAnimationFrame(placerGlas); }
  function planMaal() { if (LAG.planlagt || !rod.requestAnimationFrame) return; LAG.planlagt = true; rod.requestAnimationFrame(function () { rod.requestAnimationFrame(maal); }); }
  // Reaktion (Hearthstone-mønstret): tryk på en fane eller på maskotten → data-nik på maskotten og data-skin-reager på fanebjælken i 1,2 s (skinnets CSS: nik, vrinsk, hop).
  // F-4 (kandidat 161): maskotten har pointer-events:none og tager aldrig et tryk fra et tryk-mål. Et tryk, der lander på en TOM flade under den (intet trykbart
  // under fingeren: ingen knap/link/felt/fane, ingen «cursor: pointer» op til skærmroden), tæller som et tryk på maskotten — nikket og tricket består.
  function paaMaskot(e) { var t = e.target; if (t && t.closest && t.closest('#skin-maskot')) return true;
    var mk = d.getElementById('skin-maskot'), sv = mk && mk.querySelector('svg'); if (!sv || typeof e.clientX !== 'number' || (!e.clientX && !e.clientY)) return false;
    var r = sv.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return false;
    if (t && t.closest && t.closest('button, a[href], input, textarea, select, label, [role=button], [role=switch], [role=tab], [role=link], [data-fane], [tabindex], [data-trykbar], [contenteditable]')) return false;
    for (var x = t; x && x.nodeType === 1 && x.id !== 'dc-root'; x = x.parentElement) if (getComputedStyle(x).cursor === 'pointer') return false;
    return true; }
  function nik(e) { var mk = d.getElementById('skin-maskot'); if (!mk || !mk.firstChild) return; var t = e.target, fane = t && t.closest ? t.closest('[data-fane]') : null;
    if (!fane && !paaMaskot(e)) return; var fb = d.querySelector('[data-bundmenu],[data-sidemenu]');
    mk.setAttribute('data-nik', '1'); if (fb) fb.setAttribute('data-skin-reager', '1'); if (LAG.nik) clearTimeout(LAG.nik);
    LAG.nik = setTimeout(function () { LAG.nik = null; mk.removeAttribute('data-nik'); var f2 = d.querySelector('[data-skin-reager]'); if (f2) f2.removeAttribute('data-skin-reager'); }, 1200);
    // 28c · tricket (Hearthstone-mønstret, research M2): fem tryk på maskotten inden for 3 s → data-glad i 1,6 s (generisk hop + vrid i skin-basis.css; et skin kan give sit eget). Ingen lyd.
    if (!fane) { var nu = Date.now(); LAG.tryk = (LAG.tryk || []).filter(function (x) { return nu - x < 3000; }); LAG.tryk.push(nu);
      if (LAG.tryk.length >= 5) { LAG.tryk = []; mk.setAttribute('data-glad', '1'); if (LAG.glad) clearTimeout(LAG.glad); LAG.glad = setTimeout(function () { LAG.glad = null; mk.removeAttribute('data-glad'); }, 1600); } } }
  // 28b · «bestilling sendt» (kvitteringsskærmen [data-done-flyttet] dukker op — Duolingo-mønstret: belønning som hændelse): 12 stykker konfetti i 2,5 s foran appen (167: #skin-jubel — forgrunden er bag appen), én gang pr. kvittering; ikke i Rolig.
  function jubel() { var h = d.documentElement, fo = d.getElementById('skin-for') ? lag('skin-jubel') : null, er = !!d.querySelector('[data-done-flyttet]');
    if (er && !LAG.jubel && fo && !h.hasAttribute('data-bevaegelse')) { var F = ['#c8102e', '#e6b45c', '#2f6fb3', '#3dab5a', '#ffffff'], ud = '';
      for (var i = 0; i < 12; i++) ud += '<i class="skin-jubel" style="--x:' + Math.round(10 + Math.random() * 80) + '%;--dx:' + Math.round(-60 + Math.random() * 120) + 'px;--dl:' + (Math.random() * .5).toFixed(2) + 's;--c:' + F[i % F.length] + '"></i>';
      var w = d.createElement('div'); w.setAttribute('data-jubel', '1'); w.innerHTML = ud; fo.appendChild(w); setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); }, 3000); }
    LAG.jubel = er; }
  if (d && d.addEventListener) {
    d.addEventListener('visibilitychange', function () { var h = d.documentElement; if (d.hidden) h.setAttribute('data-skin-pause', '1'); else { h.removeAttribute('data-skin-pause'); vaek(); } });
    d.addEventListener('click', nik, true);
    d.addEventListener('pointerdown', vaek, { capture: true, passive: true }); d.addEventListener('keydown', vaek, true);   // S-1
    vaek();
    if (rod.addEventListener) rod.addEventListener('resize', planMaal);
    d.addEventListener('scroll', rulGlas, { capture: true, passive: true });   // punkt 1: glaspladen følger teksten, når kolonnen rulles
    // 167 (produktejeren 16/11): punkt 7 er væk — maskotten bliver under rul (den sikre zone holder den fri af indholdet); et rul vækker den (S-1)
    d.addEventListener('scroll', vaek, { capture: true, passive: true }); d.addEventListener('wheel', vaek, { capture: true, passive: true });
  }
  R.motorKlar({ opdater: opdater, skinAktiv: skinAktiv, saesonAktiv: saesonAktiv, partikler: partikler, lagHtml: lagHtml, maal: maal, AKTIVER: AKTIVER });
})(typeof window !== 'undefined' ? window : this);
