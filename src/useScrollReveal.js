import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/**
 * Resolves the nearest scrollable ancestor (such as Dashboard's <main>)
 * so IntersectionObserver triggers relative to the actual scrollport.
 */
export function findScrollRoot(node) {
  let parent = node ? node.parentElement : null;
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(parent);
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

/**
 * Lightweight IntersectionObserver hook for radial charts, wave chains,
 * and SVG stroke-draw paths so they activate dynamically on scroll.
 */
export function useScrollInView({
  threshold = 0.2,
  rootMargin = '0px 0px -24px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && inView)) return undefined;

    const root = findScrollRoot(el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const passedAbove =
            entry.rootBounds != null &&
            entry.boundingClientRect.bottom <= entry.rootBounds.top;
          if (entry.isIntersecting || passedAbove) {
            setInView(true);
            if (once) {
              observer.disconnect();
              return;
            }
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { root, threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, inView]);

  return [ref, inView];
}

function isExcludedNode(el) {
  if (!(el instanceof HTMLElement)) return true;
  if (el.dataset.accordionDetail === 'true') return true;
  if (el.classList.contains('fixed') || el.classList.contains('animate-in') || el.classList.contains('animate-fade-in-up')) {
    return true;
  }
  if (el.closest('.fixed, [role="dialog"], [aria-modal="true"], .snap-x')) {
    return true;
  }
  return false;
}

function hasCardSurface(el) {
  const cls = typeof el.className === 'string' ? el.className : '';
  return (
    cls.includes('suelvo-hover-card') ||
    cls.includes('bg-white') ||
    cls.includes('bg-[#') ||
    cls.includes('bg-gradient') ||
    cls.includes('shadow')
  );
}

function isPureLayoutWrapper(el, viewRoot) {
  if (el === viewRoot) return true;
  const cls = typeof el.className === 'string' ? el.className : '';
  if (cls.includes('suelvo-stagger-grid')) return true;
  if (cls.includes('suelvo-hover-card') || hasCardSurface(el)) return false;

  // Keep top page/section header strips (containing <h1> + action buttons) as a single cohesive unit
  if (el.querySelector(':scope > h1, :scope > div > h1') && !el.querySelector(':scope > .suelvo-stagger-grid')) {
    return false;
  }

  if (el.querySelector(':scope > .suelvo-stagger-grid, :scope > .suelvo-hover-card')) {
    return true;
  }

  if (cls.includes('grid') || cls.includes('space-y-')) {
    return Boolean(el.querySelector('.suelvo-hover-card, [class*="bg-[#"], [class*="bg-white"], [class*="rounded-2xl"], [class*="rounded-xl"], table'));
  }

  return false;
}

function collectRevealTargets(stageEl) {
  const viewRoot = stageEl.firstElementChild;
  if (!viewRoot) return [];

  const revealSet = new Set();

  const walk = (container) => {
    const children = Array.from(container.children);
    for (const child of children) {
      if (isExcludedNode(child)) continue;

      if (isPureLayoutWrapper(child, viewRoot)) {
        walk(child);
      } else {
        revealSet.add(child);
      }
    }
  };

  walk(viewRoot);

  // Add individual table rows so long tables progressively reveal while scrolling
  const rows = stageEl.querySelectorAll('tbody > tr:not([data-accordion-detail])');
  for (const row of rows) {
    if (!isExcludedNode(row)) {
      revealSet.add(row);
    }
  }

  // Add mobile stacked list cards inside responsive hidden containers
  const mobileContainers = stageEl.querySelectorAll('.md\\:hidden, .lg\\:hidden');
  for (const container of mobileContainers) {
    if (isExcludedNode(container)) continue;
    const listWrap = container.className.includes('space-y-')
      ? container
      : container.querySelector(':scope > .space-y-2\\.5, :scope > .space-y-3, :scope > .space-y-2');
    const cardHost = listWrap || container;
    for (const card of Array.from(cardHost.children)) {
      if (!isExcludedNode(card) && hasCardSurface(card)) {
        revealSet.add(card);
      }
    }
  }

  return Array.from(revealSet);
}

/**
 * Orchestrates scroll-triggered reveals (sections, cards, titles, table rows)
 * and progress-bar draw triggers inside <main> using a single batched IO + MO.
 */
export function useScrollRevealStage(stageRef, stageKey) {
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const scrollRoot = findScrollRoot(stage);
    if (scrollRoot && scrollRoot.scrollTop !== 0) {
      scrollRoot.scrollTop = 0;
    }

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const getRootBottom = () =>
      scrollRoot ? scrollRoot.getBoundingClientRect().bottom : window.innerHeight;

    let initialPass = true;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        let batchIdx = 0;
        for (const entry of entries) {
          const el = entry.target;
          const passedAbove =
            entry.rootBounds != null &&
            entry.boundingClientRect.bottom <= entry.rootBounds.top;

          if (!entry.isIntersecting && !passedAbove) continue;

          revealObserver.unobserve(el);
          if (el.dataset.scrollReveal === 'visible' || el.dataset.scrollReveal === 'done') {
            continue;
          }

          const delay = passedAbove ? 0 : Math.min(batchIdx * 42, 168);
          el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.dataset.scrollReveal = 'visible';
          batchIdx += 1;
        }
      },
      {
        root: scrollRoot,
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const drawObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          const passedAbove =
            entry.rootBounds != null &&
            entry.boundingClientRect.bottom <= entry.rootBounds.top;

          if (!entry.isIntersecting && !passedAbove) continue;

          drawObserver.unobserve(el);
          el.dataset.scrollDraw = 'visible';
        }
      },
      {
        root: scrollRoot,
        threshold: 0.1,
        rootMargin: '0px 0px -12px 0px',
      }
    );

    const scanAndObserve = () => {
      const rootBottom = getRootBottom();
      const rawRevealTargets = collectRevealTargets(stage).filter(
        (el) => !el.dataset.scrollReveal
      );
      const rawDrawTargets = Array.from(
        stage.querySelectorAll('.suelvo-progress-fill, .suelvo-bar-rise')
      ).filter((el) => !el.dataset.scrollDraw && !isExcludedNode(el));

      // Batch geometry reads BEFORE DOM writes to prevent layout thrash
      const revealMeasurements = rawRevealTargets.map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));
      const drawMeasurements = rawDrawTargets.map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));

      let aboveFoldCount = 0;
      for (const { el, rect } of revealMeasurements) {
        const isRendered = rect.width > 0 || rect.height > 0;
        if (!isRendered) continue;

        if (rect.top < rootBottom - 12) {
          const isRow = el.tagName === 'TR';
          const step = isRow ? 34 : 46;
          const base = initialPass ? 0 : 10;
          const delay = Math.min(base + aboveFoldCount * step, isRow ? 220 : 240);
          el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.dataset.scrollReveal = 'visible';
          aboveFoldCount += 1;
        } else {
          el.dataset.scrollReveal = 'pending';
          revealObserver.observe(el);
        }
      }

      for (const { el, rect } of drawMeasurements) {
        const isRendered = rect.width > 0 || rect.height > 0;
        if (!isRendered) continue;

        if (rect.top < rootBottom - 8) {
          el.dataset.scrollDraw = 'visible';
        } else {
          el.dataset.scrollDraw = 'pending';
          drawObserver.observe(el);
        }
      }

      initialPass = false;
    };

    scanAndObserve();

    let pendingRaf = 0;
    const mutationObserver = new MutationObserver(() => {
      if (pendingRaf) return;
      pendingRaf = window.requestAnimationFrame(() => {
        pendingRaf = 0;
        scanAndObserve();
      });
    });

    mutationObserver.observe(stage, { childList: true, subtree: true });

    const handleAnimationEnd = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.dataset.scrollReveal === 'visible' &&
        event.animationName === 'suelvoFadeSlideUp'
      ) {
        target.dataset.scrollReveal = 'done';
        target.style.removeProperty('--reveal-delay');
      }
    };

    stage.addEventListener('animationend', handleAnimationEnd);

    return () => {
      if (pendingRaf) window.cancelAnimationFrame(pendingRaf);
      mutationObserver.disconnect();
      revealObserver.disconnect();
      drawObserver.disconnect();
      stage.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [stageRef, stageKey]);
}
