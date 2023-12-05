const sql = require('./db.js');

const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.email = usuario.email;
  this.contrasena = usuario.contrasena;
  this.esCliente = usuario.esCliente || false;
};

Usuario.create = (nuevoUsuario, result) => {
  sql.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    console.log('created usuario: ', { id: res.insertId, ...nuevoUsuario });
    result(null, { id: res.insertId, ...nuevoUsuario });
  });
};

Usuario.getAll = (result) => {
  sql.query('SELECT * FROM usuarios', (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    console.log('usuarios: ', res);
    result(null, res);
  });
};

Usuario.getById = (usuarioId, result) => {
  sql.query('SELECT * FROM usuarios WHERE id = ?', usuarioId, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('usuario encontrado: ', res[0]);
      result(null, res[0]);
      return;
    }

    // Usuario no encontrado con el ID proporcionado
    result({ kind: 'not_found' }, null);
  });
};

Usuario.update = (usuarioId, usuarioActualizado, result) => {
  sql.query(
    'UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, esCliente = ? WHERE id = ?',
    [usuarioActualizado.nombre, usuarioActualizado.email, usuarioActualizado.contrasena, usuarioActualizado.esCliente, usuarioId],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // Usuario no encontrado con el ID proporcionado
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('usuario actualizado: ', { id: usuarioId, ...usuarioActualizado });
      result(null, { id: usuarioId, ...usuarioActualizado });
    }
  );
};

Usuario.remove = (usuarioId, result) => {
  sql.query('DELETE FROM usuarios WHERE id = ?', usuarioId, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // Usuario no encontrado con el ID proporcionado
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('usuario eliminado con el ID: ', usuarioId);
    result(null, res);
  });
};

module.exports = Usuario;
