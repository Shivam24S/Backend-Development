import express from "express";
import auth from "../middleware/auth.js";
import providerController from "../controller/providerController.js";
import checkRole from "../middleware/checkRole.js";
import { uploadDocument } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/registerAsProvider",
  uploadDocument.array("documents", 3),
  auth,
  providerController.registerAsProvider,
);

router.get(
  "/getProviders",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProvider,
);

router.get(
  "/getProviderBookings",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProviderBookings,
);

router.get(
  "/getProviderBookings/:id",
  auth,
  checkRole("provider"),
  providerController.getProviderBookings,
);

export default router;
