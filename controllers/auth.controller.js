const config = require("../config/auth.config");
const db = require("../models");
const EmpleadoUsu = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const EmpleadoUsu = new User({
    

NombreEmpleado: req.body.NombreEmpleado,
contraEmpleado: bcrypt.hashSync(req.body.contraEmpleado, 8),
Turno: req.body.Turno,
Conctacto: req.body.Conctacto
  });

  EmpleadoUsu.save((err, EmpleadoUsu) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          EmpleadoUsu.roles = roles.map(role => role._id);
          EmpleadoUsu.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "EmpleadoUsu" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        EmpleadoUsu.roles = [role._id];
        EmpleadoUsu.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  EmpleadoUsu.findOne({
    NombreEmpleado: req.body.NombreEmpleado,
  })
    .populate("roles", "-__v")
    .exec((err, EmpleadoUsu) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!EmpleadoUsu) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.contraEmpleado,
        EmpleadoUsu.contraEmpleado
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: EmpleadoUsu.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < EmpleadoUsu.roles.length; i++) {
        authorities.push("ROLE_" + EmpleadoUsu.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: EmpleadoUsu._id,
        NombreEmpleado: EmpleadoUsu.NombreEmpleado,
        contraEmpleado: EmpleadoUsu.contraEmpleado,
        Turno: EmpleadoUsu.Turno,
        Conctacto: EmpleadoUsu.Conctacto,
        roles: authorities,
        accessToken: token
      });
    });
};
