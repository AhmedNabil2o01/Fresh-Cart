import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { reach } from 'yup';

export default function Orders() {

    let [orders,setOrders]=useState([])
  
    async function getAllOrders(id) {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id)
        setOrders(data);
    }
useEffect(()=>{
    const { id } = jwtDecode(localStorage.getItem('userToken'));

    console.log(id);
    getAllOrders(id)
},[])

    return <>
    <h1>Your Orders</h1>

    {orders.map((order)=>{
        return <div key={order.id} className="row">
            <div className="order shadow rounded p-4 my-5">
                <div className="d-flex align-items-center">
                    <h2 className="fw-bolder h1">#{order.id}</h2>
                    <h4 className="fw-bold text-primary mx-4">processing</h4>
                </div>
                <p>You have Ordered {order.cartItems.length} items.</p>
                <div className="d-flex">
                {order.cartItems.map((item)=>{
                    return <img key={item._id} src={item.product.imageCover} alt="" style={{width:150}} className="mx-1 img-thumbnail" />
                })}   
                </div>
                <hr />
                <p><strong>Total amount :</strong> {order.totalOrderPrice} EGP</p>

            </div>


        </div>
    })}
    
    
    
    </>
}
