import * as readline from "readline";
import { Address } from "./address";
import config from "./config.json";
import { FileSystem } from "./FileSystem";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileSystem = new FileSystem();

rl.question("Please enter a your address: ", (address: string) => {
  const addressComponents = new Address(address, fileSystem, config);
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
