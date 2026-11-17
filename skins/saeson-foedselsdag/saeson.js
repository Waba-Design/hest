// FEST-LAG · FØDSELSDAG (skins 27, docs/skins.md §5) — konfettien foran i 6 s, én gang, når laget tegnes (skærmen viser en fødselsdagshest). Ballonerne er registrets partikler. Ingen maskot.
(function () {
  var FARVER = ['#c8102e', '#e6b45c', '#2f6fb3', '#ffffff', '#3dab5a'];
  function konfetti(n) { var ud = ''; for (var i = 0; i < n; i++) ud += '<i class="ss-fest" data-haendelse="1" style="--x:' + Math.round(5 + Math.random() * 90) + '%;--dl:' + (Math.random() * 1.2).toFixed(2) + 's;--dx:' + Math.round(-40 + Math.random() * 80) + 'px;--c:' + FARVER[i % FARVER.length] + '"></i>'; return ud; }
  WABA_TEMAER.saesonAktiv('foedselsdag', { fo: konfetti(14) });
})();
