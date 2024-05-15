import express from "express";
import brands from "./routes/brands.js";
import models from "./routes/models.js";

const app = express();

app.use(express.json());

app.use(brands);
app.use(models);

app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    body: "Endpoint not found",
  });
});

export default app;
