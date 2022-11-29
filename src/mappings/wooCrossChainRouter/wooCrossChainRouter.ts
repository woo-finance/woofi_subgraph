import {BigInt, Bytes, ethereum} from "@graphprotocol/graph-ts/index";
import {
    WooCrossSwapOnSrcChain as WooCCRouterV1WooCrossSwapOnSrcChain_1,
    WooCrossSwapOnDstChain as WooCCRouterV1WooCrossSwapOnDstChain_1
} from "../../../generated/WooCrossChainRouterV1_1/WooCrossChainRouterV1";
import {
    WooCrossSwapOnSrcChain as WooCCRouterV1WooCrossSwapOnSrcChain_2,
    WooCrossSwapOnDstChain as WooCCRouterV1WooCrossSwapOnDstChain_2
} from "../../../generated/WooCrossChainRouterV1_2/WooCrossChainRouterV1";
import {
    createCrossChainSrcOrderHistory,
    createCrossChainDstOrderHistory
} from "../../create";
import {
    updateCrossChainSrcOrderHistoryVariable,
    updateCrossChainDstOrderHistoryVariable,
} from "../../updateForWooCrossChainRouter";

export function handleWooCCRouterV1WooCrossSwapOnSrcChain_2(event: WooCCRouterV1WooCrossSwapOnSrcChain_2): void {
    handleWooCrossSwapOnSrcChain(
        event,
        event.params.refId,
        event.params.sender,
        event.params.to,
        event.params.fromToken,
        event.params.fromAmount,
        event.params.minQuoteAmount,
        event.params.realQuoteAmount
    );
}

export function handleWooCCRouterV1WooCrossSwapOnDstChain_2(event: WooCCRouterV1WooCrossSwapOnDstChain_2): void {
    handleWooCrossSwapOnDstChain(
        event,
        event.params.refId,
        event.params.sender,
        event.params.to,
        event.params.bridgedToken,
        event.params.bridgedAmount,
        event.params.toToken,
        event.params.realToToken,
        event.params.minToAmount,
        event.params.realToAmount
    );
}

export function handleWooCCRouterV1WooCrossSwapOnSrcChain_1(event: WooCCRouterV1WooCrossSwapOnSrcChain_1): void {
    handleWooCrossSwapOnSrcChain(
        event,
        event.params.refId,
        event.params.sender,
        event.params.to,
        event.params.fromToken,
        event.params.fromAmount,
        event.params.minQuoteAmount,
        event.params.realQuoteAmount
    );
}

export function handleWooCCRouterV1WooCrossSwapOnDstChain_1(event: WooCCRouterV1WooCrossSwapOnDstChain_1): void {
    handleWooCrossSwapOnDstChain(
        event,
        event.params.refId,
        event.params.sender,
        event.params.to,
        event.params.bridgedToken,
        event.params.bridgedAmount,
        event.params.toToken,
        event.params.realToToken,
        event.params.minToAmount,
        event.params.realToAmount
    );
}

export function handleWooCrossSwapOnSrcChain(
    event: ethereum.Event,
    refId: BigInt,
    sender: Bytes,
    toAddress: Bytes,
    fromTokenAddress: Bytes,
    fromAmount: BigInt,
    minQuoteAmount: BigInt,
    realQuoteAmount: BigInt
): void {
    updateCrossChainSrcOrderHistoryVariable(event);

    createCrossChainSrcOrderHistory(
          event,
          refId,
          sender,
          toAddress,
          fromTokenAddress,
          fromAmount,
          minQuoteAmount,
          realQuoteAmount
    );
}

export function handleWooCrossSwapOnDstChain(
    event: ethereum.Event,
    refId: BigInt,
    sender: Bytes,
    toAddress: Bytes,
    bridgedTokenAddress: Bytes,
    bridgedAmount: BigInt,
    toTokenAddress: Bytes,
    realToToken: Bytes,
    minToAmount: BigInt,
    realToAmount: BigInt
): void {
    updateCrossChainDstOrderHistoryVariable(event);

    createCrossChainDstOrderHistory(
        event,
        refId,
        sender,
        toAddress,
        bridgedTokenAddress,
        bridgedAmount,
        toTokenAddress,
        realToToken,
        minToAmount,
        realToAmount
    );
}
