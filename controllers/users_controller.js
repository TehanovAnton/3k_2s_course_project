
const { userService, User } = require('../services/user_service');
const usersRouter = require('express').Router();

usersRouter.get('/users', async (req, res) => {
    let users = await User.findAll();
    res.json(users)
})

usersRouter.post('/users', async (req, res) => {
    let body = '';

    req.on('data', chunk => { body += chunk. toString(); });
    req.on('end', async () => {
        let object = JSON.parse(body);

        let user = await User.create({ 
            nickname:object['nickname'],
            email:object['email'],
            password:object['password'],
            role_id:object['role_id']
        }).catch(error => { res.json(error) });

        res.json(user);        
    });
})

usersRouter.put('/users/:id', async (req, res) => {
    let body = '';
    let params = req.params;

    req.on('data', chunk => { body += chunk. toString(); });
    req.on('end', async () => {
        let updates = userService.updateAttributes(JSON.parse(body));        
        let result = await User.update(
            updates, { where: { id:params['id']}, returning: true, plain: true}
        )
        .catch(error => { res.json(error) });

        if(result[1]) res.json(result[1]);
        else res.json('user not found or not updated')
    });
})

usersRouter.delete('/users/:id', async (req, res) => {
    let params = req.params;

    let user = await User.findByPk(params['id']);
    let result = await User.destroy(
        { 
            where:{ id:params['id'] },
            returning: true, 
            plain: true
        }
    ).catch(error => { res.json(error) });
    
    if(result) res.json(user);
    else res.json('user not found')
})


module.exports = usersRouter;