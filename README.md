# OPKW DEX Router

PancakeSwap-style DEX Router for OPKW L2 (Chain ID 20270).

## Live Contracts - OPKW L2 (20270)

- WOPKW: 0xF26327119e73813afefC58CA44be5a82fAEA910e
- Factory: 0x7dFf6D5bb8E2f724641C4BE00cd4DE8F5ffEaA26
- Router: 0xE7190449a4eA4d4FB1336078B961166f08C9EDca
- Test Token WOLFTEST: 0xeFF75690666102605002BEcA3E4812e5CE63121e
- Pair WOPKW/WOLFTEST: 0xad1FAC5feE46002479F55E34efED32ace255f8B7
- Deployer: 0x74A556d4725b690C136881de33B688F1519ea510

## Verified Live Proof

- Pair created on Factory
- Liquidity added: 200 WOLFTEST + 0.2 WOPKW, LP 6.3245
- Swap verified: 1 WOLFTEST => 0.0009920546 WOPKW
- Status: DEX ROUTER LIVE - Pair + Liquidity + Swap VERIFIED

## Contracts

- WOPKW.sol - Wrapped OPKW
- OPKWFactory.sol - CREATE2 Pair factory
- OPKWPair.sol - LP Pair, 0.3% fee, K check
- OPKWRouter.sol - addLiquidity, removeLiquidity, swaps, getAmountsOut
- TestToken.sol - Test token for live testing

## Run

```
npm install
node compile.js
node deploy.js
node add-liquidity.js
node test-swap.js
```

## Wolf Dev Empire

Hub: https://wolfdevempire.com
CEX: https://cex.pkwblockchain.website
Referral: https://wolfdevempire.com/ref/WOLF
