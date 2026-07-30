import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.router.js";
import storesRouter from "./routes/stores.router.js";
import ordersRouter from "./routes/orders.router.js";
import mocksRouter from './routes/mocks.router.js'
import docsRouter from "./routes/docs.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { envConfig } from "./config/env.js";



const app = express();
//Bloque 1 - middleware de configuracion
app.use(cors());
app.use(express.json());

//Bloque 2 - endpoints
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "ShipNow API"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "API funcionando"
  });
});

app.use("/api/users", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/docs", docsRouter);


// Protegemos router de mocks para que no quede expuesto en producción
if (!envConfig.isProd) {
  app.use('/api/mocks', mocksRouter)
}

//Bloque 4 - middlewares de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
