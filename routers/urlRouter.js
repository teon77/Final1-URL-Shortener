const express = require("express");
const urlRouter = express.Router();
const shortId = require("shortid");
const path = require("path");
const fs = require("fs");

const { DataBase } = require("../dataBaseClass");
const data = fs.readFileSync("urlDB.json");
const dataArr = JSON.parse(data);


urlRouter.post("/", (req, res, next) => {
    try {
    const originalUrl = req.body.fullUrl;
    const creationDate = new Date().toISOString().slice(0, 10)
    const newShortId =  shortId.generate( req.body.fullUrl )                     // create shortUrl

    dataArr.push(new DataBase( creationDate, 0, originalUrl, newShortId));
    console.log(dataArr);
      fs.writeFile("urlDB.json", JSON.stringify(dataArr, null, 2), (err) => {
          if(err)
          console.log("There is something wrong with saving to Data Base", err);
      })
      res.send(newShortId);
    } catch(error) {
        next(error);
    }
  })

module.exports = urlRouter; // export the router