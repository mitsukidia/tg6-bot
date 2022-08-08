const discord = require('discord.js')
const client = new Discord.Client()
const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();

const işaret = require('./işaret.json')
const prefix = işaret.prefix

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.command.set(command.kod, command);
}


client.on("error", console.error);

client.on('ready', () => {
    client.user.setStatus('Reyizzers')
    console.log('Botumuz Aktif')
});


client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login('OTgzNzYxNzY1NTQ2NDg3ODM4.G1I87x.FUwvSfdUSmg9zrmXRBXgU46rJvBfa6kxbyvevk')
