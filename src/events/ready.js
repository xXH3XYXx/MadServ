const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log("MadServ is online.");
		// Sets bot Presence status.
		client.user.setPresence({ activities: [{ name: "MadServ", type: "WATCHING" }] })

		const CLIENT_ID = client.user.id;

		const rest = new REST({
			version: "9",
		}).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');
				let commandsToRegister = [];
				client.commands.forEach((command) => {
					commandsToRegister.push(command.toJSON());
				});
				if (process.env.ENV === "production") {
					await rest.put(
						Routes.applicationGuildCommands(CLIENT_ID),
						{ body: commandsToRegister },
					);
				}
				else {
					await rest.put(
						Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
						{
							body: commands,
						}
					);
				}

				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	},
};
