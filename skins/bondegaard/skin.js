// SKIN · BONDEGÅRD (skins 38, docs/skins.md) — fuglelaget, traktoren og hønen med kyllinger
WABA_TEMAER.skinAktiv('bondegaard', {
  bag: function (p) { return '<div class="fugle"></div>'; },
  fo: function (p) {
    return '<div class="traktor"><svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<g class="roeg"><circle cx="16" cy="10" r="4" fill="#9a9a9a" opacity=".7"/></g>'
      + '<rect x="14" y="12" width="4" height="10" fill="#444"/>'
      + '<path d="M10 36V22h22l6-12h16v26z" fill="#2f7a2f"/><rect x="38" y="13" width="12" height="8" fill="#bfe6ff"/>'
      + '<rect x="54" y="26" width="20" height="10" fill="#2f7a2f"/><rect x="6" y="28" width="6" height="8" fill="#e6b800"/>'
      + '<g class="hjul"><circle cx="60" cy="38" r="11" fill="#222"/><circle cx="60" cy="38" r="5" fill="#e6b800"/><path d="M60 27v22M49 38h22" stroke="#555" stroke-width="2"/></g>'
      + '<g class="hjul"><circle cx="20" cy="41" r="7" fill="#222"/><circle cx="20" cy="41" r="3" fill="#e6b800"/><path d="M20 34v14M13 41h14" stroke="#555" stroke-width="1.5"/></g>'
      + '</svg></div>';
  },
  maskot: '<svg class="hoens" viewBox="0 0 78 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<g class="kyl a"><ellipse cx="10" cy="36" rx="7" ry="6" fill="#f5d547"/><circle cx="15" cy="31" r="4" fill="#f5d547"/><circle cx="16.5" cy="30" r=".9" fill="#2b2314"/><path d="M19 31l3 1-3 1z" fill="#e6a040"/><path d="M8 42v2M12 42v2" stroke="#e6a040" stroke-width="1.4"/></g>'
    + '<g class="kyl b"><ellipse cx="66" cy="36" rx="7" ry="6" fill="#f5d547"/><circle cx="61" cy="31" r="4" fill="#f5d547"/><circle cx="59.5" cy="30" r=".9" fill="#2b2314"/><path d="M57 31l-3 1 3 1z" fill="#e6a040"/><path d="M64 42v2M68 42v2" stroke="#e6a040" stroke-width="1.4"/></g>'
    + '<path d="M22 30c0-10 6-16 16-16 8 0 12 4 14 10l-4 8c-4 6-10 8-18 8-6 0-8-4-8-10z" fill="#f4ead8" stroke="#b9a98a" stroke-width="1"/>'
    + '<g class="vinge"><path d="M28 28c4-6 12-7 18-4-4 4-10 6-18 4z" fill="#e8dcc4" stroke="#b9a98a" stroke-width="1"/></g>'
    + '<path d="M22 30c-6-2-10-8-6-14 2 4 5 6 8 8z" fill="#2b2314"/>'
    + '<g class="hoved"><path d="M44 20c2-6 6-9 10-8 3 1 4 4 3 7l-2 4-6 2c-3 0-5-2-5-5z" fill="#f4ead8" stroke="#b9a98a" stroke-width="1"/><path d="M50 12c1-4 4-5 6-3-2 1-3 3-3 5zM53 11c2-3 5-3 6-1-2 1-3 2-4 4z" fill="#b5301e"/><circle cx="52" cy="16" r="1.3" fill="#2b2314"/><path d="M56 18l5 1-5 2z" fill="#e6a040"/><path d="M54 22c1 2 0 4-2 4" fill="#b5301e"/></g>'
    + '<path d="M32 40v4M40 40v4" stroke="#e6a040" stroke-width="2"/>'
    + '</svg>',
});
