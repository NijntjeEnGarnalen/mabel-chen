// Media fades in as it scrolls into view; whatever is on screen at load shows right away.
(function () {
  var items = document.querySelectorAll('.m');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('in');
    else io.observe(el);
  });
})();

// Project descriptions: show four lines, then "+ Read more" / "− Close".
document.querySelectorAll('.desc').forEach(function (d) {
  d.classList.add('clamp');
  if (d.scrollHeight <= d.clientHeight + 2) { d.classList.remove('clamp'); return; }
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'more-btn';
  b.setAttribute('aria-expanded', 'false');
  b.textContent = '+ Read more';
  b.addEventListener('click', function () {
    var open = d.classList.toggle('clamp') === false;
    b.textContent = open ? '− Close' : '+ Read more';
    b.setAttribute('aria-expanded', String(open));
  });
  d.after(b);
});
