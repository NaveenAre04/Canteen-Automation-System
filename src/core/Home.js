import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import CardObject from "./Card";
import { getProducts } from "./helper/coreapicalls";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts().then((data) => {
      setLoading(false)
      console.log(data);
      if (!data) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    console.log(loading);
    console.log(process.env.REACT_APP_IS_TEST_SERVER == "true" ?process.env.REACT_APP_STRIPE_TEST_PRVT_KEY:process.env.REACT_APP_STRIPE_TEST_LIVE_KEY)
    console.log(  process.env.REACT_APP_IS_LOCAL_INSTANCE == "true"
? process.env.REACT_APP_LOCALHOST
: process.env.REACT_APP_PRODUCTION)
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store!">
      <div className="row text-center">
      </div>  <Grid container justify="center">
          <Grid item xs={10}>
      <div className="row"  style={{marginTop:-90,marginBottom:180}}>
      
        {products.map((prd, index) => {
          return (
           <div key={index} className="col-2 md-4 text-center" style={{marginBottom:20}}>
               <CardObject product={prd}/>
              
           </div>
          )
        })}
      </div>
      
      <Dialog open={loading}>
          <div style={{padding:40}}>
        <CircularProgress /></div>
        </Dialog>
      
      </Grid></Grid>
    </Base>
  );
}
