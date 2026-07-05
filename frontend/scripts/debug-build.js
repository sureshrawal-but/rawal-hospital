const { execSync } = require('child_process');
try {
  const output = execSync('npx next build 2>&1', { cwd: __dirname + '/..', encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  process.stdout.write(output);
} catch (e) {
  const output = (e.stdout || '') + '\n' + (e.stderr || '');
  const lines = output.split('\n');
  const last80 = lines.slice(-80).join('\n');
  console.log('=== BUILD FAILED - LAST 80 LINES ===');
  console.log(last80);
  const errorLines = lines.filter(l => /error|Error|SyntaxError|Failed|failed/.test(l));
  if (errorLines.length > 0) {
    console.log('=== ERROR LINES ===');
    errorLines.slice(-30).forEach(l => console.log(l));
  }
  process.exit(1);
}
