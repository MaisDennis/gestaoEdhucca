import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Company;
