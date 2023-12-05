const sql = require("./db.js");

// Constructor
const InicionUsuario = function(inicionUsuario) {
  this.usuarioAdm = inicionUsuario.usuarioAdm;
  this.contraseñaAdm = inicionUsuario.contraseñaAdm;
  this.usuario = inicionUsuario.usuario;
  this.contraseña = inicionUsuario.contraseña;
};

InicionUsuario.create = (newInicionUsuario, result) => {
  sql.query("INSERT INTO inicionUsuario SET ?", newInicionUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inicionUsuario: ", { id: res.insertId, ...newInicionUsuario });
    result(null, { id: res.insertId, ...newInicionUsuario });
  });
};

InicionUsuario.findById = (id, result) => {
  sql.query(`SELECT * FROM inicionUsuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found inicionUsuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found InicionUsuario with the id
    result({ kind: "not_found" }, null);
  });
};

InicionUsuario.getAll = (result) => {
  sql.query("SELECT * FROM inicionUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("inicionUsuario: ", res);
    result(null, res);
  });
};

InicionUsuario.updateById = (id, inicionUsuario, result) => {
  sql.query(
    "UPDATE inicionUsuario SET usuarioAdm = ?, contraseñaAdm = ?, usuario = ?, contraseña = ? WHERE id = ?",
    [inicionUsuario.usuarioAdm, inicionUsuario.contraseñaAdm, inicionUsuario.usuario, inicionUsuario.contraseña, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found InicionUsuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated inicionUsuario: ", { id: id, ...inicionUsuario });
      result(null, { id: id, ...inicionUsuario });
    }
  );
};

InicionUsuario.remove = (id, result) => {
  sql.query("DELETE FROM inicionUsuario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found InicionUsuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted inicionUsuario with id: ", id);
    result(null, res);
  });
};

InicionUsuario.removeAll = result => {
  sql.query("DELETE FROM inicionUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} inicionUsuario`);
    result(null, res);
  });
};

module.exports = InicionUsuario;
