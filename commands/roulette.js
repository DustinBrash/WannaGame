const fetch = require('node-fetch');

module.exports = {
	name: "roulette",
	description: "Picks a random game everyone in the call has in common",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		const vcMemIds = msg.member.voice.channel.members.keyArray();				
		getGamesIntersect(vcMemIds, steamIds).then(gameMap => {msg.channel.send(gameMap.random())});
	}
};