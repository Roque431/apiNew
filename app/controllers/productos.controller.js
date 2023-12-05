const Producto = require("../models/productos.model.js");

// Crear y guardar un nuevo Producto
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un Producto
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    Stock: req.body.Stock,
    FechaCaducidad: req.body.FechaCaducidad,
    Descripcion: req.body.Descripcion,
    ViaAdm: req.body.ViaAdm,
    Tipo: req.body.Tipo,
  });

  // Guardar el Producto en la base de datos
  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el Producto."
      });
    else res.send(data);
  });
};

// Recuperar todos los Productos de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Producto.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar los productos."
      });
    else res.send(data);
  });
};

// Encontrar un solo Producto por ID
exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Producto con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Producto con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todos los Productos publicados
exports.findAllPublished = (req, res) => {
  Producto.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar los productos publicados."
      });
    else res.send(data);
  });
};

// Actualizar un Producto identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Producto.updateById(
    req.params.id,
    new Producto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un Producto con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el Producto con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un Producto con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Producto con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el Producto con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El Producto se eliminó con éxito!` });
  });
};

// Eliminar todos los Productos de la base de datos.
exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos."
      });
    else res.send({ message: `¡Se eliminaron con éxito todos los Productos!` });
  });
};
