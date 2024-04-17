const express = require("express");
const jwt = require("jsonwebtoken");
const stripe = require('stripe')('sk_test_51P4YOgCNNp0OCbQZMV15A9eXXOISb4BkR4OB1pDjvkZ1AluMWNsrPBOW3qxG9gaBHkqMdTnapmC2IddFZKDnaqoi00AKsp3hO5');
const { client, createTables, register, login, getAllUsers } = require("./db");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//LOGIN ROUTE
app.post("/api/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    delete user.password;
    const token = jwt.sign(user, "secret");
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

//REGISTER ROUTE
app.post("/api/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await register(username, password);
    delete user.password;
    const token = jwt.sign(user, "secret");
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

//GET ALL USERS PROTECTED ROUTE
function requireToken(req, res, next) {
    const token = req.headers.authorization;
    try {
        const user = jwt.verify(token, "secret");
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

app.get("/api/users", requireToken, async (req, res, next) => {
    const users = await getAllUsers();
    res.send(users.rows);
});

// Stripe Checkout Session Route
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: "Invalid request: cartItems not provided." });
    }
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
      }));

// Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/success`, 
      cancel_url: `${req.headers.origin}/cancel`,
    });

     
       res.json({ url: session.url });
      } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
      }
    });

// Initialize the server
async function init() {
  await client.connect();
  createTables();
  app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
  });
}
init();
