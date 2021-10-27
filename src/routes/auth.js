const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/login', authController.login)
router.get('/', (req, res) => {
    return res.send('../../dist/index.html')
})

module.exports = router;