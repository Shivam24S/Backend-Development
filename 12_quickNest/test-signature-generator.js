import crypto from "crypto";

// Your Razorpay Test Secret
const SECRET = "XNp6uMoo1dvY1Dybt6TaR7WP";

// The EXACT payload you're sending in Postman
const payload = {
    event: "payment.captured",
    payload: {
        payment: {
            entity: {
                id: "pay_test12345",
                order_id: "order_SqljzUT694bjZg",
                amount: 50000,
                notes: {
                    bookingId: "69f42d15008085aa7aaafeba"
                },
                signature: "test_signature_123"
            }
        }
    }
};

// Convert to JSON string (exactly as Postman sends it)
const body = JSON.stringify(payload);

// Calculate signature
const signature = crypto
  .createHmac("sha256", SECRET)
  .update(body)
  .digest("hex");

console.log("=".repeat(80));
console.log("WEBHOOK SIGNATURE GENERATOR");
console.log("=".repeat(80));
console.log("Body being sent:");
console.log(body);
console.log("\nSecret:", SECRET);
console.log("-".repeat(80));
console.log("Generated Signature:");
console.log(signature);
console.log("=".repeat(80));
console.log("\nAdd this to your Postman request:");
console.log("Header: x-razorpay-signature");
console.log("Value: " + signature);
console.log("=".repeat(80));
