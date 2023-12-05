const sql = require("./db.js");

const Cita = function(cita) {
  this.usuarioId = cita.usuarioId;
  this.mascota = cita.mascota;
  this.fecha = cita.fecha;
  this.hora = cita.hora;
  this.numeroTelefono = cita.numeroTelefono;
  this.lugarConsulta = cita.lugarConsulta;
  this.direccion = cita.direccion;
  this.motivo = cita.motivo;
};

Cita.create = (nuevaCita, result) => {
  sql.query("INSERT INTO citas SET ?", nuevaCita, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cita: ", { id: res.insertId, ...nuevaCita });
    result(null, { id: res.insertId, ...nuevaCita });
  });
};

Cita.getAll = result => {
  sql.query("SELECT * FROM citas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("citas: ", res);
    result(null, res);
  });
};

Cita.getById = (citaId, result) => {
  sql.query("SELECT * FROM citas WHERE id = ?", citaId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("cita encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No se encontró la cita con el ID proporcionado
    result({ kind: "not_found" }, null);
  });
};

Cita.update = (citaId, citaActualizada, result) => {
  sql.query(
    "UPDATE citas SET ? WHERE id = ?",
    [citaActualizada, citaId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // No se encontró la cita con el ID proporcionado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log('cita actualizada: ', { id: citaId, ...citaActualizada });
      result(null, { id: citaId, ...citaActualizada });
    }
  );
};

Cita.remove = (citaId, result) => {
  sql.query('DELETE FROM citas WHERE id = ?', citaId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // No se encontró la cita con el ID proporcionado
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('cita eliminada con el ID: ', citaId);
    result(null, res);
  });
};

module.exports = Cita;
