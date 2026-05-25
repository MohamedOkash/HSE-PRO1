const fs = require('fs');
const glob = require('glob');
const files = glob.sync('src/**/*.{js,jsx,ts,tsx}');
const keys = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /t\(['"`]?([^'"`]+?)['"`]?\)/g;
  let m;
  while ((m = regex.exec(content))) keys.add(m[1]);
}
const translations = require('./src/locales/translations.js').translations;
const langs = ['ar', 'en', 'ur'];
for (const lang of langs) {
  const existing = new Set(Object.keys(translations[lang] || {}));
  const missing = [...keys].filter(k => !existing.has(k)).sort();
  console.log('==', lang, 'missing', missing.length);
  if (missing.length) console.log(missing.join('\n'));
}
