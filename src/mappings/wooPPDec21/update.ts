import {Bytes} from "@graphprotocol/graph-ts/index";
import {BigInt} from "@graphprotocol/graph-ts";
import {WooSwap} from "../../../generated/WooPPDec21/WooPP";
import {WooSwapHash} from "../../../generated/schema";
import {
    createGlobalVariable,
    createHourToken,
    createToken,
    createHourData,
    createDayData,
    createHourTrader,
    createDayTrader,
    createTrader,
    createHourOrderSource,
    createDayOrderSource,
    createOrderSource,
    createUnknownOrderSource,
    createWooSwapHash
} from "../../create";
import {
    BI_1,
    WOO_ROUTER_ORDER_SOURCE_ID,
    ONE_INCH_ORDER_SOURCE_ID,
    DODO_ORDER_SOURCE_ID,
    OPEN_OCEAN_ORDER_SOURCE_ID,
    METAMASK_ORDER_SOURCE_ID,
    OTHER_ORDER_SOURCE_ID,
} from "../../constants";
import {getOrderSourceIDForWooPP} from "../../utils";

export function updateGlobalVariable(event: WooSwap, traderAddress: Bytes, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let globalVariable = createGlobalVariable(event);
    let trader = createTrader(event, traderAddress);
    if (trader.tradedBefore == false) {
        globalVariable.totalTraders = globalVariable.totalTraders.plus(BI_1);
        updateTrader(event, traderAddress);
    }
    if (wooSwapHash.txSynced == false) {
        globalVariable.totalTxCount = globalVariable.totalTxCount.plus(BI_1);
    }
    globalVariable.totalVolumeUSD = globalVariable.totalVolumeUSD.plus(volumeUSD);

    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    if (orderSourceID == WOO_ROUTER_ORDER_SOURCE_ID) {
        globalVariable.totalVolumeUSDFromWooRouter = globalVariable.totalVolumeUSDFromWooRouter.plus(volumeUSD);
    } else if (orderSourceID == ONE_INCH_ORDER_SOURCE_ID) {
        globalVariable.totalVolumeUSDFromOneInch = globalVariable.totalVolumeUSDFromOneInch.plus(volumeUSD);
    } else if (orderSourceID == DODO_ORDER_SOURCE_ID) {
        globalVariable.totalVolumeUSDFromDODO = globalVariable.totalVolumeUSDFromDODO.plus(volumeUSD);
    } else if (orderSourceID == OPEN_OCEAN_ORDER_SOURCE_ID) {
        globalVariable.totalVolumeUSDFromOpenOcean = globalVariable.totalVolumeUSDFromOpenOcean.plus(volumeUSD);
    } else if (orderSourceID == METAMASK_ORDER_SOURCE_ID) {
        globalVariable.totalVolumeUSDFromMetaMask = globalVariable.totalVolumeUSDFromMetaMask.plus(volumeUSD);
    } else {
        globalVariable.totalVolumeUSDFromOther = globalVariable.totalVolumeUSDFromOther.plus(volumeUSD);
    }

    globalVariable.updatedAt = event.block.timestamp;

    globalVariable.save();
}

export function updateHourToken(event: WooSwap, volumeUSD: BigInt): void {
    let fromHourToken = createHourToken(event, event.params.fromToken);
    let toHourToken = createHourToken(event, event.params.toToken);

    fromHourToken.txCount = fromHourToken.txCount.plus(BI_1);
    fromHourToken.volumeUSD = fromHourToken.volumeUSD.plus(volumeUSD);
    fromHourToken.updatedAt = event.block.timestamp;
    fromHourToken.save();

    toHourToken.txCount = toHourToken.txCount.plus(BI_1);
    toHourToken.volumeUSD = toHourToken.volumeUSD.plus(volumeUSD);
    toHourToken.updatedAt = event.block.timestamp;
    toHourToken.save();
}

export function updateToken(event: WooSwap, volumeUSD: BigInt): void {
    let fromToken = createToken(event, event.params.fromToken);
    let toToken = createToken(event, event.params.toToken);

    fromToken.volumeUSD = fromToken.volumeUSD.plus(volumeUSD);
    fromToken.updatedAt = event.block.timestamp;
    fromToken.save();

    toToken.volumeUSD = toToken.volumeUSD.plus(volumeUSD);
    toToken.updatedAt = event.block.timestamp;
    toToken.save();
}

export function updateHourData(event: WooSwap, traderAddress: Bytes, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let hourData = createHourData(event);

    let hourTrader = createHourTrader(event, traderAddress);
    if (hourTrader.tradedThisHour == false) {
        hourData.traders = hourData.traders.plus(BI_1);
        updateHourTrader(event, traderAddress);
    }
    if (wooSwapHash.txSynced == false) {
        hourData.txCount = hourData.txCount.plus(BI_1);
    }
    hourData.volumeUSD = hourData.volumeUSD.plus(volumeUSD);

    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    if (orderSourceID == WOO_ROUTER_ORDER_SOURCE_ID) {
        hourData.volumeUSDFromWooRouter = hourData.volumeUSDFromWooRouter.plus(volumeUSD);
    } else if (orderSourceID == ONE_INCH_ORDER_SOURCE_ID) {
        hourData.volumeUSDFromOneInch = hourData.volumeUSDFromOneInch.plus(volumeUSD);
    } else if (orderSourceID == DODO_ORDER_SOURCE_ID) {
        hourData.volumeUSDFromDODO = hourData.volumeUSDFromDODO.plus(volumeUSD);
    } else if (orderSourceID == OPEN_OCEAN_ORDER_SOURCE_ID) {
        hourData.volumeUSDFromOpenOcean = hourData.volumeUSDFromOpenOcean.plus(volumeUSD);
    } else if (orderSourceID == METAMASK_ORDER_SOURCE_ID) {
        hourData.volumeUSDFromMetaMask = hourData.volumeUSDFromMetaMask.plus(volumeUSD);
    } else {
        hourData.volumeUSDFromOther = hourData.volumeUSDFromOther.plus(volumeUSD);
    }
    hourData.updatedAt = event.block.timestamp;

    hourData.save();
}

export function updateDayData(event: WooSwap, traderAddress: Bytes, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let dayData = createDayData(event);

    let dayTrader = createDayTrader(event, traderAddress);
    if (dayTrader.tradedToday == false) {
        dayData.traders = dayData.traders.plus(BI_1);
    }
    // 注意顺序, 需要先检查dayTrader.tradedToday后再更新dayTrader
    updateDayTrader(event, traderAddress, volumeUSD);
    if (wooSwapHash.txSynced == false) {
        dayData.txCount = dayData.txCount.plus(BI_1);
    }
    dayData.volumeUSD = dayData.volumeUSD.plus(volumeUSD);

    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    if (orderSourceID == WOO_ROUTER_ORDER_SOURCE_ID) {
        dayData.volumeUSDFromWooRouter = dayData.volumeUSDFromWooRouter.plus(volumeUSD);
    } else if (orderSourceID == ONE_INCH_ORDER_SOURCE_ID) {
        dayData.volumeUSDFromOneInch = dayData.volumeUSDFromOneInch.plus(volumeUSD);
    } else if (orderSourceID == DODO_ORDER_SOURCE_ID) {
        dayData.volumeUSDFromDODO = dayData.volumeUSDFromDODO.plus(volumeUSD);
    } else if (orderSourceID == OPEN_OCEAN_ORDER_SOURCE_ID) {
        dayData.volumeUSDFromOpenOcean = dayData.volumeUSDFromOpenOcean.plus(volumeUSD);
    } else if (orderSourceID == METAMASK_ORDER_SOURCE_ID) {
        dayData.volumeUSDFromMetaMask = dayData.volumeUSDFromMetaMask.plus(volumeUSD);
    } else {
        dayData.volumeUSDFromOther = dayData.volumeUSDFromOther.plus(volumeUSD);
    }
    dayData.updatedAt = event.block.timestamp;

    dayData.save();
}

export function updateHourTrader(event: WooSwap, traderAddress: Bytes): void {
    let hourTrader = createHourTrader(event, traderAddress);
    hourTrader.tradedThisHour = true;
    hourTrader.updatedAt = event.block.timestamp;

    hourTrader.save();
}

export function updateDayTrader(event: WooSwap, traderAddress: Bytes, volumeUSD: BigInt): void {
    let dayTrader = createDayTrader(event, traderAddress);
    if (dayTrader.tradedToday == false) {
        dayTrader.tradedToday = true;
    }
    if (getOrderSourceIDForWooPP(event.transaction.to.toHexString()) == WOO_ROUTER_ORDER_SOURCE_ID) {
        // volumeUSD comes from WooRouter
        dayTrader.volumeUSD = dayTrader.volumeUSD.plus(volumeUSD);
    }
    dayTrader.updatedAt = event.block.timestamp;
    dayTrader.save();
}

export function updateTrader(event: WooSwap, traderAddress: Bytes): void {
    let trader = createTrader(event, traderAddress);
    trader.tradedBefore = true;
    trader.updatedAt = event.block.timestamp;
    trader.save();
}

export function updateHourOrderSource(event: WooSwap, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    let hourOrderSource = createHourOrderSource(event, orderSourceID);
    hourOrderSource.volumeUSD = hourOrderSource.volumeUSD.plus(volumeUSD);
    if (wooSwapHash.txSynced == false) {
        hourOrderSource.txCount = hourOrderSource.txCount.plus(BI_1);
    }
    hourOrderSource.updatedAt = event.block.timestamp;
    hourOrderSource.save();
}

export function updateDayOrderSource(event: WooSwap, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    let dayOrderSource = createDayOrderSource(event, orderSourceID);
    dayOrderSource.volumeUSD = dayOrderSource.volumeUSD.plus(volumeUSD);
    if (wooSwapHash.txSynced == false) {
        dayOrderSource.txCount = dayOrderSource.txCount.plus(BI_1);
    }
    dayOrderSource.updatedAt = event.block.timestamp;
    dayOrderSource.save();
}

export function updateOrderSource(event: WooSwap, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let orderSourceID = getOrderSourceIDForWooPP(event.transaction.to.toHexString());
    let orderSource = createOrderSource(event, orderSourceID);
    if (orderSource.id == OTHER_ORDER_SOURCE_ID) {
        updateUnknownOrderSource(event, volumeUSD, wooSwapHash);
    }

    orderSource.volumeUSD = orderSource.volumeUSD.plus(volumeUSD);
    if (wooSwapHash.txSynced == false) {
        orderSource.txCount = orderSource.txCount.plus(BI_1);
    }
    orderSource.updatedAt = event.block.timestamp;
    orderSource.save();
}

export function updateUnknownOrderSource(event: WooSwap, volumeUSD: BigInt, wooSwapHash: WooSwapHash): void {
    let unknownOrderSource = createUnknownOrderSource(event, event.transaction.to.toHexString());

    unknownOrderSource.volumeUSD = unknownOrderSource.volumeUSD.plus(volumeUSD);
    if (wooSwapHash.txSynced == false) {
        unknownOrderSource.txCount = unknownOrderSource.txCount.plus(BI_1);
    }
    unknownOrderSource.updatedAt = event.block.timestamp;
    unknownOrderSource.save();
}

export function updateWooSwapHash(event: WooSwap): void {
    let wooSwapHash = createWooSwapHash(event);
    wooSwapHash.txSynced = true;
    wooSwapHash.updatedAt = event.block.timestamp;
    wooSwapHash.save();
}
