const application = require('./initializers/express_config');

const port = process.env.PORT || 5000;
application.listen(port, () => { console.log(`application start:${port}`); });
