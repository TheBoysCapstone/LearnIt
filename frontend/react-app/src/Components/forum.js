import React, { useEffect, useState } from "react";

const Forum = ({ user, setComponent }) => {
  const [showThreadForm, setShowThreadForm] = useState(false);
  const toggleForumForm = () => {
    setShowThreadForm(!showThreadForm);
  };

  return (
    <>
      {showThreadForm ? <ForumForm user={user} /> : <ForumList user={user} />}

      <div className="container medium-width">
        <button className="green-btn"onClick={toggleForumForm}>{showThreadForm? "Go back":"Start a thread"}</button>
      </div>
    </>
  );
};

const ForumList = ({ user }) => {
  const [threads, setThreads] = useState([
    {
      title: "Question about javascript course",
      category: "IT",
      createdAt: "02/03/01",
      author: "test",
      replies: 13,
    },
    {
      title: "Need help with my Java program...",
      category: "business",
      createdAt: "03/03/03",
      author: "serghei",
      replies: 23,
    },
    {
      title: "How do you create a business plan?",
      category: "business",
      createdAt: "03/04/05",
      author: "test",
      replies: 5,
    },
  ]);
  return (
    <>
      <div className="forum-container medium-width">
        <h3>Forum</h3>
        {threads.map((thread, index) => (
          <div key={index} className="thread ">
            <div className="thread-header">
              <div className="thread-title">
                <strong>{thread.title}</strong>
              </div>
              <div className="thread-category">
                <small>{thread.category}</small>
              </div>
            </div>
            <div className="thread-footer">
              <div>
                <small>Created by: {thread.author}</small>
                <small> at {thread.createdAt}</small>
              </div>
              <small>{thread.replies} replies</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ForumForm = ({ user }) => {
  return (
    <>
      <div className="container medium-width thread-form">
        <h3>Create a thread</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div>
          <div>
            <label htmlFor="topic">Topics</label>
            <select name="topic">
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
          <textarea name="content" placeholder="type your question here"></textarea>
          <button className="blue-btn">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Forum;
