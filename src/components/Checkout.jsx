import React from "react";

function Checkout({ cartItems }) {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      console.log('Server response:', response);

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      console.log('Response JSON:', data);

      const stripe = Stripe('pk_test_51P4YOgCNNp0OCbQZAWwQhXQpImOQYWRZvTPN6PboTUYLc984v71nEaZTaCrO3sGy6qbqRsTcu1gKJ3s6NbngLuwu000vJ3R7Kx');

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const totalFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity} = $
            {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: {totalFormatted}</p>
      <button onClick={handleCheckout}>Confirm Checkout</button>
    </div>
  );
}

export default Checkout;
