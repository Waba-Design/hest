// SKIN · LYGTEMÆND (skins 45, docs/skins.md) — tågen, lygtemændene og pindsvinet med lygten
WABA_TEMAER.skinAktiv('lygtemaend', {
  bag: function (p) { return '<div class="taage"></div>' + p(4, 'lygte', { varighed: 14 }); },
  fo: function (p) { return p(2, 'lygte', { varighed: 18 }); },
  maskot: '<svg class="pindsvin" viewBox="0 0 66 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="krop">'
    + '<g class="pigge"><path d="M8 36c-2-10 2-20 10-24l4 6 4-8 4 7 4-8 4 7 4-8 4 7 3-6c6 6 8 14 6 27z" fill="#5a4030"/><path d="M12 34c-1-8 2-14 8-18l3 5 4-6 3 6 4-6 3 6 4-6 3 6 3-5c4 5 6 11 5 21z" fill="#7a5a40"/></g>'
    + '<path d="M8 36c6-6 16-8 26-6l6 3c8 2 10 6 8 10H10c-4 0-5-4-2-7z" fill="#e8c9a0"/>'
    + '<path d="M40 30c6-3 12-2 16 2 2 2 2 5-1 7-4-1-8-2-12-1z" fill="#e8c9a0"/><circle cx="56" cy="37" r="2.2" fill="#2a1a0c"/><circle cx="46" cy="33" r="1.6" fill="#1a0c04"/><circle cx="46.6" cy="32.4" r=".5" fill="#fff"/>'
    + '<path d="M16 43l-1 3M26 43l0 3M38 43l1 3" stroke="#5a4030" stroke-width="2" stroke-linecap="round"/>'
    + '<path d="M52 30c-1-6 0-12 2-18" stroke="#5a4030" stroke-width="1.5" fill="none"/>'
    + '<g class="lygte"><path d="M54 12h8l-1-6h-6z" fill="#3a3a3a"/><rect x="52" y="12" width="12" height="14" rx="2" fill="#2a2a2a"/><rect class="glas" x="54" y="14" width="8" height="10" rx="1" fill="#ffe08a"/><circle cx="58" cy="19" r="2.5" fill="#fff6c0"/><path d="M58 6V3" stroke="#3a3a3a" stroke-width="1.5"/></g>'
    + '</g></svg>',
});
