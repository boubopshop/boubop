const bg = document.querySelector(".bg-layer");
const bubbles = document.querySelectorAll(".bubble");

const isTouchDevice =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!isTouchDevice && !prefersReducedMotion) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentBgX = 0;
  let currentBgY = 0;
  let targetBgX = 0;
  let targetBgY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const xPercent = (mouseX / window.innerWidth - 0.5) * 2;
    const yPercent = (mouseY / window.innerHeight - 0.5) * 2;

    targetBgX = xPercent * -18;
    targetBgY = yPercent * -14;

    bubbles.forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();
      const localX = ((mouseX - rect.left) / rect.width) * 100;
      const localY = ((mouseY - rect.top) / rect.height) * 100;

      bubble.style.setProperty("--mx", `${localX}%`);
      bubble.style.setProperty("--my", `${localY}%`);
    });
  });

  function animateBackground() {
    currentBgX += (targetBgX - currentBgX) * 0.06;
    currentBgY += (targetBgY - currentBgY) * 0.06;

    if (bg) {
      bg.style.transform = `translate3d(${currentBgX}px, ${currentBgY}px, 0) scale(1.08)`;
    }

    requestAnimationFrame(animateBackground);
  }

  animateBackground();

  bubbles.forEach((bubble, i) => {
    bubble.addEventListener("mouseenter", () => {
      bubbles.forEach((other, j) => {
        if (other === bubble) return;

        const distance = Math.abs(j - i);
        const dir = j < i ? -1 : 1;
        const strength = distance === 1 ? 8 : 4;

        other.style.setProperty("--push-x", `${dir * strength}px`);
        other.style.setProperty("--push-y", `${distance === 1 ? 4 : 1}px`);
        other.style.setProperty("--scale", `0.98`);
      });
    });

    bubble.addEventListener("mouseleave", () => {
      bubbles.forEach((other) => {
        other.style.setProperty("--push-x", `0px`);
        other.style.setProperty("--push-y", `0px`);
        other.style.setProperty("--scale", `1`);
      });
    });
  });
} else {
  if (bg) {
    bg.style.transform = "translate3d(0, 0, 0) scale(1.04)";
  }
}
