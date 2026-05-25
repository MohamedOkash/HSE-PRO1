const fs = require('fs');
const path = require('path');
const files = [
  path.join(process.cwd(),'src','lang','translations.js'),
  path.join(process.cwd(),'src','locales','translations.js')
];
for(const file of files){
  const txt = fs.readFileSync(file,'utf8');
  const m = txt.match(/export const translations =\s*\{([\s\S]*)\};\s*$/m);
  if(!m){
    console.error('no match', file);
    continue;
  }
  const script = 'const translations = {' + m[1] + '}; module.exports = translations;';
  const translations = eval(script);
  console.log('FILE', file);
  for(const lang of Object.keys(translations)){
    const keys = Object.keys(translations[lang]);
    console.log(' ', lang, keys.length);
  }
  const allKeys = new Set();
  for(const lang of Object.keys(translations)){
    Object.keys(translations[lang]).forEach(k => allKeys.add(k));
  }
  console.log(' totalKeys', allKeys.size);
  for(const lang of Object.keys(translations)){
    const keys = new Set(Object.keys(translations[lang]));
    const missing = [...allKeys].filter(k => !keys.has(k));
    if(missing.length) console.log(' MISSING in', lang, missing.length, missing.slice(0,20));
  }
  console.log('---');
}
