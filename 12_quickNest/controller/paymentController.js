import Booking from "../model/Booking.js";
import Payment from "../model/Payment.js";
import { createOrder } from "../services/createOrder.js";
import crypto from "crypto";

export const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    console.log("Creating payment for bookingId:", bookingId);

    const booking = await Booking.findById(bookingId).populate(
      "userId serviceId providerId",
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Booking found:", booking);

    const order = await createOrder({
      amount: booking.totalPrice,
      receipt: `receipt_${booking._id}`,
    });

    console.log("Order created:", order);

    const payment = await Payment.create({
      bookingId: booking._id,
      userId: booking.userId._id,
      razorPayOrderId: order.id,
      amount: booking.totalPrice,
      currency: "INR",
    });

    booking.paymentId = payment._id;
    await booking.save();

    return res.status(201).json({ success: true, order, payment });
  } catch (error) {
    console.error("Payment creation error:", error);
    return res.status(500).json({ message: error.message || "Error creating payment order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    console.log("Verifying payment with order:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Received signature:", razorpay_signature);

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_TEST_API_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("Generated signature:", generated_signature);

    const isAuthentic = generated_signature === razorpay_signature;

    if (!isAuthentic) {
      console.log("Signature mismatch!");
      return res.status(400).json({ 
        message: "Payment verification failed",
        received: razorpay_signature,
        expected: generated_signature
      });
    }

    return res.status(200).json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate(
      "bookingId userId"
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ success: true, payment });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
