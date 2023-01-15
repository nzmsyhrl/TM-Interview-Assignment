"use strict";
exports.__esModule = true;
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address(address) {
        this.tokenize(address);
    }
    Address.prototype.tokenize = function (address) {
        // regular expressions for each address component
        var aptNumberRegex = /No\s\d+/gi;
        var cityRegex = /(kuala terengganu|kuala lumpur|kajang|bangi|damansara|petaling jaya|puchong|subang jaya|cyberjaya|putrajaya|mantin|kuching|seremban)/gi;
        var stateRegex = /(selangor|terengganu|pahang|kelantan|melaka|pulau pinang|kedah|johor|perlis|sabah|sarawak)/gi;
        var postcodeRegex = /\b[0-9]{5}\b/g;
        var streetRegex = /(jalan|jln|lorong|persiaran)\s/gi;
        var temp = address;
        // match each component in the address string
        var match = aptNumberRegex.exec(temp);
        if (match) {
            this.aptNumber = match[0];
            temp = temp.replace(this.aptNumber, '');
        }
        match = cityRegex.exec(temp);
        if (match) {
            this.city = match[0];
            temp = temp.replace(this.city, '');
        }
        match = stateRegex.exec(temp);
        if (match) {
            this.state = match[0];
            temp = temp.replace(this.state, '');
        }
        match = postcodeRegex.exec(temp);
        if (match) {
            this.postcode = match[0];
            temp = temp.replace(this.postcode, '');
        }
        match = streetRegex.exec(temp);
        if (match) {
            this.street = match[0];
            temp = temp.replace(this.street, '');
        }
        // everything else is considered as section
        this.section = temp.replace(/[^a-zA-Z\s]/g, '').trim();
    };
    return Address;
}());
exports.Address = Address;
