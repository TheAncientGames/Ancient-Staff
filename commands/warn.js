const discord = require('discord.js');
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.replay(`Did You Really Think Your Role Was A Mod Or Higher? ${message.member.user.username} Why Are You Dumb?`);
    message.channel.bulkDelete(1)
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`${message.member.user.username} I Am Sorry But I Don't Have Permissions To Perform This Command`);
    message.channel.bulkDelete(1)
    if (!args[0]) return message.reply(` I am sorry but I am scared to warm ghosts.`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (!args[1]) return message.reply(` I see you didn't put a reason. Why do I need to warn a player for air?`).then(msg => msg.delete({ timeout: 4000 }));
    var warnUser = message.guild.member(message.mentions.users.first());
    var reason = args.slice(1).join(" ");
    if (!warnUser) return message.reply(`I Am Sorry But I Am Scared To Warn Ghosts`).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (warnUser.hasPermission("KICK_MEMBERS")) return message.reply('Warn Failed Warning Admin').then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }
    warns[warnUser.id].warns++;
    message.channel.bulkDelete(1)
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

    })

    var warnembed = new discord.MessageEmbed()
        .setColor("RED")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .addField("Times Warned", warns[warnUser.id].warns)
        .setDescription(`**warned User** ${warnUser}
            **Warned By** ${message.author}
            **Reason** ${reason}`);
    message.channel.send(warnembed).then(msg => msg.delete({ timeout: 4000 }));
    message.channel.bulkDelete(1)
    var channel = warnUser.guild.channels.cache.find(ch => ch.name === 'bot-logs');
    if (!channel) return;
    channel.send(warnembed);
    warnUser.send(warnembed)



}

module.exports.help = {
    name: "warn"
}