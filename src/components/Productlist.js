import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listProducts } from '../actions/productAction';
import "./productlist.css";
import Axios from 'axios';
import swal from 'sweetalert';



const Productlist = () => {
  const [data, setdata] = useState([]);
  const history = useHistory();

  const [nameProd, setNameProd] = useState();
  const [textBtn, setTextBtn] = useState("Ajouter");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState();

  useEffect(() => {
    //verif if the user isn't authenticated or not an admin :
    if (!localStorage.getItem("userInfo") && !JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
      history.push("/signin");

    }

    fetch("http://localhost:5000/api/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdata(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  //adding new products (create operation) :
  const send = (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    newFormData.append("product_image", file);
    newFormData.append("name", nameProd);
    newFormData.append("price", price);

    console.log(file);

    Axios.post("http://localhost:5000/addProducts", newFormData)
      .then((res) => {
        setTextBtn("Créer...");
        if (res) {
          setTextBtn("Ajouter");
          swal("done!", "publier avec succès", "success");
        }
      })
      .catch((err) => {
        setTextBtn("Créer...");
        console.log(err.response.data);
        swal("Problem!", "error occured, please try later", "warning");
      })
  };

  return (
    <div className="our-container" style={{ outline: "none", border: "none" }}>

      <div className="admin-product-form-container">

        <form method="POST" onSubmit={send} encType="multipart/form-data">
          <h3>Ajouter un nouveau produit</h3>
          <input type="text" placeholder="le nom du produit" className="box" value={nameProd} required onChange={(e) => setNameProd(e.target.value)} />
          <input type="number" placeholder="le prix de produit " className="box" value={price} required onChange={(e) => setPrice(e.target.value)} />
          <input type="file" filename="product_image" className="box" required onChange={(e) => setFile(e.target.files[0])} />
          <input type="submit" className="btn-prodlist" name="add_product" /* onClick={send} */ value={textBtn} />
        </form>

      </div>

    </div>

  )
}

export default Productlist;