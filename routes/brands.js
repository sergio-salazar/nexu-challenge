import { Router } from "express";
import { getBrands, insertBrand } from "../controllers/brands.js";

const router = Router();

// Ruta para regresar todas las marcas con su promedio de precio.
router.get("/brands", getBrands);
// Ruta para insertar nueva marca.
router.post("/brands", insertBrand);

export default router;