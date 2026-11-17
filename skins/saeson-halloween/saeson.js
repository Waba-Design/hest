// SÆSONLAG · HALLOWEEN (skins 27, docs/skins.md §5) — to græskar bag appen, fire flagermus og en edderkop i forgrunden (hændelser — væk i Rolig), spøgelset på fanebjælken. Bladene er registrets partikler.
(function () {
  function flagermus(i) {
    return '<svg class="ss-flagermus" data-haendelse="1" style="--i:' + i + '" viewBox="0 0 44 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<g class="vinge v"><path d="M22 12C16 2 8 2 2 8c4 0 6 2 6 6 3-2 6-1 8 2 2-2 4-3 6-4z" fill="#1a0c20"/></g>'
      + '<g class="vinge h"><path d="M22 12c6-10 14-10 20-4-4 0-6 2-6 6-3-2-6-1-8 2-2-2-4-3-6-4z" fill="#1a0c20"/></g>'
      + '<ellipse cx="22" cy="13" rx="4" ry="6" fill="#1a0c20"/><path d="M19 8l1-4 2 3 2-3 1 4z" fill="#1a0c20"/><circle cx="20.5" cy="11" r=".9" fill="#ff8c1a"/><circle cx="23.5" cy="11" r=".9" fill="#ff8c1a"/></svg>';
  }
  WABA_TEMAER.saesonAktiv('halloween', {
    bag: '<div class="ss-graeskar g1"></div><div class="ss-graeskar g2"></div>',
    fo: flagermus(0) + flagermus(1) + flagermus(2) + flagermus(3) + '<div class="ss-edderkop" data-haendelse="1"></div>',
    maskot: '<svg class="spoegelse" viewBox="0 0 40 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<path d="M8 44V20C8 10 13 4 20 4s12 6 12 16v24l-4-4-4 4-4-4-4 4-4-4z" fill="#f4f0ff"/>'
      + '<g class="arm"><path d="M8 24c-4 1-6 4-5 7 3-1 5-3 5-7z" fill="#f4f0ff"/></g><g class="arm h"><path d="M32 24c4 1 6 4 5 7-3-1-5-3-5-7z" fill="#f4f0ff"/></g>'
      + '<ellipse cx="15" cy="18" rx="2.4" ry="3.2" fill="#1a0c20"/><ellipse cx="25" cy="18" rx="2.4" ry="3.2" fill="#1a0c20"/><ellipse cx="20" cy="27" rx="3" ry="4" fill="#1a0c20"/>'
      + '<circle cx="11" cy="24" r="2.2" fill="#f1b9c9" opacity=".8"/><circle cx="29" cy="24" r="2.2" fill="#f1b9c9" opacity=".8"/></svg>'
  });
})();
