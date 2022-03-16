
const User = require('../models/user').User()

const userService = {
    userAttributes: Object.keys(User.getAttributes()),

    updateAttributes: function(params) {
        let paramsKeys = Object.keys(params);

        for(let i = 0; i < paramsKeys.length; i++) {
            if(!this.userAttributes.includes(paramsKeys[i])) {
                delete params[paramsKeys[i]];
            }
        }

        return params;
    }
}

module.exports = { userService, User }