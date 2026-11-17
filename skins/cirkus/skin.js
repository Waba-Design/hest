// SKIN · CIRKUS (skins 30, docs/skins.md) — konfettilaget + to projektører bag (kun mørk, CSS), lyskæden + 6 konfettistykker foran, cirkushesten (tripper, rejser sig ved tryk — CSS i skin.css).
WABA_TEMAER.skinAktiv('cirkus', {
  bag: function (p) { return '<div class="konfetti"></div><div class="lys a"></div><div class="lys b"></div>'; },
  fo: function (p) { return '<div class="paerer a"></div><div class="paerer b"></div>' + p(6, 'stykke', { varighed: 14, varianter: 4 }); },
  maskot: '<svg class="cirkushest" viewBox="0 0 62 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="krop">'
    + '<path d="M12 26c-6 2-9 8-6 16" stroke="#e6dccc" stroke-width="4" fill="none" stroke-linecap="round"/>'
    + '<g class="ben a" style="transform-origin:20px 32px"><path d="M20 32l-2 14" stroke="#f4f0e8" stroke-width="4" stroke-linecap="round"/><path d="M17.5 45l-.5 3h4z" fill="#8a6a3a"/></g>'
    + '<g class="ben b" style="transform-origin:38px 32px"><path d="M38 32l2 14" stroke="#e6dccc" stroke-width="4" stroke-linecap="round"/><path d="M39.5 45l.5 3h-4z" fill="#8a6a3a"/></g>'
    + '<ellipse cx="29" cy="28" rx="16" ry="9" fill="#f7f3ec" stroke="#d9cdb8" stroke-width="1"/>'
    + '<path d="M18 22h18v10c-6 2-12 2-18 0z" fill="#d6263e"/><path d="M18 22h18" stroke="#f2c53d" stroke-width="2"/><path d="M20 31c6 2 10 2 14 0" stroke="#f2c53d" stroke-width="1.5" fill="none"/>'
    + '<g class="ben b" style="transform-origin:24px 32px"><path d="M24 32l-1 14" stroke="#f4f0e8" stroke-width="4" stroke-linecap="round"/><path d="M22.5 45l-.5 3h4z" fill="#8a6a3a"/></g>'
    + '<g class="ben a" style="transform-origin:42px 32px"><path d="M42 32l1 14" stroke="#f4f0e8" stroke-width="4" stroke-linecap="round"/><path d="M42.5 45l.5 3h-4z" fill="#8a6a3a"/></g>'
    + '<path d="M40 25c3-10 8-15 13-15l3 7c-4 1-7 5-9 11z" fill="#f7f3ec" stroke="#d9cdb8" stroke-width="1"/><path d="M51 11c5-2 9 1 11 6l-3 3c-3-1-6-1-8 1l-3-4z" fill="#f7f3ec" stroke="#d9cdb8" stroke-width="1"/><path d="M53 11l1-5 3 4z" fill="#f7f3ec"/>'
    + '<path d="M44 19c3-5 6-8 10-9" stroke="#e6dccc" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="57" cy="15" r="1.1" fill="#1a0c04"/>'
    + '<g class="fjer"><path d="M50 10c-2-6 0-10 3-10 2 2 2 6 0 10zM50 10c-5-4-5-9-2-10 3 1 4 5 2 10zM50 10c5-4 5-9 2-10-3 1-4 5-2 10z" fill="#d6263e"/><path d="M50 10c-1-4 0-7 1-8" stroke="#f2c53d" stroke-width="1" fill="none"/></g>'
    + '</g></svg>'
});
