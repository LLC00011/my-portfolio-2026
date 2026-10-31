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
  var prevWrap = document.getElementById('prev-wrap');
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
  // The end of a case is where the last fold has been seen in full; the footer sits below it.
  function endTop() {
    var all = snap.querySelectorAll('.fold');
    var last = all[all.length - 1];
    return last ? extent(last).bottom - snap.clientHeight : snap.scrollHeight - snap.clientHeight;
  }
  function update() {
    // Same rule at every size: the end is the bottom of the last fold, which is also where the ring is full.
    var range = endTop();
    atEnd = range > 0 ? snap.scrollTop >= range - 2 : true;
    var progress = range > 0 ? Math.min(1, Math.max(0, snap.scrollTop / range)) : 1;
    bar.style.strokeDashoffset = String(CIRC * (1 - progress));
    go.classList.toggle('end', atEnd);
    wrap.classList.toggle('end', atEnd);
    if (prevWrap) prevWrap.classList.toggle('end', atEnd);
    go.setAttribute('aria-label', atEnd ? 'Next case: ' + caseName : 'Next section');
  }

  // --- Moving between folds (arrow button and arrow keys) ---------------------------------------
  // A fold can be taller than the window (folds keep a 1350:800 shape, windows are usually wider), so
  // inside a fold we page through it first and only then move to the next one. The scroll is animated
  // by hand with snapping switched off meanwhile: with mandatory snapping, the browser pulls a smooth
  // scroll that ends inside a tall fold back to the start of that fold.
  var frame = null;
  var target = null;

  function extent(el) {
    var r = el.getBoundingClientRect();
    var base = snap.getBoundingClientRect().top - snap.scrollTop;
    return { top: r.top - base, bottom: r.bottom - base };
  }
  function stopAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    target = null;
    snap.style.scrollSnapType = '';
  }
  function animateTo(top) {
    var max = snap.scrollHeight - snap.clientHeight;
    var to = Math.max(0, Math.min(max, top));
    var from = snap.scrollTop;
    if (frame !== null) cancelAnimationFrame(frame);
    target = to;
    snap.style.scrollSnapType = 'none';
    var distance = to - from;
    var duration = reduce.matches ? 0 : Math.min(900, 350 + Math.abs(distance) * 0.35);
    var start = performance.now();
    function tick(now) {
      var t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      var eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      snap.scrollTop = from + distance * eased;
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = null;
        target = null;
        snap.style.scrollSnapType = '';
      }
    }
    frame = requestAnimationFrame(tick);
  }
  // Wheel or touch hands the scroll back to the browser.
  snap.addEventListener('wheel', stopAnimation, { passive: true });
  snap.addEventListener('touchstart', stopAnimation, { passive: true });

  // Returns false when there is nothing further forward (we are at the end of the page).
  function moveForward() {
    var view = snap.clientHeight;
    var pos = target !== null ? target : snap.scrollTop;
    if (pos >= endTop() - 2) return false;
    var list = stops();
    var index = 0;
    list.forEach(function (el, k) { if (extent(el).top <= pos + 8) index = k; });
    var current = extent(list[index]);
    if (current.bottom > pos + view + 8) {
      // The fold continues below the window: show the rest of it first.
      animateTo(pos + Math.min(current.bottom - (pos + view), view * 0.9));
    } else if (list[index + 1]) {
      animateTo(extent(list[index + 1]).top);
    }
    return true;
  }
  function moveBackward() {
    var view = snap.clientHeight;
    var pos = target !== null ? target : snap.scrollTop;
    var list = stops();
    var index = 0;
    list.forEach(function (el, k) { if (extent(el).top <= pos + 8) index = k; });
    var current = extent(list[index]);
    if (current.top < pos - 8) {
      // Part way down a tall fold: go back up inside it first.
      animateTo(pos - Math.min(pos - current.top, view * 0.9));
    } else if (index > 0) {
      var previous = extent(list[index - 1]);
      // A previous fold taller than the window is entered at its lower part.
      animateTo(previous.bottom - previous.top > view + 8 ? previous.bottom - view : previous.top);
    }
  }

  // The arrow button moves forward; at the end of the page it is a plain link to the next case.
  go.addEventListener('click', function (e) {
    if (moveForward()) e.preventDefault();
  });

  // Arrow keys: down/right forward (from the last fold: to the next case), up/left backward.
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    var forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    var backward = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
    if (!forward && !backward) return;
    e.preventDefault();
    if (forward) {
      if (!moveForward()) go.click();
    } else {
      moveBackward();
    }
  });

  snap.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
})();
