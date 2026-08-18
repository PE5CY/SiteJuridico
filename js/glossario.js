// Renderiza o glossário jurídico, agrupado por letra, com busca.

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("glossary-list");
  const jump = document.getElementById("letter-jump");
  const searchInput = document.getElementById("glossary-search");
  const emptyState = document.getElementById("glossary-empty");
  if (!list) return;

  function render(termoBusca) {
    const termo = (termoBusca || "").trim().toLowerCase();
    const itens = GLOSSARIO.filter(
      (g) =>
        !termo ||
        g.termo.toLowerCase().includes(termo) ||
        g.definicao.toLowerCase().includes(termo)
    ).sort((a, b) => a.termo.localeCompare(b.termo, "pt-BR"));

    list.innerHTML = "";
    itens.forEach((g) => {
      const dt = document.createElement("dt");
      dt.id = "letra-" + g.termo[0].toUpperCase();
      dt.textContent = g.termo;
      const dd = document.createElement("dd");
      dd.textContent = g.definicao;
      list.appendChild(dt);
      list.appendChild(dd);
    });

    emptyState.style.display = itens.length === 0 ? "block" : "none";
  }

  function renderJump() {
    const letras = Array.from(new Set(GLOSSARIO.map((g) => g.termo[0].toUpperCase()))).sort();
    jump.innerHTML = "";
    letras.forEach((letra) => {
      const a = document.createElement("a");
      a.href = "#letra-" + letra;
      a.textContent = letra;
      jump.appendChild(a);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => render(e.target.value));
  }

  renderJump();
  render("");
});
