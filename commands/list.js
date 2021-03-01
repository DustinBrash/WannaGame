module.exports = {
	name: "list",
	description: "Debug command to list map of snowflakes to steamIds",
	needsIds: true,
	execute(msg, args) {
		const steamIds = args[args.length - 1];
		msg.reply(steamIds.map((val, index) => [String(index), String(val)].join("->")).join(", "));
	}
};