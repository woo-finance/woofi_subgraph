import {BigDecimal, BigInt} from "@graphprotocol/graph-ts/index";

export let BI_0 = BigInt.fromI32(0);
export let BI_1 = BigInt.fromI32(1);
export let BI_2 = BigInt.fromI32(2);
export let BI_6 = BigInt.fromI32(6);
export let BI_8 = BigInt.fromI32(8);
export let BI_18 = BigInt.fromI32(18);

export let BD_0 = BigDecimal.fromString('0');
export let BD_1 = BigDecimal.fromString('1');

// Address Must Be Lower Case!!!
export const ETHER = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const ETHER_SYMBOL = 'AVAX';
export const ETHER_NAME = 'avax';

export const WRAPPED = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7';

export const STABLE_TOKENS: string[] = [
    "0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98",  // BUSD
    "0xc7198437980c041c805a1edcba50c1ce5db95118",  // USDT.e
    "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",  // USDC.e
    "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",  // DAI.e
    "0x1c20e891bab6b1727d14da358fae2984ed9b59eb",  // TUSD
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",  // USDT
    "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",  // USDC
];

// Contract Name as Variable Name
export const WOO_ROUTER_SOURCES: string[] = [
    "0x5aa6a4e96a9129562e2fc06660d07feddaaf7854",
    "0x3e0da0a9e4139b32b37710784b8dca643c152001",
    "0x160020b09ded3d862f7f851b5c50632bcf2062ff",
];

export const WOO_PP_SOURCES: string[] = [
    "0x1df3009c57a8b143c6246149f00b090bce3b8f88",
    "0xf8ce0d043891b62c55380fb1efbfb4f186153d96",
];

export const WOO_VAULT_MANAGER_SOURCES: string[] = [
    "0x48419c93d0d3b2428cd02bbcdeabd3aafc107f85",
];

export const ONE_INCH_ORDER_SOURCES: string[] = [
    "0x1111111254fb6c44bac0bed2854e76f90643097d",  // AggregationRouterV4
];

export const DODO_ORDER_SOURCES: string[] = [
    "0x409e377a7affb1fd3369cfc24880ad58895d1dd9",
];

export const OPEN_OCEAN_SOURCES: string[] = [
    "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
];

export const METAMASK_SOURCES: string[] = [
    "0x1a1ec25dc08e98e5e93f1104b5e5cdd298707d31",
];

export const YIELD_YAK_SOURCES: string[] = [
    "0xc4729e56b831d74bbc18797e0e17a295fa77488c",  // YakRouter
];

export const FIRE_BIRD_SOURCES: string[] = [
    "0x0000000000000000000000000000000000000000",
];

export const BIT_KEEP_SOURCES: string[] = [
    "0x0000000000000000000000000000000000000000",
];

export const PARA_SWAP_SOURCES: string[] = [
    "0xdef171fe48cf0115b1d80b88dc8eab59176fee57",  // AugustusSwapper
    "0xae02eca9445ec43b53118dd41658db17eab55987",  // ParaSwapLiquiditySwapAdapter
];

export const BEETHOVEN_X_SOURCES: string[] = [
    "0x0000000000000000000000000000000000000000",
];

export const GLOBAL_VARIABLE_ID = '0';
export const ORDER_HISTORY_VARIABLE_ID = '0';
export const CROSS_CHAIN_SRC_ORDER_HISTORY_VARIABLE_ID = '1';
export const CROSS_CHAIN_DST_ORDER_HISTORY_VARIABLE_ID = '2';

export const WOO_ROUTER_ORDER_SOURCE_ID = '0';
export const ONE_INCH_ORDER_SOURCE_ID = '1';
export const DODO_ORDER_SOURCE_ID = '2';
export const OPEN_OCEAN_ORDER_SOURCE_ID = '3';
export const METAMASK_ORDER_SOURCE_ID = '4';
export const YIELD_YAK_ORDER_SOURCE_ID = '5';
export const FIRE_BIRD_ORDER_SOURCE_ID = '6';
export const BIT_KEEP_ORDER_SOURCE_ID = '7';
export const PARA_SWAP_ORDER_SOURCE_ID = '8';
export const BEETHOVEN_X_ORDER_SOURCE_ID = '9';
export const OTHER_ORDER_SOURCE_ID = '99';
