import { readFileSync, writeFileSync } from 'fs';

const path = 'assets/download-archive.json';
const archive = JSON.parse(readFileSync(path, 'utf8'));
archive.files = archive.files || {};

const response = await fetch('https://api.github.com/repos/Dalgorak/App-Art.cloud/releases/tags/apks-v1', {
    headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'app-art-cloud'
    }
});

if (!response.ok) {
    console.error('GitHub API ' + response.status);
    process.exit(1);
}

const release = await response.json();
for (const asset of release.assets || []) {
    const previous = archive.files[asset.name] || 0;
    archive.files[asset.name] = Math.max(previous, asset.download_count || 0);
}

const names = Object.keys(archive.files).sort();
const files = {};
for (const name of names) files[name] = archive.files[name];
archive.files = files;

writeFileSync(path, JSON.stringify(archive, null, 2) + '\n');
console.log(JSON.stringify(archive.files, null, 2));
