module.exports = app => {
    const InicionSesion = require("../controllers/inicionSesion.controller");
  
    var router = require("express").Router();
    
    // Crear un nuevo usuario de inicio de sesión
    router.post("/", InicionSesion.create);
   
    // Recuperar todos los usuarios de inicio de sesión
    router.get("/", InicionSesion.findAll);
  
    // Recuperar un solo usuario de inicio de sesión por su ID
    router.get("/:id", InicionSesion.findOne);
  
    // Actualizar un usuario de inicio de sesión por su ID
    router.put("/:id", InicionSesion.update);
  
    // Eliminar un usuario de inicio de sesión por su ID
    router.delete("/:id", InicionSesion.delete);
  
    // Eliminar todos los usuarios de inicio de sesión
  
    app.use('/api/InicionSesion', router); // Cambiado a 'api/InicionSesion'
  };
  
