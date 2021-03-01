const Discord = require("discord.js");
const helper = require('../helpers.js');

module.exports = {
	name: "games",
	description: "Lists all the games everyone in the call have in common",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		const vcMemIds = msg.member.voice.channel.members.keyArray();
		
		var gameMap = new Discord.Collection();
		const forLoop = async _ => {
			for (let [snowflake, steam] of steamIds.filter((gameId, memId) => vcMemIds.includes(memId))){
				const gameList = await helper.querySteam(steam);
				gameMap.set(snowflake, gameList);
			};
		}		
		
		forLoop().then(_ => {
			if (gameMap.size === 0)
				msg.reply("No one has signed up");
			else {
				const reducedGames = gameMap.reduce((acc, games) => acc.filter(entry => games.includes(entry))).sort(function(a,b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if( a == b) return 0;
					return a < b ? -1 : 1;
				});
				msg.channel.send(reducedGames.join("\n"), {split: true});
			}
		});	
		//todo need to filter gameMap based on snowflakes of people in caller's vc
	}
};