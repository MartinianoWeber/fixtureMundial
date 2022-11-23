const {
    Router
} = require('express')

const {
    registro,
    login,
    isAuth,
    logout
} = require('../controllers/login.controller')

const router = Router()

router.post('/registro', registro)
router.post('/login', login)
router.get('/home', isAuth, (req, res) => {
    res.send('You are logged in')
})
router.get('/logout', logout)

module.exports = router