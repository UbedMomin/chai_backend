import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // ✅ fixed import
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Use named export `upload.fields`
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;


//fix the login route in postman request 
// fix the import of multer middleware whaterver 