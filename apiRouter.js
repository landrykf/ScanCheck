const express = require('express');
const usersController = require('./routes/usersController');
const messagesController = require('./routes/messagesController');
const likesController = require('./routes/likesController');

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

//Likes routes
apiRouter.route('/messages/:messageId/vote/like').post(likesController.likePost);
apiRouter.route('/messages/:messageId/vote/dislike').post(likesController.dislikePost)

return apiRouter;
})();