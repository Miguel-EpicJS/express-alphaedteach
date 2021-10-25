const messages = {};

exports.getMessages = () => {
    return messages;
};

exports.addMessages = (user, msg) => {
    messages[user] = msg;
};