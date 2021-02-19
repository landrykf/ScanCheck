const express = require('express');
const userController = require('./routes/usersController');
const authController = require('./routes/authController')
const suscribeController = require ('./routes/suscribeController');
exports.router = (function(){
    let apiRouter = express.Router();

    //Auth
    apiRouter.route('/user/register').post(authController.signUp);

    //User
    apiRouter.route('/user').get(userController.getAllUser);
    apiRouter.route('/user/:id').get(userController.userInfo);
    apiRouter.route('/user/:id').put(userController.updateUser);
    apiRouter.route('/user/:id').delete(userController.deleteUser)

    //Follow Unfollow 
    apiRouter.route('/user/follow/:id').patch(suscribeController.follow)
    apiRouter.route('/user/unfollow/:id').patch(suscribeController.unfollow)

    return apiRouter;
})();