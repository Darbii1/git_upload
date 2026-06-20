import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export async function getData() {
    try {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const pathJSON = path.join(__dirname, '..', 'data', 'data.json')
        const data = await fs.readFile(pathJSON, 'utf-8')
        const parsedData = data ? JSON.parse(data) : []
        return parsedData
    } catch (err) {
        console.error('getData error:', err)
        return []
    }
}