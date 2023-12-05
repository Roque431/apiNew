const Medicamento = require("../models/tutorial.model.js");

// Create and Save a new Medicamento
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Create a Medicamento
  const medicamento = new Medicamento({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaDeCaducidad: req.body.fechaDeCaducidad,
    costo: req.body.costo,
    viaDeAdministracion: req.body.viaDeAdministracion,
  });

  // Save Medicamento in the database
  Medicamento.create(medicamento, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el Medicamento."
      });
    else res.send(data);
  });
};

// Retrieve all Medicamentos from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Medicamento.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar los medicamentos."
      });
    else res.send(data);
  });
};

// Find a single Medicamento by Id
exports.findOne = (req, res) => {
  Medicamento.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Medicamento con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Medicamento con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encuentra todos los Medicamentos publicados
exports.findAllPublished = (req, res) => {
  Medicamento.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar los medicamentos publicados."
      });
    else res.send(data);
  });
};

// Actualiza un Medicamento identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Medicamento.updateById(
    req.params.id,
    new Medicamento(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un Medicamento con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el Medicamento con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Elimina un Medicamento con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Medicamento.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Medicamento con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el Medicamento con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El Medicamento se eliminó con éxito!` });
  });
};

// Elimina todos los Medicamentos de la base de datos.
exports.deleteAll = (req, res) => {
  Medicamento.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los medicamentos."
      });
    else res.send({ message: `¡Se eliminaron con éxito todos los Medicamentos!` });
  });
};
