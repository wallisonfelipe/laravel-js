#!/usr/bin/env node --input-type=module
import fs from 'fs';
import Tokenizer from "./tokenizer.js";
import Parser from "./parser.js";
import Executor from './executor.mjs';

function compileAndRun(lsCode) {
    const tokenizer = new Tokenizer(lsCode);
    const tokens = tokenizer.tokenize();
    
    const parser = new Parser(tokens);
    const jsCode = parser.parse();
    
    // Save the transpiled code to 'output.mjs'
    fs.writeFileSync("output.mjs", jsCode, "utf8");
    console.log("Transpiled code saved to 'output.mjs'");

    // const executor = new Executor(jsCode);
    // executor.execute();
}

const lsCode = fs.readFileSync("app.ls", "utf8");

// Compile and run the code
compileAndRun(lsCode);
