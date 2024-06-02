import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import AddtoCart from '../components/AddtoCart/AddtoCart';
import AboutUs from './About/AboutUs';
import Categories from './Categories/Categories';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import CheckOut from '../components/CheckOut/CheckOut';
import SearchShow from './SearchShow/SearchShow';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Address from './Address/Address';

import DashBoard from './Vendor/DashBoard/DashBoard';
import AddCategory from './Vendor/Category/AddCategory';
import EditCategory from './Vendor/Category/EditCategory';
import AddProduct from './Vendor/Product/AddProduct';
import EditProduct from './Vendor/Product/EditProduct';
import Edit from './Vendor/Product/Edit/Edit';
import Orders from './Vendor/Query/Orders';
import OrderDetails from './Vendor/Query/OrderDetails';
import UserQuery from './Vendor/Query/UserQuery';


const MenuRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addtocart' element={<AddtoCart />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/search-results' element={<SearchShow />} />
        <Route path='/address' element={<Address />} />
        <Route path='/address2' element={<Address />} />

        <Route path='/vendor-dashboard' element={<DashBoard />} />
        <Route path='/vendor-addcategory' element={<AddCategory />} />
        <Route path='/vendor-editcategory' element={<EditCategory />} />
        <Route path='/vendor-addproduct' element={<AddProduct />} />
        <Route path='/vendor-editproduct' element={<EditProduct />} />
        <Route path='/vendor-orders' element={<Orders />} />
        <Route path='/vendor-ordersdetails' element={<OrderDetails />} />
        <Route path='/vendor-userquery' element={<UserQuery />} />
        <Route path='/vendor-edit' element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default MenuRoutes;
