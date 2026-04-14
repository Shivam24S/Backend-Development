import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

// get all booking

router.get("/allBookings", auth, bookingController.getAllBookings);

router.get(
  "/allBookingByService/:id",
  auth,
  bookingController.getBookingByService,
);

export default router;
