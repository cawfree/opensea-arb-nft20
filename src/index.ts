#!/usr/bin/env node

import axios from 'axios';
import BigNumber from 'bignumber.js';
import * as chalk from 'chalk';
import {printTable} from 'console-table-printer';

import {nft20Datum, nft20Response, nft20VsOpenSea} from './@types';

const ZERO = new BigNumber('0');

const compare = async (data: nft20Datum): Promise<nft20VsOpenSea> => {
  const {
    name: tokenName,
    nft: contractAddress /* actual */,
    nft_eth_price: nft20EthPrice,
  } = data;
  const {data: {collection: {slug}}} = await axios({
    method: 'get',
    url: `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`,
  });
  const {data: {collection: {stats: {floor_price: floorPrice}}}} = await axios({
    method: 'get',
    url: `https://api.opensea.io/collection/${slug}`,
  });
  const nft20Floor = new BigNumber(nft20EthPrice);
  const openSeaFloor = new BigNumber(`${floorPrice}`);
  return {contractAddress, nft20Floor, openSeaFloor, tokenName};
};

const accumulateInfo = async ({
  data,
}: nft20Response): Promise<nft20VsOpenSea[]> => {
  const results: nft20VsOpenSea[] = [];
  const dataWithFloor = data.filter(
    ({nft_eth_price}: nft20Datum) =>
      new BigNumber(nft_eth_price).gt(ZERO),
  )
    .filter(({nft_locked}: nft20Datum) => parseInt(nft_locked) > 0);
  console.log(chalk.bold`Planning to compare ${dataWithFloor.length} collections against OpenSea.`);
  for (let i = 0; i < dataWithFloor.length; i += 1) {
    const nft = dataWithFloor[i];
    try {
      results.push(await compare(nft));
    } catch (e) {
      const {name} = nft;
      console.error(chalk.red`Failed to fetch "${name}". Ignoring...`);
    }
  }
  return results;
};

const diffFloor = ({
  openSeaFloor,
  nft20Floor,
}: nft20VsOpenSea): BigNumber => {
  return new BigNumber(new BigNumber(openSeaFloor.minus(nft20Floor)).div(nft20Floor));
};


(async () => {
  console.log(chalk.white.bold`Searching for arbitrage opportunities...`);
  const {data: response} = await axios({
    method: 'get',
    url: 'https://api.nft20.io/pools?perPage=1000&page=1',
  });
  printTable(
    (await accumulateInfo(response))
      .sort((a: nft20VsOpenSea, b: nft20VsOpenSea) => {
        const da = diffFloor(a);
        const db = diffFloor(b);
        return da.gt(db) ? -1 : da.eq(db) ? 0 : 1;
      })
      .map((vs: nft20VsOpenSea) => {
        const {tokenName, contractAddress} = vs;
        const d = diffFloor(vs);
        const diff = `${d.toString(10)}%`;
        return {
          'Token Name': tokenName,
          'Contract Address': contractAddress,
          'Floor Diff': d.gt(ZERO) ? chalk.green(diff) : chalk.red(diff),
        };
      }),
  );
})();
