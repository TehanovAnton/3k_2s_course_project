const { resourceUsage } = require("process");

function Service(type) {
    this.type = type;
    this.attributes = Object.keys(type.getAttributes());

    this.updateAttributes = function(params) {
        let paramsKeys = Object.keys(params);

        for(let i = 0; i < paramsKeys.length; i++) {
            if(!this.attributes.includes(paramsKeys[i])) {
                delete params[paramsKeys[i]];
            }
        }

        return params;
    };

    this.delete = async function(res, Type, id) {
        let park = await Type.findByPk(id);
        let result = await Type.destroy(
            { 
                where:{ id:id },
                returning: true, 
                plain: true
            }
        ).catch(error => { res.json(error) });

        if(result) res.json(park);
        else res.json('park not found')
    };

    return this;
};

module.exports = { Service };