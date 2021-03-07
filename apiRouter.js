const express = require("express");
const userController = require("./routes/usersController");
const authController = require("./routes/authController");
const suscribeController = require("./routes/suscribeController");
const favoriteController = require("./routes/favoriteController");
const mangaController = require("./routes/mangaController");
const likeController = require("./routes/likeController");
const commentController = require("./routes/commentController");
const uploadController = require("./routes/uploadController");
const multer = require("multer");
const upload = multer();

exports.router = (function () {
  let apiRouter = express.Router();
 
  //Auth
  apiRouter.route("/user/register").post(authController.signUp);
  apiRouter.route("/user/login").post(authController.signIn);
  //User
  apiRouter.route("/users").get(userController.getAllUser);
  apiRouter.route("/user/:id").get(userController.userInfo);
  apiRouter.route("/user/me").get(userController.userInfo);

  apiRouter.route("/user/:id").put(userController.updateUser);
  apiRouter.route("/user/:id").delete(userController.deleteUser);

  //Upload 
//   apiRouter
//     .route("/user/upload", upload.single("file"))
//     .post(uploadController.uploadProfil);

apiRouter.post("/user/upload", upload.single("file"), uploadController.uploadProfil);

  //Follow Unfollow
  apiRouter.route("/user/follow/:id").patch(suscribeController.follow);
  apiRouter.route("/user/unfollow/:id").patch(suscribeController.unfollow);

  //Favorite

  apiRouter.route("/user/favoriteNumber").post(favoriteController.number);
  apiRouter.route("/user/favorited").post(favoriteController.favorited);
  apiRouter.route("/user/addtofavorite").post(favoriteController.addToFavorite);
  apiRouter
    .route("/user/removefromfavorite")
    .post(favoriteController.removeFromFavorite);

  //Manga
  apiRouter.route("/manga").get(mangaController.getManga);
  apiRouter.route("/manga").post(mangaController.createManga);
  apiRouter.route("/manga/:id").put(mangaController.updateManga);
  apiRouter.route("/manga/:id").delete(mangaController.deleteManga);

  //Like Unlike
  apiRouter.route("/manga/like-manga/:id").patch(likeController.likeManga);
  apiRouter.route("/manga/unlike-manga/:id").patch(likeController.unlikeManga);

  //comments
  apiRouter
    .route("/manga/manga-comment/:id")
    .patch(commentController.mangaComment);
  apiRouter
    .route("/manga/edit-manga-comment/:id")
    .patch(commentController.editMangaComment);
  apiRouter
    .route("/manga/delete-manga-comment/:id")
    .patch(commentController.deleteMangaComment);
  return apiRouter;
})();
