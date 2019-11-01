const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');


const app = express();

//Settings

app.set('port', process.env.PORT || 3030);

//Middlewares => Funciones que se ejecutan antes de llegar a las rutas
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/task.routes'));


//Static Files

//Le indicas a .static() que la carpeta public esta dentro de src. __dirname toma como ruta por default la ruta hasta src

app.use(express.static(path.join(__dirname, 'public')));



// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});