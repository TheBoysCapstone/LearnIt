import React, { useState, useEffect } from "react";
import axios from "axios";

const Thread = ({ user, threadObj, postComment }) => {
  const [thread, setThread] = useState({
    title: "",
    content: "",
    author: { _id: "", username: "" },
    comments: [],
  });
  const [comment, setComment] = useState({ author: user._id, content: "" });

  const onChangeContent = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setThread(threadObj);
  }, []);
  useEffect(() => {
    setThread(threadObj);
  }, [threadObj]);

  useEffect(() => {
    console.log(thread);
  }, [thread]);

  const handleSubmit = () => {
    if (comment.content !== "") {
      postComment(comment);
      setComment({...comment, ["content"]: ""})
    }
  };

  return (
    <>
      <div className="thread-container medium-width">
        <div className="thread-header">
          <div className="thread-title">
            <strong>{thread.title}</strong>
          </div>
          <div className="thread-info">
            <small>Posted by {thread.author.username}</small>
            <small>
              , on {new Date(thread.createdAt).toLocaleDateString()}
            </small>
          </div>

          <div className="thread-content">{thread.content}</div>
        </div>
        <h3>Replies</h3>
        <div className="thread-comments">
          <h5 style={{ textAlign: "center" }}>
            {thread.comments.length === 0 ? "Be the first to reply" : ""}
          </h5>
          {thread.comments.map((comment, index) => (
            <div key={index} className="comment-container">
              <div className="comment-header">
                <div>
                  <small>Posted by: {comment.author.username}</small>
                </div>
                <div>
                  <small>
                    ,on {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <div className="comment-content">{comment.content}</div>
            </div>
          ))}
        </div>

        <div className="comment-form">
          <textarea
            name="content"
            onChange={onChangeContent}
            value={comment.content}
            required={true}
          ></textarea>
          <button className="blue-btn" onClick={handleSubmit}>
            Submit comment
          </button>
        </div>
      </div>
    </>
  );
};

export default Thread;
