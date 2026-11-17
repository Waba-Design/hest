// SKIN · TAVLE (skins 32, docs/skins.md) — kridtstøvlaget bag kortene, kridthesten med svampen (blinker svagt; ved tryk visker svampen den ud, og den tegnes igen — CSS i skin.css).
WABA_TEMAER.skinAktiv('tavle', {
  bag: function (p) { return '<div class="stoev"></div>'; },
  maskot: '<svg class="kridthest" data-fast="1" viewBox="0 0 76 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<g class="hest" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M12 24c-5 2-8 8-6 14"/><path d="M16 30l-2 12M22 30l-1 12M34 30l1 12M39 30l2 12"/>'
    + '<path d="M14 25c0-5 6-9 14-9s14 4 14 9-6 7-14 7-14-2-14-7z"/><path d="M39 22c3-9 7-13 12-13l3 6c-4 1-7 5-9 10"/><path d="M51 12c4-2 8 1 10 5l-3 3c-3-1-6-1-8 1"/><path d="M53 12l1-5 3 4"/>'
    + '<path d="M42 16c3-5 6-8 10-9" stroke-width="2.6"/><circle cx="56" cy="15" r="1" fill="#fff"/><path d="M21 20c4-1 8-1 12 0" stroke-width="1" opacity=".6"/>'
    + '</g>'
    + '<g class="svamp"><rect x="58" y="30" width="18" height="12" rx="2" fill="#c9a26a"/><rect x="58" y="30" width="18" height="4" rx="2" fill="#8a6a3a"/><g fill="#8a6a3a" opacity=".6"><circle cx="63" cy="38" r="1"/><circle cx="69" cy="37" r="1.2"/><circle cx="73" cy="39" r=".8"/></g></g>'
    + '</svg>'
});
