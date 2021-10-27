require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

const connectDB = async () => {
	try {
		await mongoose.connect(url, 
			{ 
				useNewUrlParser: true, 
				useUnifiedTopology: true, 
				useCreateIndex: true, 
				useFindAndModify: true
			}
		)
	} catch (err) {
			process.exit(1)        
	}
}

module.exports = connectDB