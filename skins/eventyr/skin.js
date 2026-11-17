// SKIN · EVENTYR (skins 39, docs/skins.md) — fe-glimt og dragen
WABA_TEMAER.skinAktiv('eventyr', {
  bag: function (p) { return '<div class="maane"></div>'; },
  fo: function (p) { return p(6, 'fe', { varighed: 12, varianter: 2 }); },
  maskot: '<svg class="drage" viewBox="0 0 66 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<g class="hale"><path d="M14 36c-8 2-12 8-10 16" stroke="#3e8a5e" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4 50l-4 4 6 1z" fill="#3e8a5e"/></g>'
    + '<g class="vinge"><path d="M30 24C22 10 10 6 2 10c8 2 12 8 14 16 4 2 10 2 14-2z" fill="#6a3fb5" stroke="#4a2a8a" stroke-width="1"/><path d="M8 11c6 3 10 8 12 14M14 9c4 3 7 7 9 12" stroke="#8f6ad6" stroke-width="1" fill="none"/></g>'
    + '<ellipse cx="32" cy="38" rx="16" ry="11" fill="#4fa36e"/><ellipse cx="32" cy="42" rx="10" ry="6" fill="#bfe6a8" opacity=".9"/>'
    + '<path d="M22 26l4-6 3 6M30 23l3-6 3 6M38 24l3-6 3 6" fill="#6a3fb5"/>'
    + '<path d="M44 30c2-8 8-12 14-10l2 6c-4 1-7 4-8 9z" fill="#4fa36e"/><path d="M54 20c5-2 10 2 10 7l-4 2c-2-2-5-3-8-2z" fill="#4fa36e"/>'
    + '<circle cx="55" cy="24" r="2" fill="#1a1030"/><circle cx="55.7" cy="23.3" r=".7" fill="#fff"/><circle cx="61" cy="27" r=".9" fill="#2a5a3a"/>'
    + '<path d="M50 32l-2 6M54 33l-2 6" stroke="#2a6a48" stroke-width="3" stroke-linecap="round"/>'
    + '<g class="roeg a"><circle cx="63" cy="20" r="3" fill="#bbb" opacity=".6"/></g><g class="roeg b"><circle cx="64" cy="19" r="2.4" fill="#ccc" opacity=".6"/></g>'
    + '<g class="ild"><path d="M64 27c6-4 10-1 12 3-4 1-6 4-8 6 0-3-2-6-4-9z" fill="#ff8a2a"/><path d="M66 28c3-1 5 0 6 2-2 1-3 2-4 3 0-2-1-3-2-5z" fill="#ffd54a"/></g>'
    + '</svg>',
});
