module.exports = {
	name: "delete",
	description: "Removes your steamId from the games pool",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		const userId = msg.author.id;
		const oldId = steamIds.get(userId);
		steamIds.delete(userId);
		msg.reply(`Removed SteamId ${oldId}`);
	}
};