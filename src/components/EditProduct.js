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

    const scrollToProducts = () => {
        const productsSection = document.querySelector(".product-holder").offsetTop;
        console.log(productsSection);
        setTimeout(() => {
            window.scrollTo({
                left: 0,
                top: productsSection + 70
            });
        }, 900);
    }

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
                        swal("done!", "editer avec succès", "success").then(() => {
                            history.push("/");
                            scrollToProducts();
                        });
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
        if (!localStorage.getItem("userInfo")) {
            history.push("/signin");
        }
        else
        if (!JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
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
        /*         <div className="our-container" style={{ outline: "none", border: "none" }}>
                    <div className="admin-product-form-container">
                        <form method="POST" onSubmit={send} encType="multipart/form-data">
                            <h3>Editer le produit</h3>
                            <input type="text" placeholder="le nom du produit" className="box" value={nameProd} required onChange={(e) => setNameProd(e.target.value)} />
                            <input type="number" placeholder="le prix de produit " className="box" value={price} required onChange={(e) => setPrice(e.target.value)} />
                            <input type="file" filename="product_image" className="box" required onChange={(e) => setFile(e.target.files[0])} />
                            <input type="submit" className="btn-prodlist" name="add_product" value={textBtn} />
                        </form>
                    </div>
                </div> */

        <form style={{ padding: "2.3rem 3.5rem", zIndex: 10, overflow: "hidden", position: "relative", margin: "1rem 3rem" }} onSubmit={send} encType="multipart/form-data" >
            <div className="container">
                <fieldset style={{ margin: "2rem auto", width: "85%", padding: "2.2rem 0.5rem" }}>
                    <legend>Legend</legend>
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="form-label mt-4">Nom du produit</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required placeholder='Nom : ' value={nameProd} onChange={(e) => setNameProd(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1" class="form-label mt-4">Prix du produit </label>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Prix :" value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label for="formFile" class="form-label mt-4">Image du produit</label>
                        <input class="form-control" type="file" filename="product_image" required onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button type="submit" class="btn btn-primary" style={{ backgroundColor: "#2780e3 !important", width: "9rem", height: "3rem", marginTop: "1.5rem" }} value={textBtn} >Submit</button>
                </fieldset>
            </div>

        </form>
    )
}

export default EditProduct;