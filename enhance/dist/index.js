"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const address_1 = require("./address");
const config_json_1 = __importDefault(require("./config.json"));
const FileSystem_1 = require("./FileSystem");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const fileSystem = new FileSystem_1.FileSystem();
rl.question("Please enter a your address: ", (address) => {
    const addressComponents = new address_1.Address(address, fileSystem, config_json_1.default);
    if (addressComponents.aptNumber) {
        console.log(`Apt Number: ${addressComponents.aptNumber}`);
    }
    if (addressComponents.city) {
        console.log(`City: ${addressComponents.city}`);
    }
    if (addressComponents.state) {
        console.log(`State: ${addressComponents.state}`);
    }
    if (addressComponents.postcode) {
        console.log(`Postcode: ${addressComponents.postcode}`);
    }
    if (addressComponents.street) {
        console.log(`Street: ${addressComponents.street}`);
    }
    if (addressComponents.section) {
        console.log(`Section: ${addressComponents.section}`);
    }
    rl.close();
});
//# sourceMappingURL=index.js.map