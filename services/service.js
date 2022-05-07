const { resourceUsage } = require('process');

function Service(type) {
  this.type = type;
  this.attributes = Object.keys(type.getAttributes());

  this.updateAttributes = function (params) {
    const paramsKeys = Object.keys(params);

    for (let i = 0; i < paramsKeys.length; i++) {
      if (!this.attributes.includes(paramsKeys[i])) {
        delete params[paramsKeys[i]];
      }
    }

    return params;
  };

  this.delete = async function (res, Type, id) {
    const park = await Type.findByPk(id);
    const result = await Type.destroy(
      {
        where: { id },
        returning: true,
        plain: true,
      },
    ).catch((error) => { res.json(error); });

    if (result) res.json(park);
    else res.json('park not found');
  };

  return this;
}

module.exports = { Service };
