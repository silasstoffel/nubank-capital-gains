import { MAX_AMOUNT_WITHOUT_TAX, TAX_PERCENT } from './env'
import {
    OperationType,
    SellOperationOutput,
    TradeSummary,
    TransactionInput,
    TransactionOutput
} from './types'

export function handleOperation(input: string): TransactionOutput[][] {
    return handleLines(
        parseInput(input)
    )
}

function parseInput(input: string): TransactionInput[][] {
    if (typeof input !== 'string') {
        return []
    }

    const strJson = input.replace(/(\r\n|\n|\r)/g, '').replace(/"unit-cost"/g, '"unitCost"')

    const lines = strJson.match(/\[.*?\]/g)
    if (!lines) {
        return []
    }

    return lines.map(
        (item) => JSON.parse(item) as TransactionInput[]
    )
}

function handleLines(lines: TransactionInput[][]): TransactionOutput[][] {
    const transactions = []
    for (const line of lines) {
        transactions.push(
            handleLine(line)
        )
    }

    return transactions
}

function handleLine(line: TransactionInput[]): TransactionOutput[] {
    const tradeSummary: TradeSummary = {
        quantity: 0,
        mediumPrice: 0,
        previousLoss: 0
    }

    const transactions: TransactionOutput[] = []

    for (const item of line) {
        if (item.operation === OperationType.BUY) {
           handleBuyOperation(tradeSummary, item)
           transactions.push({ tax: 0 })
        } else {
            const output = handleSellOperation(tradeSummary, item)
            transactions.push({ tax: output.tax })
        }
    }

    return transactions
}

function calculateMediumPrice(tradeSummary: TradeSummary, transaction: TransactionInput): number {
    const currentQuantity = tradeSummary.quantity
    const currentMediumPrice = tradeSummary.mediumPrice
    const transactionTotal = transaction.quantity * transaction.unitCost
    const currentTotal = currentQuantity * currentMediumPrice

    return round((currentTotal + transactionTotal) / (currentQuantity + transaction.quantity))
}

function handleBuyOperation(tradeSummary: TradeSummary, transaction: TransactionInput): void {
    tradeSummary.mediumPrice = calculateMediumPrice(tradeSummary, transaction)
    tradeSummary.quantity += Number(transaction.quantity)
}

function handleSellOperation(tradeSummary: TradeSummary, transaction: TransactionInput): SellOperationOutput {
    const shouldStoreLoss = transaction.unitCost < tradeSummary.mediumPrice
    let tax = 0

    if (shouldCalculateTax(tradeSummary, transaction)) {
        tax = calculateTax(tradeSummary, transaction)
    }
    tradeSummary.quantity -= transaction.quantity

    if (shouldStoreLoss) {
        const loss = (tradeSummary.mediumPrice - transaction.unitCost) * transaction.quantity
        tradeSummary.previousLoss += loss
    }

    return { tax }
}

function shouldCalculateTax(tradeSummary: TradeSummary, transaction: TransactionInput): boolean {
    const operationAmount = transaction.quantity * transaction.unitCost
    const isSellOperation = transaction.operation === OperationType.SELL

    return isSellOperation
        && operationAmount > MAX_AMOUNT_WITHOUT_TAX
        && transaction.unitCost > tradeSummary.mediumPrice
}

export function calculateTax(tradeSummary: TradeSummary, transaction: TransactionInput): number {
    if (!shouldCalculateTax(tradeSummary, transaction)) {
        return 0
    }

    const previousLoss = tradeSummary.previousLoss
    const gain = (transaction.unitCost - tradeSummary.mediumPrice) * transaction.quantity

    if (previousLoss > 0) {

        if (previousLoss <= gain) {
            const tax = (gain - previousLoss) * TAX_PERCENT
            tradeSummary.previousLoss = 0
            return tax
        }

        tradeSummary.previousLoss -= gain
        return 0
    }

    return gain * TAX_PERCENT
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}
