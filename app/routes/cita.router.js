const CitaController = require("../controllers/cita.controller.js");

module.exports = (app, db) => {
  var router = require("express").Router();

  // Crear una nueva Cita
  router.post("/", CitaController.createCita);

  // Obtener todas las Citas
  router.get("/", CitaController.findAllCitas);

  // Obtener una Cita por su ID
  router.get("/:citaId", CitaController.findOneCita);

  // Actualizar una Cita por su ID
  router.put("/:citaId", CitaController.updateCita);

  // Eliminar una Cita por su ID
  router.delete("/:citaId", CitaController.deleteCita);

  // Usar las rutas definidas
  app.use('/api/citas', router);
};
