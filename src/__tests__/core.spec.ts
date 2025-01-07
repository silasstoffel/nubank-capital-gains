import { calculateTax, handleOperation } from '../core'
import { OperationType } from '../types'
import { createTradeSummary, createTransactionInput } from './factory'
import { scenarios } from './scenarios'

describe('Core', () => {

 describe('handleOperation', () => {
    test.each(scenarios)('Handle operation: %s', (_, input: string, expected) => {
        expect(handleOperation(input)).toEqual(expected)
    })

    it('Should not process empty input', () => {
        expect(handleOperation(null as unknown as string)).toEqual([])
    })

    it('Should return an empty line when items is empty', () => {
        expect(handleOperation('[]')).toEqual([[]])
    })
 })

 describe('calculateTax', () => {

    describe('When transaction total is equal or less than 20K', () => {
        it('Tax should be zero', () => {
            const tradeSummary = createTradeSummary()
            const input = createTransactionInput({
                quantity: 10000,
                operation: OperationType.SELL,
                unitCost: 1.99
            })

            expect(calculateTax(tradeSummary, input)).toBe(0)
        })
    })

    describe('When operation is buy', () => {
        it('Tax should be 0', () => {
            const tradeSummary = createTradeSummary()
            const input = createTransactionInput({
                quantity: 10000,
                operation: OperationType.BUY,
                unitCost: 5
            })

            expect(calculateTax(tradeSummary, input)).toBe(0)
        })
    })

    describe('When there is a tax to calculate and non previous loss', () => {
        it('Should calculate tax', () => {
            const tradeSummary = createTradeSummary()
            const input = createTransactionInput({
                quantity: 10000,
                operation: OperationType.SELL,
                unitCost: 3
            })

            expect(calculateTax(tradeSummary, input)).toBe(2000)
        })
    })

    describe('When there is a tax to calculate and previous loss is greater than tax', () => {
        it('Tax should be 0', () => {
            const tradeSummary = createTradeSummary({
                previousLoss: 11000
            })
            const input = createTransactionInput({
                quantity: 10000,
                operation: OperationType.SELL,
                unitCost: 3
            })

            expect(calculateTax(tradeSummary, input)).toBe(0)
        })
    })

    describe('When there is a tax to calculate and previous loss is less than tax', () => {
        it('Should subtract the loss from tax', () => {
            const tradeSummary = createTradeSummary({
                previousLoss: 3000
            })
            const input = createTransactionInput({
                quantity: 10000,
                operation: OperationType.SELL,
                unitCost: 3
            })

            expect(calculateTax(tradeSummary, input)).toBe(1400)
        })
    })
 })

})
