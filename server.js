const { urlencoded } = require('express')
const express = require('express')

const mongoose = require('mongoose')

const ShortUrl = require('./models/shorturl')

mongoose.connect('mongodb://localhost/urls',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const app = express()

app.set('view engine','ejs')
app.use(urlencoded({
    extended:false
}))


app.get ('/',async (req,res)=>{
   const urls = await ShortUrl.find()
 res.render('index',{
     shorturls:urls
 })
})
app.post('/shorturls', async (req,res)=>{
    await  ShortUrl.create({full:req.body.fullurl})

    res.redirect('/')

})

app.get('/:shorturl', async (req,res)=>{
 const shorturl = await ShortUrl.findOne({ short:req.params.shorturl})

 if(shorturl == null) return res.sendStatus(404);

 shorturl.clicks++

 shorturl.save();
  res.redirect(shorturl.full)
})

app.listen(process.env.PORT || 5000)