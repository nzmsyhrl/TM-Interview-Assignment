import * as fs from "fs";
import { IFileSystem } from "./interfaces";

export class FileSystem implements IFileSystem {
  readFileSync(path: string): string {
    return fs.readFileSync(path, "utf-8");
  }
}
