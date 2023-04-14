const http =  require('http');
const fs = require('fs');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const correctEmail = 'email@example.com';
const correctPassword = 'password';

const server = http.createServer((req, res) => {

    if (req.method.toUpperCase() === 'GET' && req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                console.log('Erro ao buscar o "index.html"');
                res.statusCode = 500;
                res.end('Erro interno do servidor');
            } else {
                // Define o cabeçalho HTTP
                res.setHeader('Content-Type', 'text/html');

                console.log('index.html');
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else if (req.method.toUpperCase() === 'GET' && req.url === '/styles.css') {
        fs.readFile('css/styles.css', (err, data) => {
            if (err) {
                console.log('Erro ao buscar o "style.css"');
                res.statusCode = 500;
                res.end('Erro interno do servidor');
            } else {
                // Define o cabeçalho HTTP
                res.setHeader('Content-Type', 'text/css');

                console.log('style.css');
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else if (req.method.toUpperCase() === 'POST' && req.url === '/login') {
        // inicializando variável com os dados do formulário
        let body = '';
        // obtendo os dados do formulário (por partes)
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = qs.parse(body);
            console.log('Dados recebidos com sucesso!');

            let email = formData.email;
            let password = formData.senha;

            let error = null;

            // Validação
            if (email !== correctEmail) {
                error = 'email';
            } else if (password !== correctPassword) {
                error = 'password';
            } else if (email === correctEmail && password === correctPassword) {
                error = null;
            }

            // Retorno
            if (error) {
                // Error
                fs.readFile('index.html', (err, data) => {
                    if (err) {
                        console.log(err);
                        console.log('Erro ao carregar "index.html"');

                        res.statusCode = 404;
                        res.end('Erro interno do servidor');
                    } else {
                        // Define o cabeçalho HTTP
                        res.setHeader('Content-Type', 'text/html');

                        console.log('index.html');
                        res.statusCode = 200;
                        res.end(data);
                    }
                })
            } else {
                // Sucessful
            }
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
});