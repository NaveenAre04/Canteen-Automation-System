import React, { useState, useEffect } from "react";
import { processPayment, processPaytmPayment } from "./helper/PaytmPaymentHelper";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../core/helper/CartHelper";
import { createOrder } from "../core/helper/OrderHelper";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const PaytmPayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},

  });
  const [html,setHtml] = useState("<div>hello</div>");

  const user = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;

  const onSubmit = () => {
    var params = {
      CUST_ID: user._id,
      TXN_AMOUNT: getFinalPrice(),
      EMAIL: user.email,
    };

    processPayment(user._id, token, JSON.stringify(params))
      .then((data) => {console.log(data);
        if(data){
            setHtml(data.html)
           document.f1.submit();
        }
    })
      .catch((err) => console.log(err));


    // processPaytmPayment(user._id, token, JSON.stringify(params))
    //   .then((data) => {console.log(data);
    //     if(data){
    //         setHtml(data.html)
    //        document.f1.submit();
    //     }
    // })
    //   .catch((err) => console.log(err));

  };

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const paytmProcess = () => {
    return (
        <React.Fragment>
            {console.clear()}
            {console.log(html)}
      <button className="btn btn-primary btn-block" onClick={onSubmit} style={{
          //backgroundImage:"linear-gradient(to right, rgba(241,243,244,1), rgba(248,98,0,1))",
          backgroundColor:"#00baed",textAlign:"center",borderColor:"#00baed",padding:"3%"
        }}>
      {/* <img src="https://lh3.googleusercontent.com/proxy/oboBJHYoNPIPJtVDd-9ve6UfZ0cpy36N7XNN74Icydq3r8MAOCVPRDTlZ1ocZhr97SoVMj--wGWlmpa0NyIG7dTdCOc-Is39acygKUl79K8orYCR21ZIECfk" style={{width:"20%",marginRight:"21%",marginTop:"2%",marginBottom:"3%"}}/> */}

      <span >Pay ₹ {getFinalPrice()} with Paytm</span>
      </button>
      <div hidden={true}>
       {ReactHtmlParser(html) }</div>
       {console.log(ReactHtmlParser(html) )}
      </React.Fragment>
    );
  };

  return <div>{paytmProcess()}</div>;
};

export default PaytmPayment;
