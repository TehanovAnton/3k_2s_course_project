const { application } = require('./initializers/express');

application.listen(process.env.PORT || 5000, () => { console.log(`application start:${process.env.PORT}`); });