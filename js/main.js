/* Navigation pill. On case pages the arrow shows scroll progress as a ring that grows
   clockwise. Until the last fold it scrolls to the next fold; at the last fold it
   turns to point right, fills with the dark blue, shows the next case name and links to it. */
(function () {
  var snap = document.querySelector('.snap');
  var go = document.getElementById('go');
  var wrap = document.getElementById('go-wrap');
  if (!snap || !go || !wrap) return;

  var bar = go.querySelector('.ring-bar');
  var CIRC = 2 * Math.PI * 23;
  var caseName = go.getAttribute('data-case');
  var narrow = window.matchMedia('(max-width:960px),(max-aspect-ratio:1/1)');
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)');
  var atEnd = false;

  // Desktop: every fold is a stop. Mobile: a split fold is two stops (photo, then text).
  function stops() {
    var q = narrow.matches ? '.fold:not(.split), .split .photo, .split .info' : '.fold';
    return Array.prototype.slice.call(snap.querySelectorAll(q));
  }
  function offset(el) {
    return el.getBoundingClientRect().top - snap.getBoundingClientRect().top;
  }
  function update() {
    var list = stops();
    var last = list[list.length - 1];
    atEnd = !!last && offset(last) <= 8;
    var range = snap.scrollHeight - snap.clientHeight;
    var progress = atEnd ? 1 : (range > 0 ? Math.min(1, Math.max(0, snap.scrollTop / range)) : 0);
    bar.style.strokeDashoffset = String(CIRC * (1 - progress));
    go.classList.toggle('end', atEnd);
    wrap.classList.toggle('end', atEnd);
    go.setAttribute('aria-label', atEnd ? 'Next case: ' + caseName : 'Next section');
  }

  go.addEventListener('click', function (e) {
    if (atEnd) return; // follow the link to the next case
    e.preventDefault();
    var target = stops().filter(function (el) { return offset(el) > 8; })[0];
    if (target) target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
  });
  snap.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
