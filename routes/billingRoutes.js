const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // console.log(req.body);
    let amount = 500;
try {
    const charge = await stripe.charges.create({
          amount,
          currency: 'usd',
          description: '$5 fo 5 credits',
          source: req.body.id
        })
console.log('Charge:', charge);
    }  catch (err) {
    console.log("Error::", err);
  //  res.status(500).send({error: "Purchase Failed"});
};

    try { req.user.credits += 5;
      const user = await req.user.save();
       res.send(user);
       console.log('user:', user);
     } catch (error) {
                console.log(error);}
  });
};
