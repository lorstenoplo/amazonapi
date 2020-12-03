const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Hu9UyF1ZuHt7Lm0IP5HNqJ9czZS5krK2kWaFnGT8O8sS1La2XOw7p7pshRJA24U3aPFQ30LFtafa0PuT3YO6yZy00uOan8Zbt");
const port = process.env.PORT;

// API

// - App config
const app = express();

// - Middlewares
app.use(cors(origin="react-amz-clone.web.app"));
app.use(express.json());

// - API Routes
app.post('/payments/create',async (req,res)=>{
    const total = req.query.total;

    console.log("payment request recived", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
        description: 'Bought some products from amazon-clone',
        payment_method_types: ['card'],
        shipping:{
            name:"test",
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
              }
        }
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// - Listen command 
app.listen(port,()=>{console.log(`App started on port ${port}`)})