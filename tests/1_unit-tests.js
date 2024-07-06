const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      assert.equal(convertHandler.getNum("32L"), 32);
      done();
    });

    test("Decimal number input", function (done) {
      assert.equal(convertHandler.getNum("32.5L"), 32.5);
      done();
    });

    test("Fractional input", function (done) {
      assert.equal(convertHandler.getNum("1/2km"), 0.5);
      done();
    });

    test("Fractional input with a decimal", function (done) {
      assert.equal(convertHandler.getNum("5.4/3lbs"), 1.8);
      done();
    });

    test("Double-fraction input", function (done) {
      assert.equal(convertHandler.getNum("3/2/3gal"), "invalid number");
      done();
    });

    test("No numerical input", function (done) {
      assert.equal(convertHandler.getNum("kg"), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("Valid input unit", function (done) {
      const input = [
        "gal",
        "GAL",
        "l",
        "L",
        "mi",
        "MI",
        "km",
        "KM",
        "lbs",
        "LBS",
        "kg",
        "KG",
      ];
      const expected = [
        "gal",
        "gal",
        "L",
        "L",
        "mi",
        "mi",
        "km",
        "km",
        "lbs",
        "lbs",
        "kg",
        "kg",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      done();
    });

    test("Invalid input unit", function (done) {
      assert.equal(convertHandler.getUnit("34g"), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("Valid input units", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("Valid input units", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.00001);
      done();
    });

    test("L to Gal", function (done) {
      assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.00001);
      done();
    });

    test("Mi to Km", function (done) {
      assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.00001);
      done();
    });

    test("Km to Mi", function (done) {
      assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.00001);
      done();
    });

    test("Lbs to Kg", function (done) {
      assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.00001);
      done();
    });

    test("Kg to Lbs", function (done) {
      assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.00001);
      done();
    });
  });
});
