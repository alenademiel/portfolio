/* ==========================================================================
   Поведение сайта. Тексты и список работ здесь не хранятся:
   тексты — в index.html, работы — в data.js.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Шапка: фон появляется после начала прокрутки ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Мобильное меню ---------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Закрыть' : 'Меню';
  }
  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------- Заглушка вместо фотографии, которой ещё нет ---------- */
  function showPlaceholder(frame) {
    if (frame.classList.contains('is-empty')) return;
    frame.classList.add('is-empty');
    var note = document.createElement('div');
    note.className = 'frame__note';
    var label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'Место для фото';
    var path = document.createElement('code');
    path.textContent = frame.dataset.src || '';
    note.appendChild(label);
    note.appendChild(path);
    if (frame.dataset.hint) {
      var hint = document.createElement('small');
      hint.textContent = frame.dataset.hint;
      note.appendChild(hint);
    }
    frame.appendChild(note);
  }
  function watchFrame(frame) {
    var img = frame.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) showPlaceholder(frame);
    img.addEventListener('error', function () { showPlaceholder(frame); });
  }
  document.querySelectorAll('.frame').forEach(watchFrame);
  window.portfolioWatchFrame = watchFrame;   // пригодится галерее

  /* ---------- Мягкое появление элементов ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    window.portfolioReveal = function (el) { io.observe(el); };
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    window.portfolioReveal = function (el) { el.classList.add('is-visible'); };
  }

  /* ---------- Подсветка текущего раздела в меню ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Год в подвале ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

/* ==========================================================================
   ПОРТФОЛИО: фильтры, сетка работ и полноэкранный просмотр.
   Всё строится из списка в data.js.
   ========================================================================== */
(function () {
  'use strict';

  var data = window.PORTFOLIO;
  var gallery = document.getElementById('gallery');
  var filters = document.getElementById('filters');
  var emptyNote = document.getElementById('galleryEmpty');
  if (!data || !gallery || !filters) return;

  var categories = data.categories || [];
  var photos = (data.works || []).filter(function (w) { return w.type !== 'video'; });
  var showAll = data.showAll === true;   // общий раздел «Все работы» включается в data.js
  var current = (showAll || !categories.length) ? 'all' : categories[0].id;
  var visible = [];      // работы, показанные сейчас (с учётом фильтра)

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function categoryLabel(id) {
    for (var i = 0; i < categories.length; i++) if (categories[i].id === id) return categories[i].label;
    return '';
  }
  function metaLine(work) {
    return [categoryLabel(work.category), work.project, work.year].filter(Boolean).join(' · ');
  }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Кнопки фильтра ---------- */
  function buildFilters() {
    var list = (showAll ? [{ id: 'all', label: 'Все работы' }] : []).concat(categories);
    list.forEach(function (cat) {
      var count = cat.id === 'all'
        ? photos.length
        : photos.filter(function (w) { return w.category === cat.id; }).length;
      var btn = el('button', null, cat.label);
      btn.type = 'button';
      btn.dataset.filter = cat.id;
      btn.setAttribute('aria-pressed', String(cat.id === current));
      btn.appendChild(el('sup', null, pad(count)));
      filters.appendChild(btn);
    });
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn || btn.dataset.filter === current) return;
      current = btn.dataset.filter;
      Array.prototype.forEach.call(filters.children, function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      gallery.classList.add('is-switching');
      setTimeout(function () {
        render(false);
        gallery.classList.remove('is-switching');
      }, 300);
    });
  }

  /* ---------- Карточка работы ---------- */
  function buildCard(work, index, animate) {
    var card = el('article', 'work' + (work.featured ? ' work--featured' : ''));

    var open = el('button', 'work__open');
    open.type = 'button';
    open.setAttribute('aria-label', 'Открыть работу: ' + (work.title || 'фото ' + (index + 1)));
    open.addEventListener('click', function () { openLightbox(index, open); });

    var frame = el('span', 'frame');
    frame.dataset.src = work.src;
    if (work.ratio) frame.style.setProperty('--ratio', String(work.ratio).replace(':', ' / '));

    var img = document.createElement('img');
    img.alt = work.alt || work.title || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    function useRealRatio() {
      if (img.naturalWidth) frame.style.setProperty('--ratio', img.naturalWidth + ' / ' + img.naturalHeight);
    }
    img.addEventListener('load', useRealRatio);
    img.src = work.src;
    frame.appendChild(img);
    if (img.complete) useRealRatio();
    window.portfolioWatchFrame(frame);

    open.appendChild(frame);
    card.appendChild(open);

    if (animate) {
      card.classList.add('reveal');
      window.portfolioReveal(card);
    }
    return card;
  }

  /* Показываем работы порциями: первые perPage, дальше — по кнопке «Показать ещё» */
  var perPage = data.perPage || 24;
  var shown = 0;
  var moreBtn = document.getElementById('galleryMore');

  function showMore(animate) {
    var next = visible.slice(shown, shown + perPage);
    next.forEach(function (work, i) { gallery.appendChild(buildCard(work, shown + i, animate)); });
    shown += next.length;
    if (moreBtn) moreBtn.hidden = shown >= visible.length;
  }
  function render(animate) {
    visible = photos.filter(function (w) { return current === 'all' || w.category === current; });
    gallery.textContent = '';
    shown = 0;
    showMore(animate);
    if (emptyNote) emptyNote.hidden = visible.length > 0;
  }
  if (moreBtn) moreBtn.addEventListener('click', function () { showMore(true); });

  /* ---------- Полноэкранный просмотр ---------- */
  var lb = document.getElementById('lightbox');
  var lbImage = document.getElementById('lbImage');
  var lbMissing = document.getElementById('lbMissing');
  var lbTitle = document.getElementById('lbTitle');
  var lbMeta = document.getElementById('lbMeta');
  var lbDesc = document.getElementById('lbDesc');
  var lbCounter = document.getElementById('lbCounter');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var lbIndex = 0;
  var lbReturnFocus = null;

  function showWork(index) {
    lbIndex = (index + visible.length) % visible.length;
    var work = visible[lbIndex];
    lbMissing.hidden = true;
    lbImage.hidden = false;
    lbImage.classList.add('is-loading');
    lbImage.alt = work.alt || work.title || '';
    lbImage.src = work.src;
    lbTitle.textContent = work.title || '';
    lbMeta.textContent = metaLine(work);
    lbDesc.textContent = work.description || '';
    lbCounter.textContent = pad(lbIndex + 1) + ' / ' + pad(visible.length);
    lbPrev.hidden = lbNext.hidden = visible.length < 2;
  }
  lbImage.addEventListener('load', function () { lbImage.classList.remove('is-loading'); });
  lbImage.addEventListener('error', function () {
    if (!lb.classList.contains('is-open')) return;
    lbImage.hidden = true;
    lbMissing.hidden = false;
    lbMissing.textContent = 'Файл пока не добавлен: ' + visible[lbIndex].src;
  });

  function openLightbox(index, trigger) {
    lbReturnFocus = trigger || null;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    showWork(index);
    lbClose.focus();
    setTimeout(function () { lbClose.focus(); }, 60);   // на случай, если окно ещё не успело показаться
  }
  function closeLightbox() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (lbReturnFocus) lbReturnFocus.focus();
  }

  if (lb) {
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { showWork(lbIndex - 1); });
    lbNext.addEventListener('click', function () { showWork(lbIndex + 1); });
    document.getElementById('lbStage').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeLightbox();   // клик мимо фотографии
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showWork(lbIndex - 1);
      else if (e.key === 'ArrowRight') showWork(lbIndex + 1);
      else if (e.key === 'Tab') {
        // фокус не уходит за пределы окна просмотра
        var items = [lbClose, lbPrev, lbNext].filter(function (b) { return !b.hidden; });
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });

    // листание пальцем на телефоне
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50 && visible.length > 1) showWork(lbIndex + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  buildFilters();
  render(true);
})();

/* ==========================================================================
   ВИДЕО: плееры собираются из записей data.js с type: 'video'.
   ========================================================================== */
(function () {
  'use strict';

  var data = window.PORTFOLIO;
  var box = document.getElementById('videos');
  if (!data || !box) return;

  var videos = (data.works || []).filter(function (w) { return w.type === 'video'; });
  var players = [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  videos.forEach(function (work) {
    var item = el('article', 'video reveal');
    var frame = el('div', 'frame video__frame');
    if (work.ratio) {
      var parts = String(work.ratio).split(':');
      frame.style.setProperty('--ratio', parts[0] + ' / ' + parts[1]);
      frame.style.setProperty('--r', String(parts[0] / parts[1]));
    }

    var video = document.createElement('video');
    video.preload = 'metadata';
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    // обложка; если её файла нет — показываем первый кадр ролика
    function showFirstFrame() {
      video.removeAttribute('poster');
      if (video.readyState >= 1) video.currentTime = 0.1;
      else video.addEventListener('loadedmetadata', function () { video.currentTime = 0.1; }, { once: true });
    }
    if (work.poster) {
      video.poster = work.poster;
      var probe = new Image();
      probe.onerror = showFirstFrame;
      probe.src = work.poster;
    } else {
      showFirstFrame();
    }
    video.setAttribute('aria-label', work.title || 'Видео');

    var play = el('button', 'video__play');
    play.type = 'button';
    play.setAttribute('aria-label', 'Смотреть видео: ' + (work.title || ''));
    play.appendChild(el('span', null, 'Смотреть'));

    // настоящие пропорции ролика (в том числе вертикального)
    video.addEventListener('loadedmetadata', function () {
      if (!video.videoWidth) return;
      frame.style.setProperty('--ratio', video.videoWidth + ' / ' + video.videoHeight);
      frame.style.setProperty('--r', String(video.videoWidth / video.videoHeight));
    });

    // файла пока нет — показываем аккуратную заглушку
    video.addEventListener('error', function () {
      if (frame.classList.contains('is-empty')) return;
      frame.classList.add('is-empty');
      var note = el('div', 'frame__note');
      note.appendChild(el('span', 'label', 'Место для видео'));
      note.appendChild(el('code', null, work.src));
      if (work.poster) note.appendChild(el('small', null, 'обложка: ' + work.poster));
      frame.appendChild(note);
    });

    play.addEventListener('click', function () {
      play.hidden = true;
      video.controls = true;
      video.play();
      video.focus();
    });
    // одновременно играет только одно видео
    video.addEventListener('play', function () {
      players.forEach(function (other) { if (other !== video) other.pause(); });
    });

    video.src = work.src;
    players.push(video);
    frame.appendChild(video);
    frame.appendChild(play);
    item.appendChild(frame);

    var info = el('div', 'video__info');
    if (work.title) info.appendChild(el('h3', 'video__title', work.title));
    var meta = [work.project, work.year].filter(Boolean).join(' · ');
    if (meta) info.appendChild(el('p', 'label', meta));
    info.appendChild(el('p', 'video__desc', work.description || ''));
    item.appendChild(info);

    box.appendChild(item);
    window.portfolioReveal(item);
  });
})();
