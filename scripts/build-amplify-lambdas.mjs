import { build } from 'esbuild';
import path from 'path';
import { mkdir } from 'fs/promises';

const root = process.cwd();
const outRoot = path.join(root, '.amplify-function-build');

const entries = [
  {
    name: 'convertPdfToYaml',
    entry: path.join(root, 'amplify/functions/convertPdfToYaml/index.ts'),
  },
  {
    name: 'recordTableDefAndStartKBIngestion',
    entry: path.join(root, 'amplify/functions/recordTableDefAndStartKBIngestion/index.ts'),
  },
  {
    name: 'configureProdDb',
    entry: path.join(root, 'amplify/functions/configureProdDb/index.ts'),
  },
  {
    name: 'addIamDirective',
    entry: path.join(root, 'amplify/functions/addIamDirectiveToAllAssets.ts'),
  },
];

for (const item of entries) {
  const outdir = path.join(outRoot, item.name);
  await mkdir(outdir, { recursive: true });
  await build({
    entryPoints: [item.entry],
    outfile: path.join(outdir, 'index.js'),
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'cjs',
    sourcemap: false,
    minify: false,
    logLevel: 'info',
    legalComments: 'none',
    banner: {
      js: '/* built for Amplify without Docker bundling */',
    },
  });
}

console.log('Built Amplify lambda bundles into', outRoot);
