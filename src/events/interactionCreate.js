
const EchoInteraction = require('../interactions/echo');
const { Permissions } = require('discord.js');
const CounterInteractions = require('../interactions/counterInteractions');
const CountdownInteractions = require('../interactions/countdownInteractions');


module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isCommand()) {
			return;
		}
		if (interaction.client.commands.has(interaction.commandName)) {
			switch (interaction.commandName) {
				case 'tgcounter':
					if (interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) {
						if (interaction.options.getSubcommand() === 'register') {
							CounterInteractions.registertgcounter(interaction);
						}
						else if (interaction.options.getSubcommand() === 'update') {
							CounterInteractions.updatetgcounter(interaction);
						}
					}
					else {
						interaction.reply('You do not have permission to use this command!');
						return;
					}
					break;
				case 'tgcountdown':
					if (interaction.member.permissions.has([Permissions.FLAGS.SEND_MESSAGES])) {
						if (interaction.options.getSubcommand() === 'add') {
							CountdownInteractions.add(interaction);
						}
						else if (interaction.options.getSubcommand() === 'delete') {
							CountdownInteractions.delete(interaction);
						}
					}
					else {
						interaction.reply('You do not have permission to use this command!');
						return;
					}
				case 'echo':
					EchoInteraction.execute(interaction);
				default:
					const command = interaction.client.commands.get(interaction.commandName);

					if (!command) {
						return;
					}

					try {
						await command.execute(interaction);
					} catch (err) {
						if (err) console.error(err);

						await interaction.reply({
							content: "An error occurred while executing that command.",
							ephemeral: true,
						});
					}
					break;
			}
		}
	}
}
