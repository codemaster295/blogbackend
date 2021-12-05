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
const PORT = process.env.PORT || 3000;
const Auth = require('./routes/Auth')
const  registerRouter = require('./routes/Register')
const loginRouter = require('./routes/Login')
const searchRouter = require('./routes/SearchData')

app.use(cors())

app.use('/api/v1',Auth, postRouter)
app.use('/api/v1/register' ,registerRouter)
app.use('/api/v1/login' , loginRouter)
app.use('/api/v1/searchdata' ,Auth, searchRouter)
app.get('/',Auth, (req, res) => {
    res.send("mmo here")
})



mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to the mongodb database")
})
app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})