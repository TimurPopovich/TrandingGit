const router = require("express").Router();
const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body.newUser;

    const findEmailUnic = await User.findOne({ email: email })

    if (findEmailUnic === null) {

      const hashPass = await bcrypt.hash(password, 7);

      const user = new User({ email, password: hashPass });

      await user.save();

      const id = user._id;

      const token = await jwt.sign({ id }, 'secret', {
        expiresIn: "5 days",
      });

      const update = await User.updateOne({ _id: id }, { token });

      if (update.modifiedCount) {
        res.json({ token, id: user._id, email: user.email, interes: user.interes });
      } else {
        throw new Error("нет доступа");
      }

    } else {
      throw new Error("Почта уже зарегистрированна");
    }

  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
