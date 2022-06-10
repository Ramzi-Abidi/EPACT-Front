import React, { useState } from 'react'
import "./post.css";
import swal from "sweetalert" ;

const Post = () => {
    const [textArea, setTextArea] = useState("");
    const [textTitle, setTextTitle] = useState("");
    const [textBtn, setTextBtn] = useState("Publier");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setTextBtn("Ajout d'un poste...") ;
        
        console.log(textArea);

        //POST request to the server to store data to the DB :
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postContent: textArea, title: textTitle })
        };
        fetch('http://localhost:5000/post', requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if(data) {
                    setTimeout(() => {
                        swal("done!", "publier avec succès", "success");
                        setTextBtn("Publier") ;
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <div className="body">
            {/*             <div class="background-container" style={{ background: "rgb(247 247 247 / 95%)", }}></div> */}

            <div className="containerPost">
                <div className="wrapperPost">
                    <section className="post">
                        <h4>Publier Quelque Chose</h4>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="contentPost">
                                <img src="fb-icons/logo.png" alt="logo" />
                                <div className="details">
                                    <p>Admin</p>
                                    <div className="privacy">
                                        <i className="fas fa-user-friends"></i>
                                    
                                        <i className="fas fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                            <textArea onChange={(e) => setTextTitle(e.target.value)} value={textTitle} className="options" placeholder='titre du publication' required style={{ height: "40px" }} />
                            <textarea onChange={(e) => setTextArea(e.target.value)} value={textArea} placeholder="Ecrivez quelque chose" spellcheck="false" required className="options"></textarea>
                     

                            {/*                             <button>Post</button> */}
                            <input type="submit" value={textBtn} className='postButton' />
                        </form>
                    </section>

                </div>
            </div>


        </div>
    )
}

export default Post;