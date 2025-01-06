
import process from 'process'
import { Readable } from 'stream'
import {
    operationInputFromTTY,
    operationInputFromFileRedirect
} from '../adapters'

describe('Adapters', () => {
    describe('operationInputFromTTY', () => {
        it('Should adapt input from tty source', () => {
            process.argv[0] = '/home/user/.nvm/versions/node/v22.12.0/bin/node',
            process.argv[1] = '/home/user/.npm/_npx/ba7ed77541fd2d59/node_modules/.bin/capital-gains',
            process.argv[2] = '[{"key": "value"}]'
            expect(operationInputFromTTY(process)).toBe('[{"key": "value"}]')
        })
    })

    describe('operationInputFromFileRedirect', () => {
        it('Should adapt input from file redirection', async () => {
            const mockInput = '[{"k1": "v1"}, {"k1": "v1"}]';
            const mockStdin = new Readable({
                read() {
                    this.push(mockInput)
                    // simulate end of input
                    this.push(null)
                },
            })

            Object.defineProperty(process, 'stdin', {
                value: mockStdin,
                configurable: true,
            })

            const result = await operationInputFromFileRedirect(process);
            expect(result).toBe(mockInput);
        })

        it('Should return empty string if is tty', async () => {
            const mockInput = '[{"k1": "v1"}, {"k1": "v1"}]'
            process.stdin.isTTY = true
            const result = await operationInputFromFileRedirect(process);
            expect(result).toBe('');
        })
    })
})


