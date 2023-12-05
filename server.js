const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://54.145.141.130"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Estoy usando el puerto 8080." });
});

// Rutas para otros módulos...
require("./app/routes/msg.router.js")(app);
require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/productos.routes.js")(app);
require("./app/routes/citaUsuario.routes.js")(app);
require("./app/routes/inicionSesion.routes.js")(app);

// Nuevas rutas para usuarios y citas
require("./app/routes/usuario.router.js")(app);
// require("./app/routes/cita.router.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
