import express from 'express';

import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';

const router = express.Router();

const testMiddleWare = (req, res, next) => {
    console.log('>>>calling me!');
    if (true) {
        return res.send('reject middleware!');
    } else {
        next();
    }
};

// express app
const initAPIRoutes = (app) => {
    // rest API
    router.get('/test_api', apiController.testAPI);
    router.post('/register', apiController.handleRegister);
    router.post('/login', testMiddleWare, apiController.handleLogin);

    router.get('/user/read', userController.Read);
    router.post('/user/create', userController.Create);
    router.put('/user/update', userController.Update);
    router.delete('/user/delete', userController.Delete);

    router.get('/group/read', groupController.readFunc);

    return app.use('/api/', router);
};
export default initAPIRoutes;
