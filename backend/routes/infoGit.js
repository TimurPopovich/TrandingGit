const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
  const response = await fetch('https://api.trending-github.com/github/spoken-languages');
  const result = await response.json();

  const response2 = await fetch('https://api.trending-github.com/github/languages');
  const result2 = await response2.json();

  return res.json({ language: result2, spokenLanguage: result })

})

module.exports = router
