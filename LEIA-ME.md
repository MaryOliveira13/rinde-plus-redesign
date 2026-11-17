# Rinde Plus — redesign conceitual

Homepage com o conteúdo e os componentes interativos atuais da Rinde Plus, reapresentados com fotografia em tela ampla, tipografia maior, cores naturais, navegação fixa e animações de entrada. Referência visual: https://www.igsas.com.tr/.

## Abrir

Com Node.js instalado, execute `node preview.mjs` nesta pasta e abra http://127.0.0.1:4173/. O servidor é necessário para carregar os componentes JavaScript originais. Para encerrar, pressione Ctrl+C no terminal.

## Conteúdo e funcionamento

- Mesmas seções: abertura e clientes, impacto, funcionalidades, vantagens, contato, instalação e rodapé.
- Indicadores expansíveis, abas/gráficos, carrossel de vantagens, temas, idiomas, menu e links da plataforma/WhatsApp preservados.
- As páginas Educação, Nosotros, privacidade e versões EN/PT continuam no domínio oficial; não foram reconstruídas.
- Imagens, fontes e componentes locais obtidos do site público da Rinde Plus em 16/11/2026. Créditos fotográficos originais mantidos no rodapé.
- Nenhum formulário, serviço de backend ou funcionalidade agronômica nova. Analytics do domínio original removido.
- Projeto independente de apresentação; não publicado no domínio da empresa.

## Edição

`redesign.css` contém a nova apresentação; `redesign.js`, os ajustes visuais adicionais. `index.html` e `assets/` preservam o conteúdo e os componentes do site existente. Não é uma cópia exata da İGSAŞ nem utiliza suas imagens ou código.

Verificado em desktop (1440px) e celular (390px): carregamento, menu, troca de abas e expansão dos indicadores. Não houve auditoria completa de desempenho, acessibilidade ou de todos os estados dos componentes.

## Texto líquido
O componente React/TSX está em components/ui/liquid-text.tsx e usa @paper-design/shaders-react (GemSmoke). A página continua estática, sem necessidade de migrar o restante para React. Para recompilar: npm install e npm run build. O bundle pronto está incluído. O efeito respeita redução de movimento e mantém texto estático quando WebGL2 não está disponível.

O componente usa estilos próprios e não depende de Tailwind ou shadcn. Para utilizá-lo futuramente em um projeto shadcn/TypeScript/Tailwind, inicialize esse projeto com npx shadcn@latest init e copie components/ui/liquid-text.tsx; components/ui é a pasta convencional dos componentes reutilizáveis.

## Atualização das seções
Referências consultadas no 21st.dev: Animated Tabs (https://21st.dev/@kuratlielia/components/tabs) e Scroll Reveal (https://docs.21st.dev/@cnippet-dev/components/scroll-reveal-2). Efeitos adaptados para APIs nativas: seleção deslizante, transição direcional curta e entrada opacity/y24 com ease-out. Código próprio em sections.js/sections.css, preservando componentes e informações originais. O mapa decorativo foi reaproveitado do hero original. Textos e controles ganharam cores de maior contraste; não foi feita auditoria integral WCAG.

Background da seção de funcionalidades: components/ui/dwd.tsx (Mesh drift fornecido pelo usuário), cores verde-floresta, petróleo e oliva. Entrada: mesh-entry.tsx. Bundle: assets/mesh-background.js. Movimento desacelerado e pausado fora da tela; redução de movimento mantém um quadro estático. Para recompilar os bundles usados pela página: npx esbuild mesh-entry.tsx --bundle --format=esm --minify --outfile=assets/mesh-background.js e npx esbuild shimmer-entry.tsx --bundle --format=esm --minify --outfile=assets/shimmer-text.js.

Gráficos: referências 21st.dev Animated Bar Chart (https://docs.21st.dev/@mirukullacode/components/chart-bar) e Chart Line (https://news.21st.dev/@mirukullacode/components/chart-line). Adaptação própria em charts.js/charts.css: barras em sequência, traçado progressivo, preenchimentos suaves e destaque no hover. Os cinco SVGs mantêm geometria, categorias e legendas originais, sem números ou séries novos.

Composição circular das vantagens: referência e ativos visuais da seção stats-animation de https://www.igsas.com.tr/. Foto circular, folha, barras/seta e pizza sem os textos/percentuais da empresa de referência. Rotação de -50 graus a 0 acompanhando o scroll. Ativos decorativos; confirmar direitos de uso antes de publicação comercial definitiva.

Seção de contato: foto sustan.jpg da referência İGSAŞ, parallax de fundo em velocidade 0.5 com suavização, inspirado no data-speed=.5 da seção de sustentabilidade. Animações sequenciais com redução de movimento respeitada. Confirmar direitos da foto antes da publicação comercial.

Fechamento: instalação com título em duas linhas e reveal igual à seção de impacto; cards de instruções com contraste escuro/claro e passos numerados. Rodapé com marca grande. Referências: https://21st.dev/@arihantcodes_1f7b8c4d/components/large-name-footer e https://www.awwwards.com/elements/footer/. Adaptação própria, sem novos textos comerciais ou funcionalidades.

Idiomas: index.html (ES), index-pt.html (PT) e index-en.html (EN), com conteúdo das versões oficiais e o mesmo redesign. O seletor navega entre as páginas locais. Controle de tema removido da interface; apresentação fixa no tema claro. navigation.js/navigation.css padronizam a navegação e animam o peso das letras a partir do centro, inspirados no exemplo VariableFontHover fornecido.

Adaptação mobile: mobile.css contém somente media queries de até 767px. Revisados hero, faixa de logos, indicadores, abas/gráficos, vantagens com composição circular, contato, instruções de instalação e rodapé. Conferidos ES/PT/EN em larguras 320, 390 e 430px ao longo da revisão; navegação e troca de abas verificadas. Comparação das propriedades de layout com mobile.css habilitado/desabilitado em 1440px confirmou que essa folha não altera o desktop.

## Otimização de carregamento
Imagens principais convertidas para WebP com transparência preservada. O hero usa picture/source para carregar apenas a versão desktop ou mobile. Os PNGs originais ficaram em work/original-assets (fora do pacote). Shimmer e Mesh Drift compartilham o runtime React em assets/optimized; efeitos de fundo carregam perto de entrar na tela. O shimmer oculto no mobile não é baixado. A foto de contato usa carregamento preguiçoso. O servidor preview.mjs fornece gzip, ETag e revalidação de cache.

Medição local em contextos novos, após load + 1s, recursos sem o HTML: mobile 8.344.968 → 1.011.651 bytes (~88% menos); desktop 5.280.173 → 1.208.778 bytes (~77% menos). O HTML otimizado transfere ~51KB com gzip. DOMContentLoaded observado no teste final: 389ms mobile e 371ms desktop. Tempos reais dependem da conexão e hospedagem. Recarregamentos transferiram ~16–17KB de revalidação dos recursos em vez de baixar os arquivos novamente.

Verificação: desktop em espanhol e mobile em português/inglês, fotos do hero/círculo/contato carregadas, shaders ativos quando a seção aparece, sem estouro horizontal e sem erros de JavaScript nas sessões verificadas. Para gerar os efeitos novamente, use npm run build; para visualizar, npm run preview. Em outra hospedagem, configurar compressão e cache equivalentes ao servidor local.

Intro de marca: assets/brand-intro.mp4 fornecido pelo usuário, reproduzido sem som e centralizado sobre preto, com dimensões responsivas. Os scripts de apresentação são iniciados após a intro para que as animações do hero comecem do zero. Botão para pular e recuperação em caso de erro de vídeo incluídos. A intro roda novamente ao recarregar ou trocar o idioma.
