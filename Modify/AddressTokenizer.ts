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
    console.log("Original address: ", address);
    address = address.toLowerCase().replace(/\s+/g, " ").trim();
    console.log("Preprocessed address: ", address);

    // Match apt using regular expression
    const aptRegex = /^(no\s)?(\d+)/;
    const aptMatch = address.match(aptRegex);
    console.log(aptMatch); // it should print the matched apt number
    if (aptMatch) {
      this.apt = aptMatch[0];
      address = address.replace(aptRegex, "");
    }

    // Read the external files and get the list of cities, states and streets
    const cities = await getCities();
    const states = await getStates();
    const streets = await getStreets();

    // Match postcode using regular expressions
    const postcodeRegex = /\d{4}/;
    const postcodeMatch = address.match(postcodeRegex);
    console.log(postcodeMatch);
    if (postcodeMatch) {
      this.postcode = postcodeMatch[0];
      address = address.replace(postcodeRegex, "");
    }

    // Match city, state using regular expressions
    const cityStateRegex = new RegExp(
      cities.join("|") + "|" + states.join("|")
    );
    const cityStateMatch = address.match(cityStateRegex);
    console.log(cityStateMatch)
    if (cityStateMatch) {
      // check if city or state
      if (cities.includes(cityStateMatch[0])) {
        this.city = cityStateMatch[0];
      } else {
        this.state = cityStateMatch[0];
      }
      address = address.replace(cityStateRegex, "");
    }

    // Match street using regular expression
    const streetRegex = new RegExp(streets.join("|"));
    const streetMatch = address.match(streetRegex);
    console.log(streetMatch)
    if (streetMatch) {
      this.street = streetMatch[0];
      address = address.replace(streetRegex, "");
    }

    // Remaining text is considered as section
    this.section = address.trim();
  }

  public getAddressComponents() {
    let components = {};
    console.log(components);

    if (this.apt) components["apt"] = this.apt.toUpperCase();
    if (this.section) components["section"] = this.section.toUpperCase();
    if (this.postcode) components["postcode"] = this.postcode.toUpperCase();
    if (this.city) components["city"] = this.city.toUpperCase();
    if (this.state) components["state"] = this.state.toUpperCase();
    if (this.street) components["street"] = this.street.toUpperCase();
    if (!this.apt || !this.postcode || !this.city || !this.state) {
      console.log(
        "Some of the address components are missing, please check and correct the input address."
      );
    }
    console.log(components);
    return components;
  }
}

// Asynchronous function to read the list of cities from an external file
async function getCities(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./cities.txt", "utf-8");
    console.log("Cities data: ", data.toString());
    // Parse the data and return the list of cities
    return data.split("\n");
  } catch (err) {
    console.error(err);
    throw new Error(`Error reading cities from external file: ${err}`);
  }
}

// Asynchronous function to read the list of states from an external file
async function getStates(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./states.txt", "utf-8");
    // Parse the data and return the list of states
    return data.split("\n");
  } catch (err) {
    console.error(err);
    throw new Error(`Error reading states from external file: ${err}`);
  }
}

// Asynchronous function to read the list of streets from an external file
async function getStreets(): Promise<string[]> {
  try {
    // Read the external file using fs.promises
    const data = await fse.readFile("./streets.txt", "utf-8");
    // Parse the data and return the list of streets
    return data.split("\n");
  } catch (err) {
    console.error(err);
    throw new Error(`Error reading streets from external file: ${err}`);
  }
}
