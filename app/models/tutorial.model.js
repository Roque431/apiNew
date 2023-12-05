const sql = require("./db.js");

// constructor
const Medicamento = function(medicamento) {
  this.nombre = medicamento.nombre;
  this.descripcion = medicamento.descripcion;
  this.fechaDeCaducidad = medicamento.fechaDeCaducidad;
  this.costo = medicamento.costo;
  this.viaDeAdministracion = medicamento.viaDeAdministracion;
};


Medicamento.create = (newMedicamento, result) => {
  sql.query("INSERT INTO medicamento SET ?", newMedicamento, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created medicamento: ", { id: res.insertId, ...newMedicamento });
    result(null, { id: res.insertId, ...newMedicamento });
  });
};

Medicamento.findById = (id, result) => {
  sql.query(`SELECT * FROM medicamento WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found medicamento: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Medicamento with the id
    result({ kind: "not_found" }, null);
  });
};

Medicamento.getAll = (nombre, result) => {
  let query = "SELECT * FROM medicamento";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicamento: ", res);
    result(null, res);
  });
};

Medicamento.getAllPublished = result => {
  sql.query("SELECT * FROM medicamento WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medicamento: ", res);
    result(null, res);
  });
};

Medicamento.updateById = (id, medicamento, result) => {
  sql.query(
    "UPDATE medicamento SET nombre = ?, descripcion = ?, fechaDeCaducidad = ?, costo = ?, viaDeAdministracion = ? WHERE id = ?",
    [medicamento.nombre, medicamento.descripcion, medicamento.fechaDeCaducidad, medicamento.costo, medicamento.viaDeAdministracion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Medicamento with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated medicamento: ", { id: id, ...medicamento });
      result(null, { id: id, ...medicamento });
    }
  );
};

Medicamento.remove = (id, result) => {
  sql.query("DELETE FROM medicamento WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Medicamento with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted medicamento with id: ", id);
    result(null, res);
  });
};

Medicamento.removeAll = result => {
  sql.query("DELETE FROM medicamento", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} medicamento`);
    result(null, res);
  });
};

module.exports = Medicamento;
