// Crudely strips out tags in a file and leaves the text content
const striptags = require('striptags');
const decode = require('decode-html');
const fs = require('fs');

const inputFile = process.argv[2];

if (!inputFile) {
	console.log("Usage: node tagstrip.js [filename]");
	process.exit(1);
}

const data = fs.readFileSync(inputFile, 'utf-8')

const res = striptags(data);
const recoded = decode(res);

// Replace some magic things that are not standardly replaced.
const final = striptags(recoded.replace(/&#13;/gi, ''));
const output = final.replace(/&nbsp;/gi, ' ');
const outputFile = inputFile.split('.')[0] + '.txt';

fs.writeFileSync('./' + outputFile, output);



