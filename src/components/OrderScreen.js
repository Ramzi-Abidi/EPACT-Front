import React, { useEffect, useState } from 'react';
import LoadingBox from './LoadingBox';
import Table from "./Table";


const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [newSearch, setnewSearch] = useState(null);

    const handleSearch = (ch) => {
        setSearch(ch);

        let newOrders = orders.filter((order) => {
            return order.shippingAddress.fullName.includes(ch);
        });
        console.log(newOrders);

        setnewSearch(newOrders);
    }
    useEffect(() => {
        fetch("http://102.219.178.49:5000/api/getOrders/")
            .then((res) => {
                if (res)
                    setLoading(true);
                return res.json();
            })
            .then((data) => {
                setOrders(data.reverse());
                //console.log(data);
                setLoading(false);

                return data;
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <div className="tableContainer">
            {loading && <LoadingBox></LoadingBox>}

            <div class="wrapp">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="filter by name" value={search} onChange={(e) => handleSearch(e.target.value)} />
                        <button type="submit" class="searchButton">
                            <i class="fa fa-search"></i>
                        </button>
                </div>
            </div>
            <Table orders={newSearch ? newSearch : orders} setOrders={setOrders} loading={loading} />
        </div>
    )
}

export default Orders;