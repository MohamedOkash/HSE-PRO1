const fs = require('fs');
const path = require('path');
const keys = [
  'actions','active','all','approval','approved','cancel','delete','edit','location','lostDays','manageAllPermits','newPermit','noPermits','noResults','open','pending','permit','permitIssuance','readyForToday','rejected','requester','search','sortBy','status','total','type','welcomeBack'
];
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    const full = path.join(dir, name);
    if (name.startsWith('.')) continue;
    if (full.includes('node_modules')) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|jsx|ts|tsx)$/.test(name)) files.push(full);
  }
}
walk(path.join(__dirname, 'src'));
for (const key of keys) {
  console.log('=== KEY', key);
  const pattern = new RegExp("\\bt\\(\\s*['\"][^'\"]*" + key.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&') + "[^'\"]*['\"]\\s*\\)");
  let found = false;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (pattern.test(content)) {
      found = true;
      const lines = content.split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (pattern.test(line)) console.log(`${path.relative(__dirname, file)}:${idx+1}: ${line.trim()}`);
      });
    }
  }
  if (!found) console.log('  (not found via direct t(key) pattern)');
}
