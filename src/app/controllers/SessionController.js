import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Adm from '../models/Adm';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const adm = await Adm.findOne({ where: { email } });

    if (!adm) {
      return res.status(401).json({ error: 'Administrator not found' });
    }

    if (!(await adm.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    const { id, name } = adm;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
