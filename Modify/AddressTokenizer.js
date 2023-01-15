"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fse = require("fs-extra");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Please enter an address: ", function (address) {
    try {
        var addr = new Address(address);
        console.log(addr.getAddressComponents());
    }
    catch (err) {
        console.error(err);
        rl.question("Invalid address, please enter a valid address: ", function (address) {
            var addr = new Address(address);
            console.log(addr.getAddressComponents());
            rl.close();
        });
    }
});
var Address = /** @class */ (function () {
    function Address(address) {
        this.tokenize(address);
    }
    Address.prototype.tokenize = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var aptRegex, aptMatch, cities, states, streets, cityRegex, cityMatch, stateRegex, stateMatch, postcodeRegex, postcodeMatch, streetRegex, streetMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Pre-processing the address
                        address = address.toLowerCase().replace(/\s+/g, " ").trim();
                        aptRegex = /^(no\s)?(\d+)/;
                        aptMatch = address.match(aptRegex);
                        if (aptMatch) {
                            this.apt = aptMatch[0];
                            address = address.replace(aptRegex, "");
                        }
                        return [4 /*yield*/, getCities()];
                    case 1:
                        cities = _a.sent();
                        return [4 /*yield*/, getStates()];
                    case 2:
                        states = _a.sent();
                        return [4 /*yield*/, getStreets()];
                    case 3:
                        streets = _a.sent();
                        cityRegex = new RegExp(cities.join("|"));
                        cityMatch = address.match(cityRegex);
                        if (cityMatch) {
                            this.city = cityMatch[0];
                            address = address.replace(cityRegex, "");
                        }
                        stateRegex = new RegExp(states.join("|"));
                        stateMatch = address.match(stateRegex);
                        if (stateMatch) {
                            this.state = stateMatch[0];
                            address = address.replace(stateRegex, "");
                        }
                        postcodeRegex = /\d{5}/;
                        postcodeMatch = address.match(postcodeRegex);
                        if (postcodeMatch) {
                            this.postcode = postcodeMatch[0];
                            address = address.replace(postcodeRegex, "");
                        }
                        streetRegex = new RegExp(streets.join("|"));
                        streetMatch = address.match(streetRegex);
                        if (streetMatch) {
                            this.street = streetMatch[0];
                            address = address.replace(streetRegex, "");
                        }
                        // Remaining text is considered as section
                        this.section = address.trim();
                        return [2 /*return*/];
                }
            });
        });
    };
    Address.prototype.getAddressComponents = function () {
        var components = {};
        if (this.apt)
            components["apt"] = this.apt.toUpperCase();
        if (this.section)
            components["section"] = this.section.toUpperCase();
        if (this.postcode)
            components["postcode"] = this.postcode.toUpperCase();
        if (this.city)
            components["city"] = this.city.toUpperCase();
        if (this.state)
            components["state"] = this.state.toUpperCase();
        if (this.street)
            components["street"] = this.street.toUpperCase();
        return components;
    };
    return Address;
}());
// Asynchronous function to read the list of cities from an external file
function getCities() {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fse.readFile("./cities.txt", "utf-8")];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.split("\n").map(function (city) { return city.trim(); })];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Asynchronous function to read the list of states from an external file
function getStates() {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fse.readFile("./states.txt", "utf-8")];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.split("\n").map(function (state) { return state.trim(); })];
                case 2:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Asynchronous function to read the list of streets from an external file
function getStreets() {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fse.readFile("./streets.txt", "utf-8")];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.split("\n").map(function (street) { return street.trim(); })];
                case 2:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
