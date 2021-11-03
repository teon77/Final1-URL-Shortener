const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl")
const app = express();
const path = require("path");
const { error } = require("console");


mongoose.connect(`mongodb://localhost:${process.env.PORT || 3000}/urlShortener`, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then( () => {
    console.log("Sucsess");
}).catch( (error) => {
    console.log(error);
}) 

app.use(express.urlencoded({ extended: false} ))
app.use('/', express.static(path.resolve('./dist')));               // serve main path as static dir

app.get('/', async function(req, res) {     
  const shortUrls = await ShortUrl.find()                          // serve main path as static file
  res.sendFile(path.resolve('dist\index.html'))
});

app.post("/shorturl", async (req, res) => {
   await ShortUrl.create({ full: req.body.fullUrl })                     // create shortUrl
   res.redirect("/")
})


app.listen(process.env.PORT || 3000);