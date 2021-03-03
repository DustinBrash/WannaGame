const fetch = require('node-fetch');
require('dotenv').config();

exports.querySteam = async (steamId) => {
			let out = [];
			const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?format=json&include_appinfo=true&key=${process.env.STEAM_API}&steamid=${steamId}`);
			const myJson = await response.json(); //extract JSON from the http response
			myJson['response']['games'].forEach(x => out.push(x['name']))// do something with myJson
			return out;
};
		
exports.getGamesIntersect = async (snowflakes, steamIds) => {
	const gameMap = new Discord.Collection();
		for (let [snowflake, steam] of steamIds.filter((gameId, memId) => snowflakes.includes(memId))){
			const gameList = await helper.querySteam(steam);
			gameMap.set(snowflake, gameList);
		};
		if (gameMap.size !== 0) {
			gameMap = gameMap.reduce((acc, games) => acc.filter(entry => games.includes(entry))).sort(function(a,b) {
				a = a.toLowerCase();
				b = b.toLowerCase();
				if( a == b) return 0;
				return a < b ? -1 : 1;
			});
		}
		return gameMap;
};