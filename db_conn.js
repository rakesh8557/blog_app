const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("Db connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongo;