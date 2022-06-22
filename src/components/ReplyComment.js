/* import React, { useEffect, useState } from 'react'
import MessageBox from './MessageBox';


const ReplyComment = ({ commentId }) => {
  console.log(commentId);

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/replies/allReplies/${commentId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);

        setReplies(data);
        console.log(replies);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <div>
      {replies.length === 0 && <MessageBox> no replies yet </MessageBox>}
      {replies.map((reply) => {
        return (
          <div key={reply._id} className="singleComment">
            <div className='' style={{ marginRight: "2rem", display: "flex" }}>

              <div style={{ width: "3.8rem" }}>
                <img src={img} style={{ width: "100%" }} />
              </div>
              <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "1rem" }}>
                {reply.name}
              </span>
            </div>
            <div style={{ fontSize: "16px", paddingLeft: "3rem", margin: "2rem" }}> <p> {reply.replyContent}  </p> </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReplyComment; */