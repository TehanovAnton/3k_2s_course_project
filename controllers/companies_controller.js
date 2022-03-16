
const { companyService, Company } = require('../services/company_service');
const companiesRouter = require('express').Router();
const helpers = require('../helpers/helpers');

companiesRouter.get('/companies/index', async (req, res) => {
    let companies = await Company.findAll({ raw:true });
    res.render('./companies/index', { activate:true, companies: companies })
})

companiesRouter.get('/companies/new', async (req, res) => {
    let companies = await Company.findAll({ raw:true });
    res.render('./companies/new', { companies: companies })
})

companiesRouter.post('/companies/create', async function(req, res, next) {   
    let params = req.body;
    console.log(params);
    let company = await Company.create({ 
        name:params['name'],
        email:params['email'],
        user_id:parseInt(params['user_id'])
    }).catch(error => { res.json(error) });

    res.redirect(helpers.companiesIndexPath());        
})

companiesRouter.get('/companies/:id/edit', async (req, res) => {
    let companies = await Company.findAll({ raw:true });
    let company = await Company.findOne({ raw:true });
    res.render('./companies/edit', { activate:false, companies:companies, company:company })
})

companiesRouter.post('/companies/:id/update', async (req, res) => {
    let params = req.params, body = req.body;

    let updates = companyService.updateAttributes(body);        
    let result = await Company.update(
        updates, { where: { id:params['id']}, returning: true, plain: true}
    )
    .catch(error => { res.json(error) });        

    if(result[1]) res.redirect(helpers.companiesIndexPath());
    else res.json('company not found or not updated')
})

companiesRouter.get('/companies/:id/delete', async (req, res) => {
    let params = req.params;    
    let result = await Company.destroy(
        { 
            where:{ id:params['id'] },
            returning: true, 
            plain: true
        }
    ).catch(error => { res.json(error) });
    
    if(result) res.redirect(helpers.companiesIndexPath());
    else res.json('company not found')
})

module.exports = companiesRouter;