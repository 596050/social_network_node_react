const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { postRoutes } = require("./routes/post");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(`DB connected error ${err}`);
  });

mongoose.connection.on("error", (err) =>
  console.error(`DB connection error ${err}`)
);

const app = express();

// logging middleware
app.use(morgan("dev"));

app.get("/", postRoutes);

const port = process.env.PORT || 8080;
const origin = process.env.ORIGIN || "http://localhost:";
app.listen(port, () => console.log(`Listening on port ${origin}${port}`));

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://root:root@cluster0.qrzhu.mongodb.net/database?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
