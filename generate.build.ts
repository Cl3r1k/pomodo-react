// TODO: Type all disabled errors
/* eslint-disable @typescript-eslint/ban-ts-comment */
// DESCRIPTION: Take current version from package.json, update build from metadata.json, combine it and save

import { readFile, writeFile } from 'fs';
import { safeJsonParse } from './utils';
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

  // @ts-ignore
  const parsedJson = safeJsonParse(isTMetadata)(content);

  if (!parsedJson.hasError) {
    const metadata: TMetadata = parsedJson.parsed;

    metadata.build = `000${+metadata.build + 1}`.slice(-4);
    metadata.version = `${packageVersion}.${metadata.build}`;

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

// Idea took from here `https://github.com/facebook/create-react-app/issues/1917#issuecomment-291468057`
