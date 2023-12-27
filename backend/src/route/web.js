import express from "express";

import homeController from "../controller/homeController";

const router = express.Router();

// express app
const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);

  router.get("/user", homeController.handleUserPage);

  router.get("/about", (req, res) => {
    return res.send("Tran Thai Duy - B2000104");
  });

  return app.use("/", router);
};

export default initWebRoutes;
