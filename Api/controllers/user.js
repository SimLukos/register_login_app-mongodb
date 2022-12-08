const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/usersSchema");

module.exports.REGISTER_USER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const newUser = new UserSchema({
    email: req.body.email,
    password: hashedPassword,
  });

  newUser.save().then(() => {
    res.status(200).json({ addedUser: newUser });
  });
};

module.exports.LOGIN_USER = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        { algorythm: "RS256" }
      );

      return res
        .status(200)
        .json({ text: "Login successfull", jwt_token: token });
    } else {
      return res.status(401).json({ text: "Check your password and email" });
    }
  } catch (error) {
    res.status(401).json({ text: "Check your password and email" });
  }
};

module.exports.GET_USERS_COUNT = async (req, res) => {
  try {
    const users = await UserSchema.find();
    let usersCount = 0;
    users.forEach(() => {
      usersCount += 1;
    });

    res.status(200).json({ usersCount: usersCount });
  } catch (error) {
    console.log(error);
  }
};
