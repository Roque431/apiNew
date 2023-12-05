const CitaUsuario = require("../models/citaUsuario.model.js");

// Crear y guardar una nueva citaUsuario
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear una citaUsuario
  const citaUsuario = new CitaUsuario({
    username: req.body.username,
    petName: req.body.petName,
    fecha: req.body.fecha,
    hora: req.body.hora,
    Telefono: req.body.Telefono,
    codigoPostal: req.body.codigoPostal,
    Direccion: req.body.Direccion,
    Motivo: req.body.Motivo,
    LugarConsulta: req.body.LugarConsulta
  });

  // Guardar la citaUsuario en la base de datos
  CitaUsuario.create(citaUsuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la citaUsuario."
      });
    else res.send(data);
  });
};

// Recuperar todos los citaUsuarios de la base de datos.
exports.findAll = (req, res) => {
  CitaUsuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar las citas de usuarios."
      });
    else res.send(data);
  });
};

// Encontrar una sola citaUsuario por su ID
exports.findOne = (req, res) => {
  CitaUsuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una citaUsuario con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar la citaUsuario con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todos los citaUsuarios publicados
exports.findAllPublished = (req, res) => {
  CitaUsuario.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar las citas de usuarios publicadas."
      });
    else res.send(data);
  });
};

// Actualizar una citaUsuario identificada por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  CitaUsuario.updateById(
    req.params.id,
    new CitaUsuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró una citaUsuario con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la citaUsuario con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una citaUsuario con el ID especificado en la solicitud
exports.delete = (req, res) => {
  CitaUsuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una citaUsuario con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la citaUsuario con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡La citaUsuario se eliminó con éxito!` });
  });
};

// Eliminar todas las citaUsuarios de la base de datos.
exports.deleteAll = (req, res) => {
  CitaUsuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las citas de usuarios."
      });
    else res.send({ message: `¡Se eliminaron con éxito todas las citas de usuarios!` });
  });
};
