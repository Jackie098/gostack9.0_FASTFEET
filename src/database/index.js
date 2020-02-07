import Sequelize from 'sequelize';

import Adm from '../app/models/Adm';

import databaseConfig from '../config/database';

const models = [Adm];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
