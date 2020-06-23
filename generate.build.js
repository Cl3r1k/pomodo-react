// DESCRIPTION: Take current version from package.json, update build from metadata.json, combine and save it

// const fs = require('fs');
const packageFile = require('./package.json');

const packageVersion = packageFile.version;

console.info('Incrementing build number...');
console.info('packageVersion: ', packageVersion);
