const discord = require('discord.js');
const botConfig = require("./botconfig.json");

const fs = require("fs")

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("no files found");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`the file ${f} is loaded in`);

        client.commands.set(fileGet.help.name, fileGet);
    })


});


client.on("ready", async () => {
    console.log(`${client.user.tag} is banning users`);
    client.user.setActivity(`Scripting ${client.user.username}`, { type: "WATCHING" });
});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);



    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);


    client.on('guildMemberAdd', member => {
        var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;
        channel.send(`${member} Is Trying Out A New Life`);
    })

});

client.login(process.env.token);