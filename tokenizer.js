export default class Tokenizer {
    constructor(code) {
      this.code = code;
      this.tokens = [];
    }
  
    tokenize() {
      const regexPatterns = {
        variableDeclaration: /^(int|float|string|boolean)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+);$/, // Exemplo: int var = 10;
        consoleLog: /print\((.+)\)/, // print(expression)
        classDeclaration: /^([A-Z][a-zA-Z0-9]*)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*new\s+([A-Z][a-zA-Z0-9_]*)\(\);$/, // Classe Nome = new Nome();
        importStatement:/use\s+([a-zA-Z_][a-zA-Z0-9_/]*)\s*;$/ // use Namespace/NomeDaClasse;
      };
  
      const lines = this.code.split('\n');
  
      lines.forEach(line => {
        line = line.trim();
  
        if (regexPatterns.variableDeclaration.test(line)) {
          const match = line.match(regexPatterns.variableDeclaration);
          this.tokens.push({
            type: 'variableDeclaration',
            varType: match[1],
            name: match[2],
            value: match[3]
          });
        } else if (regexPatterns.consoleLog.test(line)) {
          const match = line.match(regexPatterns.consoleLog);
          this.tokens.push({
            type: 'consoleLog',
            expression: match[1]
          });
        } else if (regexPatterns.classDeclaration.test(line)) {
          const match = line.match(regexPatterns.classDeclaration);
          this.tokens.push({
            type: 'classDeclaration',
            className: match[1],
            instanceName: match[2],
            constructorClass: match[3]
          });
        } else if (regexPatterns.importStatement.test(line)) {
          const match = line.match(regexPatterns.importStatement);
          this.tokens.push({
            type: 'importStatement',
            importPath: match[1]
          });
        }
      });
  
      return this.tokens;
    }
  }
  