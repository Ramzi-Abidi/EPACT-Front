import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import img from "../images/user-icon.jpg";

const CommentScreen = () => {

    const [post, setPost] = useState("");
    const [loadingPost, setLoadingPost] = useState(false);
    const [postError, setPostError] = useState("");

    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentErrors, setCommentErrors] = useState("");
    const [commentContent, setCommentContent] = useState("");

    const [loadingComment, setLoadingComment] = useState(false);

    const [textBtn, setTextBtn] = useState("Commenter ce contenu");

    //focus on the textArea for comment

    let history = useHistory();

    const postId = useParams().id;
    console.log(postId);

/*     const handleDelete = (id) => {
        let arr = comments.filter((comment) => {
            return comment._id !== id;
        });
        setComments(arr);
        //        console.log(id);

        fetch('http://102.219.178.49:5000/api/deleteComments/' + id, {
            method: 'DELETE',
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    swal("done!", "supprimer avec succée", "success");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } */

    const handlePostComment = () => {
        if (!localStorage.getItem("userInfo")) {
            history.push("/signin");
        }
        // const commenter = JSON.parse(localStorage.getItem("userInfo").name);
        setTextBtn("loading...");

        let commenter = JSON.parse(localStorage.getItem("userInfo")).email;
        let name = JSON.parse(localStorage.getItem("userInfo")).name;

        //POST request to the server to store data to the DB :
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentContent: commentContent, postId: postId, email: commenter, name: name })
        };
        fetch('http://102.219.178.49:5000/api/comments/postComment', requestOptions)
            .then((res) => {
                setLoadingComment(true);
                return res.json();
            })
            .then((data) => {
                setLoadingPost(false);
                setTextBtn("Commenter ce contenu");
                // setTextArea("");
                // setTextTitle("");
                setComments([...comments, data]);
                setCommentContent("");
                return data;
            })
            .catch((err) => {
                swal("oops!", "erreur", "warning");
                console.log(err);
            })
    };




    useEffect(() => {
        //document.querySelector(".commentTextArea").focus();


        fetch(`http://102.219.178.49:5000/api/comments/${postId}`)
            .then((res) => {
                setLoadingPost(true);
                return res.json();
            })
            .then((data) => {
                //console.log(data);
                setPost(data);
                setLoadingPost(false);
                return data;
            })
            .catch((err) => {
                console.log(err);
            })

        fetch(`http://102.219.178.49:5000/api/comments/allComments/${postId}`)
            .then((res) => {
                setLoadingComments(true);
                return res.json();
            })
            .then((data) => {
                console.log(data);

                setComments(data);
                setLoadingComments(false);
                return data;
            })
            .catch((err) => {
                setLoadingComments(false);
                setCommentErrors("erreur lors du chargement des commentaires");
                console.log(err);
            })


    }, []);

    return (

        <div class="accordion" id="accordionExample" style={{ margin: "5.5rem auto", width: "86%" }} key={post._id}>

            <div className='container' style={{ paddingTop: "3.5rem" }}>
                <div class="accordion-item" >
                    {loadingPost && <LoadingBox />}
                    {postError && <MessageBox> Erreur </MessageBox>}
                    <h4 style={{ margin: "1rem", marginLeft: "1.5rem" }}>
                        <b>
                            {post.title}
                        </b>
                    </h4>

                    <div id="collapseOne" class="accordion-collapse collapsing" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{ height: "auto" }}>
                        <div class="accordion-body">
                            {post.postContent}
                        </div>

                        <div class="input-group mb-3 makeCommentSection div" style={{ marginTop: "2rem", width: "70%" }}>
                            <textarea class="form-control commentTextArea" id="exampleTextarea" rows="3" placeholder='Commenter ce contenu' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} autoFocus ></textarea>
                            <button class="btn btn-primary commentButton" type="button" id="button-addon2" onClick={handlePostComment} value={textBtn}> {textBtn} </button>
                        </div>
                        {loadingComments && <LoadingBox />}
                        {commentErrors && <MessageBox> {commentErrors} </MessageBox>}
                        {
                            comments.map((comment) => {
                                return (
                                    <div style={{ display: "flex", flexDirection: "column", width: "70%" }} className="div" key={comment._id}>

                                        <div key={comment._id} className="singleComment">
                                            <div className='' style={{ marginRight: "2rem", display: "flex" }}>

                                                <div style={{ width: "3.8rem" }}>
                                                    <img src={img} style={{ width: "100%" }} />
                                                </div>
                                                <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "1rem" }}>
                                                    {comment.name}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: "16px", paddingLeft: "3rem", margin: "2rem" }}> {comment.commentContent}   </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                            <button type="button" class="btn btn-outline-secondary reply">Répondre</button>
                                            {JSON.parse(localStorage.getItem("userInfo")).email === comment.email && <button type="button" class="btn btn-outline-danger reply" /* onClick={() => handleDelete(comment._id)} */ >Supprimer</button>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


        </div>


    )
}

export default CommentScreen;