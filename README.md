# Portal Estapar B2B

Aplicação Next.js para gerenciamento de garagens habilitadas para mensalistas digitais. O projeto usa dados mockados com rotas `/api` para simular contratos de backend.

Este projeto foi desenvolvido como desafio técnico para uma vaga de Desenvolvedor Front-end Pleno na Estapar. O objetivo é criar uma interface funcional e responsiva baseada nos requisitos fornecidos em design e API mockada, simulando a operação real de um sistema usado por gestores da Estapar.

Design de referência:

```text
https://www.figma.com/design/cwvQ8KyQNAu2eiXsSfok73/Figma-basics?node-id=1669-162202&p=f
```

Deploy:

```text
https://estapar-sooty.vercel.app/
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Sonner

## Requisitos

- Node.js compatível com Next.js 16
- pnpm

## Como rodar

Instale as dependências:

```bash
pnpm install
```

Rode o servidor de desenvolvimento:

```bash
pnpm dev
```

Acesse:

```text
http://localhost:3000
```

## Login

A autenticação é mockada em `/api/login`.

Usuário disponível em `src/mocks/users.ts`:

```text
email: roberto.freitas@estapar.com.br
senha: 12345
```

Consulte o arquivo de mock para a senha correspondente.

## Estrutura

```text
src/app/
  api/                 Rotas mockadas usadas como contrato de API
  garagens/            Página e componentes da listagem/detalhes de garagens
  login/               Página e formulário de login
  mensalistas/         Página de mensalistas
  loading.tsx          Fallback global de carregamento
  not-found.tsx        Página 404 customizada

src/components/
  ui/                  Componentes shadcn/ui
  *.tsx                Componentes compartilhados da aplicação

src/lib/
  utils.ts             Helpers compartilhados
  mock-api-delay.ts    Delay artificial para simular chamadas de API
  session-cookie.ts    Configuração do cookie de sessão

src/mocks/
  garages.ts           Dados mockados de garagens
  users.ts             Usuários mockados

src/types/
  garage.ts            Tipos de garagem, planos, descontos e configurações
  user.ts              Tipo de usuário autenticado
```

## Funcionalidades

- Login mockado com cookie HTTP-only.
- Layout autenticado com navegação lateral.
- Listagem de garagens via `/api/garages`.
- Filtro por mensalista digital e busca por nome com debounce simulado.
- Detalhes da garagem em sheet lateral.
- QR Code real por garagem.
- Tabs para planos, descontos e configurações.
- Criação e edição de planos em modal.
- Formulário de plano com React Hook Form + Zod.
- Salvamento de plano via `/api/garage-plans` com delay simulado.
- Toast de confirmação ao salvar.
- Página 404 customizada para rotas não mapeadas.
- Loading global do App Router para transições/carregamentos de rota.

## API Mock

As telas sempre chamam rotas internas em `/api`, mesmo usando dados mockados.

Rotas atuais:

- `GET /api/garages`
- `POST /api/garage-plans`
- `POST /api/login`
- `POST /api/logout`

O delay artificial fica centralizado em `src/lib/mock-api-delay.ts`.
