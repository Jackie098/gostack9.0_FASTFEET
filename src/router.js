import { Router } from 'express';

import AdmController from './app/controllers/AdmController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ welcome: 'Welcome to my future life' })
);

/**
 * Create new adm and session.It doesn't need auth
 */
routes.post('/adms', AdmController.store);
routes.post('/sessions', SessionController.store);

/**
 * Routes that need autentication
 */
routes.use(authMiddleware);

export default routes;
