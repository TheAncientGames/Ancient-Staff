const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.channel.send(`Hello ${message.member.user.username} how is your day?`);
}

module.exports.help = {
    name: "hello"
}