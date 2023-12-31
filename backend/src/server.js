import express from 'express';
import bodyParser from 'body-parser';

import initWebRoutes from './route/web';
import configViewEngine from './config/viewEngine';

require('dotenv').config();

const app = express();

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

const PORT = 8000;

app.listen(PORT, () => {
    console.log('>>>JWT backend is running on the port = ', PORT);
});
