/**
 * Legalmente Isabela — Camada de Acesso a Dados (Data Access Layer)
 * Suporte a Banco de Dados na Nuvem (Supabase / PostgreSQL) com Fallback Local Resiliente
 */

class DatabaseService {
  constructor() {
    this.storageKeyArticles = "legalmente_isabela_posts";
    this.storageKeySalt = "legalmente_isabela_admin_salt";
    this.storageKeyHash = "legalmente_isabela_admin_hash";
    this.storageKeyUrl = "legalmente_isabela_supabase_url";
    this.storageKeyKey = "legalmente_isabela_supabase_key";

    this.client = null;
    this.isConnected = false;
    this.initClient();
  }

  /* ===== Inicialização do Cliente Supabase ===== */

  cleanUrl(rawUrl) {
    if (!rawUrl) return "";
    return rawUrl.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
  }

  getCredentials() {
    const rawUrl = (localStorage.getItem(this.storageKeyUrl) || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "").trim();
    const anonKey = (localStorage.getItem(this.storageKeyKey) || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "").trim();
    return { url: this.cleanUrl(rawUrl), anonKey };
  }

  initClient() {
    const { url, anonKey } = this.getCredentials();

    if (url && anonKey && window.supabase && typeof window.supabase.createClient === "function") {
      try {
        this.client = window.supabase.createClient(url, anonKey);
        this.isConnected = true;
      } catch (e) {
        console.warn("Aviso ao conectar com Supabase, operando em modo local:", e);
        this.client = null;
        this.isConnected = false;
      }
    } else {
      this.client = null;
      this.isConnected = false;
    }
  }

  isConfigured() {
    const { url, anonKey } = this.getCredentials();
    return Boolean(url && anonKey && this.client);
  }

  async testConnection(customUrl, customKey) {
    try {
      if (!window.supabase || typeof window.supabase.createClient !== "function") {
        return { ok: false, error: "Biblioteca Supabase CDN não carregada." };
      }
      const testClient = window.supabase.createClient(this.cleanUrl(customUrl), customKey);
      const { data, error } = await testClient.from("artigos").select("id").limit(1);

      if (error) {
        return { ok: false, error: error.message || "Erro na consulta à tabela 'artigos'." };
      }
      return { ok: true, count: data ? data.length : 0 };
    } catch (e) {
      return { ok: false, error: e.message || "Falha na conexão de rede." };
    }
  }

  saveCloudCredentials(url, anonKey) {
    if (url) localStorage.setItem(this.storageKeyUrl, url.trim());
    else localStorage.removeItem(this.storageKeyUrl);

    if (anonKey) localStorage.setItem(this.storageKeyKey, anonKey.trim());
    else localStorage.removeItem(this.storageKeyKey);

    this.initClient();
  }

  /* ===== Operações com Artigos ===== */

  async fetchArticles(defaultArticles = []) {
    // 1. Tenta buscar no banco de dados na nuvem
    if (this.isConfigured()) {
      try {
        const { data, error } = await this.client
          .from("artigos")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          // Mapeia colunas do PostgreSQL para o padrão do frontend
          const mappedArticles = data.map(item => ({
            id: item.id,
            titulo: item.titulo,
            categoria: item.categoria,
            data: item.data,
            tempoLeitura: item.tempo_leitura || "5 min",
            autor: item.autor || "Isabela",
            resumo: item.resumo,
            conteudo: item.conteudo
          }));

          // Atualiza o cache local para velocidade e resiliência offline
          localStorage.setItem(this.storageKeyArticles, JSON.stringify(mappedArticles));
          return mappedArticles;
        } else if (!error && Array.isArray(data) && data.length === 0) {
          // Se a tabela do banco na nuvem estiver vazia, sincroniza os artigos iniciais
          await this.syncLocalToCloud(defaultArticles);
          return defaultArticles;
        }
      } catch (err) {
        console.warn("Falha de rede ao consultar Supabase, usando cache local:", err);
      }
    }

    // 2. Fallback resiliente: Carrega do armazenamento local ou artigos padrão
    try {
      const cached = localStorage.getItem(this.storageKeyArticles);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Erro ao ler cache local de artigos:", e);
    }

    return defaultArticles;
  }

  async saveArticle(article) {
    // Salva sempre no cache local
    const localArticles = this.getLocalArticles();
    const existingIndex = localArticles.findIndex(a => a.id === article.id);

    if (existingIndex >= 0) {
      localArticles[existingIndex] = article;
    } else {
      localArticles.unshift(article);
    }
    localStorage.setItem(this.storageKeyArticles, JSON.stringify(localArticles));

    // Se conectado à nuvem, sincroniza remotamente no PostgreSQL
    if (this.isConfigured()) {
      try {
        const payload = {
          id: article.id,
          titulo: article.titulo,
          categoria: article.categoria,
          data: article.data,
          tempo_leitura: article.tempoLeitura,
          autor: article.autor || "Isabela",
          resumo: article.resumo,
          conteudo: article.conteudo
        };

        const { error } = await this.client
          .from("artigos")
          .upsert(payload, { onConflict: "id" });

        if (error) {
          console.error("Erro ao gravar artigo no Supabase:", error);
          return { ok: false, localOnly: true, error: error.message };
        }
        return { ok: true, cloud: true };
      } catch (err) {
        console.warn("Erro de rede ao salvar no Supabase, mantido em cache local:", err);
        return { ok: true, localOnly: true };
      }
    }

    return { ok: true, localOnly: true };
  }

  async deleteArticle(id) {
    // Remove do cache local
    const localArticles = this.getLocalArticles().filter(a => a.id !== id);
    localStorage.setItem(this.storageKeyArticles, JSON.stringify(localArticles));

    // Se conectado à nuvem, remove do PostgreSQL
    if (this.isConfigured()) {
      try {
        const { error } = await this.client
          .from("artigos")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Erro ao excluir artigo no Supabase:", error);
          return { ok: false, error: error.message };
        }
        return { ok: true, cloud: true };
      } catch (err) {
        console.warn("Erro de rede ao excluir no Supabase:", err);
        return { ok: true, localOnly: true };
      }
    }

    return { ok: true, localOnly: true };
  }

  /* ===== Operações com Credenciais de Administradora ===== */

  async fetchAdminCredentials(defaultSalt, defaultHash) {
    // 1. Tenta buscar no banco de dados na nuvem (com timeout resiliente para mobile)
    if (this.isConfigured()) {
      try {
        const queryPromise = this.client
          .from("autora_config")
          .select("password_hash, salt")
          .eq("id", "admin_credentials")
          .maybeSingle();

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout ao conectar ao Supabase")), 3500)
        );

        const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

        if (!error && data && data.password_hash && data.salt) {
          localStorage.setItem(this.storageKeySalt, data.salt);
          localStorage.setItem(this.storageKeyHash, data.password_hash);
          return { salt: data.salt, hash: data.password_hash };
        }
      } catch (err) {
        console.warn("Falha de rede ao consultar credenciais na nuvem, usando locais:", err);
      }
    }

    // 2. Fallback resiliente: local
    const salt = localStorage.getItem(this.storageKeySalt) || defaultSalt;
    const hash = localStorage.getItem(this.storageKeyHash) || defaultHash;
    return { salt, hash };
  }

  async saveAdminCredentials(newHash, newSalt) {
    // Salva localmente
    localStorage.setItem(this.storageKeySalt, newSalt);
    localStorage.setItem(this.storageKeyHash, newHash);

    // Se conectado à nuvem, sincroniza na tabela autora_config
    if (this.isConfigured()) {
      try {
        const { error } = await this.client
          .from("autora_config")
          .upsert({
            id: "admin_credentials",
            password_hash: newHash,
            salt: newSalt,
            updated_at: new Date().toISOString()
          }, { onConflict: "id" });

        if (error) {
          console.error("Erro ao salvar nova senha no Supabase:", error);
          return { ok: false, error: error.message };
        }
        return { ok: true, cloud: true };
      } catch (err) {
        console.warn("Erro de conexão ao salvar nova senha na nuvem:", err);
        return { ok: true, localOnly: true };
      }
    }

    return { ok: true, localOnly: true };
  }

  /* ===== Sincronização em Massa (Local -> Nuvem) ===== */

  async syncLocalToCloud(articlesList) {
    if (!this.isConfigured() || !Array.isArray(articlesList) || articlesList.length === 0) {
      return { ok: false, message: "Banco não configurado ou lista vazia." };
    }

    try {
      const payloads = articlesList.map(art => ({
        id: art.id,
        titulo: art.titulo,
        categoria: art.categoria,
        data: art.data,
        tempo_leitura: art.tempoLeitura,
        autor: art.autor || "Isabela",
        resumo: art.resumo,
        conteudo: art.conteudo
      }));

      const { error } = await this.client
        .from("artigos")
        .upsert(payloads, { onConflict: "id" });

      if (error) throw error;
      return { ok: true, count: payloads.length };
    } catch (e) {
      console.error("Erro ao sincronizar artigos com a nuvem:", e);
      return { ok: false, error: e.message };
    }
  }

  getLocalArticles() {
    try {
      const data = localStorage.getItem(this.storageKeyArticles);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}

// Instância global para acesso transparente por toda a aplicação
window.dbService = new DatabaseService();
