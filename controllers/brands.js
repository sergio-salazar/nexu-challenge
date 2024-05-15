import { pool } from "../db.js";
import { error, success } from "../network/response.js";

// Controlador que regresa todas las marcas con su precio promedio calculado.
export const getBrands = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
																			A.*,
																			(SELECT AVG(average_price) FROM models WHERE brand_id = A.id) AS average_price
																		FROM brands A`);
    success(req, res, rows);
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};

// Controlador que inserta marcas, regresa error si el nombre de la marca ya existe.
export const insertBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const [exist] = await pool.query(
      `SELECT name FROM brands WHERE name = '${name}'`
    );
    if (exist.length > 0) {
      return error(req, res, `The brand ${name} already exists.`);
    }

    await pool.query("INSERT INTO brands (name) VALUES (?)", [name]);
    success(req, res, "Brand saved successfully!");
  } catch (err) {
    error(req, res, `Something goes wrong. ${err}`);
  }
};
