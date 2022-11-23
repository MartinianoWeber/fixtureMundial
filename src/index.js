const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Inicializador 
const app = express();


app.use(express.json());
app.use((error, req, res, next) => {
    return res.json({
        error: error.menssage
    })
})
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());


// Rutas
const partidoRoutes = require('./routes/partidos.routes');
const equipoRoutes = require('./routes/equipos.routes');
const login = require('./routes/login.routes');
app.use(partidoRoutes);
app.use(equipoRoutes);
app.use(login);



// Iniciar el servidor
app.listen(4000, () => {
    console.log('Server on port 4000');
});