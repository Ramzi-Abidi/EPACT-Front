import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineComment, AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import swal from "sweetalert";
import MessageBox from './MessageBox';

// Import Swiper styles

import 'swiper/css';
import "./publishedPosts.css";
import { Link } from 'react-router-dom';

export default () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/getAllPosts")
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
        console.log(id);

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
                            <div id="wrappers" key={post._id}>
                                <div className="cf">
                                    <img src="http://2016.igem.org/wiki/images/e/e0/Uclascrolldown.png" class="arrow" />
                                    <h1 className="name">
                                        <li>Admin</li>
                                    </h1>
                                    <p className="date">2 hr ago</p>
                                </div>
                                <p className="status">{post.postContent}</p>
                                <div className="action">
                                    <div className="comment">
                                        <li style={{ cursor: "pointer" }}>
                                            <AiOutlineComment />
                                            <p>Comment</p>
                                        </li>
                                    </div>
                                    {localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAdmin &&
                                        <>
                                            <div class="share">
                                                <Link to={`posts?${post._id}`}>
                                                    <AiOutlineEdit style={{ fontSize: "20px", position: "relative", top: "4px" }} />
                                                </Link>
                                            </div>

                                            <div className="share">
                                                <Link to="#">
                                                    <AiTwotoneDelete style={{ fontSize: "20px", color: "red", position: "relative", top: "4px" }} onClick={() => handleDelete(post._id)} />
                                                </Link>
                                            </div>
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