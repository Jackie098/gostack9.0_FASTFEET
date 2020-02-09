import * as Yup from 'yup';
import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const couriers = await Courier.findAll({
      order: ['updated_at'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(couriers);
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier does not exists' });
    }

    const { email } = req.body;

    if (email && courier.email !== email) {
      const courierExists = await Courier.findOne({ where: { email } });

      if (courierExists) {
        return res.status(400).json({
          error: 'Email doest not valid because already exists in database',
        });
      }
    }

    const avatarId = req.body.avatar_id;
    const file = await File.findByPk(avatarId);

    if (avatarId && !file) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const {
      id,
      name,
      email: courierEmail,
      avatar_id: avatar,
    } = await courier.update(req.body);

    return res.json({ id, name, avatar, courierEmail });
  }
}

export default new CourierController();
