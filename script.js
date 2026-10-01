(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const replaceablePhotos = [...document.querySelectorAll('.replaceable-photo')];
  const gallery = document.querySelector('[data-gallery]');
  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  const lightboxCounter = document.querySelector('[data-lightbox-counter]');
  const closeButtons = [...document.querySelectorAll('[data-lightbox-close]')];
  const previousButton = document.querySelector('[data-lightbox-prev]');
  const nextButton = document.querySelector('[data-lightbox-next]');
  let visibleItems = [...galleryItems];
  let activeIndex = 0;
  let lastFocusedElement = null;

  const normalizePath = (value) => value.replace(/^\/+/, '');

  const hydratePhoto = (image) => {
    const source = image.dataset.src;
    if (!source) return;
    const preload = new Image();
    preload.onload = () => {
      image.src = source;
      image.dataset.loaded = 'true';
      const label = image.parentElement?.querySelector('.photo-slot-label');
      if (label) label.hidden = true;
    };
    preload.onerror = () => {
      image.dataset.loaded = 'false';
    };
    preload.src = source;
  };

  replaceablePhotos.forEach(hydratePhoto);

  const closeMenu = () => {
    if (!siteNav || !menuToggle) return;
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  siteNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });

  const refreshVisibleItems = (category = 'all') => {
    visibleItems = galleryItems.filter((item) => category === 'all' || item.dataset.category === category);
    galleryItems.forEach((item) => {
      item.classList.toggle('is-hidden', !visibleItems.includes(item));
      item.setAttribute('aria-hidden', String(!visibleItems.includes(item)));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
      refreshVisibleItems(button.dataset.filter);
    });
  });

  const currentSource = (item) => {
    const image = item.querySelector('img');
    return image?.dataset.loaded === 'true' ? item.dataset.src : (item.dataset.placeholder || image?.src);
  };

  const updateLightbox = () => {
    const item = visibleItems[activeIndex];
    if (!item || !lightboxImage) return;
    lightboxImage.src = currentSource(item);
    lightboxImage.alt = item.querySelector('img')?.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || '';
    if (lightboxCounter) lightboxCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(visibleItems.length).padStart(2, '0')}`;
  };

  const openLightbox = (item) => {
    if (!lightbox || !visibleItems.length) return;
    lastFocusedElement = document.activeElement;
    activeIndex = Math.max(0, visibleItems.indexOf(item));
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    document.querySelector('.lightbox-close')?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    lastFocusedElement?.focus?.();
  };

  const moveLightbox = (step) => {
    if (!visibleItems.length) return;
    activeIndex = (activeIndex + step + visibleItems.length) % visibleItems.length;
    updateLightbox();
  };

  gallery?.addEventListener('click', (event) => {
    const item = event.target.closest('.gallery-item');
    if (item && !item.classList.contains('is-hidden')) openLightbox(item);
  });

  closeButtons.forEach((button) => button.addEventListener('click', closeLightbox));
  previousButton?.addEventListener('click', () => moveLightbox(-1));
  nextButton?.addEventListener('click', () => moveLightbox(1));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
    if (!lightbox?.classList.contains('is-open')) return;
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  // Keep placeholder filenames inspectable in the DOM and avoid accidental internal booking flows.
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  // A small safety net for adding photos into public/images after the initial page load.
  window.NaeveStay = {
    refreshPhotos: () => replaceablePhotos.forEach(hydratePhoto),
    imagePath: (filename) => normalizePath(`images/${filename}`),
  };
})();
