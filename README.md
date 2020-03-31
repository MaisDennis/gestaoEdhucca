# Gestão Edhucca || 26 de março, 2020

##  1.  Conceitos abordados

1.  Servidor e rotas usando Express.
2.  Nodemon e Sucrase.
3.  Docker, Postgres e Postbird para DB relacional.
4.  Sequelize (ORM NodeJS) para DB.
5.  ESLint, Prettier & EditorConfig

##  2.  Descrição do projeto

##  3.  Iniciando o projeto

1.  ```docker start database4```
2.  name: database4, POSTGRES_PASSWORD=docker, port: 5435

2.  ```yarn dev```

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

14. Configurando o Multer
    1.  yarn add multer
    2.  Criar pasta /tmp/uploads (onde vao ficar os arquivos de imagens).
    3.  src/config/multr.js
    4.  routes.js
        ```
        import multer from 'multer';
        import multerConfig from './config/multer';

        const upload = multer(multerConfig);

        routes.post('/files', upload.single('file'), (req, res) => {
          return res.json({ ok: true });
        });
        ```
    5.  Insomnia:
        1.  Criar Files/Create -> Multipart -> file -> Choose file
        2.  obs. Não tem auth.
    6.  FileController:
        1.  import FileController em routes.js
        2.  Criar FileController.js
        3.  Nova tabela na database.
            1.  yarn sequelize migration:create --name=create-files
            2.  yarn sequelize db:migrate
        4.  Criar models/File.js
        5.  update database/index.js
            1.  import File from '../app/models/File';
            2.  const models = [User, File];
        6.  update FileController.js
        7.  Insomnia: teste Post base_url/files Send,
        8.  **Incluir nova coluna a tabela "user" para vincular a tabela "files.**

16. Listagem de coordinators
    1.  Coordinator é um tipo de user.
    2.  Criar controllers/CoordController.js:
    3.  routes -> import CoordController from './app/controllers/CoordController' -> routes.get('/coordinators', CoordController.index);
    4.  CoordController.js
        async index(req, res) {
          const coordinators = await User.findAll({
            where: { coordinator: true },
          });
    5.  **Attributes & include File**

17. Migration e Model de aluno, empresa e contrato
    1.  yarn sequelize migration:create --name=create-students
    2.  yarn sequelize migration:create --name=create-companies
    3.  yarn sequelize migration:create --name=create-contracts
    4.  yarn sequelize db:migrate
    5.  models/Student.js -> add database/index.js
    6.  controllers/StudentController.js
        1.  yarn add cpf -> cpf validator -> https://github.com/theuves/cpf
        2.  Insomnia
    7.  models/Company.js -> add database/index.js
    8.  controllers/CompanyController.js
        1.  yarn add cnpj -> cnpj validator -> https://github.com/gabrielizaias/cnpj
        2.  Insomnia
    9.  models/Contract.js ->
        1.  Adicionar  static associate(models)
        2.  database/index.js
            1.  adicionar no Contract no models
            2.  adicionar .map(
                  (model) => model.associate && model.associate(this.connection.models)
                );
        3.  controllers/ContractController.js
            1.  Insomnia

18. Aprovação de contrato
    1.  administrador aprova contratos para entrar em vigor.
    2.  Após a aprovação, **o contrato não pode ser alterado.**
    3.  **Aprovação: Token na tabela 'contratos'.**
    4.  Criar ApprovalController.js
        1.  import jwt e authConfig para gerar o token de aprovação.
        2.  geração de numero randomico -> const rnd = Math.random();
        3.  ```
            const token = jwt.sign({ rnd }, authConfig.secret, {
              expiresIn: authConfig.expiresIn,
            });
            ```
    5.  routes.js -> adicionar rota após o middleware de autenticação (apenas administrador).


