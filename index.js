const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const path = require("path");
const bodyParser = require('body-parser')
const postRouter = require('./routes/Post')
app.use(bodyParser.json())
const cors = require('cors')
app.use("/public", express.static("uploads"));

app.use(cors())
app.use('/api/v1', postRouter)
app.get('/', (req, res) => {
    res.send("mmo here")
})



mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database")
})
app.listen(process.env.PORT, () => {
    console.log(`app running on ${process.env.PORT}`)
})