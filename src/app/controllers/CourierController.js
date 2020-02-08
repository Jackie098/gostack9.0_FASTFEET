import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists' });
    }

    const { id, name, email, avatar_id: avatar } = await Courier.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new CourierController();
