// Interações gerais do site: menu mobile, ano do rodapé e acordeão de áreas do direito.

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

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
});
