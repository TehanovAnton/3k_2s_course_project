const { express, application } = require('./initializers/express');
const { PORT } = require('./initializers/server');

application.listen(PORT, () => { console.log('application start'); });