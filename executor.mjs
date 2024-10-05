export default class Executor {
    constructor(jsCode) {
      this.jsCode = jsCode;
    }
  
    execute() {
      console.log('--- Executing JavaScript Code ---');
      console.log(this.jsCode);
      eval(this.jsCode);  // Usa 'eval' para executar o código gerado.
    }
  }
  