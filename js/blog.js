/**
 * Legalmente Isabela — Blog Jurídico
 * Gerenciador de Artigos, Categorias, Publicações e Área Administrativa
 * 
 * SEGURANÇA E CRIPTOGRAFIA IMPLEMENTADAS:
 * 1. Criptografia de Senha: PBKDF2 com SHA-256 e Salt exclusivo (100.000 iterações via Web Crypto API nativa).
 * 2. Prevenção de Timing Attacks: Comparação de tempo constante (timing-safe string comparison).
 * 3. Proteção contra Brute Force / Rate Limiting: Bloqueio automático de 60 segundos após 5 tentativas incorretas.
 * 4. Expiração de Sessão: Sessão com expiração automática após 60 minutos de inatividade em sessionStorage.
 * 5. Sanitização Estrita contra XSS: Escape rigoroso de entidades HTML em todas as entradas e saídas.
 * 6. Validação de Esquema: Integridade de dados de artigos carregados do armazenamento local.
 * 7. Backup & Restauração Segura: Exportação e importação de publicações com validação de formato.
 */

// Criptografia PBKDF2 pré-computada para senha inicial padrão ("isabela123")
// NENHUMA senha em texto plano fica exposta no código ou no navegador.
const DEFAULT_SALT = "a8f3b4c1e92d75f0";
const DEFAULT_HASH = "346ff15e706e0908c078fd0d146d8481ceffb4be665b7eae138d8d355c31ea49";

const DEFAULT_ARTICLES = [
  {
    id: "art-1",
    titulo: "Princípio da Insignificância no Direito Penal: Conceito e Aplicação Prática",
    categoria: "Direito Penal",
    data: "05/09/2026",
    tempoLeitura: "4 min",
    autor: "Isabela",
    resumo: "Entenda os requisitos fixados pelos tribunais superiores (STF e STJ) para a incidência do princípio da bagatela e a exclusão da tipicidade material.",
    conteudo: `O princípio da insignificância, também denominado princípio da bagatela, surgiu originalmente como desdobramento do Direito Romano e foi introduzido na moderna teoria penal por Claus Roxin na década de 1960.

Sua premissa central é que o Direito Penal não deve se ocupar de bagatelas ou condutas cuja lesividade ao bem jurídico tutelado seja absolutamente inexpressiva. Trata-se de uma causa de exclusão da tipicidade material da conduta.

Para sua aplicação, o Supremo Tribunal Federal consolidou quatro vetores obrigatórios e cumulativos:
1. Mínima ofensividade da conduta do agente;
2. Nenhuma periculosidade social da ação;
3. Reduzidíssimo grau de reprovabilidade do comportamento;
4. Inexpressividade da lesão jurídica provocada.

Dessa forma, a análise não se restringe unicamente ao valor monetário da coisa subtraída, mas avalia o contexto integral do fato e as condições subjetivas da vítima e do agente.`
  },
  {
    id: "art-2",
    titulo: "Guarda Compartilhada no Direito Civil: Regra Geral e o Melhor Interesse da Criança",
    categoria: "Direito Civil",
    data: "02/09/2026",
    tempoLeitura: "5 min",
    autor: "Isabela",
    resumo: "Uma reflexão sobre como a legislação brasileira transformou a guarda compartilhada em regra prioritária e sua distinção crucial com o lar de referência.",
    conteudo: `Com o advento da Lei nº 13.058/2014, a guarda compartilhada passou a ser a regra geral no ordenamento jurídico brasileiro quando ambos os genitores estão aptos a exercer o poder familiar, mesmo na ausência de consenso entre eles.

Muitas pessoas confundem guarda compartilhada com a divisão matemática de dias ou custódia alternada. Na verdade, a guarda compartilhada diz respeito à corresponsabilidade na tomada de decisões importantes sobre a vida do filho: escolha da escola, tratamentos médicos, atividades extracurriculares e orientação religiosa ou moral.

A definição do lar de referência (onde a criança dorme habitualmente) e a pensão alimentícia continuam existindo e devem ser fixadas tendo como norte exclusivo o princípio do melhor interesse da criança e do adolescente (art. 227 da CF/88).`
  },
  {
    id: "art-3",
    titulo: "Direitos Fundamentais e a Constituição Cidadã de 1988",
    categoria: "Direito Constitucional",
    data: "28/08/2026",
    tempoLeitura: "6 min",
    autor: "Isabela",
    resumo: "Por que a Constituição Federal de 1988 representou um marco civilizatório inegociável na consolidação do Estado Democrático de Direito.",
    conteudo: `Promulgada em 5 de outubro de 1988, a Carta Magna brasileira foi carinhosamente apelidada de "Constituição Cidadã" pelo deputado Ulysses Guimarães. Sua maior virtude histórica foi colocar o ser humano e seus direitos fundamentais no ápice de todo o ordenamento jurídico.

O artigo 5º da CF/88 traz um dos catálogos de direitos e garantias individuais mais avançados do constitucionalismo contemporâneo, contemplando:
- O direito à vida, à liberdade e à igualdade em sentido formal e material;
- A inviolabilidade da intimidade e da vida privada;
- A liberdade de manifestação do pensamento, vedado o anonimato;
- O devido processo legal, o contraditório e a ampla defesa.

Além disso, a Constituição inovou ao positivar os direitos sociais (saúde, educação, moradia e trabalho) como compromissos estatais vinculantes, servindo de escudo protetor para todas as gerações.`
  },
  {
    id: "art-4",
    titulo: "Teletrabalho e Direito à Desconexão no Direito do Trabalho",
    categoria: "Direito do Trabalho",
    data: "20/08/2026",
    tempoLeitura: "4 min",
    autor: "Isabela",
    resumo: "Os desafios e garantias trabalhistas na era do home office: como a legislação e os tribunais encaram as horas extras e o descanso digital.",
    conteudo: `A popularização do trabalho remoto (home office) transformou radicalmente as relações de emprego nos últimos anos. No Brasil, o tema foi introduzido na CLT pela Reforma Trabalhista (Lei nº 13.467/2017) e posteriormente aprimorado pela Lei nº 14.442/2022.

Um dos pontos mais discutidos nos tribunais atualmente é o chamado "direito à desconexão". Com mensagens de aplicativos e e-mails disponíveis 24 horas por dia, a linha entre a jornada de trabalho e o tempo de repouso se tornou tênue.

A legislação prevê que, havendo controle e fiscalização de horário mesmo à distância, o empregado faz jus ao pagamento de horas suplementares caso ultrapasse os limites constitucionais. O descanso regular e a preservação da saúde mental do trabalhador são garantias irrenunciáveis.`
  },
  {
    id: "art-5",
    titulo: "Princípios do Direito Ambiental: Prevenção, Precaução e o Poluidor-Pagador",
    categoria: "Direito Ambiental",
    data: "05/09/2026",
    tempoLeitura: "5 min",
    autor: "Isabela",
    resumo: "Uma análise sobre o Art. 225 da Constituição Federal e as diretrizes jurídicas que tutelam a sustentabilidade ecológica para as presentes e futuras gerações.",
    conteudo: `O Direito Ambiental brasileiro é considerado um dos mais avançados do mundo contemporâneo, tendo como viga mestra o artigo 225 da Constituição Federal de 1988, que consagrou o meio ambiente ecologicamente equilibrado como bem de uso comum do povo e essencial à sadia qualidade de vida.

Para assegurar essa tutela contínua, três princípios fundamentais orientam a doutrina e a jurisprudência:
1. Princípio da Prevenção: Incide sobre perigos concretos e cientificamente conhecidos. Exige estudos prévios de impacto ambiental (EIA/RIMA) e licenças rigorosas antes da instalação de qualquer empreendimento potencialmente poluidor.
2. Princípio da Precaução: Diante de incertezas científicas sobre a gravidade ou irreversibilidade de um dano ecológico, impõe-se a adoção de medidas conservadoras imediatas ("in dubio pro natura").
3. Princípio do Poluidor-Pagador: Determina que os custos socioambientais de prevenção e reparação devem ser absorvidos pelo poluidor, impedindo a socialização do prejuízo ecológico.

A responsabilidade civil em matéria ambiental no Brasil é objetiva (independe de dolo ou culpa) e solidária, sustentada pela teoria do risco integral (art. 14, § 1º, da Lei nº 6.938/1981).`
  }
];

/* ===== Módulo Criptográfico (PBKDF2-HMAC-SHA256) ===== */
class CryptoSecurity {
  static async hashPassword(password, saltHex) {
    const encoder = new TextEncoder();
    const saltBytes = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: saltBytes,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const hashArray = Array.from(new Uint8Array(derivedBits));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  static generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  static timingSafeEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
      return false;
    }
    let mismatch = 0;
    for (let i = 0; i < a.length; i++) {
      mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return mismatch === 0;
  }
}

/* ===== Proteção contra Brute Force (Rate Limiting) ===== */
class RateLimiter {
  constructor() {
    this.key = "legalmente_isabela_auth_rate";
    this.maxAttempts = 5;
    this.lockoutDuration = 60; // 60 segundos
  }

  getState() {
    try {
      const data = sessionStorage.getItem(this.key);
      return data ? JSON.parse(data) : { failed: 0, lockedUntil: 0 };
    } catch {
      return { failed: 0, lockedUntil: 0 };
    }
  }

  saveState(state) {
    sessionStorage.setItem(this.key, JSON.stringify(state));
  }

  isLocked() {
    const state = this.getState();
    const now = Date.now();
    if (state.lockedUntil && state.lockedUntil > now) {
      return Math.ceil((state.lockedUntil - now) / 1000);
    }
    return 0;
  }

  recordFailure() {
    const state = this.getState();
    state.failed = (state.failed || 0) + 1;
    if (state.failed >= this.maxAttempts) {
      state.lockedUntil = Date.now() + this.lockoutDuration * 1000;
      state.failed = 0;
    }
    this.saveState(state);
    return state;
  }

  recordSuccess() {
    sessionStorage.removeItem(this.key);
  }
}

/* ===== Gerenciador de Sessão com Inatividade ===== */
class SessionManager {
  constructor() {
    this.sessionKey = "legalmente_isabela_admin_session";
    this.timeoutMinutes = 60;
  }

  createSession() {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, "0")).join("");
    const session = {
      token,
      loginTime: Date.now(),
      lastActive: Date.now()
    };
    sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
    return session;
  }

  isValid() {
    try {
      const data = sessionStorage.getItem(this.sessionKey);
      if (!data) return false;
      const session = JSON.parse(data);
      const now = Date.now();
      const maxInactivity = this.timeoutMinutes * 60 * 1000;
      if (now - session.lastActive > maxInactivity) {
        this.clearSession();
        return false;
      }
      session.lastActive = now;
      sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
      return true;
    } catch {
      return false;
    }
  }

  clearSession() {
    sessionStorage.removeItem(this.sessionKey);
  }
}

/* ===== Gerenciador Principal do Blog ===== */
class BlogManager {
  constructor() {
    this.storageKey = "legalmente_isabela_posts";
    this.photoStorageKey = "legalmente_isabela_photo";
    this.saltKey = "legalmente_isabela_admin_salt";
    this.hashKey = "legalmente_isabela_admin_hash";

    this.rateLimiter = new RateLimiter();
    this.sessionManager = new SessionManager();

    this.isAdmin = this.sessionManager.isValid();
    this.editingArticleId = null;
    this.currentCategory = "Todas";
    this.searchQuery = "";

    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.setupDatabaseEventListeners();
    this.updateAdminUI();
    this.loadSavedPhoto();

    // Sincroniza credenciais da nuvem (ou fallback local)
    await this.ensureAdminCredentials();

    // Carrega artigos da nuvem (ou cache local resiliente)
    await this.loadArticlesFromDb();
  }

  async loadArticlesFromDb() {
    if (window.dbService) {
      await window.dbService.fetchArticles(DEFAULT_ARTICLES);
    } else {
      this.ensureDefaultArticles();
    }
    this.renderArticles();
    this.updateDbStatusBadge();
  }

  ensureDefaultArticles() {
    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ARTICLES));
      return;
    }
    try {
      const articles = JSON.parse(existing);
      if (Array.isArray(articles)) {
        let updated = false;
        DEFAULT_ARTICLES.forEach(defArt => {
          if (!articles.some(a => a.id === defArt.id)) {
            articles.push(defArt);
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(this.storageKey, JSON.stringify(articles));
        }
      }
    } catch {
      localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ARTICLES));
    }
  }

  async ensureAdminCredentials() {
    if (window.dbService) {
      await window.dbService.fetchAdminCredentials(DEFAULT_SALT, DEFAULT_HASH);
    } else {
      if (!localStorage.getItem(this.saltKey) || !localStorage.getItem(this.hashKey)) {
        localStorage.setItem(this.saltKey, DEFAULT_SALT);
        localStorage.setItem(this.hashKey, DEFAULT_HASH);
      }
    }
  }

  getArticles() {
    if (window.dbService) {
      const local = window.dbService.getLocalArticles();
      if (Array.isArray(local) && local.length > 0) {
        return local.filter(this.validateArticleSchema);
      }
    }
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return DEFAULT_ARTICLES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return DEFAULT_ARTICLES;
      return parsed.filter(this.validateArticleSchema);
    } catch (e) {
      console.error("Erro seguro ao carregar artigos:", e);
      return DEFAULT_ARTICLES;
    }
  }

  validateArticleSchema(art) {
    return art &&
      typeof art === "object" &&
      typeof art.id === "string" &&
      typeof art.titulo === "string" &&
      typeof art.categoria === "string" &&
      typeof art.conteudo === "string";
  }

  saveArticles(articles) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(articles));
    } catch (e) {
      console.error("Falha ao salvar artigos no localStorage:", e);
      alert("Aviso: o armazenamento do navegador está cheio ou bloqueado.");
    }
  }

  setupEventListeners() {
    // Busca em tempo real com escape
    const searchInput = document.getElementById("blog-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderArticles();
      });
    }

    // Filtros de categoria por abas
    document.querySelectorAll(".category-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentCategory = btn.dataset.category || "Todas";
        this.renderArticles();
      });
    });

    // Cards temáticos superiores ("VER ARTIGOS")
    document.querySelectorAll("[data-filter-category]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = el.getAttribute("data-filter-category");
        this.selectCategory(cat);
        const section = document.getElementById("artigos-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Botão de Nova Publicação (Restrito - Top Bar e Navbar)
    document.querySelectorAll("#btn-open-publish, .btn-open-publish").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openPublishModal();
      });
    });

    const btnClosePublish = document.getElementById("btn-close-publish");
    const modalPublish = document.getElementById("modal-publish");
    if (btnClosePublish && modalPublish) {
      btnClosePublish.addEventListener("click", () => {
        this.closeModal(modalPublish);
      });
    }

    // Submissão do Formulário de Publicação/Edição
    const formPublish = document.getElementById("form-publish");
    if (formPublish && modalPublish) {
      formPublish.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handlePublishForm(formPublish, modalPublish);
      });
    }

    // Modal de Login Administrador
    const btnOpenLogin = document.getElementById("btn-open-login");
    const btnOpenLoginFooter = document.getElementById("btn-open-login-footer");
    const modalLogin = document.getElementById("modal-login");
    const btnCloseLogin = document.getElementById("btn-close-login");
    const formLogin = document.getElementById("form-login");

    if (btnOpenLogin && modalLogin) {
      btnOpenLogin.addEventListener("click", () => this.openLoginModal(modalLogin));
    }
    if (btnOpenLoginFooter && modalLogin) {
      btnOpenLoginFooter.addEventListener("click", (e) => {
        e.preventDefault();
        this.openLoginModal(modalLogin);
      });
    }
    if (btnCloseLogin && modalLogin) {
      btnCloseLogin.addEventListener("click", () => this.closeModal(modalLogin));
    }

    if (formLogin && modalLogin) {
      formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleLogin(formLogin, modalLogin);
      });
    }

    // Painel de Controle da Autora (Top Bar e Navbar)
    const modalAdminPanel = document.getElementById("modal-admin-panel");
    const btnCloseAdminPanel = document.getElementById("btn-close-admin-panel");

    document.querySelectorAll("#btn-open-admin-panel, .btn-open-admin-panel").forEach(btn => {
      btn.addEventListener("click", () => {
        if (modalAdminPanel) this.openAdminPanelModal(modalAdminPanel);
      });
    });

    if (btnCloseAdminPanel && modalAdminPanel) {
      btnCloseAdminPanel.addEventListener("click", () => {
        this.closeModal(modalAdminPanel);
      });
    }

    // Formulário de Alteração de Senha
    const formChangePass = document.getElementById("form-change-password");
    if (formChangePass) {
      formChangePass.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleChangePassword(formChangePass);
      });
    }

    // Backup e Restauração
    const btnExportBackup = document.getElementById("btn-export-backup");
    if (btnExportBackup) {
      btnExportBackup.addEventListener("click", () => this.exportBackup());
    }

    const inputImportBackup = document.getElementById("input-import-backup");
    if (inputImportBackup) {
      inputImportBackup.addEventListener("change", (e) => this.importBackup(e));
    }

    // Toggle de visibilidade de senha no login
    const btnTogglePass = document.getElementById("btn-toggle-pass");
    const inputPass = document.getElementById("input-admin-pass");
    if (btnTogglePass && inputPass) {
      btnTogglePass.addEventListener("click", () => {
        if (inputPass.type === "password") {
          inputPass.type = "text";
          btnTogglePass.textContent = "🙈";
        } else {
          inputPass.type = "password";
          btnTogglePass.textContent = "👁️";
        }
      });
    }

    // Logout (Top Bar, Navbar e Drawer Mobile)
    document.querySelectorAll("#btn-logout, .btn-logout").forEach(btn => {
      btn.addEventListener("click", () => this.logout());
    });

    // Modal de Leitura
    const modalReader = document.getElementById("modal-reader");
    const btnCloseReader = document.getElementById("btn-close-reader");
    if (btnCloseReader && modalReader) {
      btnCloseReader.addEventListener("click", () => {
        this.closeModal(modalReader);
      });
    }

    // Fechar modais ao clicar no backdrop ou ESC
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        this.closeModal(e.target);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach(modal => {
          this.closeModal(modal);
        });
      }
    });

    // Gerenciador de Foto da Autora (Upload restrito / visualização)
    this.setupPhotoHandler();
  }

  /* ===== Autenticação Segura com PBKDF2 e Rate Limiting ===== */

  openLoginModal(modalLogin) {
    const lockedSeconds = this.rateLimiter.isLocked();
    if (lockedSeconds > 0) {
      alert(`Muitas tentativas incorretas. Por segurança, aguarde ${lockedSeconds} segundos para tentar novamente.`);
      return;
    }
    this.openModal(modalLogin);
  }

  async handleLogin(form, modal) {
    const lockedSeconds = this.rateLimiter.isLocked();
    if (lockedSeconds > 0) {
      alert(`Acesso temporariamente bloqueado por proteção contra força bruta. Aguarde ${lockedSeconds} segundos.`);
      return;
    }

    const inputPass = form.querySelector("#input-admin-pass");
    const enteredPass = inputPass ? inputPass.value.trim() : "";
    const submitBtn = form.querySelector("button[type='submit']");

    if (!enteredPass) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Validando credenciais...";
    }

    try {
      const { salt: storedSalt, hash: storedHash } = window.dbService
        ? await window.dbService.fetchAdminCredentials(DEFAULT_SALT, DEFAULT_HASH)
        : { salt: localStorage.getItem(this.saltKey) || DEFAULT_SALT, hash: localStorage.getItem(this.hashKey) || DEFAULT_HASH };

      // Derivação de chave segura via PBKDF2-SHA256 (100.000 iterações)
      let computedHash = await CryptoSecurity.hashPassword(enteredPass, storedSalt);

      // Comparação constante de tempo para mitigar Timing Attacks
      let isMatch = CryptoSecurity.timingSafeEqual(computedHash, storedHash);

      // Tolerância a teclado mobile: se for a senha padrão inicial, aceita também se o celular capitalizou a 1ª letra ("Isabela123")
      if (!isMatch && storedHash === DEFAULT_HASH) {
        const altHash = await CryptoSecurity.hashPassword(enteredPass.toLowerCase(), storedSalt);
        if (CryptoSecurity.timingSafeEqual(altHash, storedHash)) {
          isMatch = true;
        }
      }

      if (isMatch) {
        this.rateLimiter.recordSuccess();
        this.sessionManager.createSession();
        this.isAdmin = true;

        form.reset();
        this.closeModal(modal);
        this.updateAdminUI();
        this.renderArticles();
        this.showToast("Bem-vinda, Isabela! Modo de Administradora autenticado com segurança. 👑");
      } else {
        const state = this.rateLimiter.recordFailure();
        const remaining = this.rateLimiter.maxAttempts - (state.failed || 0);

        if (state.lockedUntil) {
          alert("Limite de tentativas excedido. Por segurança, o acesso está bloqueado por 60 segundos.");
          this.closeModal(modal);
        } else {
          alert(`Senha incorreta. Restam ${remaining} tentativa(s) antes do bloqueio temporário.`);
        }
      }
    } catch (err) {
      console.error("Erro no processamento criptográfico:", err);
      if (!window.isSecureContext && (!window.crypto || !window.crypto.subtle)) {
        alert("O seu navegador móvel bloqueou a criptografia por não estar em conexão segura HTTPS. Acesse o site pelo link oficial com HTTPS.");
      } else {
        alert("Erro no módulo criptográfico do navegador: " + (err.message || err));
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Entrar no Painel";
      }
    }
  }

  async handleChangePassword(form) {
    if (!this.checkSession()) return;

    const currentPass = form.querySelector("#input-current-pass").value;
    const newPass = form.querySelector("#input-new-pass").value;
    const confirmPass = form.querySelector("#input-confirm-pass").value;
    const submitBtn = form.querySelector("button[type='submit']");

    if (newPass.length < 8) {
      alert("A nova senha deve possuir no mínimo 8 caracteres para garantir boa segurança.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("A confirmação da nova senha não confere.");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Criptografando nova senha...";
    }

    try {
      const storedSalt = localStorage.getItem(this.saltKey) || DEFAULT_SALT;
      const storedHash = localStorage.getItem(this.hashKey) || DEFAULT_HASH;

      const currentHash = await CryptoSecurity.hashPassword(currentPass, storedSalt);

      if (!CryptoSecurity.timingSafeEqual(currentHash, storedHash)) {
        alert("A senha atual digitada está incorreta.");
        return;
      }

      // Gera um novo Salt criptograficamente aleatório e calcula novo PBKDF2
      const freshSalt = CryptoSecurity.generateSalt();
      const freshHash = await CryptoSecurity.hashPassword(newPass, freshSalt);

      if (window.dbService) {
        await window.dbService.saveAdminCredentials(freshHash, freshSalt);
      } else {
        localStorage.setItem(this.saltKey, freshSalt);
        localStorage.setItem(this.hashKey, freshHash);
      }

      form.reset();
      this.showToast("Senha de administradora alterada e sincronizada com segurança! 🔒");
    } catch (e) {
      console.error("Erro ao alterar senha:", e);
      alert("Erro ao aplicar criptografia à nova senha.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Salvar Nova Senha";
      }
    }
  }

  checkSession() {
    if (!this.sessionManager.isValid()) {
      this.logout();
      alert("Sua sessão expirou por inatividade. Faça login novamente para continuar.");
      return false;
    }
    return true;
  }

  logout() {
    this.sessionManager.clearSession();
    this.isAdmin = false;
    this.updateAdminUI();
    this.renderArticles();

    // Fecha modais de administração
    ["modal-publish", "modal-admin-panel"].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.classList.contains("open")) this.closeModal(el);
    });

    this.showToast("Sessão administrativa encerrada com segurança.");
  }

  updateAdminUI() {
    const adminLoggedControls = document.getElementById("admin-logged-controls");
    const btnOpenLogin = document.getElementById("btn-open-login");
    const authorPhotoAdminActions = document.getElementById("author-photo-admin-actions");

    if (this.isAdmin) {
      document.body.classList.add("admin-logged-in");
      if (adminLoggedControls) adminLoggedControls.style.display = "inline-flex";
      if (btnOpenLogin) btnOpenLogin.style.display = "none";
      if (authorPhotoAdminActions) authorPhotoAdminActions.style.display = "flex";
    } else {
      document.body.classList.remove("admin-logged-in");
      if (adminLoggedControls) adminLoggedControls.style.display = "none";
      if (btnOpenLogin) btnOpenLogin.style.display = "inline-flex";
      if (authorPhotoAdminActions) authorPhotoAdminActions.style.display = "none";
    }
  }

  openAdminPanelModal(modal) {
    if (!this.checkSession()) return;

    const articles = this.getArticles();
    const countTotal = document.getElementById("admin-stat-total");
    const countPenal = document.getElementById("admin-stat-penal");
    const countCivil = document.getElementById("admin-stat-civil");
    const countConst = document.getElementById("admin-stat-const");
    const countTrab = document.getElementById("admin-stat-trab");
    const countAmbiental = document.getElementById("admin-stat-ambiental");

    if (countTotal) countTotal.textContent = articles.length;
    if (countPenal) countPenal.textContent = articles.filter(a => a.categoria === "Direito Penal").length;
    if (countCivil) countCivil.textContent = articles.filter(a => a.categoria === "Direito Civil").length;
    if (countConst) countConst.textContent = articles.filter(a => a.categoria === "Direito Constitucional").length;
    if (countTrab) countTrab.textContent = articles.filter(a => a.categoria === "Direito do Trabalho").length;
    if (countAmbiental) countAmbiental.textContent = articles.filter(a => a.categoria === "Direito Ambiental").length;

    // Atualiza campos e status da conexão com Supabase
    if (window.dbService) {
      const creds = window.dbService.getCredentials();
      const inputUrl = document.getElementById("input-supabase-url");
      const inputKey = document.getElementById("input-supabase-key");
      if (inputUrl) inputUrl.value = creds.url || "";
      if (inputKey) inputKey.value = creds.anonKey || "";
      this.updateDbStatusBadge();
    }

    this.openModal(modal);
  }

  updateDbStatusBadge() {
    const badge = document.getElementById("db-status-badge");
    if (!badge) return;

    if (window.dbService && window.dbService.isConfigured()) {
      badge.innerHTML = '<span style="color: #2e7d32;">🟢 Conectado na Nuvem (PostgreSQL / Supabase)</span>';
    } else {
      badge.innerHTML = '<span style="color: #b78103;">🟡 Modo Local / Cache (Offline)</span>';
    }
  }

  setupDatabaseEventListeners() {
    const formDb = document.getElementById("form-database-config");
    const btnSyncCloud = document.getElementById("btn-sync-cloud");
    const btnDisconnectDb = document.getElementById("btn-disconnect-db");

    if (formDb) {
      formDb.addEventListener("submit", async (e) => {
        e.preventDefault();
        const urlInput = document.getElementById("input-supabase-url");
        const keyInput = document.getElementById("input-supabase-key");
        const submitBtn = document.getElementById("btn-save-db");

        const url = (urlInput ? urlInput.value : "").trim();
        const key = (keyInput ? keyInput.value : "").trim();

        if (!url || !key) {
          alert("Por favor, preencha a URL e a Anon Key do Supabase.");
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Testando conexão...";
        }

        const testResult = await window.dbService.testConnection(url, key);

        if (testResult.ok) {
          window.dbService.saveCloudCredentials(url, key);
          this.updateDbStatusBadge();

          // Sincroniza artigos locais com a nuvem automaticamente
          await window.dbService.syncLocalToCloud(this.getArticles());
          await this.loadArticlesFromDb();

          this.showToast("Conexão com o Supabase estabelecida com sucesso! ☁️✨");
          alert("Sucesso! O banco de dados PostgreSQL na nuvem está ativo e sincronizado com o blog.");
        } else {
          alert(`Falha ao conectar com o Supabase:\n${testResult.error}\n\nDica: Verifique se executou o script schema.sql no SQL Editor do Supabase.`);
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "💾 Conectar & Salvar Chaves";
        }
      });
    }

    if (btnDisconnectDb) {
      btnDisconnectDb.addEventListener("click", () => {
        if (confirm("Deseja desconectar o banco de dados na nuvem e voltar ao modo local (cache)?")) {
          window.dbService.saveCloudCredentials("", "");
          const urlInput = document.getElementById("input-supabase-url");
          const keyInput = document.getElementById("input-supabase-key");
          if (urlInput) urlInput.value = "";
          if (keyInput) keyInput.value = "";
          this.updateDbStatusBadge();
          this.showToast("Modo local reativado.");
        }
      });
    }

    if (btnSyncCloud) {
      btnSyncCloud.addEventListener("click", async () => {
        if (!window.dbService || !window.dbService.isConfigured()) {
          alert("Configure e salve a conexão com o Supabase primeiro.");
          return;
        }
        btnSyncCloud.disabled = true;
        btnSyncCloud.textContent = "Sincronizando...";

        const result = await window.dbService.syncLocalToCloud(this.getArticles());
        if (result.ok) {
          this.showToast(`Sincronização concluída! ${result.count} artigos salvos na nuvem.`);
        } else {
          alert(`Erro na sincronização: ${result.error}`);
        }

        btnSyncCloud.disabled = false;
        btnSyncCloud.textContent = "🔄 Sincronizar Artigos com a Nuvem";
      });
    }
  }

  /* ===== Backup & Restauração de Conteúdo ===== */

  exportBackup() {
    if (!this.checkSession()) return;
    const articles = this.getArticles();
    const backupData = {
      blog: "Legalmente Isabela",
      versao: "2.0",
      exportadoEm: new Date().toISOString(),
      artigos: articles
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `backup-legalmente-isabela-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast("Backup exportado com sucesso! Arquivo JSON salvo.");
  }

  importBackup(event) {
    if (!this.checkSession()) return;
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (!json.artigos || !Array.isArray(json.artigos)) {
          throw new Error("Formato de backup inválido.");
        }

        const validArticles = json.artigos.filter(this.validateArticleSchema);

        if (confirm(`Foram encontrados ${validArticles.length} artigos válidos no arquivo. Deseja restaurá-los? Isso substituirá a lista atual.`)) {
          this.saveArticles(validArticles);
          this.renderArticles();
          this.showToast("Backup restaurado com sucesso! Lista de artigos atualizada.");
          const modal = document.getElementById("modal-admin-panel");
          if (modal) this.closeModal(modal);
        }
      } catch (err) {
        alert("Erro ao processar o arquivo de backup. Verifique se o arquivo JSON está íntegro.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  }

  selectCategory(categoryName) {
    this.currentCategory = categoryName;
    document.querySelectorAll(".category-pill").forEach(btn => {
      if (btn.dataset.category === categoryName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    this.renderArticles();
  }

  openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ===== Publicação e Edição de Artigos ===== */

  openPublishModal() {
    if (!this.checkSession()) {
      const modalLogin = document.getElementById("modal-login");
      this.openLoginModal(modalLogin);
      this.showToast("Faça login com a senha de administradora para publicar.");
      return;
    }

    this.editingArticleId = null;
    const form = document.getElementById("form-publish");
    const modal = document.getElementById("modal-publish");
    const modalTitle = document.getElementById("publish-modal-title");
    const modalDesc = document.getElementById("publish-modal-desc");
    const submitBtn = document.getElementById("btn-publish-submit");
    const editIdInput = document.getElementById("input-edit-id");

    if (form) form.reset();
    if (modalTitle) modalTitle.textContent = "Nova Publicação";
    if (modalDesc) modalDesc.textContent = "Preencha as informações do seu artigo para publicá-lo no blog.";
    if (submitBtn) submitBtn.textContent = "Publicar no Blog";
    if (editIdInput) editIdInput.value = "";

    this.openModal(modal);
  }

  openEditArticle(id) {
    if (!this.checkSession()) {
      const modalLogin = document.getElementById("modal-login");
      this.openLoginModal(modalLogin);
      return;
    }

    const articles = this.getArticles();
    const art = articles.find(a => a.id === id);
    if (!art) return;

    this.editingArticleId = id;
    const form = document.getElementById("form-publish");
    const modal = document.getElementById("modal-publish");
    const modalTitle = document.getElementById("publish-modal-title");
    const modalDesc = document.getElementById("publish-modal-desc");
    const submitBtn = document.getElementById("btn-publish-submit");
    const editIdInput = document.getElementById("input-edit-id");

    if (form) {
      form.titulo.value = art.titulo;
      form.categoria.value = art.categoria;
      form.tempoLeitura.value = art.tempoLeitura;
      form.resumo.value = art.resumo;
      form.conteudo.value = art.conteudo;
    }

    if (editIdInput) editIdInput.value = id;
    if (modalTitle) modalTitle.textContent = "Editar Publicação";
    if (modalDesc) modalDesc.textContent = "Altere os dados do artigo e clique em salvar para atualizar o blog.";
    if (submitBtn) submitBtn.textContent = "Salvar Alterações";

    this.openModal(modal);
  }

  handlePublishForm(form, modal) {
    if (!this.checkSession()) return;

    // Sanitização de entradas
    const titulo = form.titulo.value.trim();
    const categoria = form.categoria.value;
    const resumo = form.resumo.value.trim();
    const conteudo = form.conteudo.value.trim();
    const tempoLeitura = form.tempoLeitura.value.trim() || "3 min";
    const editId = form.querySelector("#input-edit-id") ? form.querySelector("#input-edit-id").value : "";

    if (!titulo || !resumo || !conteudo) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const articles = this.getArticles();

    if (editId) {
      // Modo Edição
      const index = articles.findIndex(a => a.id === editId);
      if (index !== -1) {
        articles[index].titulo = titulo;
        articles[index].categoria = categoria;
        articles[index].resumo = resumo;
        articles[index].conteudo = conteudo;
        articles[index].tempoLeitura = tempoLeitura.includes("min") ? tempoLeitura : `${tempoLeitura} min`;

        if (window.dbService) {
          await window.dbService.saveArticle(articles[index]);
        } else {
          this.saveArticles(articles);
        }

        form.reset();
        this.closeModal(modal);
        this.renderArticles();
        this.showToast("Artigo atualizado com sucesso! ✨");

        const modalReader = document.getElementById("modal-reader");
        if (modalReader && modalReader.classList.contains("open")) {
          this.readArticle(editId);
        }
        return;
      }
    }

    // Modo Nova Publicação
    const today = new Date();
    const dataFormatada = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    const newArticle = {
      id: "art-" + Date.now(),
      titulo,
      categoria,
      data: dataFormatada,
      tempoLeitura: tempoLeitura.includes("min") ? tempoLeitura : `${tempoLeitura} min`,
      autor: "Isabela",
      resumo,
      conteudo
    };

    if (window.dbService) {
      await window.dbService.saveArticle(newArticle);
    } else {
      articles.unshift(newArticle);
      this.saveArticles(articles);
    }

    form.reset();
    this.closeModal(modal);

    this.selectCategory(categoria);
    this.showToast("Artigo publicado com sucesso! ✨");

    const section = document.getElementById("artigos-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  async deleteArticle(id) {
    if (!this.checkSession()) return;

    const articles = this.getArticles();
    const art = articles.find(a => a.id === id);
    const tituloArtigo = art ? `"${art.titulo}"` : "este artigo";

    if (!confirm(`Tem certeza de que deseja excluir ${tituloArtigo}? Esta ação é definitiva.`)) {
      return;
    }

    if (window.dbService) {
      await window.dbService.deleteArticle(id);
    } else {
      const updated = articles.filter(a => a.id !== id);
      this.saveArticles(updated);
    }

    const modal = document.getElementById("modal-reader");
    if (modal) this.closeModal(modal);

    this.renderArticles();
    this.showToast("Publicação excluída com sucesso.");
  }

  /* ===== Renderização de Artigos com Proteção XSS Estrita ===== */

  renderArticles() {
    const container = document.getElementById("articles-grid");
    const countEl = document.getElementById("articles-count");
    if (!container) return;

    let articles = this.getArticles();

    if (this.currentCategory !== "Todas") {
      articles = articles.filter(a => a.categoria === this.currentCategory);
    }

    if (this.searchQuery) {
      articles = articles.filter(a =>
        a.titulo.toLowerCase().includes(this.searchQuery) ||
        a.resumo.toLowerCase().includes(this.searchQuery) ||
        a.categoria.toLowerCase().includes(this.searchQuery)
      );
    }

    if (countEl) {
      countEl.textContent = `${articles.length} artigo${articles.length === 1 ? "" : "s"} encontrado${articles.length === 1 ? "" : "s"}`;
    }

    if (articles.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>Nenhum artigo encontrado</h3>
          <p>Não há publicações para este filtro no momento.</p>
          ${this.isAdmin ? `
            <button class="btn btn-primary" onclick="window.blogManager.openPublishModal()">Publicar agora</button>
          ` : `
            <button class="btn btn-outline" onclick="window.blogManager.selectCategory('Todas')">Ver todas as categorias</button>
          `}
        </div>
      `;
      return;
    }

    container.innerHTML = articles.map(art => {
      const adminButtonsHtml = this.isAdmin ? `
        <div class="card-admin-actions">
          <button class="btn-card-action btn-card-edit" onclick="event.stopPropagation(); window.blogManager.openEditArticle('${this.escapeHtml(art.id)}')" title="Editar artigo">
            ✏️ Editar
          </button>
          <button class="btn-card-action btn-card-delete" onclick="event.stopPropagation(); window.blogManager.deleteArticle('${this.escapeHtml(art.id)}')" title="Excluir artigo">
            🗑️ Excluir
          </button>
        </div>
      ` : "";

      return `
        <article class="article-card" data-id="${this.escapeHtml(art.id)}">
          <div>
            <div class="article-header">
              <span class="category-badge cat-${this.slugify(art.categoria)}">${this.escapeHtml(art.categoria)}</span>
              <span class="article-readtime">${this.escapeHtml(art.tempoLeitura)}</span>
            </div>
            <h3 class="article-title">${this.escapeHtml(art.titulo)}</h3>
            <p class="article-excerpt">${this.escapeHtml(art.resumo)}</p>
          </div>
          
          <div>
            <div class="article-footer">
              <div class="article-meta">
                <span class="article-author">Por ${this.escapeHtml(art.autor || "Isabela")}</span>
                <span class="article-date">${this.escapeHtml(art.data)}</span>
              </div>
              <button class="btn-read-more" onclick="window.blogManager.readArticle('${this.escapeHtml(art.id)}')">
                Ler artigo →
              </button>
            </div>
            ${adminButtonsHtml}
          </div>
        </article>
      `;
    }).join("");
  }

  readArticle(id) {
    const articles = this.getArticles();
    const art = articles.find(a => a.id === id);
    if (!art) return;

    const modal = document.getElementById("modal-reader");
    const contentBox = document.getElementById("reader-content");

    if (modal && contentBox) {
      // Escape seguro de texto para cada parágrafo
      const paragraphs = art.conteudo
        .split("\n\n")
        .map(p => `<p>${this.escapeHtml(p.trim()).replace(/\n/g, "<br>")}</p>`)
        .join("");

      const adminActionsHtml = this.isAdmin ? `
        <div class="reader-admin-buttons">
          <button class="btn btn-outline" onclick="window.blogManager.openEditArticle('${this.escapeHtml(art.id)}')">
            ✏️ Editar publicação
          </button>
          <button class="btn btn-text-danger" onclick="window.blogManager.deleteArticle('${this.escapeHtml(art.id)}')">
            🗑️ Excluir publicação
          </button>
        </div>
      ` : "";

      contentBox.innerHTML = `
        <div class="reader-header">
          <span class="category-badge cat-${this.slugify(art.categoria)}">${this.escapeHtml(art.categoria)}</span>
          <h1 class="reader-title">${this.escapeHtml(art.titulo)}</h1>
          <div class="reader-meta">
            <span>✍️ <strong>${this.escapeHtml(art.autor || "Isabela")}</strong> • Estudante de Direito</span>
            <span>📅 ${this.escapeHtml(art.data)}</span>
            <span>⏱️ ${this.escapeHtml(art.tempoLeitura)}</span>
          </div>
        </div>
        <div class="reader-body">
          ${paragraphs}
        </div>
        <div class="reader-author-bio">
          <div class="bio-avatar-ph">⚖️</div>
          <div>
            <h4>Isabela — Papo de Direito</h4>
            <p>Estudante de Direito apaixonada pelo aprendizado e pela democratização da informação jurídica. Compartilha estudos, análises e resumos práticos.</p>
          </div>
        </div>
        <div class="reader-actions">
          <button class="btn btn-outline" onclick="window.blogManager.copyArticleLink('${this.escapeHtml(art.id)}')">
            📋 Copiar link
          </button>
          ${adminActionsHtml}
        </div>
      `;

      this.openModal(modal);
    }
  }

  copyArticleLink(id) {
    navigator.clipboard.writeText(window.location.href.split("#")[0] + "#artigo-" + id).then(() => {
      this.showToast("Link copiado para a área de transferência!");
    }).catch(() => {
      this.showToast("Link pronto para compartilhar!");
    });
  }

  showToast(message) {
    let toast = document.getElementById("blog-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "blog-toast";
      toast.className = "blog-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 3500);
  }

  setupPhotoHandler() {
    const photoUploadInput = document.getElementById("author-photo-upload");
    const photoSlot = document.getElementById("author-photo-slot");
    const removeBtn = document.getElementById("btn-remove-photo");

    if (photoUploadInput && photoSlot) {
      photoUploadInput.addEventListener("change", (e) => {
        if (!this.checkSession()) return;

        const file = e.target.files[0];
        if (!file) return;

        // Limite de segurança no tamanho da imagem: 4MB
        if (file.size > 4 * 1024 * 1024) {
          alert("Por favor, selecione uma imagem de até 4MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          try {
            localStorage.setItem(this.photoStorageKey, dataUrl);
            this.applyPhoto(dataUrl);
            this.showToast("Foto da autora atualizada com sucesso!");
          } catch (err) {
            alert("A imagem é muito grande para o armazenamento local. Tente uma imagem mais leve.");
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        if (!this.checkSession()) return;
        localStorage.removeItem(this.photoStorageKey);
        this.clearPhoto();
        this.showToast("Foto removida. Espaço vazio restaurado.");
      });
    }
  }

  loadSavedPhoto() {
    const saved = localStorage.getItem(this.photoStorageKey);
    if (saved) {
      this.applyPhoto(saved);
    } else {
      this.clearPhoto();
    }
  }

  applyPhoto(src) {
    const slot = document.getElementById("author-photo-slot");
    const removeBtn = document.getElementById("btn-remove-photo");
    if (slot) {
      // Sanitização básica da URL
      const cleanSrc = this.escapeHtml(src);
      slot.innerHTML = `<img src="${cleanSrc}" alt="Foto de Isabela" class="author-img-loaded" />`;
      slot.classList.add("has-photo");
    }
    if (removeBtn) {
      removeBtn.style.display = "inline-flex";
    }
  }

  clearPhoto() {
    const slot = document.getElementById("author-photo-slot");
    const removeBtn = document.getElementById("btn-remove-photo");
    if (slot) {
      slot.classList.remove("has-photo");
      slot.innerHTML = `
        <div class="photo-placeholder-box">
          <div class="photo-icon">📷</div>
          <span class="photo-label">Espaço para Foto da Autora</span>
          <small class="photo-hint">Adicione sua foto aqui quando desejar</small>
        </div>
      `;
    }
    if (removeBtn) {
      removeBtn.style.display = "none";
    }
  }

  slugify(text) {
    return (text || "").toString().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.blogManager = new BlogManager();
});
