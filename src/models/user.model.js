const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	isOnline: {
		type: Boolean,
		require: true
	},
	password: {
		type: String,
		required: true
	},
	cretedAt: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('users', userSchema)