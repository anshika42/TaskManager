const mongoose = require("mongoose");
const dburl = "mongodb+srv://anshikagarg883:arnikagarg@cluster0.g7ojezx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectmongo = () => {
  mongoose
    .connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successful..");
    })
    .catch((err) => console.log(err));
};
module.exports = connectmongo;
