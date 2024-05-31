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
      </Routes>
    </Router>
  );
};

export default MenuRoutes;
