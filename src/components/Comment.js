import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';
import img from "../images/403017_avatar_default_head_person_unknown_icon.png";
import img1 from "../images/6556721_avatar_man_person_user_woman_icon.png";
import badge from "../images/check.png";
import LoadingBox from './LoadingBox';
import { useHistory } from 'react-router-dom';
import MessageBox from './MessageBox';



const Comment = ({ comment, setComments, comments, textBtn, postId, commentId }) => {
    const [showReplySec, setShowReplySec] = useState(false);
    const [toggleRespond, setToggleRespond] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    let isRendered = useRef(false);

    let history = useHistory();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("userInfo"))) {
            history.push("/signin");
        }
        /*fetch(`http://localhost:5000/api/replies/allReplies/${commentId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
                if (isRendered==false) {
                    console.log(data)
                    setReplies(data);
                    console.log(replies);
                }
                return data;
            })
            .catch((err) => {
                console.log(err);
            })*/
        fetch(`http://102.219.178.49:5000/api/replies/allReplies/${commentId}`)
            .then((res) => {
                setLoading(true);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setReplies(data.replies);
                console.log(replies);
                setLoading(false);
                return data;
            })
            .catch((err) => {
                setError(err) ;
                setLoading(false) ;
                console.log(err);
            })

        return () => {
            isRendered = true;
        };
    }, [])

    const handle = () => {
        setToggleRespond(!toggleRespond) ;
        setShowReplySec(!showReplySec);
    };

    const handleReply = (id) => {
        if (!JSON.parse(localStorage.getItem("userInfo"))) {
            history.push("/signin");
        }

        setShowReplySec(!showReplySec);

        // const commenter = JSON.parse(localStorage.getItem("userInfo").name);
        //setTextBtn("loading...");

        let answer = JSON.parse(localStorage.getItem("userInfo")).email;
        let name = JSON.parse(localStorage.getItem("userInfo")).name;

        //POST request to the server to store data to the DB :
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ replyContent: replyContent, commentId: id, postId: postId, answerEmail: answer, name: name })
        };
        fetch('http://102.219.178.49:5000/api/replies/postReply', requestOptions)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setReplies([...replies, data.createdReply]);
                setReplyContent("");
                return data;
            })
            .catch((err) => {
                swal("erreur!", "erreur", "warning");
                console.log(err);
            })
    }

    //delete comment :
    const handleDelete = (id) => {


        let arr1 = replies.filter((reply) => {
            return reply.commentId !== id;
        });
        setReplies(arr1);

        let arr = comments.filter((comment) => {
            return comment._id !== id;
        });
        setComments(arr);

        fetch('http://102.219.178.49:5000/api/deleteComment/' + id, {        //   /api/deleteComment/:id
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
    }



    //delete reply :
    const handleDeleteReply = (id) => {
        let arr = replies.filter((reply) => {
            return reply._id !== id;
        });
        setReplies(arr);

        fetch('http://102.219.178.49:5000/api/replies/deleteReply/' + id, {
            method: 'DELETE',
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                swal("done!", "supprimer avec succée", "success");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
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
                    <div style={{ fontSize: "16px", paddingLeft: "3rem", margin: "2rem" }}> <p> {comment.commentContent}  </p> </div>
                </div>
                <div style={{ display: "flex" , flexDirection:"column"}}>
                    <div style={{display:"flex",alignSelf:"flex-end"}}>
                        {(JSON.parse(localStorage.getItem("userInfo")).isExpert || JSON.parse(localStorage.getItem("userInfo")).isAdmin) &&
                            <button type="button" class="btn btn-outline-secondary reply" onClick={handle}>{toggleRespond ? "Annuler commentaire" : "Répondre"}</button>
                        }
                        {JSON.parse(localStorage.getItem("userInfo")).email === comment.answerEmail && <button type="button" class="btn btn-outline-danger reply" onClick={() => handleDelete(comment._id)}  >Supprimer</button>}
                    </div>

                    {
                        showReplySec && <div class="input-group mb-3 makeCommentSection div" style={{ marginTop: "3rem", width: "100%", marginLeft: "3rem" }}>
                            <textarea class="form-control commentTextArea" id="exampleTextarea" rows="3" placeholder='Répondre' value={replyContent} onChange={(e) => setReplyContent(e.target.value)} autoFocus ></textarea>
                            <button class="btn btn-primary commentButton" type="button" id="button-addon2" onClick={() => handleReply(comment._id)}> Répondre </button>
                        </div>
                    }

                </div>
            </div>

            {/**/}
            <div>
                {loading && <LoadingBox />}
                {error && <MessageBox> Erreur lors de chargement des réponses </MessageBox>}
                {replies.map((reply) => {
                    return (
                        <div key={reply._id} className="singleComment" style={{ position: "relative", width: "62%", marginLeft: "8rem", display: "flex", flexDirection: "column", alignContent: "flex-start" }}>
                            <div className='' style={{ marginRight: "2rem", display: "flex" }}>
                                <div style={{ width: "3.8rem" }}>
                                    <img src={img1} style={{ width: "100%" }} />
                                </div>
                                <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {reply.name}
                                    <div style={{ width: "1.5rem", marginLeft: ".8rem" }}>
                                        <img src={badge} style={{ width: "100%" }} />
                                    </div>
                                </span>
                            </div>
                            <div style={{ fontSize: "16px", paddingLeft: "3rem", margin: "2rem" }}> <p> {reply.replyContent}  </p> </div>
                            <div style={{ position: "absolute", bottom: "10px", right: "30px" }}>
                                {JSON.parse(localStorage.getItem("userInfo")).email === reply.answerEmail && <button type="button" class="btn btn-outline-danger reply" onClick={() => handleDeleteReply(reply._id)}>Supprimer</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* */}

        </>
    )
}

export default Comment