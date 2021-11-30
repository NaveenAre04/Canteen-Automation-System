import React, { useState, useEffect } from "react";
import { cartEmpty, loadCart } from "../core/helper/CartHelper";
import { Link, Redirect } from "react-router-dom";
import { getmeToekn, processPayment } from "./helper/BrainTreePaymentHelper";
import { createOrder } from "../core/helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BraibTreePayment = (
  { products, setReload = (f) => f, reload = undefined }
) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const [redirect, setRedirect] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToekn(userId, token)
      .then((info) => {
        console.log(info);
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch();
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to={{
        pathname: "/orders",
        state: { payment:true }
      }} />;
    }
  };

  const onPurchase = () => {
    setInfo({
      loading: true,
    });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getFinalPrice(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            const orderData = {
              products: products,
              trasacion_id: response.trasacion_id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData).then((response) => {
              console.log(response);
            });
            console.log("SUCCESS", response);
            cartEmpty(() => {
              console.log("crash");
            });
            //setReload(!reload);
            setRedirect(true);
            //window.location.replace("/orders");
          })
          .catch((err) => {
            setInfo({ error: false, success: false });
          });
      })
      .catch();
  };

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showBrainTreeDroIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-primary btn-block" onClick={onPurchase} style={{
          backgroundImage:"linear-gradient(to right, rgba(241,243,244,1), rgba(248,98,0,1))",
          borderColor:"#f1ebe6",textAlign:"start"
        }}>
            <img src="https://logos-download.com/wp-content/uploads/2019/11/Braintree_Payments_Logo_old.png" style={{width:"20%",marginRight:"21%",marginTop:"2%",marginBottom:"3%"}}/>Pay with Braintree
            </button>
          </div>
        ) : (
          <div class="spinner-border" role="status" style={{color:"black"}}>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {console.log(redirect)}
      {getARedirect(redirect)}
      {showBrainTreeDroIn()}
    </div>
  );
};

export default BraibTreePayment;
