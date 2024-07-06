"use strict";
require("dotenv").config({ path: "../sample.env" });
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // Index page (static HTML)
  app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
  });

  // API endpoint for conversion
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;

    // Validate the input
    if (!input) {
      return res.status(400).json({ error: "invalid input" });
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Check for invalid number and unit
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.status(200).json({ error: "invalid number and unit" });
    } else if (initNum === "invalid number") {
      return res.status(200).json({ error: "invalid number" });
    } else if (initUnit === "invalid unit") {
      return res.status(200).json({ error: "invalid unit" });
    }

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
      initUnit: initUnit.toLowerCase() === "l" ? "L" : initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit.toLowerCase() === "l" ? "L" : returnUnit,
      string: string,
    });
  });

  // 404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404).type("text").send("Not Found");
  });
};
