const PORT = process.env.PORT || 50000

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const websockets = require('./src/websockets')
const authRouter = require('./src/routes/auth')
const connectDB = require('./src/config/db')
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

connectDB()

app.use('/api', authRouter)



let server = app.listen(PORT, () => {
    console.log('Socket is listen on 5000')
})

websockets(server);
