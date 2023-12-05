const Cita = require("../models/cita.model.js");

// Crear y Guardar una nueva Cita
exports.createCita = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear una Cita
  const cita = new Cita({
    usuarioId: req.body.usuarioId,
    mascota: req.body.mascota,
    fecha: req.body.fecha,
    hora: req.body.hora,
    numeroTelefono: req.body.numeroTelefono,
    lugarConsulta: req.body.lugarConsulta,
    direccion: req.body.direccion,
    motivo: req.body.motivo
  });

  // Guardar la Cita en la base de datos
  Cita.create(cita, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la Cita."
      });
    else res.send(data);
  });
};

// Obtener todas las Citas desde la base de datos
exports.findAllCitas = (req, res) => {
  Cita.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener las Citas."
      });
    else res.send(data);
  });
};

// Obtener una única Cita por su ID
exports.findOneCita = (req, res) => {
  Cita.getById(req.params.citaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cita no encontrada con el ID ${req.params.citaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar la Cita con el ID " + req.params.citaId
        });
      }
    } else res.send(data);
  });
};

// Actualizar una Cita por su ID
exports.updateCita = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Cita.update(req.params.citaId, {
    usuarioId: req.body.usuarioId,
    mascota: req.body.mascota,
    fecha: req.body.fecha,
    hora: req.body.hora,
    numeroTelefono: req.body.numeroTelefono,
    lugarConsulta: req.body.lugarConsulta,
    direccion: req.body.direccion,
    motivo: req.body.motivo
  }, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cita no encontrada con el ID ${req.params.citaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar la Cita con el ID " + req.params.citaId
        });
      }
    } else res.send(data);
  });
};

// Eliminar una Cita con un ID específico
exports.deleteCita = (req, res) => {
  Cita.remove(req.params.citaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cita no encontrada con el ID ${req.params.citaId}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la Cita con el ID " + req.params.citaId
        });
      }
    } else res.send({ message: "Cita eliminada correctamente!" });
  });
};
