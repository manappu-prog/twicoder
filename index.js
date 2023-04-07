const express = require('express');
const app = express();
const port = 8080;

app.set('view engine','ejs');
app.set('views','views');

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err){
        console.log('error while running the server: -> ' + err);
        return;
    }
    console.log('server is up and running on the port number ' + port);
})