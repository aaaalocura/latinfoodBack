const mysql = require('mysql');
const db=mysql.createConnection({
    host: '51.161.35.133',
    user: 'remoto',
    password: 'OyarceGroup2023',
    database: 'b3'
})

db.connect(function(err){
    if(err) throw err;
    console.log('Connected');
})

module.exports=db;