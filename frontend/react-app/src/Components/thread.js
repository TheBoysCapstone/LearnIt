import React, { useState, useEffect } from "react";
import axios from "axios";

const Thread = ({ user, threadObj}) => {
  const [thread, setThread] = useState({
    title: "",
    content: "",
    author: { _id: "", username: "" },
    comments: [],
  });

  useEffect(() => {
    setThread(threadObj);
  }, []);
  useEffect(() => {
    console.log(thread);
  }, [thread]);
  const handleReply = (e, index) => {};

  const handleSubmit = () => {};
 
  return (
    <>
      <div className="thread-container medium-width">
        <div className="thread-header">
          <strong>{thread.title}</strong>
          <div className="thread-info">
            <small>Posted by {thread.author.username}</small>
            <small>
              , on {new Date(thread.createdAt).toLocaleDateString()}
            </small>
          </div>

          <div className="thread-content">{thread.content}</div>
        </div>
        <h3>Replies</h3>
        <div className="thread-comments" >
          <h5 style={{textAlign: 'center'}}>{(thread.comments.length===0)? "Be the first to reply": ""}</h5>
          {thread.comments.map((comment, index) => (
            <div key={index}>
              <div>{comment.comment}</div>
            </div>
          ))}
        </div>

        <div className="comment-form">
          <textarea></textarea>
          <button className="blue-btn" onClick={handleSubmit}>
            Submit comment
          </button>
        </div>
      </div>
    </>
  );
};

export default Thread;
