const express = require("express");
const {
  INSERT_TUTORIAL,
  GET_ALL_TUTORIALS,
  USER_TUTORIALS,
} = require("../controllers/tutorial");

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/tutorials", INSERT_TUTORIAL);
router.get("/tutorials", GET_ALL_TUTORIALS);
router.get("/user-tutorials/:id", auth, USER_TUTORIALS);

module.exports = router;
