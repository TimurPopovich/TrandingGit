const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

router.post("/", async (req, res) => {
  const { email, password } = req.body.logInfo;
  try {
    let user = await User.findOne({ email: email });

    const isTruePassword = await bcrypt.compare(password, user.password);

    const id = user._id;

    if (user && isTruePassword) {

      const token = await jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "5 days",
      });

      const update = await User.updateOne({ _id: id }, { token });

      if (update.modifiedCount) {
        res.json({ token, id: user._id, email: user.email, interes: user.interes });
      } else {
        throw new Error("Неверный пароль, имя пользователя или email");
      }

    } else {
      throw new Error("Неверный пароль, имя пользователя или email");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;

