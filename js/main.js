/* Navigation pill: on case pages the arrow scrolls to the next fold and,
   at the last fold, turns into a link to the next case. */
(function () {
  var snap = document.querySelector('.snap');
  var next = document.getElementById('go-next');
  var nextCase = document.getElementById('go-case');
  if (!snap || !next || !nextCase) return;

  var narrow = window.matchMedia('(max-width:960px),(max-aspect-ratio:1/1)');
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)');

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
    var atEnd = !!last && offset(last) <= 8;
    next.hidden = atEnd;
    nextCase.hidden = !atEnd;
  }

  next.addEventListener('click', function () {
    var target = stops().filter(function (el) { return offset(el) > 8; })[0];
    if (target) target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
  });
  snap.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
