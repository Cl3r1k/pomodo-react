// DESCRIPTION: Take current version from package.json, update build from metadata.json, combine it and save

const fs = require('fs');
const packageFile = require('./package.json');

const packageVersion = packageFile.version;

fs.readFile('src/metadata.json', (err, content) => {
  if (err) throw err;

  const metadata = JSON.parse(content);

  metadata.build = `000${+metadata.build + 1}`.slice(-4);
  metadata.version = `${packageVersion}.${metadata.build}`;

  fs.writeFile('src/metadata.json', JSON.stringify(metadata), errWrite => {
    if (errWrite) throw errWrite;

    console.info(
      '\x1b[36m',
      'Build version set to: ',
      '\x1b[32m',
      metadata.version,
      '\x1b[0m'
    );
  });
});

// Idea took from here `https://github.com/facebook/create-react-app/issues/1917#issuecomment-291468057`
