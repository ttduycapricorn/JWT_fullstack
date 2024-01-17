import express from 'express';

import apiController from '../controller/apiController';
import userController from '../controller/userController';

const router = express.Router();

// express app
const initAPIRoutes = (app) => {
    // rest API
    router.get('/test_api', apiController.testAPI);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/user/read', userController.Read);
    router.post('/user/create', userController.Create);
    router.post('/user/update', userController.Update);
    router.delete('/user/delete', userController.Delete);

    return app.use('/api/', router);
};
export default initAPIRoutes;
