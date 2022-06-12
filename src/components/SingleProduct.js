import React from 'react';
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const SingleProduct = ({ prod, setProducts,products  }) => {
  //let arr = [];

  const handleDelete = (id) => {
    fetch('http://localhost:5000/api/products/' + id, {
      method: 'DELETE',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log(data);
          let arr = products.filter((prod) => prod._id !== id);
          setProducts(arr);

          swal("done!", "Produit supprimer avec succée", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        swal("oops!", err, "warning");
      });
  }
  //let API_ENDPOINT = process.env.API_ENDPOINT;

  return (
    <div>
      <div className="card">
        <Link to={`/product/${prod._id}`}>
          <img className="medium" src={`http://localhost:5000/${prod.image}`} alt="product" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${prod._id}`}>
            <h2> Nom : {prod.name} </h2>
          </Link>
          <div className="price">Prix : {prod.price} dt</div>

          {localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAdmin &&
            <div style={{ display: "flex", margin: ".5rem 3rem", justifyContent: "space-between" }}>
              <div class="share">
                <Link to={`editProduct/${prod._id}`}>
                  <AiOutlineEdit style={{ fontSize: "20px", position: "relative", top: "4px" }} />
                </Link>
              </div>

              <div className="share">
                <Link to="#">
                  <AiTwotoneDelete style={{ fontSize: "20px", color: "red", position: "relative", top: "4px" }} onClick={() => handleDelete(prod._id)} />
                </Link>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;