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

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
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
  setupFloatingButton();
  setupFooterYear();
});
