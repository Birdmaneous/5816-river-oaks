(function () {
  var dlg = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var scroller = document.getElementById('lbScroll');
  var zoomBtn = document.getElementById('lbZoom');
  var prev = document.getElementById('lbPrev');
  var next = document.getElementById('lbNext');
  var all = Array.prototype.slice.call(document.querySelectorAll('.thumb'));
  var items = [], idx = 0, opener = null;

  function setZoom(on) {
    dlg.classList.toggle('is-zoomed', on);
    zoomBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    zoomBtn.textContent = on ? 'Fit to screen' : 'Full size';
    placeScroll();
  }
  function placeScroll() {
    var on = dlg.classList.contains('is-zoomed');
    scroller.scrollTop = on ? 430 : 0; scroller.scrollLeft = on ? 1080 : 0;
  }
  img.addEventListener('load', placeScroll);
  function show(i) {
    idx = (i + items.length) % items.length;
    var t = items[idx], zoomable = t.hasAttribute('data-zoom');
    img.src = t.getAttribute('data-full');
    img.alt = t.querySelector('img').alt;
    cap.textContent = t.getAttribute('data-cap') + (items.length > 1 ? ' (' + (idx + 1) + ' of ' + items.length + ')' : '');
    zoomBtn.hidden = !zoomable;
    dlg.classList.toggle('is-plan', zoomable);
    setZoom(zoomable && window.innerWidth < 760);
  }
  function open(t) {
    opener = t;
    var g = t.closest('[data-group]');
    items = all.filter(function (x) { return x.closest('[data-group]') === g; });
    prev.hidden = next.hidden = items.length < 2;
    show(items.indexOf(t));
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
  function close() {
    if (dlg.close) { dlg.close(); } else { dlg.removeAttribute('open'); }
    if (opener) { opener.focus(); }
  }
  all.forEach(function (t) { t.addEventListener('click', function () { open(t); }); });
  document.getElementById('lbClose').addEventListener('click', close);
  prev.addEventListener('click', function () { show(idx - 1); });
  next.addEventListener('click', function () { show(idx + 1); });
  zoomBtn.addEventListener('click', function () { setZoom(!dlg.classList.contains('is-zoomed')); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) { close(); } });
  dlg.addEventListener('keydown', function (e) {
    if (items.length > 1 && e.key === 'ArrowLeft') { show(idx - 1); }
    if (items.length > 1 && e.key === 'ArrowRight') { show(idx + 1); }
  });
})();
