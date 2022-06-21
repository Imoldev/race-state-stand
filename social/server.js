const SockJS = require('sockjs-client');

const initConnection = () => {

    const connection = new SockJS('http://ws-server:3000/echo');

    connection.onopen = () => {
        console.log('open connection', (new Date()).toTimeString());
    };


    connection.onclose = () => {
        console.log('connection was closed- reopen', (new Date()).toTimeString());
        initConnection();
    };

};

initConnection();

