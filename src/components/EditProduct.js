import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listProducts } from '../actions/productAction';
import "./productlist.css";
import Axios from 'axios';
import swal from 'sweetalert';


const EditProduct = (props) => {

    const [data, setdata] = useState([]);
    const history = useHistory();

    const [nameProd, setNameProd] = useState();
    const [textBtn, setTextBtn] = useState("Editer");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState();

    const id = props.match.params.id;
    console.log(id);


    //editing new products :
    const send = (e) => {
        e.preventDefault();
        console.log(id);

        const newFormData = new FormData();

        newFormData.append("product_image", file);
        newFormData.append("name", nameProd);
        newFormData.append("price", price);

        Axios.put("http://102.219.178.49:5000/api/editProducts/" + id, newFormData)
            .then((res) => {
                if (res) {
                    setTextBtn("Editer...");

                    setTimeout(() => {
                        swal("done!", "Editer avec succès", "success");
                    }, 1500);
                }
                setTextBtn("Editer");
                /*  console.log(res); */
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    swal("Problem!", "error, try later", "warning");
                }, 1500);
            })
    };


    useEffect(() => {
        //verif if the user isn't authenticated && not an admin :
        if (!localStorage.getItem("userInfo") && !JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
            history.push("/signin");
        }

        fetch("http://102.219.178.49:5000/api/products/" + id)
            .then((res) => {

                //console.log(res.json());
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setNameProd(data.name);
                setPrice(data.price);
                setFile(data.image);
                //return data;
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);



    return (
        <div className="our-container" style={{ outline: "none", border: "none" }}>

            <div className="admin-product-form-container">

                <form method="POST" onSubmit={send} encType="multipart/form-data">
                    <h3>Editer le produit</h3>

                    <input type="text" placeholder="le nom du produit" className="box" value={nameProd} required onChange={(e) => setNameProd(e.target.value)} />
                    <input type="number" placeholder="le prix de produit " className="box" value={price} required onChange={(e) => setPrice(e.target.value)} />
                    <input type="file" filename="product_image" className="box" required onChange={(e) => setFile(e.target.files[0])} />

                    <input type="submit" className="btn-prodlist" name="add_product" /* onClick={send} */ value={textBtn} />
                </form>

            </div>

            {/*  <div className="product-display">
                <table className="product-display-table">
                    <thead>
                        <tr>
                            <th>product image</th>
                            <th>product name</th>
                            <th>product price</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    {
                        data.map((prod) => {
                            return (
                                <tr class="productsHolder">
                                    <td><img src="${prod.img}" width="30" alt="${prod.name}" /></td>
                                    <td> {prod.name} </td>
                                    <td> {prod.price} TND</td>
                                    <td>
                                        <button className="btn-prodlist" style={{ outline: "0", border: "0" }}> <i className="fas fa-edit"></i> edit </button>
                                        <button className="btn-prodlist" style={{ outline: "0", border: "0" }}> <i classname="fas fa-trash"></i> delete </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div> */}

        </div>

    )
}

export default EditProduct;