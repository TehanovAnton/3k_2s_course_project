
const { userService, User } = require('../services/user_service');
const { passport, authenticate } = require('../services/authentication_service')
const { authorize } = require('../abilities/usersAbilies')
const bodyParser = require('body-parser')()
const usersRouter = require('express').Router();


usersRouter.get('/users',
    authenticate(),
    authorize('readAll'),
    
    async (req, res) => {
        let users = await User.findAll({ raw:true });
        res.json(users)
    }
)


usersRouter.post('/users', bodyParser,
    
    async (req, res) => {
        let body = req.body

        console.log(body);

        let user = await User.create({ 
            nickname:body.nickname,
            email:body.email,
            password:body.password,
            role_id:body.role_id
        }).catch(error => { res.json(error) });

        res.json(user);        
    }
)


usersRouter.put('/users/:id', bodyParser,
    authenticate(),
    authorize('update'),

    async (req, res) => {
        let body = req.body;
        let params = req.params;

        let updates = userService.updateAttributes(body);        
        let result = await User.update(
            updates, { where: { id:params['id']}, returning: true, plain: true}
        )
        .catch(error => { res.json(error) });

        let updatedUser = result[1]
        if(updatedUser)
            res.json(updatedUser);
        else 
            res.json('user not found or not updated')
    }
)


usersRouter.delete('/users/:id', 
    authenticate(),
    authorize('delete'),

    async (req, res) => {
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
    }
)


module.exports = usersRouter;