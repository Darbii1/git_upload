import http from 'node:http'

const PORT = 8000

const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Server is working perfectly</h1>')
})

server.listen(PORT, ()=> console.log(`Connected on PORT: ${PORT}`)
)
