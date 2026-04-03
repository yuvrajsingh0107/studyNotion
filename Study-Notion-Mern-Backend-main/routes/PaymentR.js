const express = require('express');
const router = express.Router();
const { protect, authorize, isSiteOwner } = require('../middlewares/auth');

// import controllers
const { createOrder, verifyPaymentSignature, sendPaymentSuccessEmail, mockPurchase } = require('../controllers/PaymentC');

router.post('/mockpurchase', protect, authorize('Student'), mockPurchase);
router.post('/createorder', protect, authorize('Student'), createOrder);
router.post('/verifypaymentsignature', protect, authorize('Student'), verifyPaymentSignature);
router.post('/sendpaymentsuccessemail', protect, authorize('Student'), sendPaymentSuccessEmail);

module.exports = router;
