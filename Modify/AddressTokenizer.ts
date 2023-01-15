import * as fse from "fs-extra";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter an address: ", (address) => {
  try {
    const addr = new Address(address);
    console.log(addr.getAddressComponents());
  } catch (err) {
    console.error(err);
    rl.question(
      "Invalid address, please enter a valid address: ",
      (address) => {
        const addr = new Address(address);
        console.log(addr.getAddressComponents());
        rl.close();
      }
    );
  }
});

class Address {
  private apt: string;
  private section: string;
  private postcode: string;
  private street: string;
  private city: string;
  private state: string;

  constructor(address: string) {
    this.tokenize(address);
  }

  private async tokenize(address: string) {
    // Pre-processing the address
    address = address.toLowerCase().replace(/\s+/g, " ").trim();

    // Match apt using regular expression
    const aptRegex = /^(no\s)?(\d+)/;
    const aptMatch = address.match(aptRegex);
    if (aptMatch) {
      this.apt = aptMatch[0];
      address = address.replace(aptRegex, "");
    }

    // Read the external files and get the list of cities, states and streets
    const cities = await getCities();
    const states = await getStates();
    const streets = await getStreets();

    // Match city, state, and postcode using regular expressions
    const cityRegex = new RegExp(cities.join("|"));
    const cityMatch = address.match(cityRegex);
    if (cityMatch) {
      this.city = cityMatch[0];
      address = address.replace(cityRegex, "");
    }

    const stateRegex = new RegExp(states.join("|"));
    const stateMatch = address.match(stateRegex);
    if (stateMatch) {
      this.state = stateMatch[0];
      address = address.replace(stateRegex, "");
    }

    const postcodeRegex = /\d{5}/;
    const postcodeMatch = address.match(postcodeRegex);
    if (postcodeMatch) {
      this.postcode = postcodeMatch[0];
      address = address.replace(postcodeRegex, "");
    }

    // Match street using regular expression
    const streetRegex = new RegExp(streets.join("|"));
    const streetMatch = address.match(streetRegex);
    if (streetMatch) {
      this.street = streetMatch[0];
      address = address.replace(streetRegex, "");
    }

    // Remaining text is considered as section
    this.section = address.trim();
  }

  public getAddressComponents() {
    let components = {};
    if (this.apt) components["apt"] = this.apt.toUpperCase();
    if (this.section) components["section"] = this.section.toUpperCase();
    if (this.postcode) components["postcode"] = this.postcode.toUpperCase();
    if (this.city) components["city"] = this.city.toUpperCase();
    if (this.state) components["state"] = this.state.toUpperCase();
    if (this.street) components["street"] = this.street.toUpperCase();
    return components;
  }
}

// Asynchronous function to read the list of cities from an external file
async function getCities(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./cities.txt", "utf-8");
    return data.split("\n").map((city) => city.trim());
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Asynchronous function to read the list of states from an external file
async function getStates(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./states.txt", "utf-8");
    return data.split("\n").map((state) => state.trim());
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Asynchronous function to read the list of streets from an external file
async function getStreets(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./streets.txt", "utf-8");
    return data.split("\n").map((street) => street.trim());
  } catch (err) {
    console.error(err);
    return [];
  }
}
