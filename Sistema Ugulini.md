# Sistema Ugulini

O **Sistema Ugulini** é uma aplicação web completa (Full-Stack) desenvolvida para o gerenciamento e visualização de imóveis, ideal para imobiliárias ou corretores. O projeto é dividido em duas partes principais: um **Backend** robusto construído com Node.js e Express, e um **Frontend** moderno e responsivo desenvolvido com React e TypeScript.

## 🚀 Tecnologias Utilizadas

O projeto utiliza um conjunto de tecnologias modernas para garantir performance, escalabilidade e uma excelente experiência de usuário.

### Backend (`server-ugulini`)

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Linguagem** | Node.js | Ambiente de execução JavaScript. |
| **Framework** | Express.js | Framework web rápido e minimalista para Node.js. |
| **ORM** | Prisma | ORM (Object-Relational Mapper) de última geração para acesso a banco de dados. |
| **Banco de Dados** | PostgreSQL (Implícito) | Banco de dados relacional (com base no uso de Prisma e na natureza do projeto). |
| **Autenticação** | JWT (JSON Web Tokens) | Geração e validação de tokens para acesso seguro. |
| **Segurança** | bcrypt | Hashing de senhas. |
| **Armazenamento** | AWS S3 / Cloudflare R2 | Armazenamento de arquivos (imagens de imóveis) compatível com S3. |
| **Outros** | Nodemailer, Multer, dotenv | Envio de e-mails, manipulação de upload de arquivos e gerenciamento de variáveis de ambiente. |

### Frontend (`sistema-ugulini`)

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | React | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Linguagem** | TypeScript | Superset do JavaScript que adiciona tipagem estática. |
| **Build Tool** | Vite | Ferramenta de construção rápida para projetos web modernos. |
| **Estilização** | Tailwind CSS | Framework CSS utilitário para design rápido e customizável. |
| **Componentes** | Shadcn/ui (Radix UI) | Biblioteca de componentes acessíveis e personalizáveis. |
| **Roteamento** | React Router DOM | Gerenciamento de rotas da aplicação. |
| **Estado/Dados** | React Query (TanStack Query) | Gerenciamento de estado assíncrono e cache de dados. |
| **Mapas** | Leaflet / Google Maps API | Visualização de localização de imóveis em mapas. |

## 📦 Estrutura do Projeto

O projeto é organizado em uma estrutura de monorepo simples, contendo duas pastas principais:

```
SistemaUgulini/
├── server-ugulini/  # Backend (Node.js/Express)
│   ├── prisma/      # Esquema do banco de dados e migrações
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── package.json
└── sistema-ugulini/ # Frontend (React/Vite)
    ├── public/
    ├── src/
    │   ├── components/  # Componentes de UI e específicos do app
    │   ├── pages/       # Páginas da aplicação (incluindo /admin)
    │   ├── services/    # Conexão com a API (axios)
    │   └── ...
    └── package.json
```

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

*   Node.js (versão 18+)
*   npm ou yarn
*   Um servidor de banco de dados PostgreSQL (ou outro compatível com Prisma)
*   Conta Cloudflare R2 ou AWS S3 (para armazenamento de imagens)
*   Chave de API do Google Maps (para geocodificação e mapas)

### 1. Configuração do Backend (`server-ugulini`)

1.  **Navegue para o diretório do backend:**
    ```bash
    cd server-ugulini
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do diretório `server-ugulini` e adicione as seguintes variáveis:

    ```env
    # Configuração do Banco de Dados (PostgreSQL recomendado)
    DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"

    # Chave Secreta para JWT
    JWT_SECRET="sua_chave_secreta_aqui"

    # Configuração do Cloudflare R2 / AWS S3
    R2_ACCOUNT_ID="seu_account_id"
    R2_ACCESS_KEY_ID="seu_access_key_id"
    R2_SECRET_ACCESS_KEY="seu_secret_access_key"
    R2_BUCKET_NAME="seu_bucket_name"
    R2_ENDPOINT="seu_endpoint_r2_ou_s3" # Ex: https://<account_id>.r2.cloudflarestorage.com

    # Configuração do Nodemailer (Exemplo com Gmail)
    EMAIL_HOST="smtp.gmail.com"
    EMAIL_PORT=587
    EMAIL_USER="seu_email@gmail.com"
    EMAIL_PASS="sua_senha_de_app_ou_token"
    ```

4.  **Configure o Banco de Dados:**
    Execute as migrações do Prisma para criar o esquema do banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Execute o Backend:**
    ```bash
    npm run dev
    # ou
    npm start
    ```
    O servidor será iniciado em `http://localhost:3000` (porta padrão do Express).

### 2. Configuração do Frontend (`sistema-ugulini`)

1.  **Navegue para o diretório do frontend:**
    ```bash
    cd ../sistema-ugulini
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do diretório `sistema-ugulini` e adicione as seguintes variáveis:

    ```env
    # URL da API do Backend
    VITE_API_URL="http://localhost:3000/api"

    # Chave da API do Google Maps (necessária para mapas e geocodificação)
    VITE_GOOGLE_MAPS_API_KEY="sua_chave_google_maps_aqui"
    ```

4.  **Execute o Frontend:**
    ```bash
    npm run dev
    ```
    A aplicação será iniciada em `http://localhost:5173` (porta padrão do Vite).

## 🔑 Rotas Principais

### Frontend

| Rota | Descrição |
| :--- | :--- |
| `/` | Página inicial (Index). |
| `/imoveis` | Lista de todos os imóveis disponíveis. |
| `/imoveis/:id` | Detalhes de um imóvel específico. |
| `/contato` | Formulário de contato. |
| `/sobre` | Página "Sobre Nós". |
| `/admin/login` | Tela de login para a área administrativa. |
| `/admin/dashboard` | Painel de controle (requer autenticação). |
| `/admin/imoveis` | Gerenciamento da lista de imóveis (requer autenticação). |
| `/admin/imoveis/novo` | Formulário para adicionar novo imóvel (requer autenticação). |

### Backend (API)

O prefixo da API é `/api`.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/usuario/login` | Autentica um usuário e retorna um JWT. |
| `GET` | `/api/imoveis` | Retorna a lista de imóveis. |
| `GET` | `/api/imoveis/:id` | Retorna os detalhes de um imóvel. |
| `POST` | `/api/imoveis` | Cria um novo imóvel (requer autenticação). |
| `PUT` | `/api/imoveis/:id` | Atualiza um imóvel (requer autenticação). |
| `DELETE` | `/api/imoveis/:id` | Remove um imóvel (requer autenticação). |
| `POST` | `/api/contato` | Envia uma mensagem de contato. |

