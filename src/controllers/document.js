const Document = require('../models/document.model');

require("dotenv").config()

async function findOrCreateDocument() {
  const document = await Document.find()
  if(document.length > 0) return document[0]
  return await Document.create({_id: "1234", data: ""})
}

async function updateDocument(data) {
  await Document.findByIdAndUpdate('1234', { data })
}

module.exports = { findOrCreateDocument, updateDocument }