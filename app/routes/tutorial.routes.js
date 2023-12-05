module.exports = app => {
  const Medicamento  = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
  
  // Crear un nuevo Medicamento
  router.post("/", Medicamento.create);
 
  // Recuperar todos los Medicamentos
  router.get("/", Medicamento.findAll);

  // Recuperar todos los Medicamentos publicados
  router.get("/published", Medicamento.findAllPublished);

  // Recuperar un solo Medicamento por su ID
  router.get("/:id", Medicamento.findOne);

  // Actualizar un Medicamento por su ID
  router.put("/:id", Medicamento.update);

  // Eliminar un Medicamento por su ID
  router.delete("/:id", Medicamento.delete);

  // Eliminar todos los Medicamentos
  router.delete("/", Medicamento.deleteAll);

  app.use('/api/Medicamento', router);
};
