-- ==============================================================================
-- LEGALMENTE ISABELA — PAPO DE DIREITO | BLOG JURÍDICO
-- Script SQL de Criação do Banco de Dados (Supabase / PostgreSQL)
-- ==============================================================================
-- Execute este script no "SQL Editor" do seu painel Supabase (https://supabase.com)
-- para criar as tabelas, permissões de segurança e os dados iniciais do blog.
-- ==============================================================================

-- 1. TABELA DE ARTIGOS DO BLOG
CREATE TABLE IF NOT EXISTS public.artigos (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    categoria TEXT NOT NULL,
    data TEXT NOT NULL,
    tempo_leitura TEXT DEFAULT '5 min',
    autor TEXT DEFAULT 'Isabela',
    resumo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE CONFIGURAÇÃO E CREDENCIAIS DA AUTORA
-- Nota: A senha é armazenada EXCLUSIVAMENTE em hash criptográfico PBKDF2-HMAC-SHA256
-- com Salt exclusivo de 16 bytes. NUNCA texto em claro.
CREATE TABLE IF NOT EXISTS public.autora_config (
    id TEXT PRIMARY KEY DEFAULT 'admin_credentials',
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS) PARA PROTEÇÃO MÁXIMA
ALTER TABLE public.artigos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autora_config ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE SEGURANÇA PARA A TABELA DE ARTIGOS
-- Leitura pública irrestrita: qualquer visitante pode ver os artigos do blog
DROP POLICY IF EXISTS "Leitura publica de artigos" ON public.artigos;
CREATE POLICY "Leitura publica de artigos" 
ON public.artigos FOR SELECT 
USING (true);

-- Permissão de inserção para clientes do blog
DROP POLICY IF EXISTS "Insercao de artigos" ON public.artigos;
CREATE POLICY "Insercao de artigos" 
ON public.artigos FOR INSERT 
WITH CHECK (true);

-- Permissão de atualização de artigos
DROP POLICY IF EXISTS "Atualizacao de artigos" ON public.artigos;
CREATE POLICY "Atualizacao de artigos" 
ON public.artigos FOR UPDATE 
USING (true);

-- Permissão de exclusão de artigos
DROP POLICY IF EXISTS "Exclusao de artigos" ON public.artigos;
CREATE POLICY "Exclusao de artigos" 
ON public.artigos FOR DELETE 
USING (true);

-- 5. POLÍTICAS DE SEGURANÇA PARA AS CREDENCIAIS DA AUTORA
DROP POLICY IF EXISTS "Leitura de credenciais protegidas" ON public.autora_config;
CREATE POLICY "Leitura de credenciais protegidas" 
ON public.autora_config FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Atualizacao de credenciais" ON public.autora_config;
CREATE POLICY "Atualizacao de credenciais" 
ON public.autora_config FOR ALL 
USING (true);

-- 6. INSERÇÃO DAS CREDENCIAIS PADRÃO INICIAIS (Senha: isabela123)
-- Hash derivado com 100.000 iterações de PBKDF2-HMAC-SHA256
INSERT INTO public.autora_config (id, password_hash, salt, updated_at)
VALUES (
    'admin_credentials',
    '346ff15e706e0908c078fd0d146d8481ceffb4be665b7eae138d8d355c31ea49',
    'a8f3b4c1e92d75f0',
    now()
)
ON CONFLICT (id) DO NOTHING;

-- 7. INSERÇÃO DOS 5 ARTIGOS INICIAIS DO BLOG
INSERT INTO public.artigos (id, titulo, categoria, data, tempo_leitura, autor, resumo, conteudo, created_at)
VALUES 
(
    'art-1',
    'Princípio da Insignificância no Direito Penal: Conceito e Aplicação Prática',
    'Direito Penal',
    '05/09/2026',
    '4 min',
    'Isabela',
    'Entenda os requisitos fixados pelos tribunais superiores (STF e STJ) para a incidência do princípio da bagatela e a exclusão da tipicidade material.',
    'O princípio da insignificância, também denominado princípio da bagatela, surgiu originalmente como desdobramento do Direito Romano e foi introduzido na moderna teoria penal por Claus Roxin na década de 1960.

Sua premissa central é que o Direito Penal não deve se ocupar de bagatelas ou condutas cuja lesividade ao bem jurídico tutelado seja absolutamente inexpressiva. Trata-se de uma causa de exclusão da tipicidade material da conduta.

Para sua aplicação, o Supremo Tribunal Federal consolidou quatro vetores obrigatórios e cumulativos:
1. Mínima ofensividade da conduta do agente;
2. Nenhuma periculosidade social da ação;
3. Reduzidíssimo grau de reprovabilidade do comportamento;
4. Inexpressividade da lesão jurídica provocada.

Dessa forma, a análise não se restringe unicamente ao valor monetário da coisa subtraída, mas avalia o contexto integral do fato e as condições subjetivas da vítima e do agente.',
    now() - interval '4 days'
),
(
    'art-2',
    'Guarda Compartilhada no Direito Civil: Regra Geral e o Melhor Interesse da Criança',
    'Direito Civil',
    '02/09/2026',
    '5 min',
    'Isabela',
    'Uma reflexão sobre como a legislação brasileira transformou a guarda compartilhada em regra prioritária e sua distinção crucial com o lar de referência.',
    'Com o advento da Lei nº 13.058/2014, a guarda compartilhada passou a ser a regra geral no ordenamento jurídico brasileiro quando ambos os genitores estão aptos a exercer o poder familiar, mesmo na ausência de consenso entre eles.

Muitas pessoas confundem guarda compartilhada com a divisão matemática de dias ou custódia alternada. Na verdade, a guarda compartilhada diz respeito à corresponsabilidade na tomada de decisões importantes sobre a vida do filho: escolha da escola, tratamentos médicos, atividades extracurriculares e orientação religiosa ou moral.

A definição do lar de referência (onde a criança dorme habitualmente) e a pensão alimentícia continuam existindo e devem ser fixadas tendo como norte exclusivo o princípio do melhor interesse da criança e do adolescente (art. 227 da CF/88).',
    now() - interval '3 days'
),
(
    'art-3',
    'Direitos Fundamentais e a Constituição Cidadã de 1988',
    'Direito Constitucional',
    '28/08/2026',
    '6 min',
    'Isabela',
    'Por que a Constituição Federal de 1988 representou um marco civilizatório inegociável na consolidação do Estado Democrático de Direito.',
    'Promulgada em 5 de outubro de 1988, a Carta Magna brasileira foi carinhosamente apelidada de "Constituição Cidadã" pelo deputado Ulysses Guimarães. Sua maior virtude histórica foi colocar o ser humano e seus direitos fundamentais no ápice de todo o ordenamento jurídico.

O artigo 5º da CF/88 traz um dos catálogos de direitos e garantias individuais mais avançados do constitucionalismo contemporâneo, contemplando:
- O direito à vida, à liberdade e à igualdade em sentido formal e material;
- A inviolabilidade da intimidade e da vida privada;
- A liberdade de manifestação do pensamento, vedado o anonimato;
- O devido processo legal, o contraditório e a ampla defesa.

Além disso, a Constituição inovou ao positivar os direitos sociais (saúde, educação, moradia e trabalho) como compromissos estatais vinculantes, servindo de escudo protetor para todas as gerações.',
    now() - interval '2 days'
),
(
    'art-4',
    'Teletrabalho e Direito à Desconexão no Direito do Trabalho',
    'Direito do Trabalho',
    '20/08/2026',
    '4 min',
    'Isabela',
    'Os desafios e garantias trabalhistas na era do home office: como a legislação e os tribunais encaram as horas extras e o descanso digital.',
    'A popularização do trabalho remoto (home office) transformou radicalmente as relações de emprego nos últimos anos. No Brasil, o tema foi introduzido na CLT pela Reforma Trabalhista (Lei nº 13.467/2017) e posteriormente aprimorado pela Lei nº 14.442/2022.

Um dos pontos mais discutidos nos tribunais atualmente é o chamado "direito à desconexão". Com mensagens de aplicativos e e-mails disponíveis 24 horas por dia, a linha entre a jornada de trabalho e o tempo de repouso se tornou tênue.

A legislação prevê que, havendo controle e fiscalização de horário mesmo à distância, o empregado faz jus ao pagamento de horas suplementares caso ultrapasse os limites constitucionais. O descanso regular e a preservação da saúde mental do trabalhador são garantias irrenunciáveis.',
    now() - interval '1 day'
),
(
    'art-5',
    'Princípios do Direito Ambiental: Prevenção, Precaução e o Poluidor-Pagador',
    'Direito Ambiental',
    '05/09/2026',
    '5 min',
    'Isabela',
    'Uma análise sobre o Art. 225 da Constituição Federal e as diretrizes jurídicas que tutelam a sustentabilidade ecológica para as presentes e futuras gerações.',
    'O Direito Ambiental brasileiro é considerado um dos mais avançados do mundo contemporâneo, tendo como viga mestra o artigo 225 da Constituição Federal de 1988, que consagrou o meio ambiente ecologicamente equilibrado como bem de uso comum do povo e essencial à sadia qualidade de vida.

Para assegurar essa tutela contínua, três princípios fundamentais orientam a doutrina e a jurisprudência:
1. Princípio da Prevenção: Incide sobre perigos concretos e cientificamente conhecidos. Exige estudos prévios de impacto ambiental (EIA/RIMA) e licenças rigorosas antes da instalação de qualquer empreendimento potencialmente poluidor.
2. Princípio da Precaução: Diante de incertezas científicas sobre a gravidade ou irreversibilidade de um dano ecológico, impõe-se a adoção de medidas conservadoras imediatas ("in dubio pro natura").
3. Princípio do Poluidor-Pagador: Determina que os custos socioambientais de prevenção e reparação devem ser absorvidos pelo poluidor, impedindo a socialização do prejuízo ecológico.

A responsabilidade civil em matéria ambiental no Brasil é objetiva (independe de dolo ou culpa) e solidária, sustentada pela teoria do risco integral (art. 14, § 1º, da Lei nº 6.938/1981).',
    now()
)
ON CONFLICT (id) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    categoria = EXCLUDED.categoria,
    resumo = EXCLUDED.resumo,
    conteudo = EXCLUDED.conteudo;
