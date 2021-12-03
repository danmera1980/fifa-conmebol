var fs = require('fs');
var http = require('http');

http.createServer((req, res) => {
    if(req.url === '/api') {

        let allInfo = new Promise((resolve, reject) => {
            fs.readFile('./data.json', (err, data) => {
                if(err) return reject(err)
                resolve({data, contenType: 'application/json', status: 200})
            })
        })

        allInfo.then(data => {
            res.writeHead(data.status, {'Content-Type' : data.contenType})
            res.end(data.data)
        }).catch(err => {
            res.writeHead(404, {'Content-Type' : 'text/plain'})
            res.end('No hay informacion \n' + err)
        })
    } else {
        res.writeHead(404, {'Content-Type' : 'text/plain'})
        res.end('No hay esa ruta \n')
    }
}).listen(8888, '127.0.0.1')