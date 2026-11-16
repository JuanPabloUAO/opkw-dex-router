const fs=require('fs');
const d=JSON.parse(fs.readFileSync('deployed.json','utf8'));
const t=JSON.parse(fs.readFileSync('testtoken.json','utf8'));
const pr=JSON.parse(fs.readFileSync('pair.json','utf8'));
const md='# OPKW DEX Router\n\nPancakeSwap-style DEX Router for OPKW L2 (Chain ID 20270).\n\n## Live Contracts - OPKW L2 (20270)\n\n- WOPKW: '+d.wopkw+'\n- Factory: '+d.factory+'\n- Router: '+d.router+'\n- Test Token WOLFTEST: '+t.testToken+'\n- Pair WOPKW/WOLFTEST: '+pr.pair+'\n- Deployer: '+d.deployer+'\n\n## Verified Live Proof\n\n- Pair created on Factory\n- Liquidity added: 200 WOLFTEST + 0.2 WOPKW, LP 6.3245\n- Swap verified: 1 WOLFTEST => 0.0009920546 WOPKW\n- Status: DEX ROUTER LIVE - Pair + Liquidity + Swap VERIFIED\n\n## Contracts\n\n- WOPKW.sol - Wrapped OPKW\n- OPKWFactory.sol - CREATE2 Pair factory\n- OPKWPair.sol - LP Pair, 0.3% fee, K check\n- OPKWRouter.sol - addLiquidity, removeLiquidity, swaps, getAmountsOut\n- TestToken.sol - Test token for live testing\n\n## Run\n\n```\nnpm install\nnode compile.js\nnode deploy.js\nnode add-liquidity.js\nnode test-swap.js\n```\n\n## Wolf Dev Empire\n\nHub: https://wolfdevempire.com\nCEX: https://cex.pkwblockchain.website\nReferral: https://wolfdevempire.com/ref/WOLF\n';
fs.writeFileSync('README.md',md);
console.log('README-OK');
console.log(fs.readFileSync('README.md','utf8').split('\n').slice(0,12).join('\n'));
