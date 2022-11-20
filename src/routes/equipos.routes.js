const {
    Router
} = require('express')

const {
    getAllequipos
} = require('../controllers/equipos.controller')

const router = Router()

router.get('/equipos', getAllequipos)

module.exports = router