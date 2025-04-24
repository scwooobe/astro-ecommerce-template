let lastScrollY = window.scrollY;
let lastDirection = null;
let ticking = false;

/**
 * Detect scroll direction and trigger callbacks with optional threshold
 * @param {Object} options
 * @param {Function} options.onScrollUp - Callback for scroll up
 * @param {Function} options.onScrollDown - Callback for scroll down
 * @param {number} [options.threshold=0] - Minimum scroll difference to trigger
 */
export function handleScroll({ onScrollUp, onScrollDown, threshold = 0 } = {}) {
  function onScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // Only proceed if movement is beyond threshold
    if (Math.abs(scrollDelta) > threshold) {
      const direction = scrollDelta > 0 ? 'down' : 'up';

      if (direction !== lastDirection) {
        if (direction === 'down' && typeof onScrollDown === 'function') {
          onScrollDown();
        } else if (direction === 'up' && typeof onScrollUp === 'function') {
          onScrollUp();
        }
        lastDirection = direction;
      }

      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
}
