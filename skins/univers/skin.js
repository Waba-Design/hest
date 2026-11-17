// SKIN · UNIVERS (skins 25, docs/skins.md) — to stjernelag bag appen (blinker modsat), kometen i forgrunden (1,3 s af hvert 90. s — en hændelse, væk i Rolig) og rumvæsenet på fanebjælken (antennen svajer, øjnene blinker, hopper ved tryk).
WABA_TEMAER.skinAktiv('univers', {
  bag: '<div class="stjerner a"></div><div class="stjerner b"></div>',
  fo: '<div class="komet" data-haendelse="1"></div>',
  maskot: '<svg class="alien" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="alt">'
    + '<g class="antenne"><path d="M23 12V4" stroke="#8df2ff" stroke-width="2" stroke-linecap="round"/><circle cx="23" cy="3.5" r="3" fill="#d58bff"/></g>'
    + '<path d="M8 32c0-12 6-20 15-20s15 8 15 20c0 6-5 10-15 10S8 38 8 32z" fill="#7ee08a"/><path d="M12 30c0-9 5-15 11-15s11 6 11 15" fill="#a6f0ad" opacity=".6"/>'
    + '<g class="oejne"><ellipse cx="17" cy="24" rx="4" ry="5.5" fill="#0b1026"/><ellipse cx="29" cy="24" rx="4" ry="5.5" fill="#0b1026"/><circle cx="18" cy="22" r="1.3" fill="#fff"/><circle cx="30" cy="22" r="1.3" fill="#fff"/></g>'
    + '<path d="M18 34c3 2 7 2 10 0" stroke="#0b1026" stroke-width="1.4" fill="none" stroke-linecap="round"/>'
    + '<path d="M6 40l4-6M40 40l-4-6" stroke="#7ee08a" stroke-width="3" stroke-linecap="round"/></g></svg>'
});
