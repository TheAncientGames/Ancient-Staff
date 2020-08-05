

const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Did You Really Think Your Role Was A Mod Or Higher? ${message.member.user.username} Why Are You Dumb?`);
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`${message.member.user.username} I Am Sorry But I Don't Have Permissions To Perform This Command`);
        if (!args[0]) return message.reply(` I am sorry but I am scared to kick ghosts.`);
        if (!args[1]) return message.reply(` I see you didn't put a reason. Why do I need to kick a player for air?`);
        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        var reason = args.slice(1).join(" ");
        if (!kickUser) return message.reply(`I Am Sorry But I Am Scared To Kick Ghosts`);
        var confirmKickEmbed = new discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("__**Confirm Kick**__")
            .setFooter(`${message.member.user.username} You Have 60 Seconds To React.`)
            .setDescription(`Are You Sure You Want To Kick ${kickUser}?`);
        var kickedembed = new discord.MessageEmbed()
            .setColor("RED")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Kicked User** ${kickUser}
            **Kicked By** ${message.author}
            **Reason** ${reason}`);

        message.channel.send(confirmKickEmbed).then(async msg => {
            var emoji = await promptMessage(msg, message.author, 60, ["🟩", "🟥"])
            if (emoji === "🟩") {
                msg.delete();
                kickUser.kick(reason).catch(err => {
                    if (err) var channel = kickUser.guild.channels.cache.find(ch => ch.name === 'bot-logs');
                    if (err) if (!channel) return;
                    if (err) channel.send("I Am Sorry But Something Went Wrong. User Not Kicked");
                    if (err) return message.channel.send(`${message.author} I Am Sorry But Something Went Wrong. User Not Kicked`).then(msg => msg.delete({ timeout: 4000 }));
                });
                message.channel.send(kickedembed).then(msg => msg.delete({ timeout: 4000 }));
                message.channel.bulkDelete(1)
                kickUser.send(kickedembed)
                var channel = kickUser.guild.channels.cache.find(ch => ch.name === 'bot-logs');
                if (!channel) return;
                channel.send(kickedembed);
            } else if (emoji === "🟥") {
                msg.delete();
                message.channel.bulkDelete(1)
                return message.reply(`You Have Saved ${kickUser} From Death`).then(msg => msg.delete({ timeout: 4000 }));
            }

        })


    }


async function promptMessage(message, author, time, reactions) {
    time *= 1000;
    for (const reaction of reactions) {
        await message.react(reaction);
    }
    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}


module.exports.help = {
    name: "kick"
}