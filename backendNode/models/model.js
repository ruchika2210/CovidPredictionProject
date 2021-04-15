const mongoose=require('mongoose')

const Schema=mongoose.Schema;


const CovidSchema= new Schema({
    name:String
});

const Covid=mongoose.model("covid",CovidSchema)

//export
module.exports=Covid