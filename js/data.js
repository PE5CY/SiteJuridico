/* Dados compartilhados do site — curiosidades e glossário jurídico.
   Conteúdo de caráter geral e educativo; não substitui aconselhamento jurídico. */

const CURIOSIDADES = [
  {
    categoria: "Constitucional",
    titulo: "A \"Constituição Cidadã\"",
    texto: "A Constituição Federal de 1988 é apelidada de \"Constituição Cidadã\" por Ulysses Guimarães, em razão da ampla participação popular em sua elaboração e da extensa lista de direitos e garantias fundamentais que trouxe."
  },
  {
    categoria: "História do Direito",
    titulo: "A Lei Áurea e o fim da escravidão",
    texto: "O Brasil foi o último país das Américas a abolir a escravidão, com a assinatura da Lei Áurea em 13 de maio de 1888 pela Princesa Isabel, então regente do Império."
  },
  {
    categoria: "Consumidor",
    titulo: "Um CDC admirado mundo afora",
    texto: "O Código de Defesa do Consumidor (Lei nº 8.078/1990) é frequentemente citado como referência internacional por reunir princípios modernos de proteção, como a inversão do ônus da prova em favor do consumidor."
  },
  {
    categoria: "Processo Penal",
    titulo: "Por que \"habeas corpus\"?",
    texto: "A expressão vem do latim e significa literalmente \"que tenhas o teu corpo\", remetendo à ordem para que alguém detido ilegalmente seja apresentado à Justiça, protegendo o direito de ir e vir."
  },
  {
    categoria: "Processo Penal",
    titulo: "O direito ao silêncio",
    texto: "Permanecer calado durante um interrogatório é um direito constitucional (art. 5º, LXIII, da CF/88) e jamais pode ser interpretado como confissão ou admissão de culpa."
  },
  {
    categoria: "Trabalhista",
    titulo: "Uma consolidação de décadas",
    texto: "A CLT — Consolidação das Leis do Trabalho — entrou em vigor em 1943 e, apesar de reformas ao longo do tempo (como a de 2017), continua sendo a espinha dorsal do Direito do Trabalho brasileiro."
  },
  {
    categoria: "Latim Jurídico",
    titulo: "\"Dura lex, sed lex\"",
    texto: "Expressão latina que significa \"a lei é dura, mas é a lei\", usada para lembrar que, mesmo quando rigorosa, a norma deve ser cumprida enquanto estiver em vigor."
  },
  {
    categoria: "Direito Digital",
    titulo: "O que é o \"direito ao esquecimento\"?",
    texto: "Tema debatido no direito digital e da personalidade, discute em que medida uma pessoa pode pedir a remoção ou desindexação de informações antigas e verídicas sobre si da internet."
  },
  {
    categoria: "Direito Digital",
    titulo: "A LGPD e sua inspiração europeia",
    texto: "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) foi fortemente inspirada no Regulamento Geral de Proteção de Dados (GDPR) da União Europeia, adaptado à realidade brasileira."
  },
  {
    categoria: "Constitucional",
    titulo: "Quem é julgado pelo júri popular?",
    texto: "No Brasil, o Tribunal do Júri julga exclusivamente os crimes dolosos contra a vida (como homicídio e infanticídio), conforme prevê o art. 5º, XXXVIII, da Constituição Federal."
  },
  {
    categoria: "Latim Jurídico",
    titulo: "\"In dubio pro reo\"",
    texto: "Princípio segundo o qual, havendo dúvida razoável sobre a culpa do acusado, a decisão deve favorecê-lo — um dos pilares do processo penal moderno."
  },
  {
    categoria: "Civil",
    titulo: "Três formas de testamento",
    texto: "O Código Civil brasileiro prevê o testamento público, o cerrado e o particular (feito de próprio punho), cada um com formalidades próprias para garantir sua validade."
  },
  {
    categoria: "Civil",
    titulo: "Animais de estimação e a lei",
    texto: "Formalmente, o Código Civil ainda classifica animais como \"bens móveis\". Na prática, porém, decisões judiciais brasileiras já reconheceram vínculo afetivo em disputas de guarda de pets após separações."
  },
  {
    categoria: "Civil",
    titulo: "Maioridade e responsabilidades",
    texto: "A maioridade civil é atingida aos 18 anos completos no Brasil. Antes disso, crianças e adolescentes são protegidos por um estatuto próprio: o ECA (Lei nº 8.069/1990)."
  },
  {
    categoria: "Civil",
    titulo: "Usucapião: a posse que vira propriedade",
    texto: "O usucapião permite adquirir a propriedade de um bem pelo uso contínuo, pacífico e prolongado, mesmo sem título formal — desde que preenchidos os requisitos previstos em lei."
  },
  {
    categoria: "Direitos Humanos",
    titulo: "A origem do nome \"Lei Maria da Penha\"",
    texto: "A Lei nº 11.340/2006 recebeu o nome de Maria da Penha Maia Fernandes, farmacêutica cearense que se tornou símbolo da luta contra a violência doméstica após sobreviver a duas tentativas de feminicídio."
  },
  {
    categoria: "Curiosidade Histórica",
    titulo: "O Código de Hamurabi",
    texto: "Um dos primeiros conjuntos de leis escritas da humanidade, criado na Babilônia por volta de 1750 a.C., já trazia a ideia de proporcionalidade entre a ofensa e a punição."
  },
  {
    categoria: "Constitucional",
    titulo: "Quantos artigos tem a Constituição?",
    texto: "A Constituição Federal de 1988 possui 250 artigos no corpo permanente, além do Ato das Disposições Constitucionais Transitórias (ADCT), e já recebeu dezenas de emendas."
  },
  {
    categoria: "Trabalhista",
    titulo: "Férias: um direito social",
    texto: "O direito a 30 dias de férias remuneradas por ano trabalhado está previsto na Constituição Federal como direito social dos trabalhadores urbanos e rurais (art. 7º, XVII)."
  },
  {
    categoria: "Latim Jurídico",
    titulo: "\"Pacta sunt servanda\"",
    texto: "Máxima latina que significa \"os pactos devem ser cumpridos\" — base do princípio da força obrigatória dos contratos no Direito Civil."
  },
  {
    categoria: "Consumidor",
    titulo: "O prazo de reflexão nas compras online",
    texto: "Compras feitas fora do estabelecimento comercial — como pela internet ou telefone — têm prazo de arrependimento de 7 dias, garantido pelo art. 49 do Código de Defesa do Consumidor."
  },
  {
    categoria: "Direitos Humanos",
    titulo: "Declaração Universal dos Direitos Humanos",
    texto: "Adotada pela ONU em 1948, a Declaração é composta por 30 artigos e serviu de base para diversas constituições e tratados de direitos humanos ao redor do mundo."
  },
  {
    categoria: "Curiosidade Histórica",
    titulo: "A origem da toga",
    texto: "O uso de togas por magistrados e advogados remonta à tradição romana, em que vestes longas simbolizavam autoridade, sobriedade e igualdade perante a lei."
  },
  {
    categoria: "Processo Penal",
    titulo: "Presunção de inocência",
    texto: "Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória — é o princípio da presunção de inocência, previsto no art. 5º, LVII, da CF/88."
  }
];

const CATEGORIAS_CURIOSIDADES = ["Todas", ...Array.from(new Set(CURIOSIDADES.map(c => c.categoria))).sort()];

const GLOSSARIO = [
  { termo: "Ação", definicao: "Direito de provocar o Poder Judiciário para que resolva um conflito de interesses." },
  { termo: "Acórdão", definicao: "Decisão colegiada proferida por um tribunal, tomada por mais de um julgador." },
  { termo: "Alienação", definicao: "Ato de transferir a propriedade de um bem a outra pessoa, por venda, doação ou outra forma." },
  { termo: "Apelação", definicao: "Recurso cabível contra sentença, usado para levar a decisão a uma instância superior." },
  { termo: "Boa-fé", definicao: "Princípio que presume conduta honesta e leal das partes em uma relação jurídica." },
  { termo: "Cláusula", definicao: "Disposição específica dentro de um contrato ou lei que estabelece uma condição ou regra." },
  { termo: "Contraditório", definicao: "Princípio que garante às partes o direito de se manifestar sobre todos os atos do processo." },
  { termo: "Culpa", definicao: "Conduta negligente, imprudente ou imperita que causa dano a outrem, sem intenção direta." },
  { termo: "Dolo", definicao: "Intenção deliberada de praticar um ato ilícito ou de enganar outra pessoa em um negócio jurídico." },
  { termo: "Ementa", definicao: "Resumo oficial do conteúdo de uma decisão judicial ou lei, geralmente no início do texto." },
  { termo: "Habeas Corpus", definicao: "Remédio constitucional que protege o direito de locomoção contra prisão ou ameaça ilegal." },
  { termo: "Impetrante", definicao: "Pessoa que ingressa com um mandado de segurança ou habeas corpus perante a Justiça." },
  { termo: "Jurisprudência", definicao: "Conjunto de decisões reiteradas dos tribunais sobre determinado tema, usado como referência." },
  { termo: "Litígio", definicao: "Conflito de interesses levado à apreciação do Poder Judiciário." },
  { termo: "Mandado de Segurança", definicao: "Ação que protege direito líquido e certo violado por ato ilegal de autoridade pública." },
  { termo: "Novação", definicao: "Substituição de uma obrigação por outra nova, extinguindo a anterior." },
  { termo: "Ônus da Prova", definicao: "Responsabilidade de uma das partes em comprovar os fatos alegados no processo." },
  { termo: "Precedente", definicao: "Decisão judicial anterior usada como referência para julgar casos semelhantes." },
  { termo: "Querela", definicao: "Termo usado para designar litígio, disputa ou queixa em contextos jurídicos mais antigos." },
  { termo: "Recurso", definicao: "Instrumento processual usado para pedir a revisão de uma decisão judicial." },
  { termo: "Sentença", definicao: "Decisão do juiz que põe fim a uma fase do processo, resolvendo ou não o mérito da causa." },
  { termo: "Trânsito em Julgado", definicao: "Momento em que uma decisão judicial se torna definitiva, sem possibilidade de novos recursos." },
  { termo: "Usucapião", definicao: "Modo de adquirir a propriedade de um bem pela posse prolongada, pacífica e contínua." },
  { termo: "Vigência", definicao: "Período em que uma lei ou norma está em vigor e produz efeitos jurídicos." },
  { termo: "Writ", definicao: "Termo informal usado no meio jurídico para se referir a remédios constitucionais, como o habeas corpus e o mandado de segurança." }
];
