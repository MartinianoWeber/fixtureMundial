const pool = require('../db')

const getAllPartidos = async (req, res, next) => {
    try {
        const response = await pool.query("SELECT * FROM partidos")
        res.json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPartidos
}