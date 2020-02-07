import Sequelize from 'sequelize';

import Adm from '../app/models/Adm';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [Adm, Recipient, File];

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
