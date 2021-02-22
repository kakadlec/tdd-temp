const express = require('express')
const router = express.Router()
const usersService = require('../service/usersService')

router.get('/users', async (req, res) => {
  try {
    const users = await usersService.get()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await usersService.getById(id)

  res.json(user)
})

router.post('/user', async (req, res) => {
  const body = req.body

  const id = await usersService.save(body)

  res.json(id)
})

router.put('/users/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const user = await usersService.update(id, body)

  res.json(user)
})

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await usersService.delete(id)

  res.json(user)
})

module.exports = router
