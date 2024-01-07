import express from 'express';

import apiController from '../controller/apiController';

const router = express.Router();

// express app
const initAPIRoutes = (app) => {
    // rest API
    router.get('/test_api', apiController.testAPI);
    router.post('/register', apiController.handleRegister);

    return app.use('/api/', router);
};
export default initAPIRoutes;
