export interface IAddress {
  aptNumber: string;
  city: string;
  state: string;
  postcode: string;
  street: string;
  section: string;
}

export interface IAddressParser {
  parse(address: string, dataProvider: IDataProvider): IAddress;
}

export interface IDataProvider {
  getCities(): string[];
  getStates(): string[];
  getStreets(): string[];
}

export interface IFileSystem {
  readFileSync(path: string): string;
}
