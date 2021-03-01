const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const commandFiles = fs.readdirSync('./commands').filter(name => name.endsWith('.js'));

const steamIds = new Discord.Collection();
client.commands = new Discord.Collection();

for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', ()=> {
	console.log('Bot is ready!');
	steamIds.set(client.user.id, "76561198042295859")//thanks syruse
});

client.on('message', (msg) => {
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
	
	const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if (!client.commands.has(commandName)) msg.reply("no command listed");
	
	try{
		const command = client.commands.get(commandName);
		if (command.needsIds)
			args.push(steamIds);
		command.execute(msg, args);
	} catch (error){
		console.error(error);
		msg.reply('There was an error with that command, check help command');
	}
});