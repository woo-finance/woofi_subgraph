import {BigInt, Bytes, ethereum} from "@graphprotocol/graph-ts/index";
import {WooSwapHash} from "../../../generated/schema";
import {WooSwap as WooPPV1WooSwap_0} from "../../../generated/WooPPV1_0/WooPPV1"
import {WooSwap as WooPPV1WooSwap_1} from "../../../generated/WooPPV1_1/WooPPV1"
import {WooSwap as WooPPV1WooSwap_2} from "../../../generated/WooPPV1_2/WooPPV1"
import {WooSwap as WooPPV2WooSwap_1} from "../../../generated/WooPPV2_1/WooPPV2"

import {calVolumeUSDForWooPP} from '../../helpers'
import {
    updateGlobalVariable,
    updateHourToken,
    updateToken,
    updateHourData,
    updateDayData,
    updateHourOrderSource,
    updateDayOrderSource,
    updateOrderSource,
    updateWooSwapHash
} from "../../updateForWooPP";
import {createToken, createWooSwapHash} from "../../create";
import {updateTokenPrice} from "../../update";
import {BI_0, BI_18, QUOTE_TOKEN} from "../../constants";
import {exponentToBigInt} from "../../utils";

export function handleWooPPV2WooSwap_1(event: WooPPV2WooSwap_1): void {
    handleWooSwap(
        event, event.params.fromToken, event.params.fromAmount,
        event.params.toToken, event.params.toAmount, event.params.from, event.params.swapVol, event.params.swapFee
    );
}

export function handleWooPPV1WooSwap_2(event: WooPPV1WooSwap_2): void {
    handleWooSwap(
        event, event.params.fromToken, event.params.fromAmount,
        event.params.toToken, event.params.toAmount, event.params.from, BI_0, BI_0
    );
}

export function handleWooPPV1WooSwap_1(event: WooPPV1WooSwap_1): void {
    handleWooSwap(
        event, event.params.fromToken, event.params.fromAmount,
        event.params.toToken, event.params.toAmount, event.params.from, BI_0, BI_0
    );
}

export function handleWooPPV1WooSwap_0(event: WooPPV1WooSwap_0): void {
    // Only for WooRouterV1 swap history at the beginning
    updateTokenPrice(
        event, event.params.fromToken, event.params.fromAmount,
        event.params.toToken, event.params.toAmount
    );
}

function handleWooSwap(
    event: ethereum.Event,
    fromTokenAddress: Bytes,
    fromAmount: BigInt,
    toTokenAddress: Bytes,
    toAmount: BigInt,
    wooSwapFrom: Bytes,
    swapVol: BigInt,
    swapFee: BigInt
): void {
    // Start to data statistic, always update token price first
    let volumeUSD: BigInt;
    if (swapVol != BI_0) {
        // WooPPV2 is able to swap Base to Base
        let quoteTokenAddress = Bytes.fromHexString(QUOTE_TOKEN) as Bytes;
        let quoteToken = createToken(event, quoteTokenAddress);
        if (fromTokenAddress != quoteTokenAddress && toTokenAddress != quoteTokenAddress) {
            updateTokenPrice(event, fromTokenAddress, fromAmount, quoteTokenAddress, swapVol.minus(swapFee));
            updateTokenPrice(event, quoteTokenAddress, swapVol, toTokenAddress, toAmount);
        } else {
            updateTokenPrice(event, fromTokenAddress, fromAmount, toTokenAddress, toAmount);
        }
        volumeUSD = swapVol.times(exponentToBigInt(BI_18)).div(exponentToBigInt(quoteToken.decimals));;
    } else {
        // WooPPV1 is not able to swap Base to Base
        updateTokenPrice(event, fromTokenAddress, fromAmount, toTokenAddress, toAmount);
        volumeUSD = calVolumeUSDForWooPP(event, fromTokenAddress, fromAmount, toTokenAddress, toAmount);
    }

    // tx.origin
    let traderAddress = event.transaction.from;
    // it's possible to exist two or more WooSwap events in one tx, will be checked when entity has txCount
    let wooSwapHash = createWooSwapHash(event);

    updateHourStatistics(event, traderAddress, volumeUSD, fromTokenAddress, fromAmount, toTokenAddress, toAmount, wooSwapFrom, wooSwapHash);
    updateDayStatistics(event, traderAddress, volumeUSD, fromTokenAddress, toTokenAddress, wooSwapFrom, wooSwapHash);
    updateStatistics(event, traderAddress, volumeUSD, fromTokenAddress, toTokenAddress, wooSwapFrom, wooSwapHash);

    updateWooSwapHash(event, volumeUSD, wooSwapFrom);
}

function updateHourStatistics(
    event: ethereum.Event,
    traderAddress: Bytes,
    volumeUSD: BigInt,
    fromTokenAddress: Bytes,
    fromAmount: BigInt,
    toTokenAddress: Bytes,
    toAmount: BigInt,
    wooSwapFrom: Bytes,
    wooSwapHash: WooSwapHash
): void {
    updateHourData(event, traderAddress, volumeUSD, wooSwapFrom, wooSwapHash);
    updateHourToken(event, volumeUSD, fromTokenAddress, fromAmount, toTokenAddress, toAmount);
    updateHourOrderSource(event, volumeUSD, wooSwapFrom, wooSwapHash);
}

function updateDayStatistics(
    event: ethereum.Event,
    traderAddress: Bytes,
    volumeUSD: BigInt,
    fromTokenAddress: Bytes,
    toTokenAddress: Bytes,
    wooSwapFrom: Bytes,
    wooSwapHash: WooSwapHash
): void {
    updateDayData(event, traderAddress, volumeUSD, wooSwapFrom, wooSwapHash);
    updateDayOrderSource(event, volumeUSD, wooSwapFrom, wooSwapHash);
}

function updateStatistics(
    event: ethereum.Event,
    traderAddress: Bytes,
    volumeUSD: BigInt,
    fromTokenAddress: Bytes,
    toTokenAddress: Bytes,
    wooSwapFrom: Bytes,
    wooSwapHash: WooSwapHash
): void {
    updateGlobalVariable(event, traderAddress, volumeUSD, wooSwapFrom, wooSwapHash);
    updateToken(event, volumeUSD, fromTokenAddress, toTokenAddress, wooSwapFrom);
    updateOrderSource(event, volumeUSD, wooSwapFrom, wooSwapHash);
}
