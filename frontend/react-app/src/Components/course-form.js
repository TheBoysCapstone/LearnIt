import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ModalWindow from "./modal-window";

const CourseForm = ({ user }) => {
  const [course, setCourse] = useState({
    title: "",
    topic: "",
    content: "",
  });
  const [video, setVideo] = useState("");
  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalSettings, setModalSettings] = useState({
    buttonStyle: "",
    message: "",
    buttonText: "",
  });
  const [successSubmit, setSuccessSubmit] = useState(true);

  const handleSubmit = () => {
    let payload = course;
    payload.questions = questions;
    payload.content = content;
    if (video !== "") payload.video = video;
    axios({
      method: "POST",
      data: { ...payload },
      url: `http://localhost:8080/${user._id}/create-course`,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        setModalSettings({
          buttonStyle: "success",
          message: "Course successfully saved",
          buttonText: "Ok",
        });
        setShowModal(true);
        setSuccessSubmit(true);
      } else {
        setModalSettings({
          buttonStyle: "danger",
          message: "Course could not be saved",
          buttonText: "Dismiss",
        });
        setShowModal(true);
        setSuccessSubmit(false);
      }
    });
  };

  const handleModal = () => {
    setShowModal(false);
    if (successSubmit) {
      console.log("Clearing content");
      setVideo("");
      setContent("");
      setCourse({ title: "", topic: "", content: "" });
      setQuestions([]);
    }
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.value);
  };

  const handleCourseChange = (e) => {
    const [field, value] = [e.target.name, e.target.value];
    setCourse({ ...course, [field]: value });
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAnswersChange = (e, questionIndex, answerIndex) => {
    const field = e.target.name;
    let questionsArr = questions;
    if (field === "isCorrect") {
      questionsArr[questionIndex].answers[answerIndex][field] =
        e.target.checked;
    } else {
      questionsArr[questionIndex].answers[answerIndex][field] = e.target.value;
    }
    setQuestions([...questionsArr]);
  };

  const addAnswerField = (e, questionIndex) => {
    let questionsArr = questions;
    questionsArr[questionIndex].answers.push({ answer: "", isCorrect: false });
    setQuestions([...questionsArr]);
  };

  const addQuestionForm = () => {
    setQuestions([...questions, { question: "", answers: [] }]);
  };

  const removeQuestionForm = (e, questionIndex) => {
    let questionArr = questions;
    questionArr.splice(questionIndex, 1);
    setQuestions([...questionArr]);
  };

  const handleQuestionChange = (e, questionIndex) => {
    let questionsArr = questions;

    questionsArr[questionIndex].question = e.target.value;
    setQuestions([...questionsArr]);
  };

  const removeAnswerField = (e, questionIndex, answerIndex) => {
    let ansArr = questions[questionIndex].answers;
    ansArr.splice(answerIndex, 1);
    let questionArr = questions;
    questionArr[questionIndex].answers = ansArr;
    setQuestions([...questionArr]);
  };
  return (
    <>
      {showModal ? (
        <ModalWindow handler={handleModal} settings={modalSettings} />
      ) : (
        <div></div>
      )}
      <div className="container medium-width">
        <h3>Create a course</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleCourseChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="topic">Topics</label>
            <select name="topic" onChange={handleCourseChange}>
              <option value="default">Choose topic</option>
              <option value="Software">IT/Software</option>
              <option value="Business">Business</option>
              <option value="Management">Management</option>
              <option value="Science">Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Other">other</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="video">Video(Optional)</label>
          <input
            type="text"
            name="video"
            placeholder="embed a video"
            value={video}
            onChange={handleVideoChange}
          />
        </div>
        <div>
          <label htmlFor="content">Course Content</label>
          <ReactQuill size="100" theme="snow" value={content} onChange={handleContentChange} />
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-form">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              placeholder="question"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
            />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="answer-form">
                <input
                  type="text"
                  name="answer"
                  placeholder="answer"
                  value={answer.answer}
                  onChange={(e) =>
                    handleAnswersChange(e, questionIndex, answerIndex)
                  }
                />
                <small className="checkbox-label">Mark as correct</small>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={answer.isCorrect}
                  onChange={(e) =>
                    handleAnswersChange(e, questionIndex, answerIndex)
                  }
                />
                <button
                  className="red-btn"
                  onClick={(e) =>
                    removeAnswerField(e, questionIndex, answerIndex)
                  }
                >
                  remove
                </button>
              </div>
            ))}
            <button
              className="blue-btn"
              onClick={(e) => addAnswerField(e, questionIndex)}
            >
              Add answer
            </button>
            <button
              className="blue-btn"
              onClick={(e) => removeQuestionForm(e, questionIndex)}
            >
              Remove question
            </button>
          </div>
        ))}

        <button className="warning" onClick={addQuestionForm}>
          Add question
        </button>

        <button className="green-btn" onClick={handleSubmit}>
          Submit Course
        </button>
      </div>
    </>
  );
};

export default CourseForm;
