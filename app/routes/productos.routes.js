module.exports = app => {
  const Producto = require("../controllers/productos.controller.js");

  var router = require("express").Router();
  
  // Crear un nuevo Producto
  router.post("/", Producto.create);
 
  // Recuperar todos los Productos
  router.get("/", Producto.findAll);

  // Recuperar todos los Productos publicados
  router.get("/published", Producto.findAllPublished);

  // Recuperar un solo Producto por su ID
  router.get("/:id", Producto.findOne);

  // Actualizar un Producto por su ID
  router.put("/:id", Producto.update);

  // Eliminar un Producto por su ID
  router.delete("/:id", Producto.delete);

  // Eliminar todos los Productos
  router.delete("/", Producto.deleteAll);

  app.use('/api/Productos', router); // Cambiado a 'api/Productos'
};
