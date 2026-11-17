// SKIN · AKVAREL (skins 43, docs/skins.md) — farvedråberne og akvarelhesten
WABA_TEMAER.skinAktiv('akvarel', {
  bag: function (p) { return p(5, 'draabe', { varighed: 10, varianter: 3 }); },
  maskot: '<svg class="akvhest" viewBox="0 0 62 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="krop">'
    + '<defs><linearGradient id="akv1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3a7bf"/><stop offset="1" stop-color="#9fc4e8"/></linearGradient><linearGradient id="akv2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f6dc8c"/><stop offset="1" stop-color="#c2567a"/></linearGradient></defs>'
    + '<path d="M12 24c-6 2-9 8-6 15" stroke="url(#akv1)" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>'
    + '<path d="M18 30l-2 14M24 30l-1 14M36 30l1 14M41 30l2 14" stroke="url(#akv1)" stroke-width="4" stroke-linecap="round" opacity=".85"/>'
    + '<ellipse cx="29" cy="26" rx="16" ry="9" fill="url(#akv1)" opacity=".9"/>'
    + '<path d="M40 24c3-10 8-15 13-15l3 7c-4 1-7 5-9 11z" fill="url(#akv1)" opacity=".9"/><path d="M51 10c5-2 9 1 11 6l-3 3c-3-1-6-1-8 1l-3-4z" fill="url(#akv1)" opacity=".9"/><path d="M53 10l1-5 3 4z" fill="#9fc4e8" opacity=".9"/>'
    + '<g class="lag2"><ellipse cx="27" cy="28" rx="11" ry="6" fill="url(#akv2)" opacity=".7"/><path d="M44 18c3-5 6-8 10-9" stroke="#c2567a" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".8"/></g>'
    + '<circle cx="57" cy="14" r="1.1" fill="#2d2a33"/>'
    + '<path class="dryp" d="M20 44c0-2 2-4 2-6 0 2 2 4 2 6a2 2 0 0 1-4 0z" fill="#9fc4e8"/>'
    + '</g></svg>',
});
