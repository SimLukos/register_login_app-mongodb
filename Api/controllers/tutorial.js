const TutorialSchema = require("../models/tutorialSchema");
const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.INSERT_TUTORIAL = async (req, res) => {
  const token = req.headers.autorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.body.user_id = decoded.userId;
      const newTutorial = new TutorialSchema({
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
        private: true,
      });

      newTutorial.save().then(() => {
        res.status(200).json({ text: "Tutorial saved!" });
      });
    } else {
      const newTutorial = new TutorialSchema({
        user_id: "Anonymous",
        title: req.body.title,
        content: req.body.content,
        private: false,
      });

      newTutorial.save().then(() => {
        res
          .status(200)
          .json({
            text: "Tutorial saved as ANONYMOUS. Please LOGIN for private save :)",
          });
      });
    }
  });
};

module.exports.GET_ALL_TUTORIALS = async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      TutorialSchema.find({ private: true }).then((results) => {
        return res.status(200).json({ tutorials: results });
      });
    } else {
      TutorialSchema.find({ private: false }).then((results) => {
        return res.status(200).json({ tutorials: results });
      });
    }
  });
};

module.exports.USER_TUTORIALS = async (req, res) => {
  TutorialSchema.find({ user_id: req.params.id }).then((results) => {
    res.status(200).json({ userTutorials: results });
  });
};
