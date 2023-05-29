const express = require('express')
const router = express.Router()
const userControll = require('../controllers/userControl')

// end point to create user 
router.post('/user/signup',(userControll.createUser))

// endpoint to login user 
router.post('/user/login',(userControll.loginUser))

// refresh token
router.post('/user/refresh-token',(userControll.refreshToken))


module.exports = router