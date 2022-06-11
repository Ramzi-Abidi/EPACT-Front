import React, { useEffect, useState } from 'react';
import LoadingBox from './LoadingBox';
import Table from "./Table" ;


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
                setOrders(data);
                console.log(data);
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
            <Table orders={orders} loading={loading} />
        </div>
    )
}

export default Orders;