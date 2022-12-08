const express = require("express");
const {
  REGISTER_USER,
  LOGIN_USER,
  GET_USERS_COUNT,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", REGISTER_USER);
router.post("/login", LOGIN_USER);
router.get("/users", GET_USERS_COUNT);

module.exports = router;
