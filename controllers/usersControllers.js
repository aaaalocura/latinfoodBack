const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
    
        User.findByEmail(email, (err, myUser) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: 'Hubo un error con el usuario',
              error: err
            });
          }
    
          if (!myUser) {
            return res.status(401).json({
              success: false,
              message: 'El email no fue encontrado'
            });
          }
    
          const hashWith2y = myUser.password.replace(/^\$2a/, "$2y");
          const isPasswordValid = bcrypt.compare(password, hashWith2y);
    
          if (isPasswordValid) {
            const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});
    
            const data = {
              id: myUser.id,
              name: myUser.name,
              last_name: myUser.last_name,
              last_name2: myUser.last_name2,
              email: myUser.email,
              address: myUser.address,
              phone: myUser.phone,
              session_token: `JWT ${token}`
            };
    
            return res.status(201).json({
              success: true,
              message: 'El usuario fue autenticado',
              data: data
            });
          } else {
            return res.status(401).json({
              success: false,
              message: 'La contraseña es incorrecta'
            });
          }
        });
      },

    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

    }

}
