import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AdmController from './app/controllers/AdmController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipentController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) =>
  res.json({ welcome: 'Welcome to my future life' })
);

/**
 * Create new adm and session.They doesn't need auth
 */
routes.post('/adms', AdmController.store);
routes.post('/sessions', SessionController.store);

/**
 * Routes that need autentication
 */
routes.use(authMiddleware);

/**
 * Manipulating Recipient routes
 */
routes.post('/recipients', RecipientController.store);

/**
 * To manipule Files
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * To manipule Couriers
 */
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.delete);

export default routes;
