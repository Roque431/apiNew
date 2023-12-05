const UsuarioController = require("../controllers/usuario.controller.js");

module.exports = (app, db) => {
  var router = require("express").Router();

  // Crear un nuevo Usuario
  router.post("/", UsuarioController.createUsuario);

  // Obtener todos los Usuarios
  router.get("/", UsuarioController.findAllUsuarios);

  // Obtener un Usuario por su ID
  router.get("/:usuarioId", UsuarioController.findOneUsuario);

  // Actualizar un Usuario por su ID
  router.put("/:usuarioId", UsuarioController.updateUsuario);

  // Eliminar un Usuario por su ID
  router.delete("/:usuarioId", UsuarioController.deleteUsuario);

  // Usar las rutas definidas
  app.use('/api/usuarios', router);
};
