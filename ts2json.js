
// var fs = require('fs');
var TypeScript = require('typescript');
// Get ts and TypeScript objects
// eval(String(fs.readFileSync(__dirname + '/typescript.js')));
var fs = require('fs')

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

const filePath = process.argv[2];
console.log('reading:', filePath);
fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) throw err;

  source = String(data);
  const sc = TypeScript.createSourceFile('x.ts', source, TypeScript.ScriptTarget.Latest, true)

  let indent = 0;
  function print(node) {
    const kind = TypeScript.SyntaxKind[node.kind];
    if (kind === 'ImportDeclaration') console.log(node);
    // console.log(new Array(indent + 1).join(' ') + kind, node.escapedText);
    indent++;
    TypeScript.forEachChild(node, print);
    indent--;
  }

  print(sc);
});

