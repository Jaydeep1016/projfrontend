import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CardHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFORMATION->", token);

      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            {/* {console.log("i am in showbtdropIn")} */}
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <div className="d-grid">
              <button
                className="btn btn-block btn-success"
                onClick={onPurchase}
              >
                Buy
              </button>
            </div>
          </div>
        ) : (
          <h3>Please login or add in Cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              status: "Received",
            };
            createOrder(userId, token, orderData);

            // TODO:empty the cartEmpty

            cartEmpty(() => {
              console.log("Did we got a crash ?");
            });
            //TODO:force reload
            setReload(!reload);
          })
          .catch((error) => {
            setInfo({ location: false, success: false });
            console.log("PAYMENT FAILE");
          });
      })
      .catch();
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };
  return <div>{showbtdropIn()}</div>;
};

export default PaymentB;
