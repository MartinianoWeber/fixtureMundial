const pool = require('../db')

const getAllequipos = async (req, res, next) => {
    try {
        const response = await pool.query("SELECT * FROM equipos")
        res.json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllequipos
}