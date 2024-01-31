import express from 'express';

import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission, checkUserCanUpdate } from '../middleware/JWTActions';

const router = express.Router();

// const testMiddleWare = (req, res, next) => {
//     console.log('>>>calling me!');
//     if (true) {
//         return res.send('reject middleware!');
//     } else {
//         next();
//     }
// };

// https://stackoverflow.com/questions/12921658/use-specific-middleware-in-express-for-all-paths-except-a-specific-one

// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/register', '/login'];
//     if (nonSecurePaths.includes(req.path)) return next();

//     //authenticate user
//     if (user) {
//         next();
//     } else {
//     }
// };

// express app
const initAPIRoutes = (app) => {
    // rest API
    router.all('*', checkUserJWT, checkUserPermission);

    router.get('/test_api', apiController.testAPI);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.get('/account', userController.GetUserAccount);

    router.get('/user/read', userController.Read);
    router.post('/user/create', userController.Create);
    router.put('/user/update', checkUserCanUpdate, userController.Update);
    router.delete('/user/delete', userController.Delete);

    router.get('/group/read', groupController.readFunc);

    return app.use('/api/', router);
};
export default initAPIRoutes;
