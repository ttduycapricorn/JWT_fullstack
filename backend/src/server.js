import express from 'express';
import bodyParser from 'body-parser';

import initWebRoutes from './route/web';
import configViewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import initAPIRoutes from './route/api';
import configCORS from './config/cors';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// config CORS
configCORS(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// test connection database
connectDB();

// init web routes
initWebRoutes(app);

// init API routes
initAPIRoutes(app);

app.listen(PORT, () => {
    console.log('>>>JWT backend is running on the port = ', PORT);
});
