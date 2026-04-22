document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    <header class="site-topbar">
      <a href="index.html" class="site-brand">
        <img src="logo.png" alt="BOUBOP logo" class="site-nav-logo">
        <span>BOUBOP</span>
      </a>

      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="ss26.html">SS26</a>
        <a href="coppenhagen.html">Coppenhagen</a>
        <a href="archive.html">Archive</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="https://boubop.bigcartel.com" target="_blank" rel="noopener">Shop</a>
      </nav>
    </header>
  `;

  document.querySelectorAll(".nav-container").forEach((el) => {
    el.innerHTML = navHTML;
  });
});
