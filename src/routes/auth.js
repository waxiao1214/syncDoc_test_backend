const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/login', authController.login)
router.get('/', (req, res) => {
    return res.send('server is running')
})

module.exports = router;