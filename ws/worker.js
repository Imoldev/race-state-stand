const http = require('http');
const express = require('express');
const sockjs = require('sockjs');

const app = express();
const httpServer = http.createServer(app);
httpServer.listen(3000);

const delayer = () => {
    return new Promise((resolve, reject) => {
        console.log('delayer start');
        setTimeout(() => { 
            console.log('delayer consist');
            resolve() 
        }, 10000)
    })
}

const echo = sockjs.createServer({
    log: function (severity, message) {
        if (severity === "error") console.error('sockjsLog', message);
        if (severity == "info") console.info(message);
        if (severity == "debug") console.log(message);
    }
});
echo.installHandlers(httpServer, {
    prefix: '/echo'
});

echo.on('connection', async function (conn) {

    await delayer();
    console.log('on connection end', (new Date()).toTimeString());
})

