
const { sequelize, DataTypes } = require('../db/database');
const Park = require('../models/park')(sequelize, DataTypes);

const  Service = require('../services/service').Service(Park);
const parksRouter = require('express').Router();

parksRouter.get('/parks', async (req, res) => {
    let parks = await Park.findAll();
    res.json(parks)
})

parksRouter.post('/parks', async (req, res) => {
    let body = '';

    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        let object = JSON.parse(body);

        let park = await Park.create({ 
            capacity:object['capacity'],
            company_id:object['company_id']
        }).catch(error => { res.json(error) });

        res.json(park);        
    });
})

parksRouter.put('/parks/:id', async (req, res) => {
    let body = '';
    let params = req.params;

    req.on('data', chunk => { body += chunk. toString(); });
    req.on('end', async () => {
        let updates = Service.updateAttributes(JSON.parse(body));        
        let result = await Park.update(
            updates, { where: { id:params['id']}, returning: true, plain: true}
        )
        .catch(error => { res.json(error) });

        if(result[1]) res.json(result[1]);
        else res.json('park not found or not updated')
    });
})

parksRouter.delete('/parks/:id', async (req, res) => {
    let params = req.params;
    let park = await Service.delete(res, Park, params['id'])
    
    if(park) res.json(park);
    else res.json('park not found')
})

module.exports = parksRouter;
