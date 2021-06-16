const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const stripe = require('stripe')('sk_test_51Iz3EFKNPi1VJcHgnuFkbNKZVQ42yOZ06KHbSugvm3YOiVxFdYzzgFt4Ty2t9UUPilEG7CCgRqfZ8EVc8c6lCZNv00n5jzX8zX');

router.post("", (req, res, next) => {
  const amount = +req.body.amount * 100;
  stripe.charges.create({
    amount: amount,
    currency: "USD",
    description: 'One-time setup fee',
    source: req.body.token.id,
  } , (err, charge) => {
    if (err) {
      next(err);
    }
    res.json({success: true, stauts: "payment successfully", charge: charge});
  });
});

module.exports = router;
