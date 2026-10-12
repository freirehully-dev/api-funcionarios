# API de Funcionários

Sistema para gerenciamento de funcionários, com uma API REST em Node.js e Express integrada a um banco de dados MySQL, e uma interface web simples para uso no navegador.

## Tecnologias
- Node.js
- Express
- MySQL
- dotenv
- HTML, CSS e JavaScript (front-end)

## Estrutura do projeto
```
BASE/
├── src/
│   ├── config/        # conexão com o banco de dados
│   ├── controllers/   # lógica das rotas
│   ├── routes/        # definição das rotas
│   ├── public/        # interface web (HTML, CSS, JS)
│   └── server.js      # inicialização do servidor
├── package.json
└── .gitignore
```

## Como executar

1. Clone o repositório:
```bash
git clone https://github.com/freirehully-dev/api-funcionarios.git
cd api-funcionarios
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `src/.env` com base no `src/.env.example` e preencha com os dados do seu banco:
```
PORT=3000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

4. Inicie o servidor:
```bash
npm start
```

5. Acesse no navegador: http://localhost:3000

## Rotas da API
Base: `/funcionarios`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/funcionarios` | Lista todos os funcionários |
| POST | `/funcionarios` | Cadastra um novo funcionário |
| PUT | `/funcionarios/:id` | Atualiza os dados de um funcionário |
| DELETE | `/funcionarios/:id` | Exclui um funcionário |

## Autora
Hully Freire




