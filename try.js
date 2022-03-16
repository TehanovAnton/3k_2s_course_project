const Sequelize = require('sequelize');
const { DB_NAME, USER_NAME, USER_PASSWORD } = require('./db/database');

const sequelize = new Sequelize(
    DB_NAME, USER_NAME, USER_PASSWORD,
    { dialect:'mssql', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

const Role = require('./models/role').Role();
const User = require('./models/user').User();
const Company = require('./models/company').Company();
const Park = require('./models/park').Park();


let rolesCreateExample = () => {
    Role.create({ title:'hay' })
    .then ((task) => {
        console.log(task);
    })
    .catch(err => {
        console.log(err);
    });
}

let rolesGetAllExample = async () => {
    roles = await Role.findAll();
    console.log(JSON.stringify(roles));
}

let usersCreateExample = () => {
    User.create({ nickname:'hay', email:'hay@gmail.com', password:'ewqqwe', role_id:0 })
    .then ((user) => {
        console.log(user);
    })
    .catch(err => {
        console.log(err);
    });
}

let usersGetExample = () => {
    User.findOne({ where:{ id:0 }, include: 'role' })
    .then((user) => {
        console.log(JSON.stringify(user.role));
    })
    .catch((err) => { console.log(err); })
}

let companiesCreateExample = () => {
    Company.create({ name:'Anton', email:'tehanovanton@gmail', user_id:0 })
    .then ((company) => {
        console.log(company);
    })
    .catch(err => {
        console.log(err);
    });
}

let companiesGetExample = () => {
    Company.findOne({ where:{ id:1 }, include: 'user' })
    .then((obj) => {
        console.log(JSON.stringify(obj));
        console.log(JSON.stringify(obj.user));
    })
    .catch((err) => { console.log(err); })
}

let companiesUpdateExample = () => {
    Company.update(
        { name:'HaYo' },
        { where: { id:0 } }
    )
    .then((company) => {
        console.log(company);
    })
    .catch(error => { console.log(error); });    
}

let parksGetExample = () => {
    Park.findOne({ where:{ id:0 } })
    .then((obj) => {
        console.log(JSON.stringify(obj));
    })
    .catch((err) => { console.log(err); })
}

companiesCreateExample();