// DESCRIPTION: Take the current version from the 'package.json', update build from 'metadata.json', combine it and save

import { readFile, writeFile } from 'fs';
import { safeJsonParse } from './utils/common';
import packageFile from './package.json';

type TMetadata = {
  build: string;
  version: string;
};

function isTMetadataGuard(obj: unknown): obj is TMetadata {
  return 'build' in (obj as TMetadata) && 'version' in (obj as TMetadata);
}

const packageVersion = packageFile.version;

readFile('metadata.json', (err, content) => {
  if (err) throw err;

  const parsedJson = safeJsonParse<TMetadata>(isTMetadataGuard)(
    content.toString()
  );

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
