import React, { useState, useEffect } from "react";
import GridLayout from "../../components/GridLayout";
import CSS from "./Orders.module.css";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get(" http://localhost:1783/api/getorder")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteProduct =(orderid)=>{
    axios
    .delete(` http://localhost:1783/api/deleteorder/${orderid}`)
    .then((res) => {
      fetchData();
      toast.success("Order deleted Successfully");
    })
    .catch((err) => {
      toast.error("Error in deleting Order");
    });
  }

  return (
    <GridLayout>
      <h1 className={CSS["addproduct-title"]}>Orders List</h1>
      <table className={CSS["table"]}>
        <thead>
          <tr>
            <th className={CSS["table-head-row"]}>Name</th>
            <th className={CSS["table-head-row"]}>Email</th>
            <th className={CSS["table-head-row"]}>Number</th>
            <th className={CSS["table-head-row"]}>Address</th>
            <th className={CSS["table-head-row"]}>Product Name</th>
            <th className={CSS["table-head-row"]}>Quantity</th>
            <th className={CSS["table-head-row"]}>Price</th>
            <th className={`${CSS["table-head-row"]} ${CSS["table-head-btn"]}`}>
              Delete Order
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className={CSS["table-data"]}>{order.firstname+" "}{order.lastname}</td>
              <td className={CSS["table-data"]}>{order.email}</td>
              <td className={CSS["table-data"]}>{order.number}</td>
              <td className={CSS["table-data"]}>{order.address+" "}{order.city+" "}{order.country}</td>
              <td className={CSS["table-data"]}>{order.productname}</td>
              <td className={CSS["table-data"]}>{order.quantity}</td>
              <td className={CSS["table-data"]}>{order.price}</td>
              <td className={CSS["table-data"]}>
                <button  className={CSS["table-data-delete-btn"]}  type="button"  onClick={() => handleDeleteProduct(order._id)}  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <ToastContainer/>
      </table>
    </GridLayout>
  );
};

export default Orders;
