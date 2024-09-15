const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://rishiktejreddy:rishiktej%406@users.y3uz0.mongodb.net/?retryWrites=true&w=majority&appName=Users"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected Successfully")
}

module.exports = connectToMongo;