const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


// Inicializador 
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((error, req, res, next) => {
    return res.json({
        error: error.menssage
    })
})



// Rutas
const partidoRoutes = require('./routes/partidos.routes');
const equipoRoutes = require('./routes/equipos.routes');
app.use(partidoRoutes);
app.use(equipoRoutes);



// Iniciar el servidor
app.listen(4000, () => {
    console.log('Server on port 4000');
});