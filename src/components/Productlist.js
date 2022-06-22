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

    fetch("http://102.219.178.49:5000/api/products")
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

  //adding new products (create operation) :
  const send = (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    newFormData.append("product_image", file);
    newFormData.append("name", nameProd);
    newFormData.append("price", price);

    console.log(file);

    Axios.post("http://102.219.178.49:5000/addProducts", newFormData)
      .then((res) => {
        setTextBtn("Créer...");
        if (res) {
          setTextBtn("Ajouter");
          swal("done!", "publier avec succès", "success").then(() => {
            history.push("/");
            scrollToProducts();
          });
        }
      })
      .catch((err) => {
        setTextBtn("Ajouter");
        console.log(err.response.data);
        swal("Problème!", "une erreur s'est produite, veuillez réessayer plus tard", "warning");
      })

    setNameProd("");
    setPrice("");
  };

  return (

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

export default Productlist;