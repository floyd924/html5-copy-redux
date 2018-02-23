export const updateOrderBook = orderBook => ({
    type: 'UPDATE_ORDER_BOOK',
    orderBook,
});

export const updateTradeBook = tradeBook => ({
    type: 'UPDATE_TRADE_BOOK',
    tradeBook,
});

export const updateMarketAverage = marketAverage => ({
    type: 'UPDATE_MARKET_AVERAGE',
    marketAverage,
});

export const togglePrivate = () => ({
    type: 'TOGGLE_PRIVATE',
});

export const updatePrivateOrderBook = privateOrderBook => ({
    type: 'UPDATE_PRIVATE_ORDER_BOOK',
    privateOrderBook,
});