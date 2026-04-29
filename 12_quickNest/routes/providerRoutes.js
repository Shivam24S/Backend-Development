import express from "express";
import auth from "../middleware/auth.js";
import providerController from "../controller/providerController.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/registerAsProvider", auth, providerController.registerAsProvider);

router.get(
  "/getProviders",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProvider,
);

router.get(
  "/getProviderBookings/:id",
  auth,
  checkRole("admin,super_admin,provider"),
  providerController.getProviderBookings,
);

export default router;
