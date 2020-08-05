const discord = require('discord.js');
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.replay(`Did You Really Think Your Role Was A Mod Or Higher? ${message.member.user.username} Why Are You Dumb?`);
    message.channel.bulkDelete(1)
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply(`${message.member.user.username} I Am Sorry But I Don't Have Permissions To Perform This Command`);
    message.channel.bulkDelete(1)
    if (!args[0]) return message.reply(` I am sorry but I am scared to unwarn ghosts.`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (!args[1]) return message.reply(` I see you didn't put a reason. Why do I need to unwarn a player for air?`).then(msg => msg.delete({ timeout: 4000 }));
    var unwarnUser = message.guild.member(message.mentions.users.first());
    var reason = args.slice(1).join(" ");
    if (!unwarnUser) return message.reply(`I Am Sorry But I Am Scared To unWarn Ghosts`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (unwarnUser.hasPermission("ADMINISTRATOR")) return channel.send('unWarn Failed unWarning Admin').then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (!warns[unwarnUser.id] === 0) return message.reply(`I am Sorry But ${unwarnUser} doesn't have any warns`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (!warns[unwarnUser.id]) return message.reply(`I am Sorry But ${unwarnUser} doesn't have any warns`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    warns[unwarnUser.id].warns--;
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

    })

    var unwarnembed = new discord.MessageEmbed()
        .setColor("RED")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .addField("__Times Warned__", warns[unwarnUser.id].warns)
        .setDescription(`**unwarned User** ${unwarnUser}
            **Unwarned By** ${message.author}
            **Reason** ${reason}`);
    message.channel.send(unwarnembed).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    var channel = unwarnUser.guild.channels.cache.find(ch => ch.name === 'bot-logs');
    if (!channel) return;
    channel.send(unwarnembed);
    unwarnUser.send(unwarnembed)



}

module.exports.help = {
    name: "unwarn"
}