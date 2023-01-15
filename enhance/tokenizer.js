"use strict";
exports.__esModule = true;
exports.tokenizeAddress = void 0;
function tokenizeAddress(address) {
    // regular expressions for each address component
    var aptNumberRegex = /No\s\d+/gi;
    var cityRegex = /(kuala terengganu|kuala lumpur|kajang|bangi|damansara|petaling jaya|puchong|subang jaya|cyberjaya|putrajaya|mantin|kuching|seremban)/gi;
    var stateRegex = /(selangor|terengganu|pahang|kelantan|melaka|pulau pinang|kedah|johor|perlis|sabah|sarawak)/gi;
    var postcodeRegex = /\b[0-9]{5}\b/g;
    var streetRegex = /(jalan|jln|lorong|persiaran)\s/gi;
    var aptNumber = "";
    var city = "";
    var state = "";
    var postcode = "";
    var street = "";
    var section = "";
    var temp = address;
    // match each component in the address string
    var match = aptNumberRegex.exec(temp);
    if (match) {
        aptNumber = match[0];
        temp = temp.replace(aptNumber, "");
    }
    match = cityRegex.exec(temp);
    if (match) {
        city = match[0];
        temp = temp.replace(city, "");
    }
    match = stateRegex.exec(temp);
    if (match) {
        state = match[0];
        temp = temp.replace(state, "");
    }
    match = postcodeRegex.exec(temp);
    if (match) {
        postcode = match[0];
        temp = temp.replace(postcode, "");
    }
    match = streetRegex.exec(temp);
    if (match) {
        street = match[0];
        temp = temp.replace(street, "");
    }
    // everything else is considered as section
    section = temp.replace(/[^a-zA-Z\s]/g, "").trim();
    return {
        aptNumber: aptNumber,
        city: city,
        state: state,
        postcode: postcode,
        street: street,
        section: section
    };
}
exports.tokenizeAddress = tokenizeAddress;
