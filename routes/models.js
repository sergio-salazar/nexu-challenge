import { Router } from "express";
import {
  getModels,
  getModelsParams,
  insertModel,
  updateModel,
} from "../controllers/models.js";

const router = Router();

// Ruta para regresar todos los modelos de la marca indicada por el :id.
router.get("/brands/:id/models", getModels);
// Ruta para insertar nuevo modelo para la marca indicada en el :id.
router.post("/brands/:id/models", insertModel);
// Ruta para modificar un modelo, indicado en el :id.
router.put("/models/:id", updateModel);
// Ruta para regresar los modelos, con rangos de precio según sus parámetros lower y greater.
router.get("/models", getModelsParams);

export default router;
