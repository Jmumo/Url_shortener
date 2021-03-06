const Mongoose  = require("mongoose");

const shortId = require("shortid")

const shorturl = new Mongoose.Schema({


     full:{
         type : String,
         required :true
     },
     short:{
         type:String,
         required :true,
         default:shortId.generate

     },
     clicks:{
         type:Number,
         required:true,
         default:0
     }
})

module.exports = Mongoose.model('shorturl',shorturl)