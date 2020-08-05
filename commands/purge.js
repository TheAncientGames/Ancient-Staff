const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("did you really think you could do that?");
    if (!args[0]) return message.reply("did your really think you could remove air?");
    if (Number.isInteger(parseInt(args[0]))) {
        var amount = parseInt(args[0]) + 1;
        message.channel.bulkDelete(amount).then(() =>{
            if (args[0] <=0 ) {
                message.reply("did your really think you could remove air?").then(msg => msg.delete({ timeout: 4000 }));
            } else if (args[0] == 1) {
                message.reply("I Remove 1 Message For You I Hope You Enjoy it").then(msg => msg.delete({ timeout: 4000 }));
            } else if (args[0] > 100) {
                message.reply("I Am Sorry But You Can Only Remove Up To 99 Messages").then(msg => msg.delete({ timeout: 4000 }));
            } else {
                message.reply(`I Remove ${args[0]} Message's For You I Hope You Enjoy it`).then(msg => msg.delete({ timeout: 4000 }));
            }
        })
        
    } else {
        return message.reply("did you really think a word was a number?!?")
    }
        
}

module.exports.help = {
    name: "purge"
}