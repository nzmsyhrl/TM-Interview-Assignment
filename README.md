# TM-Interview-Assignment
# Address Tokenization

This program is an example of how to parse an address string and extract its components (aptNumber, city, state, postcode, street, and section) using regular expressions.

# Prerequisites
Install Node.js and TypeScript on your machine. Note that TypeScript need to be installed globally. You can also install it by running the following command, “npm install -g typescript” . 

As for Node.js, make sure that you have the correct version of Node.js installed on your machine, check the version by running “node -v command” .

Place the following files and folders in the root of your project:
1.	Folder src containing index.ts, address.ts, FileSystem.ts, interfaces.ts and config.json
2.	Folder dist containing the generated .js files, config.json and cities.txt, states.txt and streets.txt

Ensure the file paths in the 'config.json' file in the src folder are correct and point to the correct location of the 'cities.txt', 'states.txt', and 'streets.txt' files.
# Running the program

1. Open a terminal and navigate to the root of the project
2. Run *tsc* to compile the TypeScript code to JavaScript
```
tsc
```
3. Run *node dist/index.js* to start the program
```
node dist/index.js
```
4. The program will prompt you to enter an address, enter your address and press enter
5. The program will print the extracted address components on the console

Reminder: Before running the program, please make sure that you have all the necessary files and folders in the root of the project and that the file paths in the 'config.json' file are correct and point to the correct location of the 'cities.txt', 'states.txt', and 'streets.txt' files.

You need to run *tsc* command to transpile the typescript files to javascript files, and then run the compiled javascript file using node command, which are located in the dist folder, that's why it is important to ensure that the dist folder is present before running the code.

```
tsc
```

# Conclusion

To summarize, the program is used to extract the address components (aptNumber, city, state, postcode, street, and section) from a given address using regular expressions. The program reads the necessary data (cities, states, and streets) from text files using the FileSystem class and the config.json file to determine the location of these files.

Overall, this program structure is a good start for a small-scale address extraction program, but it would benefit from more robust error handling and testing. Additionally, if the program were to be used in a production environment, it would be beneficial to implement a more efficient method for loading the data from the text files, such as using a database instead of reading from text files.