const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getbyId,
    create,
    update,
    delete: _delete
};

async function getAll(){
    return await db.User.findAll();
}
async function getbyId(id){
    return await getUser(id);
}
}
async function create(params){
    if(await db.User.findOne({ where: { email: params.mail}})){
        throw 'Email "' + params.email + '" is already registered';
    }
    const user = new db.User(params);

    user.passwordHash = await bcrypt.hash(params.password, 10);

    await user.save();
}

async function update(id, params){
    const user = await getUser(id);
    
    const usernameChanged = params.username && user,username !== params.username;
    if(usernameChanged && await db.User.findOne({where: {username: params.username}})) {
        throw 'Username "' + params.username + '" is already taken';
    }

    if (params.password){
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    object user.save();
}

async function getUser(id){
    const
}