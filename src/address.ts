import { IFileSystem } from "./interfaces";

export class Address {
  aptNumber: string = "";
  city: string = "";
  state: string = "";
  postcode: string = "";
  street: string = "";
  section: string = "";

  private cities: string[] = [];
  private states: string[] = [];
  private streets: string[] = [];

  constructor(address: string,private fileSystem: IFileSystem, config: any) {
    this.loadData(config);
    this.tokenize(address.trim());
  }
  //if the cities, states and streets have a bigger data, asynchronous method should be applied
  // to read them asynchronously

  private loadData(config: any
  ) {
    //console.log("Loading data from text file ...");
    try {
      // read the data from the .txt file
      // read the data from the cities.txt file
      const citiesData = this.fileSystem.readFileSync(config.citiesFile || 'cities.txt');
      // read the data from the states.txt file
      const statesData = this.fileSystem.readFileSync(config.statesFile || 'states.txt');
      // read the data from the streets.txt file
      const streetsData = this.fileSystem.readFileSync(config.streetsFile || 'streets.txt');

      // split the data by newline to get an array of strings
      this.cities = citiesData.split("\n");
      this.states = statesData.split("\n");
      this.streets = streetsData.split("\n");
      //console.log("Data loaded successfully");
    } catch (err) {
      console.error(err);
    }
  }

  private tokenize(address: string) {
    // regular expressions for each address component
    const aptNumberRegex = /^(no\s)?(\d+)/gi;
    const cityRegex = new RegExp(`(${this.cities.join("|")})`, "gi");
    const stateRegex = new RegExp(`(${this.states.join("|")})`, "gi");
    const postcodeRegex = /\b[0-9]{5}\b/g;
    const streetRegex = new RegExp(`(${this.streets.join("|")})([\\s\\d\\w-]+)?`, "gi");

    let temp = address;

    // match each component in the address string
    //console.log("matching aptNumber ...");
    let match = aptNumberRegex.exec(temp);
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
    this.section = temp.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  }
}
