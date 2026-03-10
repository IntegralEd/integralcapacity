/**
 * Popout Frame Component — Integral Themes
 *
 * Provides three modal systems for microsites:
 *   PopoutFrame  — generic iframe overlay (Storyline, external content)
 *   VideoModal   — YouTube/Vimeo with autoplay + stop-on-close
 *   PdfGallery   — page-by-page PDF viewer with slide animation and zoom
 *
 * Load before </body>, after popout-frame.css.
 * PDF.js is auto-loaded from CDN on first PdfGallery.open() call.
 *
 * Usage examples:
 *
 *   <!-- Generic (Storyline, etc.) with action bar (close + fullscreen) -->
 *   <button onclick="PopoutFrame.open('sl-modal')">Launch Module</button>
 *   <div id="sl-modal" class="popout-frame popout-storyline">
 *     <div class="popout-inner">
 *       <div class="popout-actions">
 *         <button class="popout-fullscreen" onclick="toggleModalFullscreen('sl-modal')" aria-label="Toggle fullscreen">
 *           <svg class="icon-expand" width="14" height="14" viewBox="0 0 16 16" fill="none"
 *             stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
 *             <polyline points="1,5 1,1 5,1"/><polyline points="11,1 15,1 15,5"/>
 *             <polyline points="15,11 15,15 11,15"/><polyline points="5,15 1,15 1,11"/>
 *           </svg>
 *           <svg class="icon-compress" width="14" height="14" viewBox="0 0 16 16" fill="none"
 *             stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
 *             <polyline points="5,1 5,5 1,5"/><polyline points="15,5 11,5 11,1"/>
 *             <polyline points="11,15 11,11 15,11"/><polyline points="1,11 5,11 5,15"/>
 *           </svg>
 *         </button>
 *         <button class="popout-close" onclick="PopoutFrame.close('sl-modal')" aria-label="Close">&#10005;</button>
 *       </div>
 *       <iframe src="https://..." title="Module"></iframe>
 *     </div>
 *   </div>
 *
 *   <!-- Video -->
 *   <button onclick="openVideoModal('vid', 'https://www.youtube.com/embed/ID')">Play</button>
 *   <div id="vid" class="popout-frame popout-video">
 *     <div class="popout-inner">
 *       <button class="popout-close" onclick="closeVideoModal('vid')">&#10005;</button>
 *       <iframe data-video-src src="" title="Video" allow="autoplay" allowfullscreen></iframe>
 *     </div>
 *   </div>
 *
 *   <!-- PDF Gallery -->
 *   <button onclick="PdfGallery.open('path/to/file.pdf')">View PDF</button>
 *   <div id="pdf-modal" class="popout-frame" data-pdf-src="path/to/file.pdf">
 *     <div class="popout-inner">
 *       <button class="popout-close" onclick="PdfGallery.close()">&#10005;</button>
 *       <div class="pdf-viewer">
 *         <div class="pdf-stage" id="pdfStage">
 *           <div class="pdf-canvas-wrap" id="pdfWrapA"><canvas id="pdfCanvasA"></canvas></div>
 *           <div class="pdf-canvas-wrap" id="pdfWrapB"><canvas id="pdfCanvasB"></canvas></div>
 *         </div>
 *         <div class="pdf-controls">
 *           <div class="pdf-controls-spacer"></div>
 *           <div class="pdf-controls-nav">
 *             <button class="pdf-nav-btn" id="pdfPrev" onclick="PdfGallery.prev()" disabled>&#8592;</button>
 *             <span class="pdf-page-info" id="pdfPageInfo">&#8212; / &#8212;</span>
 *             <button class="pdf-nav-btn" id="pdfNext" onclick="PdfGallery.next()" disabled>&#8594;</button>
 *           </div>
 *           <div class="pdf-controls-actions">
 *             <button class="pdf-zoom-btn" id="pdfZoom" onclick="PdfGallery.toggleZoom()">
 *               <svg class="icon-expand" width="14" height="14" viewBox="0 0 16 16" fill="none"
 *                 stroke="currentColor" stroke-width="1.9" stroke-linecap="round"
 *                 stroke-linejoin="round" aria-hidden="true">
 *                 <polyline points="1,5 1,1 5,1"/><polyline points="11,1 15,1 15,5"/>
 *                 <polyline points="15,11 15,15 11,15"/><polyline points="5,15 1,15 1,11"/>
 *               </svg>
 *               <svg class="icon-compress" width="14" height="14" viewBox="0 0 16 16" fill="none"
 *                 stroke="currentColor" stroke-width="1.9" stroke-linecap="round"
 *                 stroke-linejoin="round" aria-hidden="true" style="display:none">
 *                 <polyline points="5,1 5,5 1,5"/><polyline points="15,5 11,5 11,1"/>
 *                 <polyline points="11,15 11,11 15,11"/><polyline points="1,11 5,11 5,15"/>
 *               </svg>
 *               <span class="pdf-zoom-label">Expand</span>
 *             </button>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 */

(function (global) {
  'use strict';

  // ── Generic Popout Frame ───────────────────────────────────────────────────

  var PopoutFrame = {
    open: function (id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    close: function (id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ── Video Modal ────────────────────────────────────────────────────────────

  function stopVideoInModal(modal) {
    var iframe = modal.querySelector('iframe[data-video-src]');
    if (iframe) iframe.src = '';
  }

  function openVideoModal(id, src) {
    var modal = document.getElementById(id);
    if (!modal) return;
    var iframe = modal.querySelector('iframe[data-video-src]');
    if (iframe) iframe.src = src + '?autoplay=1&rel=0';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    stopVideoInModal(modal);
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── PDF Gallery ────────────────────────────────────────────────────────────

  var PdfGallery = (function () {
    var PDFJS_CDN  = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    var WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    var pdf        = null;
    var current    = 1;
    var total      = 0;
    var activeWrap = 'A';
    var busy       = false;
    var zoomMode   = false;

    function wrap(id)   { return document.getElementById('pdfWrap'   + id); }
    function canvas(id) { return document.getElementById('pdfCanvas' + id); }

    function loadPdfjsIfNeeded() {
      return new Promise(function (resolve, reject) {
        if (window.pdfjsLib) { resolve(); return; }
        var s = document.createElement('script');
        s.src = PDFJS_CDN;
        s.onload = resolve;
        s.onerror = function () { reject(new Error('[PdfGallery] Failed to load PDF.js')); };
        document.head.appendChild(s);
      });
    }

    async function renderToWrap(pageNum, wrapId) {
      var page  = await pdf.getPage(pageNum);
      var stage = document.getElementById('pdfStage');
      var pad   = 24;
      var availW = stage.clientWidth  - pad * 2;
      var availH = stage.clientHeight - pad * 2;

      var vp1   = page.getViewport({ scale: 1 });
      var scale = zoomMode
        ? availW / vp1.width
        : Math.min(availW / vp1.width, availH / vp1.height);
      var dpr      = window.devicePixelRatio || 1;
      var viewport = page.getViewport({ scale: scale * dpr });

      var c = canvas(wrapId);
      c.width  = viewport.width;
      c.height = viewport.height;
      c.style.width  = (viewport.width  / dpr) + 'px';
      c.style.height = (viewport.height / dpr) + 'px';

      await page.render({ canvasContext: c.getContext('2d'), viewport: viewport }).promise;
    }

    function slide(wrapId, x, animate) {
      var el = wrap(wrapId);
      el.style.transition = animate
        ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)'
        : 'none';
      el.style.transform = 'translateX(' + x + ')';
    }

    async function goToPage(n, direction) {
      if (busy || n < 1 || n > total) return;
      busy = true;

      if (zoomMode) {
        var activeEl = wrap(activeWrap);
        activeEl.style.transition = 'opacity 0.18s ease';
        activeEl.style.opacity = '0';
        await new Promise(function (r) { setTimeout(r, 200); });
        await renderToWrap(n, activeWrap);
        document.getElementById('pdfStage').scrollTop = 0;
        activeEl.style.opacity = '1';
        await new Promise(function (r) { setTimeout(r, 200); });
      } else {
        var incoming = activeWrap === 'A' ? 'B' : 'A';
        var startX   = direction === 'forward' ? '100%' : '-100%';
        var exitX    = direction === 'forward' ? '-100%' : '100%';
        slide(incoming, startX, false);
        await renderToWrap(n, incoming);
        wrap(incoming).getBoundingClientRect(); // force paint before animating
        slide(activeWrap, exitX, true);
        slide(incoming, '0%', true);
        await new Promise(function (r) { setTimeout(r, 430); });
        activeWrap = incoming;
      }

      current = n;
      updateControls();
      busy = false;
    }

    function updateZoomButton() {
      var btn = document.getElementById('pdfZoom');
      if (!btn) return;
      var iconExpand   = btn.querySelector('.icon-expand');
      var iconCompress = btn.querySelector('.icon-compress');
      var label        = btn.querySelector('.pdf-zoom-label');
      if (iconExpand)   iconExpand.style.display   = zoomMode ? 'none' : '';
      if (iconCompress) iconCompress.style.display = zoomMode ? ''     : 'none';
      if (label)        label.textContent           = zoomMode ? 'Fit' : 'Expand';
      btn.setAttribute('aria-label', zoomMode ? 'Fit page to screen' : 'Expand page to full width');
    }

    function updateControls() {
      var info = document.getElementById('pdfPageInfo');
      var prev = document.getElementById('pdfPrev');
      var next = document.getElementById('pdfNext');
      if (info) info.textContent = current + ' / ' + total;
      if (prev) prev.disabled   = current <= 1;
      if (next) next.disabled   = current >= total;
      updateZoomButton();
    }

    return {
      open: async function (url) {
        var modal = document.getElementById('pdf-modal');
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (!pdf) {
          var resolvedUrl = url || modal.dataset.pdfSrc || null;
          if (!resolvedUrl) { console.error('[PdfGallery] No PDF URL — pass a URL or set data-pdf-src on #pdf-modal'); return; }

          var info = document.getElementById('pdfPageInfo');
          if (info) info.textContent = 'Loading\u2026';

          await loadPdfjsIfNeeded();
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_CDN;
          pdf    = await window.pdfjsLib.getDocument(resolvedUrl).promise;
          total  = pdf.numPages;
          current    = 1;
          activeWrap = 'A';
          slide('B', '100%', false);
        }

        await renderToWrap(current, activeWrap);
        updateControls();
      },

      close: function () {
        var modal = document.getElementById('pdf-modal');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      },

      toggleZoom: async function () {
        if (busy) return;
        zoomMode = !zoomMode;

        var stage      = document.getElementById('pdfStage');
        var inactiveId = activeWrap === 'A' ? 'B' : 'A';
        var inactiveEl = wrap(inactiveId);
        var activeEl   = wrap(activeWrap);

        stage.classList.toggle('pdf-zoomed', zoomMode);

        if (zoomMode) {
          inactiveEl.style.display   = 'none';
          activeEl.style.transition  = 'none';
          activeEl.style.position    = 'relative';
          activeEl.style.inset       = 'auto';
          activeEl.style.transform   = 'none';
        } else {
          inactiveEl.style.display  = '';
          activeEl.style.position   = '';
          activeEl.style.inset      = '';
          activeEl.style.transition = 'none';
          slide(activeWrap, '0%',   false);
          slide(inactiveId, '100%', false);
          stage.scrollTop = 0;
        }

        await renderToWrap(current, activeWrap);
        updateZoomButton();
      },

      next: function () { goToPage(current + 1, 'forward');  },
      prev: function () { goToPage(current - 1, 'backward'); }
    };
  })();

  // ── Fullscreen Toggle ──────────────────────────────────────────────────────

  function toggleModalFullscreen(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    var inner = modal.querySelector('.popout-inner');
    var btn   = modal.querySelector('.popout-fullscreen');
    if (!document.fullscreenElement) {
      inner.requestFullscreen().then(function () {
        if (btn) btn.classList.add('is-fullscreen');
      }).catch(function () {});
    } else {
      document.exitFullscreen();
    }
  }

  // Sync fullscreen button state when user exits via Escape or browser controls
  document.addEventListener('fullscreenchange', function () {
    document.querySelectorAll('.popout-fullscreen').forEach(function (btn) {
      btn.classList.toggle('is-fullscreen', !!document.fullscreenElement);
    });
  });

  // ── Global close handlers ──────────────────────────────────────────────────

  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('popout-frame')) return;
    if (e.target.classList.contains('popout-video')) {
      closeVideoModal(e.target.id);
    } else if (e.target.id === 'pdf-modal') {
      PdfGallery.close();
    } else {
      PopoutFrame.close(e.target.id);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.popout-frame.active').forEach(function (m) {
        if (m.classList.contains('popout-video')) {
          stopVideoInModal(m);
          m.classList.remove('active');
        } else if (m.id === 'pdf-modal') {
          PdfGallery.close();
        } else {
          PopoutFrame.close(m.id);
        }
      });
      document.body.style.overflow = '';
    }

    var pdfModal = document.getElementById('pdf-modal');
    if (pdfModal && pdfModal.classList.contains('active')) {
      if (e.key === 'ArrowRight') PdfGallery.next();
      if (e.key === 'ArrowLeft')  PdfGallery.prev();
    }
  });

  // ── Exports ────────────────────────────────────────────────────────────────

  global.PopoutFrame            = PopoutFrame;
  global.openVideoModal         = openVideoModal;
  global.closeVideoModal        = closeVideoModal;
  global.toggleModalFullscreen  = toggleModalFullscreen;
  global.PdfGallery             = PdfGallery;

})(window);
