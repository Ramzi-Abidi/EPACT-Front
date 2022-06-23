import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineComment, AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import swal from "sweetalert";
import MessageBox from './MessageBox';
import adminLogo from "../images/user (1).png";

// Import Swiper styles

import 'swiper/css';
import "./publishedPosts.css";
import { Link, useHistory } from 'react-router-dom';

export default () => {
    const [posts, setPosts] = useState([]);
    let history = useHistory();

    const handleCommentClick = (post) => {

        if (!JSON.parse(localStorage.getItem("userInfo"))) {
            swal("Error", "Vous devez d'abord vous connecter", "warning");
            history.push(`/signin`);
            return;
        }

        history.push(`/comment/${post._id}`);
    };
    useEffect(() => {
        fetch("http://102.219.178.49:5000/api/getAllPosts")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data) {
                    setPosts(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    //delete post :
    const handleDelete = (id) => {
        let arr = posts.filter((post) => {
            return post._id !== id;
        });
        setPosts(arr);
        //        console.log(id);

        fetch('http://102.219.178.49:5000/api/posts/' + id, {
            method: 'DELETE',
        })
            .then(res => {
                return res.json();
            }) // or res.json()
            .then(data => {
                if (data) {
                    console.log(data);
                    //swal({})
                    swal("done!", "supprimer avec succée", "success");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (

        <Swiper style={{ marginTop: "6rem" }}
            spaceBetween={30}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                posts.map((post) => {
                    return (

                        <SwiperSlide>
                            <div class="card border-primary mb-3" style={{ "maxWidth": "48rem" }} key={post._id} >
                                <div class="card-header" style={{ padding: "1.5rem" }}>
                                   {/*  <img src={adminLogo} alt="logo" style={{ width: "3rem", marginRight: ".7rem" }} /> */}
                                    {/* <b> Admin</b> */}
                                    <h4 class="card-title"> <b> {post.title} </b> </h4>

                                </div>
                                <div class="card-body">
                                    <p class="card-text" style={{ marginTop: "1rem" }}> {post.postContent}</p>
                                </div>
                                <div style={{ margin: "2rem 1rem", display: "flex", justifyContent: "flex-end" }}>
                                    {/*<button type="button" class="btn btn-outline-info" style={{ marginRight: ".5rem", height: "3rem", fontSize: "15px" }} >Voir tous les commentaires </button>*/}
                                    <button type="button" class="btn btn-outline-primary" style={{ marginRight: ".5rem", width: "10rem", height: "3rem", fontSize: "15px" }} onClick={() => handleCommentClick(post)}>Commenter</button>
                                    {
                                        localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAdmin &&
                                        <>
                                            <button type="button" class="btn btn-danger" style={{ width: "10rem", height: "3rem" }} onClick={() => handleDelete(post._id)} >Delete</button>
                                        </>
                                    }

                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
            {posts.length === 0 && <MessageBox> Aucune publication pour le moment </MessageBox>}


        </Swiper>


    )
};