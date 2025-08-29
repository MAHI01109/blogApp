import { Router } from "express";
import { getAuthStatus, loginUser, logoutUser, registerUser, updateAccountDetails, updateUserCoverImage, updateUserProfileImage } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import passport from "passport";
const routes = Router();
import { upload } from "../middleware/multerFileUpload.middleware.js";

routes.route('/register').post(registerUser);
routes.route('/login').post(loginUser);
routes.route('/status').get(getAuthStatus);
routes.route('/logout').post(logoutUser);

routes.route('/update').post(isAuthenticated,updateAccountDetails);
routes.route('/avatar').post(isAuthenticated, upload.single("profileImage"), updateUserProfileImage);
routes.route('/cover-image').post(isAuthenticated,upload.single("coverImage"),updateUserCoverImage);

// Google OAuth
routes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

routes.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/admin", // redirect to frontend route
  failureRedirect: "http://localhost:5173/login",
}));

export default routes;

