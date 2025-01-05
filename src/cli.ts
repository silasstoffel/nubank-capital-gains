import process from 'process'
import { handleOperation } from './core'
import { TransactionOutput } from './types'
import {
    COMMAND,
    HELP_OPTION,
    SHORT_HELP_OPTION,
    SHORT_VERSION_OPTION,
    VERSION,
    VERSION_OPTION
} from './env'
import { operationInputFromFileRedirect, operationInputFromTTY } from './adapters'

export async function main() {
    let input = process.stdin.isTTY ?
        operationInputFromTTY(process) :
        await operationInputFromFileRedirect(process)

    if (!input) {
        console.error('No arguments provided.')
        process.exit(1)
    }

    if ([HELP_OPTION, SHORT_HELP_OPTION].includes(input)) {
        printHelpOptions()
        process.exit(0)
    }

    if ([VERSION_OPTION, SHORT_VERSION_OPTION].includes(input)) {
        printVersion()
        process.exit(0)
    }

    const output = handleOperation(input)
    printResult(output)
    process.exit(0)
}

function printVersion() {
    console.log(VERSION)
}

function printHelpOptions() {
    console.log(`\nCapital Gains: ${VERSION}\n`)

    console.log('Usage:')
    console.log(`1. ${COMMAND} '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]'`)
    console.log(`2. ${COMMAND} < file.json\n`)

    console.log('Options:')
    console.log('--help, -h     Print this help message')
    console.log('--version, -v  Print the version number\n')
}

function printResult(output: TransactionOutput[][]) {
    console.log('Tax Detail:')
    for (const transaction of output) {
        console.log(JSON.stringify(transaction));
    }
}
