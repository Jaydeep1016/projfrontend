import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CardHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        if (status == 200) {
          cartEmpty(() => setData({ success: true }));
        }

        //call further method
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IRYW5EY9vBCd0I3jf5yX0br9xU2trQGiW9OuGoxE9u34itLfZ9bZr8bnw1QqFskTPRuWDI5R9kATaC92gWGZlH600NhafxTyO"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="R S SON'S"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">Signin</button>
      </Link>
    );
  };

  //   const errorMessage = () => {

  //   }
  return (
    <div>
      {data.success && <Redirect to="/" />}
      <h3 className="text-success">
        Total Price of All Products ${getFinalAmount()}
      </h3>
      {getFinalAmount() > 0 ? showStripeButton() : ""}
    </div>
  );
};

export default StripeCheckout;
