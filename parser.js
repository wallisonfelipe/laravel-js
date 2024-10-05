// Updated import regex pattern and Parser class
import fs from 'fs';

export default class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.output = '"use strict";\n\n'; // Forces strict mode for ESM
  }

  parse() {
    this.tokens.forEach(token => {
      if (token.type === 'variableDeclaration') {
        this.output += `let ${token.name} = ${token.value};\n`;
      } else if (token.type === 'consoleLog') {
        this.output += `console.log(${token.expression});\n`;
      } else if (token.type === 'classDeclaration') {
        this.output += `const ${token.instanceName} = new ${token.constructorClass}();\n`;
      } else if (token.type === 'importStatement') {
        // Normalize import path
        const importPath = token.importPath
          .replace(/\\/g, '/'); // Convert to lowercase for case insensitivity
          
        // Adjust the import statement format
        const className = importPath.split('/').pop(); // Get the class name from the path
        this.output += `import ${className} from "./${importPath}.js";\n`;
      }
    });

    return this.output;
  }
}
