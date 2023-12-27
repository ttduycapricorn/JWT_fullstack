import express from "express";

import initWebRoutes from "./route/web";
import configViewEngine from "./configs/viewEngine";

const app = express();

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(">>>JWT backend is running on the port = ", PORT);
});
