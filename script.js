(function () {
  var dlg = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.thumb'));
  var idx = 0, opener = null;

  function show(i) {
    idx = (i + thumbs.length) % thumbs.length;
    var t = thumbs[idx];
    img.src = t.getAttribute('data-full');
    img.alt = t.querySelector('img').alt;
    cap.textContent = t.getAttribute('data-cap') + ' (' + (idx + 1) + ' of ' + thumbs.length + ')';
  }
  function open(i) {
    opener = thumbs[i];
    show(i);
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
  function close() {
    if (dlg.close) { dlg.close(); } else { dlg.removeAttribute('open'); }
    if (opener) { opener.focus(); }
  }
  thumbs.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(idx + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) { close(); } });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { show(idx - 1); }
    if (e.key === 'ArrowRight') { show(idx + 1); }
  });
})();
