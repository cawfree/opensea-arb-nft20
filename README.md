# opensea-arb-nft20
Detects arbitrage opportunities for [ERC-721](https://eips.ethereum.org/EIPS/eip-721) and [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) tokens between [__OpenSea__](https://opensea.io/) and [__NFT20__](https://nft20.io/).

## 🚀 Usage
This package is executable via [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):

```shell
npx opensea-arb-nft20
```

This will determine the floor price of NFT20's Liquidity Pools and compare these against the floor prices on OpenSea, and print the resulting information to the console:


```shell
Searching for arbitrage opportunities...
Planning to compare 106 collections against OpenSea.
Failed to fetch "Covenants Indexes". Ignoring...
┌──────────────────────────────────┬────────────────────────────────────────────┬──────────────────────────────────────┐
│                       Token Name │                           Contract Address │                           Floor Diff │
├──────────────────────────────────┼────────────────────────────────────────────┼──────────────────────────────────────┤
│                       dokidoki20 │ 0x7cdc0421469398e0f3aa8890693d86c840ac8931 │             33.21857598327181506905% │
│                        CHONKER20 │ 0xc805658931f959abc01133aa13ff173769133512 │             27.57280757883424533541% │
│                              NFY │ 0x017bba5d5d32feb687fdafb9700418d55daad091 │             10.56825000000000062369% │
│        EtherCats Founders Series │ 0xff3559412c4618af7c6e6f166c74252ff6364456 │              8.43183999999999898131% │
│                              ... │                                        ... │                                  ... │
├──────────────────────────────────┼────────────────────────────────────────────┼──────────────────────────────────────┤
```

## ✌️ License
[__MIT__](./LICENSE)