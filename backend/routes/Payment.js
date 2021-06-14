const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const stripe = require('stripe')('sk_test_51Iz3EFKNPi1VJcHgnuFkbNKZVQ42yOZ06KHbSugvm3YOiVxFdYzzgFt4Ty2t9UUPilEG7CCgRqfZ8EVc8c6lCZNv00n5jzX8zX');

router.post("", (req, res, next) => {
  stripe.charges.create({
    amount: 10000,
    currency: "USD",
    description: 'One-time setup fee',
    source: req.body.token.id,
  } , (err, charge) => {
    if (err) {
      next(err);
    }
    res.json({success: true, stauts: "payment successfully"});
  });
  console.log(req.body);
});

module.exports = router;
