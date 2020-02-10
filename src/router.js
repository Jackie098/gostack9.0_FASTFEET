import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AdmController from './app/controllers/AdmController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipentController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryController from './app/controllers/DeliveryController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

const upload = multer(multerConfig);

/**
 * Create new adm and session.They don't need auth
 */
routes.post('/adms', AdmController.store);
routes.post('/sessions', SessionController.store);

/**
 * To manipule Signatures
 */
routes.post('/signatures', upload.single('file'), SignatureController.store);

/**
 * Routes that need autentication - just adm's
 */
routes.use(authMiddleware);

/**
 * To manipule Recipients
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

/**
 * To manipule Deliveries
 */
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
