"use strict";
exports.__esModule = true;
exports.Address = void 0;
var fs = require("fs");
var Address = /** @class */ (function () {
    function Address(address) {
        this.loadData();
        this.tokenize(address);
    }
    //if the cities, states and streets have a bigger data, asynchronous method should be applied
    // to read them asynchronously
    Address.prototype.loadData = function () {
        //console.log("Loading data from text file ...");
        try {
            // read the data from the .txt file
            // read the data from the cities.txt file
            var citiesData = fs.readFileSync("cities.txt", "utf8");
            // read the data from the states.txt file
            var statesData = fs.readFileSync("states.txt", "utf8");
            // read the data from the streets.txt file
            var streetsData = fs.readFileSync("streets.txt", "utf8");
            // split the data by newline to get an array of strings
            this.cities = citiesData.split("\n");
            this.states = statesData.split("\n");
            this.streets = streetsData.split("\n");
            //console.log("Data loaded successfully");
        }
        catch (err) {
            console.error(err);
        }
    };
    Address.prototype.tokenize = function (address) {
        // regular expressions for each address component
        var aptNumberRegex = /^(no\s)?(\d+)/gi;
        var cityRegex = new RegExp("(".concat(this.cities.join("|"), ")"), "gi");
        var stateRegex = new RegExp("(".concat(this.states.join("|"), ")"), "gi");
        var postcodeRegex = /\b[0-9]{5}\b/g;
        var streetRegex = new RegExp("(".concat(this.streets.join("|"), ")"), "gi");
        var temp = address;
        // match each component in the address string
        //console.log("matching aptNumber ...");
        var match = aptNumberRegex.exec(temp);
        if (match) {
            this.aptNumber = match[0];
            temp = temp.replace(this.aptNumber, "");
        }
        match = cityRegex.exec(temp);
        if (match) {
            this.city = match[0];
            temp = temp.replace(this.city, "");
        }
        match = stateRegex.exec(temp);
        if (match) {
            this.state = match[0];
            temp = temp.replace(this.state, "");
        }
        match = postcodeRegex.exec(temp);
        if (match) {
            this.postcode = match[0];
            temp = temp.replace(this.postcode, "");
        }
        match = streetRegex.exec(temp);
        if (match) {
            this.street = match[0];
            temp = temp.replace(this.street, "");
        }
        // everything else is considered as section
        this.section = temp.replace(/[^a-zA-Z\s]/g, "").trim();
    };
    return Address;
}());
exports.Address = Address;
