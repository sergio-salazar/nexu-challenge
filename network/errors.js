import { error } from "./response.js";

export function errors(err, req, res, next) {
  const message = err.message || "Internal Error";
  const status = err.statusCode || 500;

  error(req, res, message, status);
}
