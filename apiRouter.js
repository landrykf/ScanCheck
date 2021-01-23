const express = require('express');
const usersController = require('./routes/usersController');


//Router

exports.router = (function() {
    let apiRouter = express.Router();

//Users routes

apiRouter.route('/users/register/').post(usersController.register);
apiRouter.route('/users/login/').post(usersController.login);

return apiRouter;
})();