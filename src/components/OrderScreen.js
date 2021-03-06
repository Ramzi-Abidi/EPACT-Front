import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import LoadingBox from './LoadingBox';
import Table from "./Table";


const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [newSearch, setnewSearch] = useState(null);
    
    let history  = useHistory() ;

    const handleSearch = (ch) => {
        setSearch(ch);

        let newOrders = orders.filter((order) => {
            if (order.shippingAddress.fullName.toUpperCase().includes(ch.toUpperCase()))
                return order.shippingAddress.fullName;
        });
        console.log(newOrders);

        setnewSearch(newOrders);
    }
    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            history.push("/signin");
        }
        else
            if (!JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
                history.push("/signin");
            }

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
        <AnimatedPage>

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
        </AnimatedPage>

    )
}

export default Orders;