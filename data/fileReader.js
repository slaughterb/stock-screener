
const fs = require('fs');

// parse nasdaq listings of stocks and return array of tickers
function processNasdaqFile(inFile) {
	var lines = fs.readFileSync(inFile, 'utf8').toString().split('\n');
	var symbols = [];
	for (var l in lines) {
		const line = lines[l];
		symbols.push(line.substring(0, line.indexOf('|')));
	}
	return symbols;
}

const allSymbols = processNasdaqFile('./nasdaqlisted.txt');
const otherSymbols = processNasdaqFile('./otherlisted.txt');


// write all extracted tickers into new file nasdaqtickers.txt
function writeSymbols() {
	var outFile = fs.createWriteStream('other_listed_tickers.txt');
	for (i in otherSymbols) {
		if (!otherSymbols[i].includes('.') && !otherSymbols[i].includes('$'))
			outFile.write(otherSymbols[i] + '\n');
	}
	outFile.end();
}


// read from nasdaq tickers and return an array of all listed tickers gathered:
function getNasdaqTickers(inFile) {
	var lines = fs.readFileSync(inFile, 'utf8').toString().split('\n');
	var symbols = [];
	for (var l in lines) {
		symbols.push(lines[l]);
	}
	return symbols;
}

writeSymbols();

