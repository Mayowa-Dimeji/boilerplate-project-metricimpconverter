function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const numRegex = /^[.\d\/]+/;
    const numStr = input.match(numRegex);

    if (!numStr) {
      return 1;
    }

    result = numStr[0];

    if (result.includes("/")) {
      const numbers = result.split("/");
      if (numbers.length > 2) {
        return "invalid number";
      }
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) {
      return "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const unitStr = input.match(unitRegex);

    if (!unitStr) {
      return "invalid unit";
    }

    const result = unitStr[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (validUnits.includes(result)) {
      return result === "l" ? "L" : result;
    }

    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const spellOutMap = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return spellOutMap[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return "invalid unit";
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.handleConversion = function (input) {
    const number = this.getNum(input);
    const unit = this.getUnit(input);

    if (number === "invalid number" && unit === "invalid unit") {
      return "invalid number and unit";
    } else if (number === "invalid number") {
      return "invalid number";
    } else if (unit === "invalid unit") {
      return "invalid unit";
    }

    const returnNum = this.convert(number, unit);
    const returnUnit = this.getReturnUnit(unit);
    const resultString = this.getString(number, unit, returnNum, returnUnit);

    return {
      initNum: number,
      initUnit: unit.toLowerCase() === "l" ? "L" : unit,
      returnNum: returnNum,
      returnUnit: returnUnit.toLowerCase() === "l" ? "L" : returnUnit,
      string: resultString,
    };
  };
}

module.exports = ConvertHandler;
