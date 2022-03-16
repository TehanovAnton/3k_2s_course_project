
const Company = require('../models/company').Company();

const companyService = {
    userAttributes: Object.keys(Company.getAttributes()),

    updateAttributes: function(params) {
        let paramsKeys = Object.keys(params);

        for(let i = 0; i < paramsKeys.length; i++) {
            if(!this.userAttributes.includes(paramsKeys[i])) {
                delete params[paramsKeys[i]];
            }
        }

        return params;
    }
};

module.exports = { companyService, Company }