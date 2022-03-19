const { express, application } = require('./initializers/express');
const { PORT } = require('./initializers/server');

application.listen(process.env.PORT || 5000, () => { console.log(`application start:${process.env.PORT}`); });