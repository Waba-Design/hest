// SÆSONLAG · NYTÅR (skins 27, docs/skins.md §5) — konfettilaget bag appen, tre raketter med 9 gnister hver i forgrunden (hændelse hvert 12. s, forskudt — væk i Rolig) og katten med partyhat på fanebjælken.
(function () {
  var FARVER = ['#e6b45c', '#f4dca1', '#b5cbf3', '#ffffff'];
  function raket(x, dl, r) {
    var ud = '<div class="ss-fyr" data-haendelse="1" style="--x:' + x + '%;--dl:' + dl + 's"><i class="hoved"></i>';
    for (var i = 0; i < 9; i++) { var a = i * Math.PI * 2 / 9 + (r ? .3 : 0), dx = Math.round(Math.cos(a) * r), dy = Math.round(Math.sin(a) * r * .8); ud += '<i class="gnist" style="--dx:' + dx + 'px;--dy:' + dy + 'px;--c:' + FARVER[i % FARVER.length] + '"></i>'; }
    return ud + '</div>';
  }
  WABA_TEMAER.saesonAktiv('nytaar', {
    bag: '<div class="ss-konfetti"></div>',
    fo: raket(22, 0, 54) + raket(62, -4, 46) + raket(80, -8, 40),
    maskot: '<svg class="festkat" viewBox="0 0 54 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="alt">'
      + '<g class="hale"><path d="M10 40c-8-2-10-10-4-16" stroke="#3a3a3a" stroke-width="4" fill="none" stroke-linecap="round"/></g>'
      + '<ellipse cx="24" cy="40" rx="15" ry="9" fill="#3a3a3a"/><ellipse cx="24" cy="43" rx="9" ry="5" fill="#5a5a5a"/>'
      + '<circle cx="36" cy="28" r="10" fill="#3a3a3a"/><path d="M28 21l-2-9 7 5zM44 21l2-9-7 5z" fill="#3a3a3a"/><path d="M29 20l-1-5 4 3zM43 20l1-5-4 3z" fill="#e8a0a0"/>'
      + '<g class="oejne"><ellipse cx="32" cy="27" rx="2" ry="2.6" fill="#ffd76a"/><ellipse cx="40" cy="27" rx="2" ry="2.6" fill="#ffd76a"/><ellipse cx="32" cy="27" rx=".7" ry="2" fill="#1a1a1a"/><ellipse cx="40" cy="27" rx=".7" ry="2" fill="#1a1a1a"/></g>'
      + '<path d="M36 31l-1.5 2h3z" fill="#e8a0a0"/><path d="M30 33h-6M30 34l-6 1M42 33h6M42 34l6 1" stroke="#ddd" stroke-width=".8"/>'
      + '<g class="hat"><path d="M30 19l6-16 7 16z" fill="#e6b45c"/><path d="M33 14l3-8 3 8z" fill="#1d3c79" opacity=".6"/><circle cx="36" cy="3" r="2.5" fill="#fff"/></g>'
      + '<path d="M18 48l-2 2M28 48l1 2" stroke="#3a3a3a" stroke-width="2.4" stroke-linecap="round"/></g></svg>'
  });
})();
