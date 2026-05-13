import Booking from "../model/Booking.js";
import Payment from "../model/Payment.js";
import { createOrder } from "../services/createOrder";

export const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate(
      "userId serviceId providerId",
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const order = await createOrder({
      amount: booking.totalPrice,
      receipt: `receipt_${booking._id}`,
    });

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
    return res.status(500).json({ message: "Error creating payment order" });
  }
};
