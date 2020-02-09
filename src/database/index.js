import Sequelize from 'sequelize';

import Adm from '../app/models/Adm';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Courier from '../app/models/Courier';
import Signature from '../app/models/Signature';

import databaseConfig from '../config/database';

const models = [Adm, Recipient, File, Courier, Signature];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
