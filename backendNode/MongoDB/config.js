var mongoose = require('mongoose')
require('mongodb')

//Set up default mongoose connection
var uri = 'mongodb+srv://RR-Covid:Vasantara7710@covidstorage.4cniv.mongodb.net/Login?retryWrites=true&w=majority'


// connection
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

const db=mongoose.connection;

db.once("open",() =>{
    console.log("Mongodb started")
})

export default  mongoose;



