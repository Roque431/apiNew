const mongoose = require("mongoose");

const EmpleadoUsu = mongoose.model(
  "EmpleadoUsu",
  new mongoose.Schema({
    NombreEmpleado: String,
    ContraEmpleado: String,
    Turno: String,
    Conctacto: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = EmpleadoUsu;
