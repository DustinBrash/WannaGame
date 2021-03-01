const fetch = require('node-fetch');
require('dotenv').config();

exports.querySteam = async (steamId) => {
			let out = [];
			const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?format=json&include_appinfo=true&key=${process.env.STEAM_API}&steamid=${steamId}`);
			const myJson = await response.json(); //extract JSON from the http response
			myJson['response']['games'].forEach(x => out.push(x['name']))// do something with myJson
			return out;
};
		
exports.getGames = (steamId) => {
	return [];
};