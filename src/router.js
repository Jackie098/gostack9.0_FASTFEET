import { Router } from 'express';

import AdmController from './app/controllers/AdmController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ welcome: 'Welcome to my future life' })
);

/**
 * Create new adm and session and it don't need auth
 */
routes.post('/adms', AdmController.store);

/**
 * Routes that need autentication
 */
routes.use(authMiddleware);

export default routes;
