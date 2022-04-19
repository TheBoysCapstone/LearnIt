import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseForm = ({ user }) => {
  const [course, setCourse] = useState({
    title: "",
    topic: "",
    content: "",
  });
  const [video, setVideo] = useState("");
  const [questions, setQuestions] = useState([]);
  const handleSubmit = () => {
    let payload = course;
    payload.questions = questions;
    if (video !== "") payload.video = video;
    console.log(payload);
    axios({
      method: "POST",
      data: { ...payload },
      url: `http://localhost:8080/${user._id}/create-course`,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        //TODO: implement redirect
        console.log(res.data);
      }
    });
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.value);
  };

  const handleCourseChange = (e) => {
    const [field, value] = [e.target.name, e.target.value];

    setCourse({ ...course, [field]: value })
  };

  const handleAnswersChange = (e, questionIndex, answerIndex) => {
    const field = e.target.name;
    let questionsArr = questions;
    if (field === "isCorrect") {
      console.log(e.target.checked);
      questionsArr[questionIndex].answers[answerIndex][field] =
        e.target.checked;
    } else {
      questionsArr[questionIndex].answers[answerIndex][field] = e.target.value;
    }
    setQuestions([...questionsArr]);
    console.log(questions);
  };

  const addAnswerField = (e, questionIndex) => {
    let questionsArr = questions;
    questionsArr[questionIndex].answers.push({ answer: "", isCorrect: false });
    setQuestions([...questionsArr]);
    console.log(questions);
  };

  const addQuestionForm = () => {
    setQuestions([...questions, { question: "", answers: [] }]);
  };

  const removeQuestionForm = (e, questionIndex) => {
    let questionArr = questions;
    questionArr.splice(questionIndex, 1);
    setQuestions([...questionArr]);
    console.log(questions);
  };

  const handleQuestionChange = (e, questionIndex) => {
    let questionsArr = questions;

    questionsArr[questionIndex].question = e.target.value;
    setQuestions([...questionsArr]);
    console.log(questions);
  };

  const removeAnswerField = (e, questionIndex, answerIndex) => {
    let ansArr = questions[questionIndex].answers;
    ansArr.splice(answerIndex, 1);
    let questionArr = questions;
    questionArr[questionIndex].answers = ansArr;
    setQuestions([...questionArr]);
    console.log(questions);
  };
  return (
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
        <textarea
          name="content"
          value={course.content}
          onChange={handleCourseChange}
        ></textarea>
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
  );
};

export default CourseForm;
