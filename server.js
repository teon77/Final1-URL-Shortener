const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const urlRouter = require("./routers/urlRouter")
const { errorHandler } = require("./handlers/errorHandler");


app.use(express.json());
app.use(express.urlencoded({ extended: false} ))
app.use('/', express.static(path.resolve('./dist')));               // serve main path as static dir

app.get('/', async (req, res) => {     
  res.sendFile(path.resolve('dist\index.html'))
});

app.get("/statistic", async (req, res, next) => {
    try {
    res.sendFile(path.resolve('urlDB.json'));
    } catch(error) {
        next(error);
    }
})

app.use("/shorturl", urlRouter)
app.use(errorHandler);


app.listen(process.env.PORT || 3000);