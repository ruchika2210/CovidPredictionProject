var mongoose = require('mongoose')

//Set up default mongoose connection
var uri = 'mongodb+srv://RR-Covid:Vasantara7710@covidstorage.4cniv.mongodb.net/Login?retryWrites=true&w=majority'


// connection
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
},() =>console.log('database is connected'))





