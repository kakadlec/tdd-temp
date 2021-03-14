const express = require('express')
const router = express.Router()
const loginService = require('../service/loginService')

router.post('/login', async (req, res) => {
  try {
    const body = req.body
    const token = await loginService.login(body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(401).json(error)
  }
})

module.exports = router
