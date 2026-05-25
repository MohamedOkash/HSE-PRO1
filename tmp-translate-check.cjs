const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(path.join(__dirname, 'src'));
const keys = new Set();
const regex = /\bt\(\s*(['"])((?:\\.|(?!\1).)*?)\1\s*\)/g;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = regex.exec(content))) {
    keys.add(m[2]);
  }
}
const translations = require(path.join(__dirname, 'src', 'locales', 'translations.js')).translations;
const langs = ['ar', 'en', 'ur'];
const keysList = [...keys].sort();
console.log('TOTAL_KEYS', keysList.length);
for (const lang of langs) {
  const existing = new Set(Object.keys(translations[lang] || {}));
  const missing = keysList.filter(k => !existing.has(k));
  console.log('==', lang, 'missing', missing.length);
  if (missing.length) console.log(missing.join('\n'));
}
