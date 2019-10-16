const request = require('request');
const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
    .option('file', {
        alias: 'f',
        description: 'Path to a file with request',
        type: 'string',
    })
    .option('number', {
        alias: 'n',
        description: 'Amount of parallel requests',
        type: 'number',
    })
    .help()
    .alias('help', 'h')
    .argv;

let requestOptions = JSON.parse(fs.readFileSync(argv.file));

for (let i = 0; i < argv.number; i++) {
    request(requestOptions, function (error, response, body) {
        log('Done with #' + i + ' (' + process.hrtime() + ')');

        if (error) {
            log(error);
        } else {
            log(response.statusCode);
            log(body);
        }
    });
}

function log(message) {
    console.log(message);
}