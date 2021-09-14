const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

router.put('/', async (req, res) => {

  const { info } = req.body

  const findUser = await User.findOne({ _id: info.id })

  if (info.password && info.password.length !== 0) {

    const chechPass = await bcrypt.compare(info.password, findUser.password)

    if (chechPass) {
      return res.json({ status: 'Старый пароль' })
    } else {
      findUser.password = await bcrypt.hash(info.password, 7)
      await findUser.save()
    }
  }

  if (info.email) {

    const findUnicEmail = await User.findOne({ email: info.email })

    if (findUnicEmail === null) {
      findUser.email = info.email
      await findUser.save()
    } else {
      return res.json({ status: 'Почта занята' })
    }
    
  }

  res.json({ status: true })

})

module.exports = router
