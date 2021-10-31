import BigNumber from 'bignumber.js';

export type nft20VsOpenSea = {
  readonly contractAddress: string;
  readonly nft20Floor: BigNumber;
  readonly openSeaFloor: BigNumber;
  readonly tokenName: string;
};

export type nft20Pagination = {
  readonly currentPage: number;
  readonly from: number;
  readonly lastPage: number;
  readonly perPage: number;
  readonly to: number;
  readonly total: number;
};

export type nft20Trendline = {
  readonly usd: readonly string[],
  readonly eth: readonly string[]
};

export type nft20Datum = {
  readonly address: string;
  readonly nft: string;
  readonly nft_type: string;
  readonly name: string;
  readonly symbol: string;
  readonly lp_eth_balance: string /* floor */;
  readonly lp_usd_balance: string /* floor */;
  readonly nft_usd_price: string;
  readonly nft_eth_price: string;
  readonly network: string;
  readonly sell_price_eth: string;
  readonly buy_price_eth: string;
  readonly lp_version: string;
  readonly lp_fee: string | null;
  readonly index_order: string;
  readonly banner_url: string;
  readonly image_url: string;
  readonly collection_description: string;
  readonly collection_total_assets: string;
  readonly external_url: string;
  readonly featured_image_url: string;
  readonly telegram_url: string;
  readonly twitter_username: string;
  readonly number_of_owners: string;
  readonly nft_locked: string;
  readonly token_supply: string;
  readonly total_nft_transfers: string;
  readonly pool_users: string;
  readonly logo_url: string;
  readonly users_today: string;
  readonly users_weekly: string;
  readonly nft_value: string;
  readonly volume_today_usd: string;
  readonly volume_weekly_usd: string;
  readonly volume_today_eth: string;
  readonly volume_weekly_eth: string;
  readonly volume_usd: string;
  readonly volume_eth: string;
  readonly pepe_score: string;
  readonly pepe_votes: string;
  readonly price_now_usd: string;
  readonly price_one_week_ago_usd: string;
  readonly price_one_day_ago_usd: string;
  readonly price_now_eth: string;
  readonly price_one_week_ago_eth: string;
  readonly price_one_day_ago_eth: string;
  readonly price_low_day_eth: string;
  readonly price_high_day_eth: string;
  readonly price_low_week_eth: string;
  readonly price_high_week_eth: string;
  readonly price_low_day_usd: string;
  readonly price_low_week_usd: string;
  readonly price_high_week_usd: string;
  readonly price_high_day_usd: string;
  readonly trendline: nft20Trendline;
};

export type nft20Response = {
  readonly data: readonly nft20Datum[];
  readonly pagination: nft20Pagination;
};
