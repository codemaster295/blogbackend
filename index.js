const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const path = require("path");
const bodyParser = require("body-parser");
const postRouter = require("./routes/Post");
app.use(bodyParser.json());
const cors = require("cors");
app.use("/public", express.static("uploads"));
const PORT = process.env.PORT || 3000;
const Auth = require("./routes/Auth");
const registerRouter = require("./routes/Register");
const loginRouter = require("./routes/Login");
const searchRouter = require("./routes/SearchData");
const productRouter = require('./routes/ProductData')
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.use("/api/v1/auth", registerRouter);
// app.use("/api/v1/login", loginRouter);
// app.use("/api/items", itemRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/searchdata", searchRouter);
app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/product", Auth, productRouter)

app.get("/", (req, res) => {
  res.send("mmo here");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to the mongodb database");
  }
);
app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
