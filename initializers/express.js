const express = require('express');
const application = express()
const appWithSockets = require('http').createServer(application);
const io = require('socket.io')(appWithSockets);

module.exports = { express, application, appWithSockets, io };
