import React, { useEffect, useState } from 'react';
import LoadingBox from './LoadingBox';



const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://102.219.178.49:5000/api/getOrders/")
            .then((res) => {
                if (res)
                    setLoading(true);
                return res.json();
            })
            .then((data) => {
                setOrders(data) ;
                console.log(data) ;
                setLoading(false);

                return data;
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <div className="tableContainer">
            {loading && <LoadingBox> fetching orders ... </LoadingBox>}
            <table border="1">
                <tr> <td>UserName</td> <td>Email</td> <td>Phone Number</td> <td>item price * item qty</td> <td>total price</td>  </tr>
                    {orders.map((order)=>{
                    return (
                        <>
                            <tr> <td>{order.shippingAddress.fullName}</td> <td> {order.email} </td> <td> {order.tel} </td> <td>{order.orderItems[0].name} *  {order.orderItems[0].qty}</td> <td> {order.totalPrice} </td>  </tr>
                        </>
                    )
                })}
            </table>
        </div>
    )
}

export default Orders;