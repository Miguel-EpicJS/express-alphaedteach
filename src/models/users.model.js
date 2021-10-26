const users = {};
const bcrypt = require("bcrypt");

exports.getUsers = () => {
    return users;
};

exports.addUser = (user, inf) => {
    users[user] = inf;
};

exports.validPassword = (ps, us, obj) =>
{
    return bcrypt.compareSync(obj[us].password, ps);
};