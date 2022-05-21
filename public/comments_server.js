const { appWithSockets } = require('../initializers/express_config');
const { io } = require('../initializers/express');
const { Work } = require('../models/associate');

io.on('connection', (socket) => {  
  socket.on('comment', async (message) => {    

    console.log(JSON.stringify(message));
    let work = await Work.findByPk(message.commentableId)
    let comment = await work.createComment(message)

    io.emit('comment_posted', comment.message)
  });
});

module.exports = appWithSockets;
