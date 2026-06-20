import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {
    const requestPath = req.url === '/' ? 'index.html' : req.url
    const normalizedPath = path.normalize(requestPath)
    const filePath = path.join(baseDir, normalizedPath)
    const safeBase = path.normalize(baseDir + path.sep)

    if (!filePath.startsWith(safeBase)) {
        sendResponse(res, 403, 'text/plain', 'Forbidden')
        return
    }

    const ext = path.extname(filePath) || '.html'
    const contentType = getContentType(ext)
    const isText = /^text\/|\/json$|javascript$/.test(contentType)

    try {
        const content = await fs.readFile(filePath, isText ? 'utf-8' : null)
        sendResponse(res, 200, contentType, content)
    } catch (err) {
        if (err.code === 'ENOENT') {
            try {
                const notFoundPath = path.join(baseDir, '404.html')
                const notFoundContent = await fs.readFile(notFoundPath, 'utf-8')
                sendResponse(res, 404, 'text/html', notFoundContent)
            } catch (loadErr) {
                sendResponse(res, 404, 'text/plain', 'Not Found')
            }
        } else {
            sendResponse(res, 500, 'text/plain', 'Internal Server Error')
        }
    }
}
