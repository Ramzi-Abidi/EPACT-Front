import React from 'react';
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';


const SingleProduct = ({ prod, setProducts, products }) => {
  //let arr = [];

  const handleDelete = (id) => {
    fetch('http://102.219.178.49:5000/api/products/' + id, {
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
      <div className="card-product">
        <Link to={`/product/${prod._id}`}>
          <img className="medium" src={`http://102.219.178.49:5000/${prod.image}`} alt="product" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${prod._id}`}>
            <h2 style={{ padding: "0.5rem 0", marginTop: "0.85rem", color:"#333" }}> Nom : {prod.name} </h2>
          </Link>
          <div className="price">Prix : {prod.price} dt</div>

          {localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAdmin &&
            <div style={{ display: "flex", margin: ".3rem", justifyContent: "space-between" }}>
              {/*  <div class="share">
                <Link to={`editProduct/${prod._id}`}>
                  <AiOutlineEdit style={{ fontSize: "20px", position: "relative", top: "4px" }} />
                </Link>
              </div> */}

              <div className="share">
                {/*     <Link to="#">
                  <AiTwotoneDelete style={{ fontSize: "20px", color: "red", position: "relative", top: "4px" }} onClick={() => handleDelete(prod._id)} />
                </Link> */}
                <div>
                  <Button variant="outline-success" style={{ padding: ".6rem 3rem" }} className="editButton"><Link to={`editProduct/${prod._id}`} style={{color:"#333"}} className="edit">  Editer </Link></Button>{' '}
                  <Button variant="outline-danger" style={{ padding: ".6rem 1.8rem" }} onClick={() => handleDelete(prod._id)}>Supprimer</Button>{' '}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;