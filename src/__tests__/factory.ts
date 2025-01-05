import { OperationType, TradeSummary, TransactionInput } from '../types';

export const createTradeSummary = (input?: Partial<TradeSummary>): TradeSummary => {
    const defaults = {
        quantity: 10000,
        mediumPrice: 2,
        previousLoss: 0,
    }

    return { ...defaults, ...input }
}

export const createTransactionInput = (input?: Partial<TransactionInput>): TransactionInput => {
    const defaults: TransactionInput = {
        quantity: 10000,
        operation: OperationType.BUY,
        unitCost: 2,
    }

    return { ...defaults, ...input }
}
