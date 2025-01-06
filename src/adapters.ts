export function operationInputFromTTY(process: NodeJS.Process): string {
    const args = process.argv.slice(2)
    return args.length ? args[0] : ''
}

export async function operationInputFromFileRedirect(process: NodeJS.Process): Promise<string> {
    if (process.stdin.isTTY) {
        return ''
    }
    const chunks: Buffer[] = []
    process.stdin.on('data', (chunk) => chunks.push(chunk))

    return new Promise<string>((resolve, reject) => {
        process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString()))
        process.stdin.on('error', reject)
    })
}
