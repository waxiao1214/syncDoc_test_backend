const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const serverless = require('serverless-http')
const cookieParser = require('cookie-parser')
const websockets = require('./websockets')
const authRouter = require('./routes/auth')
const connectDB = require('./config/db')
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

connectDB()

app.use('/api/web', authRouter)

let server = app.listen(5000, () => {
    console.log('Socket is listen on 5000')
})

websockets(server);
