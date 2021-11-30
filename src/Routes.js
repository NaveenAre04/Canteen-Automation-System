import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import SuccessPayment from "./paymentIntegrations/SuccessPayment";
import Orders from "./core/Orders";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/cart" exact component={Cart}></Route>
        <Route path="/cartsuccessPayment" exact component={SuccessPayment}></Route>

        
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/orders" exact component={Orders} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
       
        //! category routes
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
          <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />


        //! product routes
        <AdminRoute
          path="/admin/create/product"
          exact
          component={AddProduct}
        />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
        
        //! order routes
        <AdminRoute
          path="/admin/create/orders"
          exact
          component={AdminDashboard}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
