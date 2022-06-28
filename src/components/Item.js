import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineComment, AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import swal from "sweetalert";
import MessageBox from './MessageBox';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles

import 'swiper/css';
import "./publishedPosts.css";
import { useHistory } from 'react-router-dom';
import LoadingBox from './LoadingBox';

export default () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                setLoading(true);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data) {
                    setPosts(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
                console.log(err);
            })
    }, []);

    //delete post :
    const handleDelete = (id) => {
        let arr = posts.filter((post) => {
            return post._id !== id;
        });
        setPosts(arr);

        fetch('http://102.219.178.49:5000/api/posts/' + id, {  //102.219.178.49:5000
            method: 'DELETE',
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data) {
                    // console.log(data);
                    swal("done!", "supprimer avec succès", "success");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (

        <Swiper style={{ margin: "4rem .6rem", padding: "2.5rem 1rem", }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                posts.map((post) => {
                    return (

                        <SwiperSlide>
                            <div className="card border-primary mb-3" style={{ minHeight: "400px" }} key={post._id} >
                                <div className="card-header" style={{ padding: "1.5rem" }}>
                                    <h4 className="card-title"> <b> {post.title} </b> </h4>
                                </div>
                                <div className="card-body">
                                    <p dir="rtl" className="card-text" style={{ marginTop: "1rem" }}> {post.postContent}</p>
                                </div>
                                <div style={{ margin: "2rem 1rem", display: "flex", justifyContent: "flex-end" }}>
                                    {/*<button type="button" className="btn btn-outline-info" style={{ marginRight: ".5rem", height: "3rem", fontSize: "15px" }} >Voir tous les commentaires </button>*/}
                                    <button type="button" className="btn btn-outline-primary" style={{ marginRight: ".5rem", width: "10rem", height: "3rem", fontSize: "15px" }} onClick={() => handleCommentClick(post)}>Commenter</button>
                                    {
                                        localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAdmin &&
                                        <>
                                            <button type="button" className="btn btn-danger" style={{ width: "10rem", height: "3rem" }} onClick={() => handleDelete(post._id)} >Delete</button>
                                        </>
                                    }

                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
            {loading && <LoadingBox />}
            {error && <MessageBox> Erreur lors de chargement des publications </MessageBox>}


        </Swiper>


    )
};