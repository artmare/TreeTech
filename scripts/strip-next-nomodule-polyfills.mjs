import {promises as fs} from 'node:fs';
import path from 'node:path';

const root = process.cwd();

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

async function readUtf8(filePath) {
  return fs.readFile(filePath, 'utf8');
}

const getLegacyPolyfills = (files = []) =>
  files.filter((file) => file.endsWith('.js') && !file.endsWith('.module.js'));

function removeLegacyPolyfillsFromSource(source, polyfillFiles) {
  return source.replace(/("polyfillFiles"\s*:\s*)\[([\s\S]*?)\]/g, (match, prefix, body) => {
    const files = [...body.matchAll(/["']([^"']+\.js)["']/g)].map((entry) => entry[1]);
    const legacyFiles = getLegacyPolyfills(files);

    if (legacyFiles.length === 0) {
      return match;
    }

    legacyFiles.forEach((file) => polyfillFiles.add(file));
    return `${prefix}[]`;
  });
}

async function stripBuildOutput(baseDir, label) {
  if (!(await pathExists(baseDir))) {
    return null;
  }

  const polyfillFiles = new Set();
  let updatedManifestFiles = 0;
  let updatedJsManifestFiles = 0;
  let updatedHtmlFiles = 0;
  let updatedAssetFiles = 0;

  const buildManifestPaths = await listFilesByName(baseDir, 'build-manifest.json');

  for (const buildManifestPath of buildManifestPaths) {
    const buildManifest = JSON.parse(await readUtf8(buildManifestPath));
    const manifestPolyfills = getLegacyPolyfills(buildManifest.polyfillFiles ?? []);

    if (manifestPolyfills.length > 0) {
      manifestPolyfills.forEach((file) => polyfillFiles.add(file));
      buildManifest.polyfillFiles = [];
      await fs.writeFile(buildManifestPath, `${JSON.stringify(buildManifest, null, 2)}\n`);
      updatedManifestFiles += 1;
    }
  }

  const jsManifestPaths = [
    ...(await listFilesByName(baseDir, 'middleware-build-manifest.js')),
    ...(await listFilesByName(baseDir, '_buildManifest.js'))
  ];

  for (const jsManifestPath of jsManifestPaths) {
    const manifestSource = await readUtf8(jsManifestPath);
    const nextManifestSource = removeLegacyPolyfillsFromSource(manifestSource, polyfillFiles);

    if (nextManifestSource !== manifestSource) {
      await fs.writeFile(jsManifestPath, nextManifestSource);
      updatedJsManifestFiles += 1;
    }
  }

  if (polyfillFiles.size === 0) {
    return {
      label,
      polyfillCount: 0,
      updatedManifestFiles,
      updatedJsManifestFiles,
      updatedHtmlFiles,
      updatedAssetFiles
    };
  }

  const polyfillList = [...polyfillFiles];
  const polyfillNames = polyfillList.map((file) => escapeRegExp(file.replace(/\\/g, '/')));
  const chunkNames = polyfillList.map((file) => escapeRegExp(path.basename(file)));
  const polyfillPattern = new RegExp(
    `<script\\b(?=[^>]*(?:noModule|nomodule)\\b)(?=[^>]*src=["'][^"']*(?:${[
      ...polyfillNames,
      ...chunkNames
    ].join('|')})[^"']*["'])[^>]*><\\/script>`,
    'g'
  );

  for (const polyfill of polyfillList) {
    const relativePath = polyfill.replace(/\\/g, '/').split('/');
    const directPath = path.join(baseDir, ...relativePath);

    if (await pathExists(directPath)) {
      await fs.writeFile(directPath, '/* Legacy noModule polyfill stripped for strict CSP. */\n');
      updatedAssetFiles += 1;
    }

    const matchingAssets = await listFilesByName(baseDir, path.basename(polyfill));

    for (const assetPath of matchingAssets) {
      if (assetPath !== directPath) {
        await fs.writeFile(assetPath, '/* Legacy noModule polyfill stripped for strict CSP. */\n');
        updatedAssetFiles += 1;
      }
    }
  }

  const htmlFiles = await listFiles(baseDir, '.html');

  for (const htmlFile of htmlFiles) {
    const html = await readUtf8(htmlFile);
    const nextHtml = html.replace(polyfillPattern, '');

    if (nextHtml !== html) {
      await fs.writeFile(htmlFile, nextHtml);
      updatedHtmlFiles += 1;
    }
  }

  return {
    label,
    polyfillCount: polyfillList.length,
    updatedManifestFiles,
    updatedJsManifestFiles,
    updatedHtmlFiles,
    updatedAssetFiles
  };
}

const outputRoots = [
  [path.join(root, '.next'), '.next'],
  [path.join(root, '.vercel', 'output'), '.vercel/output'],
  ['/vercel/output', '/vercel/output']
];

const results = [];

for (const [outputRoot, label] of outputRoots) {
  const result = await stripBuildOutput(outputRoot, label);

  if (result) {
    results.push(result);
  }
}

if (results.length === 0) {
  console.log('No Next.js or Vercel build output found, skipping noModule polyfill strip.');
  process.exit(0);
}

for (const result of results) {
  console.log(
    `[${result.label}] Stripped ${result.polyfillCount} legacy noModule polyfill from ${result.updatedManifestFiles} JSON manifest file(s), ${result.updatedJsManifestFiles} JS manifest file(s), ${result.updatedHtmlFiles} HTML file(s), and ${result.updatedAssetFiles} asset file(s).`
  );
}
