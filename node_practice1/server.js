import http from 'node:http'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer(async (req, res) => {
    try {
        await serveStatic(req, res, __dirname)
    } catch (err) {
        console.error('Server error:', err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Internal Server Error')
    }
})

server.listen(PORT, () => console.log(`Connected on PORT: ${PORT}`))
