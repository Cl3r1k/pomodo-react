// DESCRIPTION: Take the current version from the 'package.json', update build from 'metadata.json', combine it and save

import { readFile, writeFile } from 'fs';
import { safeJsonParse, safeJsonParseObject } from './utils/common';
import packageFile from './package.json';

type TMetadata = {
  build: string;
  version: string;
};

function isTMetadata(obj: any): obj is TMetadata {
  return 'build' in obj && 'version' in obj;
}

const packageVersion = packageFile.version;

readFile('metadata.json', (err, content) => {
  if (err) throw err;

  // **** To delete ****
  if (!packageVersion) {
    const content = '{"build":"1576","version":"0.2.0.1576"}';

    const parsedJson = safeJsonParseObject<TMetadata>(content);
    console.info('parsedJson: ', parsedJson);

    return;
  }
  // **** End to delete ****

  const parsedJson = safeJsonParse(isTMetadata)(content.toString());

  if (!parsedJson.hasError) {
    const { build } = parsedJson.parsed;

    const newBuild = `000${+build + 1}`.slice(-4);

    const metadata = {
      build: newBuild,
      version: `${packageVersion}.${newBuild}`,
    };

    writeFile('metadata.json', JSON.stringify(metadata), errWrite => {
      if (errWrite) throw errWrite;

      console.info(
        '\x1b[36m',
        'Build version set to: ',
        '\x1b[32m',
        metadata.version,
        '\x1b[0m'
      );
    });
  }
});

// The idea took from here `https://github.com/facebook/create-react-app/issues/1917#issuecomment-291468057`
