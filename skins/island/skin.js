// SKIN · ISLAND (skins 33, docs/skins.md) — gejseren (søjle + 4 dråber + damp, 3 s af hvert 45. s) og 3 damppuffer bag kortene, den islandske hest i tölt (ryster manken ved tryk — CSS i skin.css).
WABA_TEMAER.skinAktiv('island', {
  bag: function (p) { return '<div class="gejser"><div class="soejle"></div><div class="draabe a"></div><div class="draabe b"></div><div class="draabe c"></div><div class="draabe d"></div><div class="damp"></div></div>' + p(3, 'damp', { varighed: 10 }); },
  maskot: '<svg class="toelt" viewBox="0 0 64 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<path d="M10 22c-6 2-9 8-7 16M9 24c-5 3-7 8-6 14" stroke="#d9c7a0" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
    + '<g class="ben b1" style="transform-origin:16px 30px"><path d="M16 30l-2 13" stroke="#a9733a" stroke-width="4.4" stroke-linecap="round"/><path d="M13.5 42l-.5 3h4z" fill="#2a1608"/></g>'
    + '<g class="ben b3" style="transform-origin:38px 30px"><path d="M38 30l2 13" stroke="#8a5a2b" stroke-width="4.4" stroke-linecap="round"/><path d="M39.5 42l.5 3h-4z" fill="#2a1608"/></g>'
    + '<ellipse cx="27" cy="25" rx="17" ry="10" fill="#a9733a"/><ellipse cx="27" cy="29" rx="11" ry="5" fill="#c9955a" opacity=".6"/>'
    + '<g class="ben b2" style="transform-origin:22px 30px"><path d="M22 30l-1 13" stroke="#b9843f" stroke-width="4.4" stroke-linecap="round"/><path d="M20.5 42l-.5 3h4z" fill="#2a1608"/></g>'
    + '<g class="ben b4" style="transform-origin:42px 30px"><path d="M42 30l1 13" stroke="#b9843f" stroke-width="4.4" stroke-linecap="round"/><path d="M42.5 42l.5 3h-4z" fill="#2a1608"/></g>'
    + '<path d="M38 22c3-9 7-13 12-13l4 7c-4 1-7 5-9 10z" fill="#a9733a"/><path d="M50 10c5-2 9 1 11 6l-3 3c-3-1-6-1-8 1l-3-4z" fill="#a9733a"/><path d="M52 10l1-5 3 4z" fill="#a9733a"/>'
    + '<g class="manke"><path d="M26 16c6-6 12-8 18-6-2 4-4 8-5 12-4-3-8-5-13-6z" fill="#d9c7a0"/><path d="M30 14c4-3 8-4 12-3" stroke="#f0e2c0" stroke-width="1.2" fill="none"/></g>'
    + '<g class="pande"><path d="M52 8c2-4 5-5 8-3-2 2-3 5-3 8-2-2-3-4-5-5z" fill="#d9c7a0"/></g>'
    + '<circle cx="56" cy="13" r="1.2" fill="#1a0c04"/>'
    + '</svg>'
});
