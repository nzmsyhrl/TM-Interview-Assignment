"use strict";
exports.__esModule = true;
var readline = require("readline");
var address_1 = require("./address");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Please enter a your address: ", function (address) {
    var addressComponents = new address_1.Address(address);
    if (addressComponents.aptNumber) {
        console.log("Apt Number: ".concat(addressComponents.aptNumber));
    }
    if (addressComponents.city) {
        console.log("City: ".concat(addressComponents.city));
    }
    if (addressComponents.state) {
        console.log("State: ".concat(addressComponents.state));
    }
    if (addressComponents.postcode) {
        console.log("Postcode: ".concat(addressComponents.postcode));
    }
    if (addressComponents.street) {
        console.log("Street: ".concat(addressComponents.street));
    }
    if (addressComponents.section) {
        console.log("Section: ".concat(addressComponents.section));
    }
    rl.close();
});
