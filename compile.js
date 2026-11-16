const fs = require('fs');
const solc = require('solc');
function read(f){ return fs.readFileSync(f,'utf8'); }
const input = {
  language: 'Solidity',
  sources: {
    'WOPKW.sol': { content: read('WOPKW.sol') },
    'OPKWPair.sol': { content: read('OPKWPair.sol') },
    'OPKWFactory.sol': { content: read('OPKWFactory.sol') },
    'OPKWRouter.sol': { content: read('OPKWRouter.sol') }, 'TestToken.sol': { content: read('TestToken.sol') },
  },
  settings: { outputSelection: { '*': { '*': ['abi','evm.bytecode'] } } }
};
function findImports(p){ try{ return { contents: read(p.replace('./','')) }; }catch(e){ return { error: 'Not found '+p }; } }
const out = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
if(out.errors){ out.errors.forEach(e=>console.log(e.severity+': '+e.formattedMessage)); }
else { console.log('NO ERRORS'); }
if(out.contracts){ fs.writeFileSync('compiled.json', JSON.stringify(out.contracts)); console.log('SAVED compiled.json'); Object.keys(out.contracts).forEach(f=>{ console.log(f+': '+Object.keys(out.contracts[f]).join(', ')); }); }
