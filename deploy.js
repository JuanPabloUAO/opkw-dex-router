const fs=require('fs');
const {ethers}=require('ethers');
require('dotenv').config();
async function main(){
 const c=JSON.parse(fs.readFileSync('compiled.json','utf8'));
 const provider=new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545');
 const wallet=new ethers.Wallet(process.env.PRIVATE_KEY, provider);
 console.log('DEPLOYER:', wallet.address);
 const bal=await wallet.getBalance(); console.log('BALANCE:', ethers.utils.formatEther(bal));
 async function dep(file, name, ...args){
   const art=c[file+':'+name] || c[file][name];
   const f=new ethers.ContractFactory(art.abi, art.evm.bytecode.object, wallet);
   const con=await f.deploy(...args); await con.deployed();
   console.log(name, '=>', con.address); return con.address;
 }
 const wopkw=await dep('WOPKW.sol','WOPKW');
 const factory=await dep('OPKWFactory.sol','OPKWFactory', wallet.address);
 const router=await dep('OPKWRouter.sol','OPKWRouter', factory, wopkw);
 fs.writeFileSync('deployed.json', JSON.stringify({chainId:20270,wopkw,factory,router,deployer:wallet.address},null,2));
 console.log('SAVED deployed.json');
}
main().catch(e=>{console.error(e); process.exit(1);});
