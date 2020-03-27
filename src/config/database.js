module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'edhucca',
  port: 5435, // adicionar a porta se não estiver rodando a padrão 5432
  define: {
    timestamps: true, // saber quando registro foi criado/editado
    underscored: true,
    underscoredAll: true,
  },
};
