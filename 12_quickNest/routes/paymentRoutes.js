import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentById,
} from "../controller/paymentController.js";
import { razorpayWebhook } from "../controller/webHookController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create payment order
router.post("/create", auth, createPaymentOrder);

// Verify payment (client-side verification)
router.post("/verify", auth, verifyPayment);

// Get payment by ID
router.get("/:id", auth, getPaymentById);

// Webhook endpoint (no auth needed, signature verified instead)
router.post("/webhook", razorpayWebhook);

export default router;
