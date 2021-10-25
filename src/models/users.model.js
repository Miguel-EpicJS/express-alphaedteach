const users = {};

exports.getUsers = () => {
    return users;
};

exports.addUser = (user, inf) => {
    users[user] = inf;
};

exports.validPassword = (ps, us, obj) =>
{
    return obj[us].password === ps;
};