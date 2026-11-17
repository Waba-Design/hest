// SKIN · STEAMPUNK (skins 40, docs/skins.md) — tandhjulene, dampen og den mekaniske ugle
WABA_TEMAER.skinAktiv('steampunk', {
  bag: function (p) { return '<div class="gear a"></div><div class="gear b"></div><div class="gear c"></div>'; },
  fo: function (p) { return p(6, 'damp', { varighed: 9 }); },
  maskot: '<svg class="ugle" data-fast="1" viewBox="0 0 50 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<g class="vinge a"><path d="M10 30c-6 4-8 12-6 20 6-2 10-8 12-16z" fill="#a8792e" stroke="#6a4a1a" stroke-width="1"/></g>'
    + '<g class="vinge b"><path d="M40 30c6 4 8 12 6 20-6-2-10-8-12-16z" fill="#a8792e" stroke="#6a4a1a" stroke-width="1"/></g>'
    + '<path d="M12 34c0-10 6-16 13-16s13 6 13 16v12c0 6-5 10-13 10s-13-4-13-10z" fill="#d9a94e" stroke="#6a4a1a" stroke-width="1.2"/>'
    + '<path d="M18 36h14M17 41h16M18 46h14" stroke="#8a6a3a" stroke-width="1.2" opacity=".7"/><g fill="#6a4a1a"><circle cx="16" cy="38" r="1"/><circle cx="34" cy="38" r="1"/><circle cx="16" cy="44" r="1"/><circle cx="34" cy="44" r="1"/></g>'
    + '<g class="hoved"><path d="M10 22c0-10 7-16 15-16s15 6 15 16c0 6-6 10-15 10S10 28 10 22z" fill="#d9a94e" stroke="#6a4a1a" stroke-width="1.2"/>'
    + '<path d="M10 14l4-8 4 6M40 14l-4-8-4 6" fill="#d9a94e" stroke="#6a4a1a" stroke-width="1.2" stroke-linejoin="round"/>'
    + '<circle cx="18" cy="22" r="6" fill="#faf3e3" stroke="#6a4a1a" stroke-width="1.2"/><circle cx="32" cy="22" r="6" fill="#faf3e3" stroke="#6a4a1a" stroke-width="1.2"/>'
    + '<g class="oeje a"><circle cx="18" cy="22" r="3.2" fill="none" stroke="#b5652a" stroke-width="1.6" stroke-dasharray="1.6 1.4"/><circle cx="18" cy="22" r="1.4" fill="#2a1f14"/></g>'
    + '<g class="oeje b"><circle cx="32" cy="22" r="3.2" fill="none" stroke="#b5652a" stroke-width="1.6" stroke-dasharray="1.6 1.4"/><circle cx="32" cy="22" r="1.4" fill="#2a1f14"/></g>'
    + '<path d="M25 25l-3 5h6z" fill="#b5652a" stroke="#6a4a1a" stroke-width="1"/></g>'
    + '<path d="M20 55l-2 1M30 55l2 1M18 55h4M28 55h4" stroke="#6a4a1a" stroke-width="1.6" stroke-linecap="round"/>'
    + '</svg>',
});
