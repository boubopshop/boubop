document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    <header class="cp-topbar">
      <a href="index.html" class="cp-brand">
        <img src="logo.png" alt="BOUBOP logo">
        <span>BOUBOP</span>
      </a>

      <nav class="cp-nav">
        <a href="index.html">Home</a>
        <a href="https://boubop.bigcartel.com" target="_blank" rel="noopener">Shop</a>
        <a href="ss26.html">SS26</a>
        <a href="coppenhagen.html">Coppenhagen</a>
        <a href="archive.html">Archive</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        
      </nav>
    </header>
  `;

  document.querySelectorAll(".nav-container").forEach(el => {
    el.innerHTML = navHTML;
  });
});
