const mongoose = require('mongoose')

const connectToDatabase = () => {
    mongoose
        .connect("mongodb://localhost:27017/mongoose-demo", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("connected to database");
        })
        .catch((error) => {
            console.log(error);
        })
};
module.exports = {
    connect: connectToDatabase,
};