// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract TestToken {
 string public name="Wolf Test Token"; string public symbol="WOLFTEST"; uint8 public decimals=18; uint256 public totalSupply;
 mapping(address=>uint256) public balanceOf; mapping(address=>mapping(address=>uint256)) public allowance;
 event Transfer(address indexed from, address indexed to, uint256 value); event Approval(address indexed o, address indexed s, uint256 v);
 constructor(){ totalSupply=1000000*10**18; balanceOf[msg.sender]=totalSupply; emit Transfer(address(0),msg.sender,totalSupply); }
 function transfer(address t,uint256 v) public returns(bool){ require(balanceOf[msg.sender]>=v,"low"); balanceOf[msg.sender]-=v; balanceOf[t]+=v; emit Transfer(msg.sender,t,v); return true; }
 function approve(address s,uint256 v) public returns(bool){ allowance[msg.sender][s]=v; emit Approval(msg.sender,s,v); return true; }
 function transferFrom(address f,address t,uint256 v) public returns(bool){ require(balanceOf[f]>=v,"low"); require(allowance[f][msg.sender]>=v,"allow"); allowance[f][msg.sender]-=v; balanceOf[f]-=v; balanceOf[t]+=v; emit Transfer(f,t,v); return true; }
}
