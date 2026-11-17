// SKIN · REGNSKOV (skins 49, docs/skins.md; punkt 9, kandidat 162: dybde) — lys gennem kronerne, stammen, lianerne med papegøjen, morphoerne, dugdråberne og dovendyret
WABA_TEMAER.skinAktiv('regnskov', {
  bag: function (p) { return '<div class="lys a"></div><div class="lys b"></div><div class="lys c"></div><div class="stamme"></div><div class="liane a"></div><div class="liane b"></div><div class="liane c"><i class="ara"></i></div><i class="morpho a"></i><i class="morpho b"></i>'; },   // punkt 9: lys gennem kronerne, stammen i venstre kant, papegøjen på lianen, to morphosommerfugle
  fo: function (p) { return p(4, 'dug', { varighed: 7, varianter: 2 }); },
  maskot: '<svg class="doven" data-fast="1" viewBox="0 0 112 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<path d="M0 0v20c10-6 20-9 32-9V3C21 3 10 2 0 0z" fill="#6a4a2a"/><path d="M24 7c30-2 56-2 82 3" stroke="#6a4a2a" stroke-width="6" fill="none" stroke-linecap="round"/>'
    + '<path d="M30 4c4-4 9-4 12 0M88 5c4-4 9-4 12 0M100 9c3 4 3 8 0 11" stroke="#2f8a4e" stroke-width="3" fill="none"/><path d="M4 6c3 2 5 5 5 9" stroke="#4f3720" stroke-width="1.4" fill="none"/>'
    + '<g transform="translate(36 3)">'
    + '<g class="alt">'
    + '<path d="M18 6c0 10 2 16 6 20M46 6c0 10-2 16-6 20" stroke="#a8906a" stroke-width="6" stroke-linecap="round"/>'
    + '<g class="arm"><path d="M46 6c0 10-2 16-6 20" stroke="#a8906a" stroke-width="6" stroke-linecap="round"/><path d="M38 26l-3 3M40 27l-1 4" stroke="#4a3a2a" stroke-width="1.5" stroke-linecap="round"/></g>'
    + '<ellipse cx="32" cy="36" rx="17" ry="13" fill="#b9a27a"/><ellipse cx="32" cy="38" rx="10" ry="8" fill="#d9c7a0"/>'
    + '<circle cx="32" cy="50" r="9" fill="#d9c7a0"/><path d="M24 48c2-5 6-7 8-7s6 2 8 7c-2-2-5-3-8-3s-6 1-8 3z" fill="#6a4a2a" opacity=".7"/>'
    + '<ellipse class="oeje" cx="28.5" cy="50" rx="1.4" ry="1.6" fill="#1a1a1a"/><ellipse class="oeje" cx="35.5" cy="50" rx="1.4" ry="1.6" fill="#1a1a1a"/><path d="M30 55c1 1 3 1 4 0" stroke="#4a3a2a" stroke-width="1" fill="none" stroke-linecap="round"/><circle cx="32" cy="53" r="1" fill="#4a3a2a"/>'
    + '<path d="M20 30c-1 3-1 6 0 9M44 30c1 3 1 6 0 9" stroke="#4a3a2a" stroke-width="1.5" stroke-linecap="round"/>'
    + '</g></g></svg>',
});
