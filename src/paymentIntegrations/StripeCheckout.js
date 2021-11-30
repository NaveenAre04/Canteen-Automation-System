import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "../core/helper/CartHelper";
import { Link, Redirect } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../core/helper/OrderHelper";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

const Stripecheckout = ({
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

  const [redirect, setRedirect] = useState(false);

  const jwttoken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to={{
        pathname: "/orders",
        state: { payment:true }
      }} />;
    }
  };

  const makePayment = (token) => {
    console.log(token);
    setData({...data,loading:true})
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further response
        const { status } = response;
        console.log("STATUS", status);
        const orderData = {
          products: products,
          trasacion_id: token.id,
          amount: getFinalPrice(),
        };
        createOrder(userId, jwttoken, orderData).then((response) => {
          console.log(response);
        });
        cartEmpty(()=>{
          console.log("crash")
        });
        setRedirect(true);

      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() && products ? (
      <StripeCheckout
       // stripeKey="pk_test_AXn7ymmTtJYigB8SaD2Co4Fv00IWbYYiPC"       	
       stripeKey={process.env.REACT_APP_IS_TEST_SERVER == "true" ?process.env.REACT_APP_STRIPE_TEST_PRVT_KEY:process.env.REACT_APP_STRIPE_TEST_LIVE_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirts"
        currency="inr"
        shippingAddress
        billingAddress
        alipay={true}
        bitcoin
        allowRememberMe
        image={
          "data:image/png;base64,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"
        }
      >
        <button className="btn btn-primary btn-block" style={{
          backgroundImage:"linear-gradient(to right, rgba(81,62,118,1), rgba(50,51,93,1))",
          borderColor:"#32335d",textAlign:"start"
        }}>
         <img src="https://b.stripecdn.com/site-srv/assets/img/blog/posts/sec-3d-v2/guide-cdfe5e0402fdae098bd064ed51de4c00e88fd4b3.png" style={{width:"10%",marginRight:"30%"}}/>Pay Now with stripe
          </button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin to checkout</button>
      </Link>
    );
  };

  return (
    <div>
        <Dialog open={data.loading}>
          <div style={{padding:40}}>
        <CircularProgress /></div>
        </Dialog>
         {getARedirect(redirect)}
     {products ? (
        <React.Fragment>        
          <h3 className="text-white">Your bill is ₹{getFinalPrice()}</h3>
          {showStripeButton()}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Stripecheckout;
