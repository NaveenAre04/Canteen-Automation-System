import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link, Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const CardObject = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default Description";
  const cartPrice = product ? product.price : "Default";

  const addToCart = (product) => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart, product) => {
    return (
      addtoCart && (
        <React.Fragment>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <button
                onClick={() => {
                  addToCart(product);
                }}
                style={{ color: "white", borderRadius: 5 }}
                className="btn btn-block btn-warning mt-2 mb-2 btn-sm"
              >
                <ShoppingCartIcon></ShoppingCartIcon>
              </button>
            </Grid>
            <Grid item xs={5}>
              <button
                style={{ color: "white", borderRadius: 5, fontSize: 16 }}
                className="btn btn-block btn-info mt-2 mb-2 btn-sm"
              >
                ₹ {product.price}
              </button>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) =>
    removeFromCart && (
      <React.Fragment>
        <Grid container justify="space-between">
          <Grid item xs={6}>
            <button
              onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
              }}
              style={{ color: "white", borderRadius: 5 }}
              className="btn btn-block btn-danger mt-2 mb-2 btn-sm"
            >
              <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
            </button>
          </Grid>
            <Grid item xs={5}>
              <button
                style={{ color: "white", borderRadius: 5, fontSize: 17 }}
                className="btn btn-block btn-info mt-2 mb-2 btn-sm"
              >
                ₹ {product.price}
              </button>
          </Grid>
        </Grid>
      </React.Fragment>
    );

  return (
    <Grid container>
      <Grid item xs={12}>
        {getARedirect(redirect)}
        <Card>
          <CardActionArea>
            <CardMedia>
              <ImageHelper product={product} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {cartTitle}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {cartDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {removeFromCart ? null : (
              <div className="col-12">{showAddToCart(addtoCart, product)}</div>
            )}
            <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardObject;
// <div className="card text-white bg-dark border border-success ">
//   <div className="card-header lead">{cartTitle}</div>
//   <div className="card-body">
//     {getARedirect(redirect)}
//     <div className="rounded border border-success p-2">
//       <ImageHelper product={product} />
//     </div>
//     <p className="lead bg-success font-weight-normal text-wrap">
//       {cartDescription}
//     </p>
//     <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
//     <div className="row">
//       <div className="col-12">{showAddToCart(addtoCart, product)}</div>
//       <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
//     </div>
//   </div>
// </div>
