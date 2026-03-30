const bg = document.querySelector(".bg-layer");
const bubbles = document.querySelectorAll(".bubble");

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

      const dir = j < i ? -1 : 1;
      const offsetX = dir * 10;
      const offsetY = 6;

      other.style.setProperty("--push-x", `${offsetX}px`);
      other.style.setProperty("--push-y", `${offsetY}px`);
      other.style.setProperty("--scale", `0.97`);
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
