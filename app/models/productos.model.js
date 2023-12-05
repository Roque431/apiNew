const sql = require("./db.js");

// Constructor
const Producto = function(producto) {
  this.nombre = producto.nombre;
  this.precio = producto.precio;
  this.Stock = producto.Stock;
  this.FechaCaducidad = producto.FechaCaducidad;
  this.Descripcion = producto.Descripcion;
  this.ViaAdm = producto.ViaAdm;
  this.Tipo = producto.Tipo;
};

Producto.create = (newProducto, result) => {
  sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created producto: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (id, result) => {
  sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found producto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Producto with the id
    result({ kind: "not_found" }, null);
  });
};

Producto.getAll = (nombre, result) => {
  let query = "SELECT * FROM productos";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("producto: ", res);
    result(null, res);
  });
};

Producto.getAllPublished = result => {
  sql.query("SELECT * FROM productos WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("producto: ", res);
    result(null, res);
  });
};

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE productos SET nombre = ?, precio = ?, Stock = ?, FechaCaducidad = ?, Descripcion = ?, ViaAdm = ?, Tipo = ? WHERE id = ?",
    [producto.nombre, producto.precio, producto.Stock, producto.FechaCaducidad, producto.Descripcion, producto.ViaAdm, producto.Tipo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Producto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated producto: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Producto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted producto with id: ", id);
    result(null, res);
  });
};

Producto.removeAll = result => {
  sql.query("DELETE FROM productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} producto`);
    result(null, res);
  });
};

module.exports = Producto;

