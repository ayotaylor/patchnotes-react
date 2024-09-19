const fs = require('fs-extra');
const path = require('path');

const sharedDir = path.join(__dirname, 'shared');
const webSharedDir = path.join(__dirname, 'web', 'src', 'shared');
const mobileSharedDir = path.join(__dirname, 'mobile', 'src', 'shared');

function syncShared() {
  fs.removeSync(webSharedDir);
  fs.removeSync(mobileSharedDir);
  fs.copySync(sharedDir, webSharedDir);
  fs.copySync(sharedDir, mobileSharedDir);
  console.log('Shared code synced to web and mobile projects');
}

syncShared();

if (process.argv.includes('--watch')) {
  fs.watch(sharedDir, { recursive: true }, (eventType, filename) => {
    console.log(`Changes detected in shared/${filename}`);
    syncShared();
  });
  console.log('Watching for changes in shared directory...');
}