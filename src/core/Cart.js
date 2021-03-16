import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CardHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            RemoveFromCart={true}
            AddtoCart={false}
            setReload={setReload}
            reload={reload}
          ></Card>
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is to load Checkout products</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length != 0 ? (
            loadAllProducts(products)
          ) : (
            <h1 className="text-danger">No Products in Cart</h1>
          )}
        </div>
        <div className="col-6">
          <StripeCheckout
            products={products}
            setReload={setReload}
          ></StripeCheckout>
          <PaymentB products={products} setReload={setReload}></PaymentB>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
