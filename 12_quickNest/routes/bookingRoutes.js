import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

// get all booking

router.get("/allBookings", auth, bookingController.getAllBookings);

router.get(
  "/allBookingByService/:id",
  auth,
  bookingController.getBookingByServiceId,
);

// get booking by userId user Route

router.get("/loginUser", auth, bookingController.bookingByUserId);


// confirm booking status

router.post("/confirmBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.confirmBookingStatus);

// cancel booking status

router.post("/cancelBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.cancelBookingStatus);

// complete booking status

router.post("/completeBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.completeBookingStatus);

// available time slots
router.get("/availableTimeSlots", auth, bookingController.availableTimeSlots);

// get booking byId

router.get("/:id", auth, bookingController.getBookingById);

router.get(
  "/user/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.bookingByUserId,
);




export default router;
