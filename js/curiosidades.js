// Renderiza e filtra o mosaico de curiosidades jurídicas.

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("curio-grid");
  const filterBar = document.getElementById("filter-bar");
  const searchInput = document.getElementById("curio-search");
  const emptyState = document.getElementById("empty-state");
  const countEl = document.getElementById("curio-count");
  if (!grid) return;

  let categoriaAtiva = "Todas";
  let termoBusca = "";

  function getCuriosidades() {
    return (window.SITE_CONTENT && window.SITE_CONTENT.curiosidades) ? window.SITE_CONTENT.curiosidades : (window.CURIOSIDADES || []);
  }

  function renderFiltros() {
    filterBar.innerHTML = "";
    const curiosidadesData = getCuriosidades();
    const categorias = ["Todas", ...Array.from(new Set(curiosidadesData.map(c => c.categoria))).sort()];

    categorias.forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.className = cat === categoriaAtiva ? "active" : "";
      btn.addEventListener("click", () => {
        categoriaAtiva = cat;
        renderFiltros();
        renderGrid();
      });
      filterBar.appendChild(btn);
    });
  }

  function renderGrid() {
    const termo = termoBusca.trim().toLowerCase();
    const curiosidadesData = getCuriosidades();
    const lista = curiosidadesData.filter((c) => {
      const matchCategoria = categoriaAtiva === "Todas" || c.categoria === categoriaAtiva;
      const matchBusca =
        !termo ||
        c.titulo.toLowerCase().includes(termo) ||
        c.texto.toLowerCase().includes(termo) ||
        c.categoria.toLowerCase().includes(termo);
      return matchCategoria && matchBusca;
    });

    grid.innerHTML = "";
    lista.forEach((c) => {
      const card = document.createElement("article");
      card.className = "curio-card";
      card.innerHTML = `
        <span class="tag">${c.categoria}</span>
        <h3>${c.titulo}</h3>
        <p>${c.texto}</p>
      `;
      grid.appendChild(card);
    });

    emptyState.style.display = lista.length === 0 ? "block" : "none";
    if (countEl) {
      countEl.textContent = `${lista.length} curiosidade${lista.length === 1 ? "" : "s"}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      termoBusca = e.target.value;
      renderGrid();
    });
  }

  const initCuriosidades = () => {
    renderFiltros();
    renderGrid();
  };

  if (window.SITE_CONTENT && window.SITE_CONTENT.curiosidades) {
    initCuriosidades();
  } else {
    document.addEventListener("siteContentReady", initCuriosidades);
  }
});
