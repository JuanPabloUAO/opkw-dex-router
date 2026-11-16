const fs=require('fs'); const {ethers}=require('ethers'); require('dotenv').config();
(async()=>{
 const c=JSON.parse(fs.readFileSync('compiled.json','utf8'));
 const p=new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545');
 const w=new ethers.Wallet(process.env.PRIVATE_KEY,p);
 console.log('DEPLOYER:',w.address);
 const T=c['TestToken.sol']['TestToken'];
 const f=new ethers.ContractFactory(T.abi,'0x'+T.evm.bytecode.object,w);
 const t=await f.deploy(); await t.deployed();
 console.log('WOLFTEST =>',t.address);
 console.log('name =',await t.name(),'symbol =',await t.symbol(),'supply =',ethers.utils.formatEther(await t.totalSupply()));
 fs.writeFileSync('testtoken.json',JSON.stringify({testToken:t.address},null,2));
 console.log('SAVED testtoken.json');
})();
