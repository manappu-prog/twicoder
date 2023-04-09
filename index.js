const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoDbStore = require('connect-mongodb-session')(session);
const port = 8080;

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static('assets'));
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use(session({
    name: 'twicoder',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoDbStore({
        uri: 'mongodb://127.0.0.1:27017/user'
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err){
        console.log('error while running the server: -> ' + err);
        return;
    }
    console.log('server is up and running on the port number ' + port);
})