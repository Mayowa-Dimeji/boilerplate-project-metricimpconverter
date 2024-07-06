"use strict";
require("dotenv").config({ path: "../sample.env" });
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  //Index page (static HTML)
  app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
  });

  // API endpoint for conversion
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;

    // Validate the input
    if (!input) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  //404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404).type("text").send("Not Found");
  });
};
