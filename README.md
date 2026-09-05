# ⚖️ Legalmente Isabela — Papo de Direito | Blog Jurídico

Um blog jurídico editorial moderno, seguro e sofisticado, desenvolvido para o estudo, a pesquisa acadêmica e o compartilhamento de reflexões sobre as diversas áreas do Direito.

Construído com **HTML5 semântico**, **CSS3 puro (Design System Rosê Gold & Editorial)**, **JavaScript moderno (ES6+)** e **Web Crypto API nativa** para autenticação e segurança de nível bancário.

---

## 🌟 Principais Recursos

### 🏛️ Conteúdo Jurídico Especializado
- **5 Áreas do Direito**: *Direito Penal*, *Direito Civil*, *Direito Constitucional*, *Direito do Trabalho* e *Direito Ambiental*.
- **Feed Dinâmico de Artigos**: Busca textual em tempo real e filtros instantâneos por categoria.
- **Leitor Modal Confortável**: Tipografia agradável para leitura acadêmica de artigos completos.
- **Curiosidades Jurídicas**: Fatos históricos, leis e origens de expressões latinas com busca dinâmica.
- **Glossário Jurídico**: Dicionário de termos jurídicos com filtro alfabético interativo (A-Z).
- **Banner Hero Editorial em CSS Puro**: Design harmônico com paleta nude/rosê gold, balança da justiça e livros com lombadas detalhadas.

### 🛡️ Segurança & Gestão da Autora (Área Administrativa)
- **Criptografia PBKDF2-HMAC-SHA256**: Derivação criptográfica nativa via `crypto.subtle` com 100.000 iterações e salt aleatório de 16 bytes.
- **Zero Senhas em Texto Claro**: A senha digitada nunca é exposta no código ou armazenada em texto puro.
- **Mitigação contra Timing Attacks**: Comparação de hashes em tempo constante bitwise (`timingSafeEqual`).
- **Proteção contra Força Bruta (Rate Limiting)**: Bloqueio automático de 60 segundos após 5 tentativas incorretas.
- **Expiração de Sessão por Inatividade**: Sessão protegida em `sessionStorage` que expira após 60 minutos sem uso.
- **Sanitização Rigorosa contra XSS**: Escape de entidades HTML em todas as entradas e saídas.
- **Painel de Controle da Autora**:
  - Métricas e contagem de publicações por área do Direito.
  - Troca segura de senha com rederivação imediata de salt e hash.
  - **Backup & Restauração (.json)**: Exporte todas as postagens ou restaure com validação de esquema.
- **Gerenciamento de Foto da Autora**: Carregamento local da foto de perfil com compressão e remoção segura.

---

## 📁 Estrutura do Projeto

```text
sitejuridico/
├── index.html            # Página inicial: Hero, feed do blog, categorias e modais
├── sobre.html            # Trajetória e apresentação da autora
├── direitos.html         # Panorama explicativo das 7 áreas do Direito
├── curiosidades.html     # Acervo de curiosidades e história jurídica
├── glossario.html        # Dicionário de termos e brocardos jurídicos
├── 404.html              # Página de erro 404 personalizada e estilizada
│
├── css/
│   └── style.css         # Design system completo, variáveis e responsividade
│
├── js/
│   ├── blog.js           # Gerenciador de publicações, segurança PBKDF2 e admin
│   ├── script.js         # Menu mobile responsivo e acordeões
│   └── data.js           # Dados estáticos de curiosidades e termos
│
├── assets/
│   ├── favicon.svg       # Favicon vetorial com o monograma editorial 'I'
│   └── img/              # Imagens dos cards, categorias e ilustrações
│
├── robots.txt            # Diretrizes para robôs de busca (SEO)
├── sitemap.xml           # Mapa do site para indexação no Google
├── vercel.json           # Configuração de headers de segurança para Vercel
├── _headers              # Headers de segurança e cache para Cloudflare/Netlify
└── _redirects            # Roteamento limpo e fallback 404 para Netlify
```

---

## 🚀 Como Hospedar (Passo a Passo)

O sistema é 100% estático no frontend, o que significa que **não requer servidor Node.js, PHP ou banco de dados relacional**. Ele pode ser hospedado gratuitamente e em poucos minutos em qualquer provedor de hospedagem estática.

### Opção 1: GitHub Pages (Recomendado & Gratuito)

1. Faça o commit e envie os arquivos para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "Publicação do blog Legalmente Isabela"
   git push origin main
   ```
2. No seu repositório no GitHub, clique na aba **Settings**.
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment > Branch**, selecione a branch `main` e a pasta `/ (root)`.
5. Clique em **Save**.
6. Em cerca de 1 a 2 minutos, o GitHub fornecerá o link público (ex: `https://seu-usuario.github.io/sitejuridico/`).

---

### Opção 2: Vercel (Deploy Instantâneo em 1 Clique)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Clique em **Add New Project** e importe o seu repositório do GitHub.
3. Deixe as configurações de build vazias (é um projeto HTML estático).
4. O arquivo `vercel.json` incluído já configurará automaticamente:
   - URLs limpas sem extensão `.html`
   - Cabeçalhos de segurança HTTP (CSP, X-Content-Type-Options, X-Frame-Options)
   - Cache otimizado para imagens e estilos
5. Clique em **Deploy**. O site estará no ar em segundos com certificado SSL/HTTPS automático!

---

### Opção 3: Netlify (Arrastar e Soltar ou via GitHub)

1. Crie uma conta em [netlify.com](https://netlify.com).
2. **Método Rápido**: Arraste a pasta do projeto `sitejuridico` diretamente para a área **Drop your site output folder here**.
3. **Método Git**: Conecte sua conta GitHub e selecione o repositório.
4. Os arquivos `_headers` e `_redirects` incluídos já configuram cabeçalhos de segurança e a página de erro `404.html`.

---

### Opção 4: Cloudflare Pages

1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/) e vá em **Workers & Pages**.
2. Clique em **Create application > Pages > Connect to Git**.
3. Selecione o repositório. Em **Build configuration**, selecione **None** e deixe o diretório de saída como vazio/raiz.
4. Clique em **Save and Deploy**.

---

### Opção 5: Servidor Tradicional (Hostinger, cPanel, Locaweb, Apache, Nginx)

1. Conecte-se ao seu servidor via FTP ou pelo Gerenciador de Arquivos do cPanel.
2. Faça o upload de todo o conteúdo da pasta `sitejuridico` para o diretório `public_html` (ou raiz do domínio).
3. O site funcionará imediatamente com HTTPS.

---

## 🔐 Acesso da Autora (Painel de Administração)

- **Como acessar**: Clique no botão **"🔐 Área da Autora"** no canto superior direito da página inicial ou no rodapé.
- **Senha inicial padrão**: `isabela123`
- **Como alterar a senha**:
  1. Faça login na Área da Autora.
  2. Clique no botão **"⚙️ Painel"** na barra superior.
  3. No bloco **Segurança & Criptografia da Senha**, digite a senha atual e defina uma nova senha forte (mínimo de 8 caracteres).
  4. O sistema gera automaticamente um novo *salt* e deriva a nova chave com PBKDF2.
- **Backup dos Dados**: No mesmo painel, use o botão **"📥 Exportar Backup (.json)"** para salvar seus artigos e levá-los para qualquer dispositivo ou navegador.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com acessibilidade (WAI-ARIA).
- **CSS3 Moderno**: Variáveis CSS, Flexbox, CSS Grid, Glassmorphism, gradientes suaves e tipografia Google Fonts (`Cinzel`, `Cormorant Garamond`, `Montserrat`).
- **JavaScript (ES6+)**: Lógica modular, manipuladores assíncronos e renderização dinâmica.
- **Web Crypto API (`crypto.subtle`)**: PBKDF2-HMAC-SHA256, salting criptográfico e comparação em tempo constante.
- **Web Storage API**: `localStorage` para artigos e `sessionStorage` para controle de sessão da autora.

---

## 📄 Licença

Este projeto é de uso pessoal e acadêmico de **Isabela — Legalmente Isabela (Papo de Direito)**. Todos os direitos reservados.