# Gestão Edhucca || 26 de março, 2020

##  1.  Conceitos abordados

1.  Servidor e rotas usando Express.
2.  Nodemon e Sucrase.
3.  Docker, Postgres e Postbird para DB relacional.
4.  Sequelize (ORM NodeJS) para DB.
5.  ESLint, Prettier & EditorConfig

##  2.  Descrição do projeto

##  3.  Iniciando o projeto

1.  DB:
    1.  docker start database4
    2.  Postbird:
        1.  name: database4
        2.  POSTGRES_PASSWORD=docker
        3.  port: 5435

2.  yarn dev

##  4.  Criando o Projeto

1.  Configurando a estrutura
    1.  yarn init -y
    2.  yarn add express
    3.  yarn add nodemon -D
    4.  Criar src/ app.js, server.js, routes.js
    5.  Terminal: node src/server.js
    6.  Google Chrome -> localhost:3333

2.  Nodemon & Sucrase
    1.  yarn add sucrase -D
    2.  package.json
        1.  "scripts": {
              "dev": "nodemon src/server.js",
              "dev:debug": "nodemon --inspect src/server.js"
            }
    3.  Criar nodemon.json

3.  Criando database
    1.  Docker, Postgres e Postbird.
    2.  docker run --name **database4** -e POSTGRES_PASSWORD=**docker** -p **5435**:5432 -d postgres
    3.  Criar database edhucca

4.  ESLint, Prettier, & EditorConfig
    1.  yarn add eslint -D
    2.  configurar eslint...
    3.  yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
    4.  Criar e configurar .prettierrc
    5.  Fazer corrigir os erros automaticamente de todos os arquivos js na pasta src:
        1.  yarn eslint --fix src --ext .js
    6.  Gerar .editorconfig e configurar.

5.  Configurar Sequelize
    1.  Criar pasta config no src e arquivo database.js dentro dela.
    2.  Criar pasta src/database e dentro dela a pasta migrations.
    3.  Criar pasta app e dentro dele ficará qualquer código que envolva regra de negócio da aplicação.
    4.  Dentro de app criar pastas controllers e models.
    5.  yarn add sequelize
    6.  yarn add sequelize-cli -D
    7.  Criar arquivo .sequelizerc e transformar sintaxe em JS
        1.  Arquivo que vai exportar os caminhos onde estão as pastas criadas de migrations, controllers
    8.  Ir no database.js e configurar credenciais de acesso.
    9.  yarn add pg pg-hstore

6.  Migration de usuário
    1.  yarn sequelize migration:create --name=create-users
    2.  src/database/migrations/arquivo... configurar.
    3.  yarn sequelize db:migrate

7.  Model de usuárioe loader de models
    1.  Criar model User.js
    2.  Loader:
        1.  Arquivo que vai realizar conexão com o banco de dados postgres definido no config/database e também vai carregar todos os models da nossa aplicação para que a aplicação inteira conheça esses models.
        2.  src/database/index.js... configurar.
        3.  Depois importar o index.js em app.js
        4.  routes.js -> import User.

8.  Cadastro de usuários
    1.  Criar o controller UserController.js
    2.  Adicionar a routes.js
    3.  Testar via Insomnia.
        1.   criar new workspace > pasta Users > new POST request > passar name, email, password_hash

9.  Gerando hash de senha
    1.  Vamos utilizar para gerar o hash e criptografar a senha:
        1.  yarn add bcryptjs
    2.  User.js
        1.  import bcrypt from 'bcryptjs';
        2.  Criar campo virtual password, criar addhooks, Insomnia: password.

10. Autenticação JWT
    1.  yarn add jsonwebtoken
    2.  Criar o SessionController.js
    3.  Criar um arquivo auth.js dentro da pasta config
    4.  Adicionar SessionController a routes.js
    5.  Insomnia.

11. Middleware de autenticação
    1.  Bloquear user acessar algum tipo de rota se ele ainda não estiver logado.
    2.  Criar método update no UserController, porém não faz sentido ela ser acessada se o user não estiver logado.
    3.  Insomnia -> Criar req Update do tipo PUT.
    4.  routes.js -> Criar rota Update.
    5.  Criar pasta middlewares dentro de app e criar um auth.js.
    6.  Em routes.js criar o middleware global.

12. Update do usuário
    1.  UserController.js
        1.  asumc update(req, res)
        2.  Insomnia:
            {
              "name": "user02 updated",
              "email": "user02@demo.com",
              "oldPassword": "1234567",
              "password": "12345678"
            }

13. Validando dados de entrada
    1.  Biblioteca yup: schema validation
        1.  yarn add yup
        2.  Adicionar ao método STORE, UPDATE do UserController.js
        3.  Adicionar ao método STORE do SessionController.js
