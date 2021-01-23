const express = require('express');
const usersController = require('./routes/usersController');
const messagesController = require('./routes/messagesController')

//Router

exports.router = (function() {
    let apiRouter = express.Router();

//Users routes

apiRouter.route('/users/register/').post(usersController.register);
apiRouter.route('/users/login/').post(usersController.login);
apiRouter.route('/users/me/').get(usersController.getUserProfile);
apiRouter.route('/users/me/').put(usersController.updateUserProfile);

//Messages routes
apiRouter.route('/messages/new/').post(messagesController.createdMessage);
apiRouter.route('/messages/').get(messagesController.listMessages);



return apiRouter;
})();