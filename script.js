// ============ Configuração ============
const WHATSAPP_NUMBER = "5587988540760"; // (87) 98854-0760 em formato internacional

// ============ Monta os links do WhatsApp ============
function setupWhatsappLinks() {
  const links = document.querySelectorAll("[data-whatsapp]");
  links.forEach((link) => {
    const message = link.getAttribute("data-msg") || "Oi, Tia Thaty! Vi o site e queria saber mais.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
}

// ============ Menu mobile ============
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Fecha com Esc ou clique fora do menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("is-open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });
}

// ============ Destaca o link da seção visível ============
function setupActiveNav() {
  const links = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

// ============ Animação suave ao rolar ============
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length || prefersReduced || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

// ============ Botão flutuante do WhatsApp ============
function setupFloatingButton() {
  const floatBtn = document.getElementById("whatsappFloat");
  if (!floatBtn) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      floatBtn.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.15 }
  );
  observer.observe(hero);
}

// ============ Ano atual no rodapé ============
function setupFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============ Inicialização ============
document.addEventListener("DOMContentLoaded", () => {
  setupWhatsappLinks();
  setupMobileNav();
  setupActiveNav();
  setupReveal();
  setupFloatingButton();
  setupFooterYear();
});
