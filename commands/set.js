const Discord = require("discord.js");
module.exports = {
	name: "set",
	description: "Adds your steamId to the games pool",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		const userId = msg.author.id;
		if (/\d{17}/.test(args[0])){
			if (steamIds.has(userId)){
				msg.reply("SteamId already set. Use '!delete' to delete old Id, then call '!set' with new Id");
			} else{
				steamIds.set(userId, args[0])
				msg.reply(`successfully bound steamId ${args[0]} to your discord!`);
			}
		} else {
			msg.reply("Invalid SteamId. Needs to be 17-digit number");
		}
	}
};