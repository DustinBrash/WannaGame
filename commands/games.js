const Discord = require("discord.js");
const helper = require('../helpers.js');

module.exports = {
	name: "games",
	description: "Lists all the games everyone in the call have in common",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		const vcMemIds = msg.member.voice.channel.members.keyArray();				
		getGamesIntersect(vcMemIds, steamIds).then(gameMap => {msg.channel.send(gameMap.join("\n"), {split:true})});	
		//todo need to filter gameMap based on snowflakes of people in caller's vc
	}
};