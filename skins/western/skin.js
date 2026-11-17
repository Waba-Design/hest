// SKIN · WESTERN (skins 35, docs/skins.md) — sandstøvlaget + bålskæret (kun mørk, CSS) bag kortene, tumbleweed foran (6 s af hvert 25. s), cowboyhesten (tygger strå, ørerne vipper; letter på hatten ved tryk — CSS i skin.css).
WABA_TEMAER.skinAktiv('western', {
  bag: function (p) { return '<div class="stoev"></div><div class="baal"></div>'; },
  fo: function (p) {
    return '<div class="tumble"><svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="#9a7a3a" stroke-width="1.6" stroke-linecap="round">'
      + '<circle cx="20" cy="20" r="17"/><path d="M6 14c8 2 14 10 28 8M8 28c10-6 16-2 26-10M14 5c2 10 8 16 14 30M26 5c-4 8-12 14-20 28M4 20c10-2 22 2 32 0M20 3c-2 12 2 24 0 34"/></g></svg></div>';
  },
  maskot: '<svg class="cowhest" data-fast="1" viewBox="0 0 64 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<path d="M12 60c0-14 6-24 16-30l18 4c6 4 8 12 7 20l-4 6z" fill="#8a5a2b"/>'
    + '<path d="M28 30c8-6 16-6 20 2 3 6 2 12-2 16-5 2-10 1-14-2" fill="#8a5a2b"/>'
    + '<ellipse cx="50" cy="42" rx="9" ry="7" fill="#a9733a"/><circle cx="55" cy="44" r="1.4" fill="#3a2410"/>'
    + '<circle cx="42" cy="33" r="2.2" fill="#1a0c04"/><circle cx="42.8" cy="32.3" r=".7" fill="#fff"/>'
    + '<path d="M22 30c4-6 8-8 14-10" stroke="#4a2c12" stroke-width="3" fill="none" stroke-linecap="round"/>'
    + '<g class="oere"><path d="M30 24l4-10 4 8z" fill="#8a5a2b"/><path d="M36 20l5-8 2 9z" fill="#7a4d22"/></g>'
    + '<g class="straa"><path d="M54 44L66 34" stroke="#e0c060" stroke-width="2.2" stroke-linecap="round"/><path d="M62 37l4-1" stroke="#e0c060" stroke-width="1.6" stroke-linecap="round"/></g>'
    + '<path d="M20 54h30l-3 6H24z" fill="#a3402a"/><g fill="#fff" opacity=".8"><circle cx="27" cy="57" r="1"/><circle cx="35" cy="56" r="1"/><circle cx="43" cy="57" r="1"/></g>'
    + '<g class="hat"><ellipse cx="30" cy="20" rx="24" ry="4.5" fill="#5a3a1a"/><path d="M18 20c0-10 4-16 12-16s12 6 12 16z" fill="#6b4423"/><rect x="18" y="15" width="24" height="4" fill="#a3402a"/><path d="M8 19c2 3 6 4 10 3M52 19c-2 3-6 4-10 3" stroke="#5a3a1a" stroke-width="2" fill="none"/></g>'
    + '</svg>'
});
