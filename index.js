const express=require('express');
const app= express();
const http= require('http');
const server=http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

//rutas

const usersRoutes=require('./routes/userRoutes');

const port = process.env.PORT || 5500;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}
    
));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port', port);
//lamando rutas
usersRoutes(app);
server.listen(5500, '192.168.9.144' || 'localhost',function() {
    console.log('Server listening on port', port);
});

app.get('/',(req,res)=>{
res.send('ruta raiz del backend');
});


//errors

app.use((err,req,res,next)=>{
console.log(err);
res.status(err.status || 500).send(err.stacl);
});