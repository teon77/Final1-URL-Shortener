const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const urlRouter = require("./routers/urlRouter")


app.use(express.json());
app.use(express.urlencoded({ extended: false} ))
app.use('/', express.static(path.resolve('./dist')));               // serve main path as static dir

app.get('/', async (req, res) => {     
  res.sendFile(path.resolve('dist\index.html'))
});

app.get("/statistic", async (req, res) => {
    res.sendFile(path.resolve('urlDB.json'));
})
app.use("/shorturl", urlRouter)



app.listen(process.env.PORT || 3000);