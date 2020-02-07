import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Adm extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async adm => {
      if (adm.password) {
        adm.password_hash = await bcrypt.hash(adm.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Adm;
