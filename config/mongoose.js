const mongoose = require('mongoose');

const main = async() => {
    mongoose.connect('mongodb://127.0.0.1:27017/user');
}

main().then(() => console.log('connected to the database...')).catch((err) => console.log('error while connecting to the database......'));