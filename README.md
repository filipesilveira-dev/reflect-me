# Reflect Me

**Reflect Me** é uma aplicação web de reflexões guiadas, desenvolvida
originalmente como projeto de portfólio front-end e como parte de um
processo de aprendizagem prática com Angular.

A proposta é oferecer um espaço organizado em que profissionais possam
criar reflexões para seus pacientes e acompanhar o andamento das
respostas, enquanto os usuários consultam suas reflexões e registram
suas próprias respostas.

O projeto está atualmente em fase de **MVP expositivo**, com foco na
interface, na navegação, nas regras de negócio essenciais e na
demonstração de funcionalidades front-end. A arquitetura poderá evoluir
futuramente para incluir backend, banco de dados, autenticação e outras
capacidades.

> **Aviso:** a versão atual é demonstrativa e não deve ser utilizada
> para armazenar dados pessoais ou clínicos reais. O Reflect Me não
> realiza diagnósticos e não substitui acompanhamento profissional.

## Objetivos

-   Demonstrar habilidades de desenvolvimento front-end em uma aplicação
    com propósito e fluxos de uso definidos.
-   Praticar Angular, TypeScript, componentes standalone, roteamento,
    serviços, formulários e persistência local.
-   Organizar a experiência em áreas com responsabilidades diferentes
    para profissional e usuário.
-   Criar uma base funcional que possa ser aprimorada e expandida em
    versões futuras.

## Funcionalidades do MVP

### Área do profissional

-   Visão geral dos pacientes vinculados ao profissional.
-   Indicadores de reflexões totais, pendentes e respondidas.
-   Consulta ao histórico de reflexões.
-   Acesso à página individual de cada paciente.

### Página individual do paciente --- área do profissional

-   Consulta às reflexões associadas ao paciente selecionado.
-   Criação de novas reflexões.
-   Edição do texto de reflexões ainda pendentes.
-   Exclusão de reflexões ainda pendentes, com confirmação.
-   Atualização dos indicadores após as operações.
-   Mensagem de estado vazio quando ainda não há reflexões cadastradas.

### Área do usuário/paciente

-   Consulta às reflexões recebidas.
-   Envio de respostas às reflexões pendentes.
-   Consulta ao histórico de reflexões respondidas.
-   Edição e exclusão das próprias respostas, conforme as
    funcionalidades implementadas nessa área.

### Regras de negócio atuais

-   Cada profissional deve visualizar apenas os pacientes associados a
    ele na lógica implementada no front-end.
-   A página individual de um paciente é acessada a partir da área do
    profissional responsável.
-   O profissional pode editar ou excluir uma reflexão somente enquanto
    ela estiver pendente.
-   Reflexões respondidas não podem ser editadas ou excluídas pelas
    ações disponíveis ao profissional.
-   No modelo atual, uma reflexão é considerada pendente quando o campo
    `response` está vazio. O status não é armazenado em uma propriedade
    separada.

## Tecnologias

-   **Angular** --- framework principal da aplicação.
-   **TypeScript** --- tipagem dos modelos e implementação da lógica.
-   **Angular Router** --- navegação entre as páginas.
-   **Angular Forms (`ngModel`)** --- vinculação de campos e
    formulários.
-   **Tailwind CSS** --- estilização da interface.
-   **`localStorage`** --- persistência local das reflexões no
    navegador.

### Ambiente utilizado no desenvolvimento

-   Angular CLI 21.2.24
-   Node.js 22.14.0
-   npm 11.6.2

Essas versões registram o ambiente utilizado durante o desenvolvimento e
podem diferir das versões instaladas por outras pessoas.

## Como executar localmente

### Pré-requisitos

-   Node.js e npm instalados.
-   Git, caso deseje clonar o repositório.

### Instalação

Clone o repositório:

``` bash
git clone <URL-DO-REPOSITORIO>
cd <PASTA-DO-PROJETO>
```

Instale as dependências:

``` bash
npm install
```

Inicie o servidor de desenvolvimento:

``` bash
npx ng serve
```

Acesse `http://localhost:4200/` no navegador. O servidor de
desenvolvimento atualiza a aplicação conforme os arquivos são alterados.

> Substitua os marcadores de URL e pasta pelos dados do repositório.

## Estrutura da aplicação

A organização pode mudar conforme o projeto evolui. Entre as áreas
principais estão:

``` text
src/
└── app/
    ├── data/          # Dados fictícios para demonstração
    ├── models/        # Modelos e tipos, como User e Reflection
    ├── services/      # Operações e persistência das reflexões
    ├── login/         # Tela de login demonstrativa
    ├── professional/  # Visão geral do profissional
    ├── pacient/       # Página individual do paciente para o profissional
    ├── user/          # Área do usuário/paciente
    ├── app.routes.ts  # Configuração das rotas
    └── ...
```

Os arquivos de dados em `data/` fornecem registros fictícios para a
demonstração. O `ReflectionService` centraliza operações relacionadas às
reflexões e sua persistência local.

## Rotas principais

  ------------------------------------------------------------------------------
  Rota                                       Finalidade
  ------------------------------------------ -----------------------------------
  `/`                                        Redireciona para a tela de login

  `/login`                                   Tela de entrada demonstrativa

  `/professional/:professionalId`            Visão geral do profissional

  `/professional/:professionalId/user/:id`   Página individual do paciente,
                                             acessada pelo profissional

  `/user/:id`                                Área do usuário/paciente
  ------------------------------------------------------------------------------

Os identificadores são utilizados para localizar os registros de
demonstração. Eles não equivalem a uma autenticação real nem garantem
autorização segura.

## Persistência e limitações atuais

A versão atual utiliza `localStorage` para manter as reflexões no
navegador. Isso permite que os dados persistam entre recarregamentos no
mesmo navegador, mas não oferece sincronização entre dispositivos ou
usuários.

Outras limitações relevantes:

-   Não há backend ou banco de dados remoto.
-   O login e os dados utilizados são demonstrativos.
-   A navegação por rotas e os filtros executados no front-end não
    constituem mecanismos de segurança.
-   Os dados podem ser removidos quando o armazenamento do navegador é
    limpo.
-   A aplicação ainda não deve ser considerada adequada para uso clínico
    ou para armazenar informações pessoais reais.

Antes de uma eventual utilização real, será necessário avaliar e
implementar, entre outros requisitos, backend, autenticação e
autorização efetivas, armazenamento seguro, validação no servidor,
privacidade e conformidade legal aplicável.

## Possíveis evoluções

O projeto poderá evoluir gradualmente para incluir:

-   API e banco de dados.
-   Autenticação real e autorização por perfil.
-   Proteção de recursos no servidor para assegurar o vínculo entre
    profissionais e pacientes.
-   Persistência e sincronização entre dispositivos.
-   Testes automatizados para os principais fluxos.
-   Melhorias de acessibilidade, responsividade e tratamento de erros.
-   Revisão de requisitos de privacidade e segurança antes de qualquer
    uso com dados reais.

Esses pontos representam possibilidades futuras, não funcionalidades já
disponíveis na versão atual.

## Direitos autorais

© 2026 --- Autor do projeto Reflect Me. Todos os direitos reservados.

O Reflect Me é uma elaboração original de seu autor. A ausência de uma
licença de software específica neste repositório **não significa que o
projeto esteja em domínio público nem concede autorização automática
para copiar, redistribuir, modificar, publicar ou explorar
comercialmente o código, o conteúdo ou outros materiais originais do
projeto**.

Salvo autorização expressa do titular dos direitos ou outra hipótese
permitida pela legislação aplicável, os direitos sobre os elementos
originais do projeto são reservados. A visualização pública do
repositório tem finalidade expositiva e de portfólio; não deve ser
interpretada, por si só, como concessão de uma licença de reutilização.

Este aviso é informativo e não substitui orientação jurídica. Caso o
projeto venha a ser distribuído ou utilizado por terceiros, recomenda-se
definir uma licença e os respectivos termos de uso de forma expressa.

## Sobre o projeto

O Reflect Me faz parte de um portfólio de desenvolvimento front-end e
demonstra a construção incremental de uma aplicação com interface,
navegação por perfil, regras de negócio e gerenciamento de dados no
cliente.

A visão de longo prazo é manter uma base simples e funcional que possa
ser ampliada de maneira gradual, preservando a clareza da experiência e
a separação de responsabilidades entre as áreas do profissional e do
usuário.
