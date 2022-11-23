const pool = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const registro = async (req, res, next) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const user = req.body.user
        console.log(name, password, user)
        let passHash = await bcrypt.hash(password, 8)
        pool.query('INSERT INTO users SET ?', { name: name, pass: passHash, user: user }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
                res.send('User added to database')
            }
        })
    } catch (error) {
        next(error)
    }

}

const login = async (req, res, next) => {
    const user = req.body.user
    const password = req.body.password
    if (user && password) {
        pool.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length === 0 || !(await bcrypt.compare(password, results[0].pass))) {
                res.status(401).send('User or password incorrect')
            } else {
                const id = results[0].id
                const token = jwt.sign({ id: id }, "sdsdsd", {
                    expiresIn: "7d"
                })
                console.log(token)
                const cookieOptions = {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions)
                res.send('User logged in')
            }
        })
    } else {
        res.send('Please enter user and password')
    }
}

const logout = async (req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })
    res.send('User logged out')
}

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, "sdsdsd")
        console.log(decoded)
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided')
        }
        next()
    } catch (error) {
        res.status(401).send('Unauthorized: No token provided')
    }
}

module.exports = {
    registro,
    login,
    isAuth,
    logout
}