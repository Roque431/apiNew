const sql = require("./db.js");
const { parse } = require('date-fns');

// Constructor
const CitaUsuario = function(citaUsuario) {
  this.username = citaUsuario.username;
  this.petName = citaUsuario.petName;
  this.fecha = citaUsuario.fecha;
  this.hora = citaUsuario.hora;
  this.Telefono = citaUsuario.Telefono;
  this.Direccion = citaUsuario.Direccion;
  this.Motivo = citaUsuario.Motivo;
  this.LugarConsulta = citaUsuario.LugarConsulta;
};

CitaUsuario.create = (newCitaUsuario, result) => {
  console.log("Hora recibida:", newCitaUsuario.username);
  console.log("Fecha recibida:", newCitaUsuario.fecha);
  console.log("Hora recibida:", newCitaUsuario.hora);
  const hora24Format = new Date(`1970-01-01T${newCitaUsuario.hora}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Esto asegura que el formato sea de 24 horas
  });
  newCitaUsuario.hora = hora24Format;
  newCitaUsuario.fecha = newCitaUsuario.fecha ? parse(newCitaUsuario.fecha, 'yyyy-MM-dd', new Date()) : null;
  newCitaUsuario.hora = newCitaUsuario.hora ? parse(newCitaUsuario.hora, 'HH:mm', new Date()) : null;
  sql.query("INSERT INTO citaUsuario SET ?", newCitaUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    const response = { id: res.insertId, ...newCitaUsuario };
    console.log("created citaUsuario: ", response);
    result(null, response);
  });
};

CitaUsuario.findById = (id, result) => {
  sql.query(`SELECT * FROM citaUsuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found citaUsuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found CitaUsuario with the id
    result({ kind: "not_found" }, null);
  });
};

CitaUsuario.getAll = (result) => {
  sql.query("SELECT * FROM citaUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("citaUsuario: ", res);
    result(null, res);
  });
};

CitaUsuario.getAllPublished = result => {
  sql.query("SELECT * FROM citaUsuario WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("citaUsuario: ", res);
    result(null, res);
  });
};

CitaUsuario.updateById = (id, citaUsuario, result) => {
  sql.query(
    "UPDATE citaUsuario SET username = ?, petName = ?, Fecha = ?, Hora = ?, Telefono = ?, Direccion = ?, Motivo = ?, LugarConsulta = ? WHERE id = ?",
    [citaUsuario.username, citaUsuario.petName, citaUsuario.Fecha, citaUsuario.Hora, citaUsuario.Telefono, citaUsuario.Direccion, citaUsuario.Motivo, citaUsuario.LugarConsulta, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CitaUsuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated citaUsuario: ", { id: id, ...citaUsuario });
      result(null, { id: id, ...citaUsuario });
    }
  );
};

CitaUsuario.remove = (id, result) => {
  sql.query("DELETE FROM citaUsuario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found CitaUsuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted citaUsuario with id: ", id);
    result(null, res);
  });
};

CitaUsuario.removeAll = result => {
  sql.query("DELETE FROM citaUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} citaUsuario`);
    result(null, res);
  });
};

module.exports = CitaUsuario;
