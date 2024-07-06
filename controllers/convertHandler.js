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
        throw new Error("Invalid number");
      }
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(result);
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    const unitRegex = /[a-zA-Z]+$/;
    const unitStr = input.match(unitRegex);

    if (!unitStr) {
      throw new Error("Invalid unit");
    }

    result = unitStr[0].toLowerCase();

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (validUnits.includes(result)) {
      return result;
    }

    throw new Error("Invalid unit");
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "l",
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
        result = "invalid unit";
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
