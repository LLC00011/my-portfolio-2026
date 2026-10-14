/* Navigation pill. On case pages the arrow shows scroll progress as a ring that grows
   clockwise. Until the last fold it scrolls to the next fold; at the last fold it
   turns to point right, fills with the dark blue, shows the next case name and links to it. */
/* Replay the entrance animations when a case page comes back from the back/forward cache. */
window.addEventListener('pageshow', function (e) {
  if (!e.persisted) return;
  document.querySelectorAll('.snap > .hero:first-child img, #go-wrap').forEach(function (el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
});

(function () {
  var snap = document.querySelector('.snap');
  var go = document.getElementById('go');
  var wrap = document.getElementById('go-wrap');
  if (!snap || !go || !wrap) return;

  var bar = go.querySelector('.ring-bar');
  var CIRC = 2 * Math.PI * 23;
  var caseName = go.getAttribute('data-case');
  var narrow = window.matchMedia('(max-width:1179px),(max-aspect-ratio:1/1)');
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
    // Same rule at every size: the end is the bottom of the scroll, which is also where the ring is full.
    var range = snap.scrollHeight - snap.clientHeight;
    atEnd = range > 0 ? snap.scrollTop >= range - 2 : true;
    var progress = range > 0 ? Math.min(1, Math.max(0, snap.scrollTop / range)) : 1;
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
  // Arrow keys: down/right go to the next fold (and, at the end, to the next case), up/left to the
  // previous fold. Inside a fold taller than the screen the browser scrolls as usual.
  function goTo(el) {
    el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
  }
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    var forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    var backward = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
    if (!forward && !backward) return;

    var list = stops();
    var index = 0;
    list.forEach(function (el, k) { if (offset(el) <= 8) index = k; });
    var current = list[index];

    if (forward) {
      if (atEnd) { e.preventDefault(); go.click(); return; }
      var bottom = current.getBoundingClientRect().bottom - snap.getBoundingClientRect().top;
      if (bottom > snap.clientHeight * 1.15) return;
      if (list[index + 1]) { e.preventDefault(); goTo(list[index + 1]); }
    } else {
      if (offset(current) < -8) return;
      if (index > 0) { e.preventDefault(); goTo(list[index - 1]); }
    }
  });

  snap.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
})();
