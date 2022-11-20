const {
    Router
} = require('express')

const {
    getAllPartidos
} = require('../controllers/partidos.controller')

const router = Router()

router.get('/partidos', getAllPartidos)

module.exports = router