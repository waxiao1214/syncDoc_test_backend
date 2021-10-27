const cors = require("cors");
const { Server } = require('socket.io');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const { findOrCreateDocument, updateDocument } = require("../controllers/document");

let onlineUser = []

async function websockets(expressServer) {
  const io = new Server(expressServer, {
    cors: "*",
    method: ["GET", "POST"]
  })

  io.on('connection', async (socket) => {
    const document = await findOrCreateDocument()

    // load document
    socket.emit("load-document", document.data)
    // sync with online users
    socket.on("send-changes", delta => {
      socket.broadcast.emit("receive-changes", delta)
    })
    // save the document
    socket.on("save-document", async data => {
      await updateDocument(data)
    })
    
    // check is online
    socket.on("send-online", async text => {
      let requestToken = socket.request.headers?.authorization.split("Bearer ")[1]
      let id = socket.request.headers?.user_id
      var decoded = jwt.verify(requestToken, process.env.jwtSecret)
      if(decoded._id === id) {
        const user = await User.findOne({
          "_id": id,
        }, function() {
          return
        })
        
        user.time = new Date();
        let isDup = false
        onlineUser.forEach((online) => {
          if(online._id.toString() === user._id.toString()) isDup = true
        })
        if(isDup) onlineUser = onlineUser.map((online) => 
          online._id.toString() === user._id.toString() ? user : online
        )
        else onlineUser.push(user);
      }
    })

    setInterval(() => {
      onlineUser = onlineUser.filter(user => user.time.getTime() + 5000 > new Date().getTime())
      onlineUser = onlineUser.reduce((unique, o) => {
        if(!unique.some(obj => obj._id.toString() === o._id.toString())) {
          unique.push(o);
        }
        return unique
      }, []);

      socket.broadcast.emit("online-check", JSON.stringify(onlineUser))
    }, 2000)

  });
}

module.exports = websockets;
