import { pool } from "../db.js";
import { error, success } from "../network/response.js";

// Controlador para consultar todos los modelos de la marca que llega como parámetro.
export const getModels = async (req, res) => {
  try {
    const brand_id = req.params.id;
    const [rows] = await pool.query(`SELECT
																			id,
																			name,
																			average_price
																		FROM models
																		WHERE brand_id = ${brand_id}`);
    success(req, res, rows);
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};

// Controlador para insertar un nuevo modelo, contiene validaciones y regresa error: 1. Si la marca no existe. 2. Si el modelo ya existe. 3. El precio promedio es menor o igual a 100,000.
export const insertModel = async (req, res) => {
  try {
    const brand_id = req.params.id;
    const { name, average_price } = req.body;
    const [brandExist] = await pool.query(
      `SELECT * FROM brands WHERE id = ${brand_id}`
    );
    if (brandExist.length <= 0) {
      return error(req, res, `The brand doesn't exist.`);
    }
    const [modelExist] = await pool.query(
      `SELECT B.name 
				FROM models A 
				JOIN brands B ON A.brand_id = B.id
				WHERE A.name = '${name}' AND A.brand_id = ${brand_id}`
    );
    if (modelExist.length > 0) {
      return error(
        req,
        res,
        `The model ${name} already exists in ${modelExist[0].name} brand.`
      );
    }

    if (average_price !== null) {
      if (average_price <= 100000) {
        return error(
          req,
          res,
          "The average price must be greater than 100,000"
        );
      }
    }
    await pool.query(
      "INSERT INTO models (brand_id, name, average_price) VALUES (?, ?, ?)",
      [brand_id, name, average_price]
    );
    success(req, res, "Model saved successfully!");
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};

// Controlador para modificar un modelo. Regresa error si el precio promedio es menor o igual a 100,000.
export const updateModel = async (req, res) => {
  try {
    const model_id = req.params.id;
    const { average_price } = req.body;
    if (average_price !== null) {
      if (average_price <= 100000) {
        return error(
          req,
          res,
          "The average price must be greater than 100,000"
        );
      }
    }
    await pool.query("UPDATE models SET average_price = ? WHERE id = ?", [
      average_price,
      model_id,
    ]);
    success(req, res, "Model updated successfully!");
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};

// Controlador que regresa los modelos con rangos de precio, si es que se indican estos parámetros.
export const getModelsParams = async (req, res) => {
  try {
    const greater = req.query.greater;
    const lower = req.query.lower;
    const [rows] = await pool.query(`SELECT
																			id,
																			name,
																			average_price
																		FROM models
																		${greater ? `WHERE average_price > ${greater}` : ""}
																		${lower ? `${greater ? "AND" : "WHERE"} average_price < ${lower}` : ""}`);
    success(req, res, rows);
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};
