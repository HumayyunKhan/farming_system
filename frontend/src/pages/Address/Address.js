import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CSS from "./Address.module.css";
import Loader from "../Loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backedUrl } from "../../apiUrl";
import { useLocation, useParams } from "react-router-dom";

const EnterDetailsBuy = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [YourItems, setYourItems] = useState([]);
  const location = useLocation()

  useLayoutEffect(() => {
    console.log("location.state.CartObject", location.state.cartObject)
    setYourItems(location.state.cartObject)
    // getSingleProduct()
    // const storedItemDetails = sessionStorage.getItem('buyItem');
    // const item = storedItemDetails ? JSON.parse(storedItemDetails) : {};
    // setProductName(item.productName);
    // setDescription(item.description);
    // setQuantity(item.quantity);
    // setPrice(150+parseInt(location.state.cartObject.newPrice));
  }, []);


  // async function getSingleProduct() {
   //   let ifUser = localStorage.getItem("buyer");
  //   ifUser = JSON.parse(ifUser)
  //   const storedListString = sessionStorage.getItem('buyItem');
  //   const storedList = storedListString ? JSON.parse(storedListString) : [];
  //   console.log("storedList", storedList);
  //   let { data } = await axios.get(`${backedUrl}/api/getCartItemsSingle/${storedList._id}/${ifUser._id}`);
  //   setProductName(data.data.productName);
  //   setDescription(data.data.description);
  //   setQuantity(data.data.quantity);
    // setPrice(150 + parseInt(location.state.cartObject.price));
  // }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1783/api/postorder", {
        firstname,
        lastname,
        email,
        number,
        city,
        country,
        address,
        productname:location.state.cartObject.productName,
        description:location.state.cartObject.description,
        quantity:location.state.cartObject.quantity,
        price
      });
      toast.success("Your order has been successfully placed! Our team will communicate with you on WhatsApp. Thank you!");
      resetFormFields();
    } catch (err) {
      console.log("err",err)
      toast.error("Please Enter a unique email address.");
    }
  };

  const resetFormFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setNumber(0);
    setCity("");
    setCountry("");
    setAddress("");
    sessionStorage.removeItem('buyItem');
  };

  useEffect(() => {
    const loading = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    loading();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className={`${CSS["container-fluid"]} container-fluid`}>
            <div className="container">
              <h1 className={CSS["contact-title"]}>Address Details</h1>
              <div className={CSS["contactus-container"]}>
                <div className={CSS["contactus-details"]}>
                  <form onSubmit={handleSubmitOrder}>
                    <div className={CSS["contactus-subject-container"]}>
                      <label className={CSS["contactus-label"]} htmlFor="_email"  >
                        Email<span className={CSS["contactus-star"]}>*</span>
                      </label>
                      <input className={CSS["contactus-subject"]} type="email" id="_email" name="_email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"} required />
                    </div>
                    <div className={CSS["contactus-name_email-container"]}>
                      <div className={CSS["contactus-name-container"]}>
                        <label className={CSS["contactus-label"]} htmlFor="_firstName">First Name
                          <span className={CSS["contactus-star"]}>*</span>
                        </label>
                        <input className={CSS["contactus-name"]} type="text" id="_firstName" name="_firstName" onChange={(e) => setFirstName(e.target.value)} value={firstname} placeholder={"First Name"} required />
                      </div>
                      <div className={CSS["contactus-name-container"]}>
                        <label className={CSS["contactus-label"]} htmlFor="_lastName">Last Name
                          <span className={CSS["contactus-star"]}>*</span>
                        </label>
                        <input className={CSS["contactus-email"]} type="text" id="_lastName" name="_lastName" onChange={(e) => setLastName(e.target.value)} value={lastname} placeholder={"Last Name"} required />
                      </div>
                    </div>
                    <div className={CSS["contactus-subject-container"]}>
                      <label className={CSS["contactus-label"]} htmlFor="_number">
                        Number<span className={CSS["contactus-star"]}>*</span>
                      </label>
                      <input className={CSS["contactus-subject"]} min={0} type="number" id="_number" name="_number" onChange={(e) => setNumber(e.target.value)} value={number} placeholder={"Number"} required />
                    </div>
                    <div className={CSS["contactus-name_email-container"]}>
                      <div className={CSS["contactus-name-container"]}>
                        <label className={CSS["contactus-label"]} htmlFor="_city">City
                          <span className={CSS["contactus-star"]}>*</span>
                        </label>
                        <input className={CSS["contactus-name"]} type="text" id="_city" name="_city" onChange={(e) => setCity(e.target.value)} value={city} placeholder={"City"} required />
                      </div>
                      <div className={CSS["contactus-name-container"]}>
                        <label className={CSS["contactus-label"]} htmlFor="_country">Country
                        </label>
                        <input className={CSS["contactus-email"]} type="text" id="_country" name="_country" onChange={(e) => setCountry(e.target.value)} value={country} placeholder={"Country"} />
                      </div>
                    </div>
                    <div className={CSS["contactus-message-container"]}>
                      <label className={CSS["contactus-label"]} htmlFor="_address"  >
                        Address<span className={CSS["contactus-star"]}>*</span>
                      </label>
                      <textarea rows={3} className={CSS["contactus-message"]} id="_address" name="_address" onChange={(e) => setAddress(e.target.value)} value={address} placeholder={"Address"} required
                      ></textarea>
                    </div>
                    <button className={CSS["send-btn"]} type="submit">
                      Order placed
                    </button>
                  </form>
                </div>
                <div className={CSS["contactus-img"]}>
                  {YourItems && <><h1>Name: {YourItems.productName}</h1><p>Description: {YourItems.description}</p><p>Quantity: {YourItems.quantity}</p><p>Delivery charges should be applied and added in total amount. Rs.150</p><h2>Total Price: {price}</h2></>}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default EnterDetailsBuy;
