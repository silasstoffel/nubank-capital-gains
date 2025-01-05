export enum OperationType {
    BUY =  'buy',
    SELL = 'sell'
}

export type TradeSummary = {
    quantity: number
    mediumPrice: number
    previousLoss: number
}

export type TransactionOutput = {
    tax: number
}

export type TransactionInput = {
    operation: OperationType
    quantity: number
    unitCost: number
}

export type SellOperationOutput = {
    tax: number
}

