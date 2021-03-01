const Discord = require("discord.js");
module.exports = {
	name: "help",
	description: "Help box, to do later",
	needsIds: false,
	execute(msg, args) {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle("Help")
			.setDescription("This is the bot to use when you lazy dumdums wanna do stuff, but don't know what.")
			.addField('Add to directory', 'DM me with the `!set <SteamId>` command, where `<steamId>` is the 17 digit number with your steam account')
			.addField('Remove from directory', 'DM me with the `!delete` command')
			.addField('Find a game to play', 'in a public channel, use `!games` to see what everyone has in common');
		msg.channel.send(helpEmbed);
	}
};