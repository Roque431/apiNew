module.exports = app => {
  const CitaUsuario = require("../controllers/citaUsuario.controller.js");

  var router = require("express").Router();
  
  // Crear una nueva CitaUsuario
  router.post("/", CitaUsuario.create);
 
  // Recuperar todas las CitaUsuarios
  router.get("/", CitaUsuario.findAll);

  // Recuperar todas las CitaUsuarios publicadas
  router.get("/published", CitaUsuario.findAllPublished);

  // Recuperar una sola CitaUsuario por su ID
  router.get("/:id", CitaUsuario.findOne);

  // Actualizar una CitaUsuario por su ID
  router.put("/:id", CitaUsuario.update);

  // Eliminar una CitaUsuario por su ID
  router.delete("/:id", CitaUsuario.delete);

  // Eliminar todas las CitaUsuarios
  router.delete("/", CitaUsuario.deleteAll);

  app.use('/api/CitaUsuario', router);
};
