// ===== CONFIG =====
const ENABLE_PARALLAX = true;
const ENABLE_MAGNETIC_HOVER = true;

// ===== SELECT ELEMENTS =====
const bg = document.querySelector(".bg-layer");
const bubbles = document.querySelectorAll(".bubble");

// detect mobile / touch
const isTouch =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== MOUSE VARIABLES =====
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// background movement
let currentBgX = 0;
let currentBgY = 0;
let targetBgX = 0;
let targetBgY = 0;

// ===== HELPER =====
function resetBubbleState(bubble) {
  bubble.style.setProperty("--push-x", `0px`);
  bubble.style.setProperty("--push-y", `0px`);
  bubble.style.setProperty("--scale", `1`);
}

// ===== DESKTOP EFFECTS ONLY =====
if (!isTouch && !prefersReducedMotion) {
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // background parallax
    if (ENABLE_PARALLAX && bg) {
      const xPercent = (mouseX / window.innerWidth - 0.5) * 2;
      const yPercent = (mouseY / window.innerHeight - 0.5) * 2;

      targetBgX = xPercent * -18;
      targetBgY = yPercent * -14;
    }

    // bubble gloss tracking
    bubbles.forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();
      const localX = ((mouseX - rect.left) / rect.width) * 100;
      const localY = ((mouseY - rect.top) / rect.height) * 100;

      bubble.style.setProperty("--mx", `${localX}%`);
      bubble.style.setProperty("--my", `${localY}%`);
    });
  });

  // magnetic hover + neighbor push
  bubbles.forEach((bubble, i) => {
    bubble.addEventListener("mousemove", (e) => {
      if (!ENABLE_MAGNETIC_HOVER) return;

      const rect = bubble.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // magnetic pull (kept subtle)
      const magneticX = offsetX * 0.10;
      const magneticY = offsetY * 0.10;

      bubble.style.setProperty("--push-x", `${magneticX}px`);
      bubble.style.setProperty("--push-y", `${magneticY}px`);
      bubble.style.setProperty("--scale", `1.06`);

      // nearby bubbles move away slightly
      bubbles.forEach((other, j) => {
        if (other === bubble) return;

        const distance = Math.abs(j - i);
        const direction = j < i ? -1 : 1;

        let pushX = 0;
        let pushY = 0;
        let scale = 1;

        if (distance === 1) {
          pushX = direction * 8;
          pushY = 4;
          scale = 0.97;
        } else if (distance === 2) {
          pushX = direction * 4;
          pushY = 2;
          scale = 0.985;
        }

        other.style.setProperty("--push-x", `${pushX}px`);
        other.style.setProperty("--push-y", `${pushY}px`);
        other.style.setProperty("--scale", `${scale}`);
      });
    });

    bubble.addEventListener("mouseenter", () => {
      bubble.style.willChange = "transform";
    });

    bubble.addEventListener("mouseleave", () => {
      bubble.style.willChange = "auto";

      bubbles.forEach((other) => {
        resetBubbleState(other);
      });
    });
  });
}

// ===== ANIMATE BACKGROUND =====
function animateBackground() {
  if (bg && !isTouch && !prefersReducedMotion) {
    currentBgX += (targetBgX - currentBgX) * 0.06;
    currentBgY += (targetBgY - currentBgY) * 0.06;

    bg.style.transform = `translate3d(${currentBgX}px, ${currentBgY}px, 0) scale(1.08)`;
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();

// ===== MOBILE / REDUCED MOTION FALLBACK =====
if (isTouch || prefersReducedMotion) {
  if (bg) {
    bg.style.transform = "translate3d(0,0,0) scale(1.05)";
  }

  bubbles.forEach((bubble) => {
    resetBubbleState(bubble);
  });
}
