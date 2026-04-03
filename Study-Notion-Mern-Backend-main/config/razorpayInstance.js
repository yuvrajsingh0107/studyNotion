// const Razorpay = require('razorpay');

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_PAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_PAY_KEY_SECRET,
//   headers: {
//     "X-Razorpay-Account": process.env.RAZORPAY_MERCHANT_ID
//   }
// });

// module.exports = razorpayInstance;

/** No Razorpay SDK until keys are configured; payment flow uses mock enrollment instead. */
module.exports = null;
