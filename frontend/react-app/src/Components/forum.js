import React, { useEffect, useState } from "react";
import axios from "axios";
import Thread from "./thread.js";

const Forum = ({ user }) => {
  const [showThreads, setShowThreads] = useState(true);
  const [threads, setThreads] = useState([]);
  const [thread, setThread] = useState({});

  useEffect(() => {
    loadThreads();
  }, []);

  const makeThreadsVisible = (flag) => {
    console.log(flag)
    setShowThreads(flag);
    setThread({});
    loadThreads()
  };

  
  const loadThreads = () => {
    const url = `http://localhost:8080/${user._id}/get-threads`;
    axios({
      url: url,
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        setThreads([...res.data.threads]);
      } else {
        console.log(res.data.message);
      }
    });
  };

  const postComment = (comment) =>{
    const url = `http://localhost:8080/${user._id}/post-comment/${thread._id}`
    axios({
      url: url,
      method: 'POST',
      data: (comment),
      withCredentials: true
    }).then((res)=>{
        if(res.data.success){
            getThread(thread._id)
        }else{
            console.log("Something went wrong")
        }
    })
  }

  const getThread = (id) => {
    const url = `http://localhost:8080/${user._id}/get-thread/${id}`;
    axios({
      url: url,
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        setThread(...res.data.thread);
      } else {
        console.log(res.data.message);
      }
    });
  };

  if (Object.keys(thread).length === 0) {
    return (
      <>
        {showThreads ? (
          <ForumList user={user} threads={threads} getThread={getThread} />
        ) : (
          <ForumForm
            user={user}
          />
        )}

        <div className="container medium-width">
          <button
            className="green-btn"
            onClick={() => makeThreadsVisible(!showThreads)}
          >
            {showThreads ? "Start a thread" : "Go Back"}
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Thread user={user} threadObj={thread} postComment={postComment}/>
        <div className="container medium-width">
          <button className="green-btn" onClick={()=>makeThreadsVisible(true)}>
            "Go Back"
          </button>
        </div>
      </>
    );
  }
};

const ForumList = ({ user, threads, getThread }) => {
  return (
    <>
      <div className="forum-container medium-width">
        <h3>Forum</h3>
        {threads.length === 0 ? (
          <h4 style={{ textAlign: "center", padding: "40px" }}>
            No threads here yet
          </h4>
        ) : (
          <div></div>
        )}
        {threads.map((thread, index) => (
          <div
            key={index}
            className="thread"
            onClick={(e) => getThread(thread._id)}
          >
            <div className="thread-header">
              <div className="thread-title">
                <strong>{thread.title}</strong>
              </div>
              <div className="thread-category">
                <small>{thread.topic}</small>
              </div>
            </div>
            <div className="thread-footer">
              <div>
                <small>Created by: {thread.author.username}</small>
                <small> at {new Date(thread.createdAt).toDateString()}</small>
              </div>
              <small>{thread.comments.length} replies</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ForumForm = ({ user, toggleForumForm }) => {
  const [thread, setThread] = useState({ title: "", content: "", topic: "" });
  const submitThread = () => {
    const url = `http://localhost:8080/${user._id}/create-thread`;
    axios({
      url: url,
      data: { ...thread },
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        toggleForumForm(false);
      }
    });
  };
  const handleThreadChange = (e) => {
    const [field, value] = [e.target.name, e.target.value];
    setThread({ ...thread, [field]: value });
  };
  return (
    <>
      <div className="container medium-width thread-form">
        <h3>Create a thread</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleThreadChange} />
        </div>
        <div>
          <div>
            <label htmlFor="topic">Topics</label>
            <select name="topic" onChange={handleThreadChange}>
              <option value="default">Choose topic</option>
              <option value="it/software">IT/Software</option>
              <option value="business">Business</option>
              <option value="management">Management</option>
              <option value="science">Science</option>
              <option value="engineering">Engineering</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            onChange={handleThreadChange}
            name="content"
            placeholder="type your question here"
          ></textarea>
          <button className="blue-btn" onClick={submitThread}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Forum;
