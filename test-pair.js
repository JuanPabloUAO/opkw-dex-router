const fs=require('fs');const {ethers}=require('ethers');require('dotenv').config();
(async()=>{
const d=JSON.parse(fs.readFileSync('deployed.json','utf8'));
const t=JSON.parse(fs.readFileSync('testtoken.json','utf8'));
const c=JSON.parse(fs.readFileSync('compiled.json','utf8'));
const p=new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545');
const w=new ethers.Wallet(process.env.PRIVATE_KEY,p);
const F=new ethers.Contract(d.factory,c['OPKWFactory.sol']['OPKWFactory'].abi,w);
const W=new ethers.Contract(d.wopkw,c['WOPKW.sol']['WOPKW'].abi,w);
const T=new ethers.Contract(t.testToken,c['TestToken.sol']['TestToken'].abi,w);
console.log('OLD-PAIR:',await F.getPair(d.wopkw,t.testToken));
try{let tx=await F.createPair(d.wopkw,t.testToken);let r=await tx.wait();console.log('CREATE-PAIR-OK',r.transactionHash);}catch(e){console.log('CREATE-PAIR-FAIL',e.message.slice(0,300));}
const pair=await F.getPair(d.wopkw,t.testToken);console.log('PAIR:',pair);
const P=new ethers.Contract(pair,c['OPKWPair.sol']['OPKWPair'].abi,w);
console.log('token0:',await P.token0(),'token1:',await P.token1(),'factory:',await P.factory());
console.log('WOPKW-bal:',ethers.utils.formatEther(await W.balanceOf(w.address)),'TEST-bal:',ethers.utils.formatEther(await T.balanceOf(w.address)));
let tx=await W.transfer(pair,ethers.utils.parseEther('0.1'));await tx.wait();
tx=await T.transfer(pair,ethers.utils.parseEther('100'));await tx.wait();
console.log('TRANSFER-TO-PAIR-OK');
try{tx=await P.mint(w.address);let r=await tx.wait();console.log('MINT-OK',r.transactionHash,'LP:',ethers.utils.formatEther(await P.balanceOf(w.address)));}catch(e){console.log('MINT-FAIL',e.message.slice(0,500));}
const r2=await P.getReserves();console.log('reserve0:',ethers.utils.formatEther(r2._reserve0),'reserve1:',ethers.utils.formatEther(r2._reserve1));
})();
