import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ welcome: 'Welcome to my future life' })
);

export default routes;
