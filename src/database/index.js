import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Student from '../app/models/Student';
import Company from '../app/models/Company';
import Contract from '../app/models/Contract';
import Calendar from '../app/models/Calendar';

import databaseConfig from '../config/database';

const models = [User, File, Student, Company, Contract, Calendar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
