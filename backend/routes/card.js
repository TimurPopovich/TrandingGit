const router = require('express').Router()
const User = require('../models/user.model')

router.post('/', async (req, res) => {
  const { rep, user } = req.body
  const findUser = await User.findOne({ _id: user.id })

  if (findUser.interes && findUser.interes.length !== 0) {
    const searchRep = findUser.interes.findIndex(el => el.url === rep.url)
    if (searchRep === -1) {
      findUser.interes.push(rep)
      await findUser.save()
      res.json({ message: true })
    } else { res.json({ message: false }) }
  } else {
    findUser.interes.push(rep)
    await findUser.save()
    res.json({ message: true })
  }


})

router.delete('/', async (req, res) => {
  const { rep, user } = req.body
  const findUser = await User.findOne({ _id: user.id })

  const searchRep = findUser.interes.findIndex(el => el.url === rep.url)

  findUser.interes.splice(searchRep, 1)
  await findUser.save()
  res.json({ message: true })

})

module.exports = router
