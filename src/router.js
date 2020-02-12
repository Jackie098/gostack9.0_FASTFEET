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
import CourierCheckController from './app/controllers/CourierCheckController';
import DeliveryFinishedController from './app/controllers/DeliveryFinishedController';
import TakeOutController from './app/controllers/TakeOutController';
import DeliveriesProblemController from './app/controllers/DeliveriesProblemController';
import AllDeliveryProblemsController from './app/controllers/AllDeliveryProblemsController';

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
 * For handling couriers
 */
routes.get('/couriers/:id/deliveries', CourierCheckController.index);
routes.get('/couriers/:id/deliveries/done', DeliveryFinishedController.index);
routes.put('/couriers/:id/:delivery/takeout', TakeOutController.update);
routes.put('/couriers/:id/:delivery/done', DeliveryFinishedController.update);

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
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

/**
 * To manipule Deliveries with a problems
 */
routes.get('/deliveries/problems', DeliveriesProblemController.index);
routes.get('/delivery/:id/problems', AllDeliveryProblemsController.index);

export default routes;
