import express from "express";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";

const router = express.Router();

// user
router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);

router.patch(
  "/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.update,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.deleteUser,
);

// category

router.post(
  "/add",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.add,
);

export default router;
