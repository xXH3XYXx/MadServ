const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Command to purge [500] messages from channels.")
        .addStringOption((option) =>
        option
              .setName("amount")
              .setDescription("amount of messages to purge [500]")
              .setRequired(true)
              ),
    async execute(interaction) {
        let amount = interaction.options.getNumber('amount');
        if (amount <= 100) {
            interaction.bulkDelete(amount, true);
        }
    }
}