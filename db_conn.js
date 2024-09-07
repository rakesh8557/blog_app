const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/blogApp";

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("Db connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongo;