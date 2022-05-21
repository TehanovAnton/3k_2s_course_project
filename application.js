const appWithSockets = require('./public/comments_server');
const port = process.env.PORT || 5000;

appWithSockets.listen(port, () => { console.log(`application start:${port}`); });
