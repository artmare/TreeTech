import {promises as fs} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const nextDir = path.join(root, '.next');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir, extension, files = []) {
  const entries = await fs.readdir(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await listFiles(fullPath, extension, files);
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function listFilesByName(dir, fileName, files = []) {
  const entries = await fs.readdir(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await listFilesByName(fullPath, fileName, files);
    } else if (entry.isFile() && entry.name === fileName) {
      files.push(fullPath);
    }
  }

  return files;
}

if (!(await pathExists(nextDir))) {
  console.log('No Next.js build manifest found, skipping noModule polyfill strip.');
  process.exit(0);
}

const buildManifestPaths = await listFilesByName(nextDir, 'build-manifest.json');
const polyfillFiles = new Set();
let updatedManifestFiles = 0;

const getLegacyPolyfills = (files = []) =>
  files.filter((file) => file.endsWith('.js') && !file.endsWith('.module.js'));

for (const buildManifestPath of buildManifestPaths) {
  const buildManifest = JSON.parse(await fs.readFile(buildManifestPath, 'utf8'));
  const manifestPolyfills = getLegacyPolyfills(buildManifest.polyfillFiles ?? []);

  if (manifestPolyfills.length > 0) {
    manifestPolyfills.forEach((file) => polyfillFiles.add(file));
    buildManifest.polyfillFiles = [];
    await fs.writeFile(buildManifestPath, `${JSON.stringify(buildManifest, null, 2)}\n`);
    updatedManifestFiles += 1;
  }
}

const middlewareManifestPaths = await listFilesByName(nextDir, 'middleware-build-manifest.js');
let updatedMiddlewareManifestFiles = 0;

for (const middlewareManifestPath of middlewareManifestPaths) {
  const manifestSource = await fs.readFile(middlewareManifestPath, 'utf8');
  const nextManifestSource = manifestSource.replace(
    /("polyfillFiles"\s*:\s*)\[([\s\S]*?)\]/g,
    (match, prefix, body) => {
      const files = [...body.matchAll(/["']([^"']+\.js)["']/g)].map((entry) => entry[1]);
      const legacyFiles = getLegacyPolyfills(files);

      if (legacyFiles.length === 0) {
        return match;
      }

      legacyFiles.forEach((file) => polyfillFiles.add(file));
      return `${prefix}[]`;
    }
  );

  if (nextManifestSource !== manifestSource) {
    await fs.writeFile(middlewareManifestPath, nextManifestSource);
    updatedMiddlewareManifestFiles += 1;
  }
}

if (polyfillFiles.size === 0) {
  console.log('No legacy noModule polyfills found.');
  process.exit(0);
}

const polyfillList = [...polyfillFiles];
const polyfillNames = polyfillList.map((file) => escapeRegExp(file.replace(/\\/g, '/')));
const chunkNames = polyfillList.map((file) => escapeRegExp(path.basename(file)));
let updatedPolyfillAssetFiles = 0;

for (const polyfill of polyfillList) {
  const polyfillPath = path.join(nextDir, ...polyfill.replace(/\\/g, '/').split('/'));

  if (await pathExists(polyfillPath)) {
    await fs.writeFile(polyfillPath, '/* Legacy noModule polyfill stripped for strict CSP. */\n');
    updatedPolyfillAssetFiles += 1;
  }
}

const polyfillPattern = new RegExp(
  `<script\\b(?=[^>]*(?:noModule|nomodule)\\b)(?=[^>]*src=["'][^"']*(?:${[
    ...polyfillNames,
    ...chunkNames
  ].join('|')})[^"']*["'])[^>]*><\\/script>`,
  'g'
);

const serverDir = path.join(nextDir, 'server');
let updatedHtmlFiles = 0;

if (await pathExists(serverDir)) {
  const htmlFiles = await listFiles(serverDir, '.html');

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, 'utf8');
    const nextHtml = html.replace(polyfillPattern, '');

    if (nextHtml !== html) {
      await fs.writeFile(htmlFile, nextHtml);
      updatedHtmlFiles += 1;
    }
  }
}

console.log(
  `Stripped ${polyfillList.length} legacy noModule polyfill from ${updatedManifestFiles} build manifest file(s), ${updatedMiddlewareManifestFiles} middleware manifest file(s), ${updatedHtmlFiles} HTML file(s), and ${updatedPolyfillAssetFiles} asset file(s).`
);
