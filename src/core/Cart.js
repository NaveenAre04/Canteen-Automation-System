import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { loadCart } from "./helper/CartHelper";
import Stripecheckout from "../paymentIntegrations/StripeCheckout";
import BraibTreePayment from "../paymentIntegrations/BraibTreePayment";
import PaytmPayment from "../paymentIntegrations/PaytmPayment";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import CardObject from "./Card";
import Grid from "@material-ui/core/Grid";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        {/* <h2>This section is to load products</h2> */}
        <div className="row">
          {products.map((prd, index) => {
            return (
              <div className="col-3 mb-3" key={index}>
                <CardObject
                  product={prd}
                  addtoCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const loadChechout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description={
      <div> <Link to="/">
        <button className="bun btn-sm btn-info" style={{color:"white"}}> 
         Add more products!
        </button></Link>
      </div>
    }>
      <Grid container justify="center" style={{marginTop:-90}}>
      <Grid item xs={11}>
      <div className="row text-center">
        {products && products.length > 0 ? (
          <React.Fragment>
            <div className="col-7 offset-md-1" 
            style={{
              border: "1px solid",
              padding: "10px",
              borderRadius: "10px 0px 0px 10px",
              backgroundColor:"#d9f3de"
            }}
            >{loadAllProducts()}</div>
            {isAuthenticated() ?
            <div className="col-3"
            style={{
              border: "1px solid",
              padding: "10px",
              borderRadius: "0px 10px 10px 0px",
              marginLeft:10,
              backgroundColor:"white"
            }}
            >
              <div className="row">
           
              
                <div className="col-12 mb-4">
                  <Stripecheckout products={products} setReload={setReload} />
                </div>
                <div className="col-12 text-center">
                  <h6 style={{color:"black"}}>(or)</h6>
                </div>
                <div className="col-12">
                  <BraibTreePayment
                    products={products}
                    setReload={setReload}
                  ></BraibTreePayment>
                </div>
                <div className="col-12 text-center" style={{marginTop:5}}>
                  <h6 style={{color:"black"}}>(or)</h6>
                </div>
                <div className="col-12">
                  <PaytmPayment 
                   products={products}
                   setReload={setReload}
                  />
                </div>
               
               
              </div>
            </div> :
            <div className="col-3">
             <Link to="/signin">
             <button className="btn btn-warning btn-block"
             style={{borderRadius:5,borderTopLeftRadius:0,borderBottomLeftRadius:0}}
             >Signin to checkout</button>
           </Link></div>
            }
          </React.Fragment>
        ) : (
          <div
            className="col-12 text-danger"
            style={{ height: window.innerHeight * 0.44 }}
          >
            No Products added to Cart!
          </div>
        )}
      </div></Grid></Grid>
    </Base>
  );
};
export default Cart;
