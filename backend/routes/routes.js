const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const Question = require("../models/question");
const Video = require("../models/video");
const CompletedCourse = require("../models/completed-course.js");
const SaveCourse = require("../models/saved-course.js");
const Thread = require("../models/thread");
const authorize = require("../middleware/authorize");
const logger = require('../logger/dev-logger')
const limitter = require('express-rate-limit')

const registerLimitter = limitter({
  windowMs: 5 * 60 * 1000, //A client can register 2 accounts every 5 minutes
  max: 2,
  message: 'Too many registation attempts, try again later.',
})

const loginLimitter = limitter({
  windowMS: 2 * 60 * 1000, //A client can attempt to login 5 times every two minutes 
  max: 5,
  message: 'Too many login attempts, try again later.',
})

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect(`/${req.user._id.toString()}`);
  } else {
    res.json({ success: true, redirectTo: "signup" });
  }
});

//checks if the user exists in the database
//if it does it sends an error message back to the client
//if not it hashes the user's password, builds a user object and saves it to the database
//after saving the user a message with redirect information is sent back to the client
router.post("/register", registerLimitter, (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (user) {
      res.json({
        error: true,
        message: "User already exists. Try another username",
      });
    } else if (req.body.password.length < 6) {
      res.json({ error: true, message: "Password must be 6 characters" });
    } else if (req.body.password.length > 16) {
      res.json({ error: true, message: "Password is too long" });
    } else if (req.body.password.search(/[a-z]/) < 0) {
      res.json({
        error: true,
        message: "Password must contain a lowercase leter",
      });
    } else if (req.body.password.search(/[A-Z]/) < 0) {
      res.json({
        error: true,
        message: "Password must contain a uppercase letter",
      });
    } else if (req.body.password.search(/[0-9]/) < 0) {
      res.json({ error: true, message: "Password must contain a number" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 11);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      await newUser.save();
      logger.info(`[User: ${req.body.username}] [IP: ${req.socket.remoteAddress}] [Message: New User Created]}`)
      res.json({ success: true, redirectTo: "login" });
    }
  });
});

//login route
router.post(
  "/login",
  loginLimitter,
  passport.authenticate("local", { failureRedirect: "/failed-login" }),
  (req, res) => {
    res.json({ user: req.user, redirectTo: "user" });
    logger.warning(`[User: ${req.body.username}] [IP: ${req.socket.remoteAddress}] [Message: Successful Login]`)
  }
);

//will fire when login fails
router.get("/failed-login", (req, res) => {
  res.json({ success: false, message: "Username or password is incorrect" });
  logger.warning(`[User: ${req.body.username}] [IP: ${req.socket.remoteAddress}] [Message: Failed Login]`)
});

router.get("/:id", authorize, (req, res) => {
  res.json({ success: true, user: req.user, redirectTo: "user" });
});

router.get("/:id/get-courses/:category", authorize, (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  console.log("id ", id);

  Course.find({ userID: { $ne: id } })
    .populate("userID")
    .exec((err, course) => {
      console.log(course);
      res.json({ success: true, course: course });
    });
});

//
router.get("/:id/get-course/:courseID", authorize, async (req, res) => {
  Course.findOne({ _id: req.params.courseID }, (err, course) => {
    course.video = "";
    course.questions = [];
    Question.find({ courseID: req.params.courseID }, (err, questions) => {
      Video.findOne({ courseID: req.params.courseID }, (err, video) => {
        course.questions = questions;
        course.video = video;
        res.json({
          success: true,
          course: course,
          questions: questions,
          video: video,
        });
      });
    });
  });
});

//this will save the course and questions into the database
router.post("/:id/create-course", authorize, async (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    topic: req.body.topic,
    body: req.body.content,
    userID: mongoose.Types.ObjectId(req.params.id),
  });

  let questionResult, courseResult;
  courseResult = await newCourse.save();

  if (!courseResult) {
    res.json({ success: false, message: "Course could not be saved" });
  }
  //if question was successfully saved and there are questions associated with the course
  //the questions will be saved in the questions collection of the database
  if ((await courseResult) && req.body.questions) {
    req.body.questions.forEach(async (question) => {
      const newQuestion = new Question({
        question: question.question,
        answers: question.answers,
        courseID: courseResult._id,
      });

      questionResult = await newQuestion.save();

      if (!questionResult) {
        res.json({ success: false, message: "Course could not be saved" });
      }
    });
  }
  if (req.body.video) {
    const newVideo = new Video({
      video: req.body.video,
      courseID: courseResult._id,
    });
    const videoResult = await newVideo.save();

    if (!videoResult) {
      res.json({ success: false, message: "Course could not be saved" });
    }
  }
  res.json({ success: true });
});

//save course to a collection of completed courses
router.post("/:id/complete-course/:courseID", authorize, async (req, res) => {
  await SaveCourse.deleteOne({ courseID: req.params.courseID });
  CompletedCourse.find(
    { courseID: req.params.courseID },
    async (err, result) => {
      if (result.length === 0) {
        const completedCourse = new CompletedCourse({
          userID: req.params.id,
          courseID: req.params.courseID,
        });
        const result = await completedCourse.save();
        if (result) {
          console.log(error);
          res.json({
            success: false,
            message: "Course completed",
          });
        } else
          res.json({
            success: false,
            message: "Course status could not be updated",
          });
      }
    }
  );
  res.json({
    success: true,
    message: "Course already completed",
  });
});

router.post("/:id/save-course/:courseID", authorize, async (req, res) => {
  await CompletedCourse.deleteOne({ courseID: req.params.courseID });
  SaveCourse.find({ courseID: req.params.courseID }, async (err, result) => {
    if (result.length === 0) {
      const saveCourse = new SaveCourse({
        userID: req.params.id,
        courseID: req.params.courseID,
      });
      const result = await saveCourse.save();
      if (result) {
        res.json({
          success: false,
          message: "Course saved",
        });
      } else
        res.json({
          success: false,
          message: "Course status could not be updated",
        });
    }
  });
  res.json({
    success: true,
    message: "Course already saved",
  });
});

router.post("/:id/create-thread", authorize, (req, res) => {
  console.log("Body", req.body);
  const thread = new Thread({
    title: req.body.title,
    topic: req.body.topic,
    author: req.params.id,
    content: req.body.content,
    comments: [],
  });

  thread.save((err, result) => {
    if (err) res.json({ success: false, message: "Could not save thread" });
    if (result) res.json({ success: true });
  });
});

router.get("/:id/get-threads", authorize, (req, res) => {
  Thread.find()
    .populate("author", "username")
    .exec((err, result) => {
      console.log(result);
      if (err) res.json({ success: false, message: "Query failed" });
      if (res) res.json({ success: true, threads: result });
    });
});

router.get("/:id/get-thread/:threadID", authorize, (req, res) => {
  Thread.find({ _id: req.params.threadID })
    .populate("author", "username")
    .populate("comments")
    .exec((err, result) => {
      console.log(result);
      if (result) res.json({ success: true, thread: result });
      if (err) res.json({ success: false, message: "Could not find thread" });
    });
});

//will respond with json specifying number of courses created, taken and completed
router.get("/:id/main", authorize, (req, res) => {
  let numCourses = { created: 0, completed: 0, saved: 0 };
  let queryParam = { userID: req.params.id };
  Course.countDocuments(queryParam, (err, count) => {
    numCourses["created"] = count;

    CompletedCourse.countDocuments(queryParam, (err, count) => {
      numCourses["completed"] = count;
      SaveCourse.countDocuments(queryParam, (err, count) => {
        numCourses["saved"] = count;
        res.json({ ...numCourses, success: true });
      });
    });
  });
});

//this will remove all users in the users collection(for debugging purposes)
router.post("/deleteall", (req, res) => {
  User.remove((err) => {
    if (err)
      res.json({
        success: false,
        message: "error occurred while removing users",
      });
    else res.json({ success: true, message: "all users removed" });
  });
});

//will delete all courses, questions and videos associated with it(for debug purposes)
router.post("/deleteallcourses", (req, res) => {
  Course.remove((err) => {
    if (err)
      res.json({
        success: false,
        message: "error occured while removing users",
      });
    else res.json({ success: true, message: "all users removed" });
  });

  Question.remove((err) => {
    if (err)
      res.json({
        success: false,
        message: "error occurred while removing users",
      });
    else res.json({ success: true, message: "all users removed" });
  });

  Video.remove((err) => {
    if (err)
      res.json({
        success: false,
        message: "error occured while removing users",
      });
    else
      res.json({
        success: true,
        message: "all courses, questions, videos removed",
      });
  });
});

//logs out user; makes sure the right user is trying to logout
router.post("/:id/logout", authorize, (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;