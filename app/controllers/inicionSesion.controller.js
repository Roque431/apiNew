const InicionSesion = require("../models/inicionSesion.model.js");

// Crear y guardar un nuevo usuario de inicio de sesión
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un usuario de inicio de sesión
  const usuarioInicionSesion = new InicionSesion({
    usuarioAdm: req.body.usuarioAdm,
    contraseñaAdm: req.body.contraseñaAdm,
    usuario: req.body.usuario,
    contraseña: req.body.contraseña,
  });

  // Guardar el usuario de inicio de sesión en la base de datos
  InicionSesion.create(usuarioInicionSesion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el usuario de inicio de sesión."
      });
    else res.send(data);
  });
};

// Recuperar todos los usuarios de inicio de sesión de la base de datos.
exports.findAll = (req, res) => {
  InicionSesion.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar los usuarios de inicio de sesión."
      });
    else res.send(data);
  });
};

// Encontrar un solo usuario de inicio de sesión por su ID
exports.findOne = (req, res) => {
  InicionSesion.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un usuario de inicio de sesión con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el usuario de inicio de sesión con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};
exports.findAllPublished = (req, res) => {
  InicionSesion.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar de usuarios publicadas."
      });
    else res.send(data);
  });
};
// Resto de las funciones del controlador...
// Actualizar una citaUsuario identificada por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  InicionSesion.updateById(
    req.params.id,
    new InicionSesion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró una Usuario con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la Usuario con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
exports.delete = (req, res) => {
  InicionSesion.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un usuario con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la usuario con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El usuario se eliminó con éxito!` });
  });
};