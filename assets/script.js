// Hamburger toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  const update = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  };
  let isOpen = false;
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    update(isOpen);
  });
  // Close when clicking a link
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('a')) {
      isOpen = false;
      update(isOpen);
    }
  });
}

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

// Gallery lightbox
(function(){
  const items = Array.from(document.querySelectorAll('.gallery .work-link'));
  if (!items.length) return;

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const lbClose = lb?.querySelector('.lightbox-close');
  let idx = -1;

  const open = (i) => {
    const el = items[i];
    if (!el || !lb || !lbImg || !lbCap) return;
    idx = i;
    const src = el.getAttribute('data-img');
    const caption = el.getAttribute('data-caption') || '';
    lbImg.src = src || '';
    lbImg.alt = caption || 'ギャラリー画像';
    lbCap.textContent = caption;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.focus();
  };
  const close = () => {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    idx = -1;
  };

  items.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  lbClose?.addEventListener('click', close);
  lb?.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });
  document.addEventListener('keydown', (e) => {
    if (lb && !lb.hidden && e.key === 'Escape') close();
  });
})();
