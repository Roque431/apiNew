const Usuario = require("../models/usuario.model.js");

// Create and Save a new Usuario (Registro de usuario)
exports.createUsuario = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Create a Usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    contrasena: req.body.contrasena,
    esCliente: req.body.esCliente || false
  });

  // Save Usuario in the database
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el Usuario."
      });
    else res.send(data);
  });
};

// Retrieve all Usuarios from the database (Obtener todos los usuarios)
exports.findAllUsuarios = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los Usuarios."
      });
    else res.send(data);
  });
};

// Find a single Usuario with a UsuarioId (Obtener un usuario por su ID)
exports.findOneUsuario = (req, res) => {
  Usuario.getById(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con el ID ${req.params.usuarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el usuario con el ID " + req.params.usuarioId
        });
      }
    } else res.send(data);
  });
};

// Update a Usuario identified by the UsuarioId in the request (Actualizar un usuario por su ID)
exports.updateUsuario = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Usuario.update(req.params.usuarioId, {
    nombre: req.body.nombre,
    email: req.body.email,
    contrasena: req.body.contrasena,
    esCliente: req.body.esCliente || false
  }, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con el ID ${req.params.usuarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el usuario con el ID " + req.params.usuarioId
        });
      }
    } else res.send(data);
  });
};

// Delete a Usuario with the specified UsuarioId in the request (Eliminar un usuario por su ID)
exports.deleteUsuario = (req, res) => {
  Usuario.remove(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con el ID ${req.params.usuarioId}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el usuario con el ID " + req.params.usuarioId
        });
      }
    } else res.send({ message: "Usuario eliminado correctamente!" });
  });
};
