import razorpay from "../config/razorPay.js";

export const createOrder = async ({ amount, receipt }) => {
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt,
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error(error);
  }
};
