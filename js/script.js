// Interações gerais do site: menu mobile, ano do rodapé e acordeão de áreas do direito.

function initGlobalInteractions() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));

    // Fecha o menu móvel ao clicar em qualquer link de navegação ou botão interno
    nav.querySelectorAll("a, button").forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 940) {
          nav.classList.remove("open");
        }
      });
    });
  }

  // Tratamento especial para links com destino #sobre-autora
  document.querySelectorAll('a[href="#sobre-autora"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.getElementById("sobre-autora");
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll(".area-head").forEach((head) => {
    head.addEventListener("click", () => {
      const block = head.closest(".area-block");
      const body = block.querySelector(".area-body");
      const isOpen = block.classList.contains("open");

      document.querySelectorAll(".area-block.open").forEach((openBlock) => {
        if (openBlock !== block) {
          openBlock.classList.remove("open");
          openBlock.querySelector(".area-body").style.maxHeight = null;
        }
      });

      if (isOpen) {
        block.classList.remove("open");
        body.style.maxHeight = null;
      } else {
        block.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalInteractions);
} else {
  initGlobalInteractions();
}
