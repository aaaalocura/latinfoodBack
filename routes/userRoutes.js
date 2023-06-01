

const userController = require('../controllers/usersControllers');

module.exports = function(app) {
  app.post('/api/customers/create/', userController.register);
  app.post('/api/customers/login/', userController.login);
};
