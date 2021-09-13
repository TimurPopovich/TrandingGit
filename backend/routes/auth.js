const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '5 days' })
    return res.json({ token, id: user._id, email: user.email, interes: user.interes })
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
