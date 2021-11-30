import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "./helper/OrderHelper";
import Base from "./Base";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ImageHelper from "./helper/ImageHelper";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const loadOrders = () => {
    setLoading(true)
    getOrders(userId, token)
      .then((data) => {
        setLoading(false)
        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      {console.log(orders)}
      <Base title="Orders Page" description="Your Previous Orders">
        <Grid container justify="center" style={{ marginTop: -100 }}>
          {console.log(props)}
          {props.location.state && props.location.state.payment && (
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <img
                src="https://i.ya-webdesign.com/images/success-icon-png-16.png"
                style={{ width: 100 }}
              ></img>
              <Typography style={{ color: "#41ad48" }}>
                Payment Successfull
              </Typography>
              <Typography
                style={{ color: "#878787", fontSize: 12, marginBottom: 20 }}
              >
                you can see the status of your order below
              </Typography>
            </Grid>
          )}
          {orders.length > 0 ? (
            orders.reverse().map((order, index) => {
              return order.products.map((prd, index) => {
                return (
                  <Grid
                    item
                    xs={9}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                    key={index}
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                        style={{
                          padding: 15,
                          paddingLeft: 50,
                          paddingRight: 50,
                        }}
                      >
                        <ImageHelper product={prd} />
                      </Grid>
                      <Grid item xs={3} style={{ paddingTop: 15 }}>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          Karthik Wear
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 12,
                            color: "#878787",
                            marginTop: 3,
                          }}
                        >
                          A tshirt with puppy
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 13,
                            color: "#878787",
                            marginTop: 3,
                          }}
                        >
                          seller : ShopStore
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ paddingTop: 15 }}>
                      <Typography
                          style={{
                            fontSize: 11,
                            fontWeight: "bold",
                            color: "#878787",
                          }}
                        >
                          Order Id&nbsp;:&nbsp;{order._id}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          ₹&nbsp;{prd.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} style={{ paddingTop: 15 }}>
                        <Typography style={{ fontSize: 14, color: "black" }}>
                          <FiberManualRecordIcon
                            style={{ color: "green", fontSize: 10 }}
                          ></FiberManualRecordIcon>
                          &nbsp;{order.status} on{" "}
                          <span style={{ fontSize: "13", fontWeight: "bold" }}>
                            {new Date(order.createdAt).toDateString()}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#878787",
                            marginTop: 10,
                          }}
                        >
                          Continue shopping with us ! &nbsp;
                          <InsertEmoticonIcon style={{ color: "#f97100" }} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              });
            })
          ) : (
            <Grid container justify="center">
              {loading==true?
            <div>
              <h1>Fetching Order details...</h1>
            </div>: <div>
              <h1>No Orders found</h1>
            </div>
            
            }
            </Grid>
          )}{" "}
        </Grid>
      </Base>
    </div>
  );
};

export default Orders;
