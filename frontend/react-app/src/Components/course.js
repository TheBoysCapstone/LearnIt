import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const Course = ({ user, courseID}) => {
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [video, setVideo] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    let url = `http://localhost:8080/${user._id}/get-course/${courseID}`;
    axios({
      method: "GET",
      url: url,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        console.log(res.data);
        setCourse(res.data.course);
        setQuestions([...res.data.questions]);
        if (res.data.video) {
          let uri = res.data.video.video
            .substring(res.data.video.video.indexOf("http"))
            .split('"')
            .shift();
          setVideo(uri);
        }

        let ansArr = [];
        let msgs = [];
        res.data.questions.map((question, index) => {
          msgs.push({ correct: "", incorrect: "" });
          let ans = question.answers;

          ans.map((a, i) => {
            a["userAnswer"] = false;
          });
          ansArr.push(ans);
        });

        setUserAnswers([...ansArr]);
        setMessages([...msgs]);
      }
    });
  }, []);

  const handleOnChangeCheckbox = (e, questionIndex, answerIndex) => {
    let ansArr = userAnswers;
    ansArr[questionIndex][answerIndex]["userAnswer"] = e.target.checked;
    setUserAnswers([...ansArr]);
  };

  const handleAnswerQuestion = (e, questionIndex) => {
    let answers = userAnswers[questionIndex];

    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      if (answer.isCorrect === answer.userAnswer) {
        let msg = [];
        msg = messages;
        msg[questionIndex]["correct"] = "Correct!";
        msg[questionIndex]["incorrect"] = "";
        setMessages([...msg]);
      } else {
        let msg = [];
        msg = messages;
        msg[questionIndex]["correct"] = "";
        msg[questionIndex]["incorrect"] = "Answer is incorrect";
        setMessages([...msg]);
        return;
      }
    }
  };

  const handleCompleteCourse = () => {
    let url = `http://localhost:8080/${user._id}/complete-course/${courseID}`;
    console.log(url);
    axios({
      method: "POST",
      url: url,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data) setIsDisabled(true);
    });
  };

  const handleAddToCourseInProgress = () => {
    let url = `http://localhost:8080/${user._id}/save-course/${courseID}`;
    console.log(url);
    axios({
      method: "POST",
      url: url,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data) setIsDisabled(true);
    });
  };

  //check if object is empty
  if (Object.keys(course).length !== 0) {
    return (
      <>
        <div className="container medium-width article">
          <h3>{course.title}</h3>
          {video.length !== 0 ? <iframe src={video} allowFullScreen /> : ""}

          <div>{parse(DOMPurify.sanitize(course.body))}</div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-form">
              {messages.length !== 0 ? (
                <div>
                  <h4 className="green-text center-text">
                    {messages[questionIndex]["correct"]}
                  </h4>
                  <h4 className="red-text center-text">
                    {messages[questionIndex]["incorrect"]}
                  </h4>
                </div>
              ) : (
                ""
              )}

              <h4>{question.question}</h4>
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="answer">
                  <span>{answer.answer}</span>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleOnChangeCheckbox(e, questionIndex, answerIndex)
                    }
                  />
                </div>
              ))}
              <div
                className="answer-btn"
                onClick={(e) => handleAnswerQuestion(e, questionIndex)}
              >
                <button className="blue-btn">Answer</button>
              </div>
            </div>
          ))}
          <button
            className="green-btn"
            disabled={isDisabled}
            onClick={handleCompleteCourse}
          >
            Complete Course
          </button>
          <button
            className="blue-btn"
            disabled={isDisabled}
            onClick={handleAddToCourseInProgress}
          >
            Save to Courses In Progress
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>Course could not load...</h3>
      </>
    );
  }
};

export default Course;
