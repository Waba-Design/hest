// SKIN · SOLNEDGANG (skins 46, docs/skins.md) — solen, skummet, fyrtårnet, mågerne og flamingoen
WABA_TEMAER.skinAktiv('solnedgang', {
  bag: function (p) { return '<div class="sol"></div><div class="skum"></div><div class="skum b"></div><div class="fyr"></div>'; },
  fo: function (p) {
    return '<svg class="maager" viewBox="0 0 70 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="#2a2a3a" stroke-width="2" stroke-linecap="round"><path class="v" d="M4 14q8-9 16 0q8-9 16 0"/><path class="v" d="M36 22q7-8 14 0q7-8 14 0"/></g></svg>';
  },
  maskot: '<svg class="flamingo" data-fast="1" viewBox="0 0 46 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="krop">'
    + '<path d="M24 40l-2 22M24 40l6 8" stroke="#e86a8a" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    + '<ellipse cx="22" cy="36" rx="14" ry="9" fill="#f28aa0"/><path d="M10 34c6-6 16-8 24-4-6 6-16 8-24 4z" fill="#e86a8a"/>'
    + '<g class="vinge"><path d="M14 36c6-6 14-7 22-3-6 5-14 6-22 3z" fill="#ff9fb5"/><path d="M20 34c4-2 8-2 12-1" stroke="#e86a8a" stroke-width="1" fill="none"/></g>'
    + '<g class="hoved"><path d="M30 30c-2-8 0-16 2-22" stroke="#f28aa0" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M32 8c-5-2-8 1-9 5 4-1 7-1 9 1z" fill="#f28aa0"/><circle cx="27" cy="7" r="4.5" fill="#f28aa0"/><path d="M23 8c-5 1-8 5-8 10 3-2 5-4 6-7l3-1z" fill="#2a1a1a"/><path d="M24 8c-2 1-4 3-5 5" stroke="#fff" stroke-width="1" opacity=".5" fill="none"/><circle cx="28" cy="6" r="1.1" fill="#1a0c04"/></g>'
    + '</g></svg>',
});
