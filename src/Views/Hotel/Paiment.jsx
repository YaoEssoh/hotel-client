import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51R26AnJlesbz4WIla06C87TZBgjgKHYwpfdKEBjDduGhE4lYfAyvIfYRi9aLQLEyGEtB5NrLpjaK4Bh5LC1CngiS006KreZRmx"
);
function Paiment() {
  const { id } = useParams();
  const handleCheckOut = async () => {
    const stripe = await stripePromise;
    try {
      const response = await fetch(
        `http://localhost:3000/paiement/create-checkout-session/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = await response.json();
      if (session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } else {
        console.error("Failed to create session:", session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <button
        id="checkout-button"
        onClick={handleCheckOut}
        style={{
          backgroundColor: "#6772E5",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#555ABF")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#6772E5")}
      >
        Payer
      </button>
    </div>
  );
}

export default Paiment;
