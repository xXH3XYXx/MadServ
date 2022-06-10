const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("echo's your input")
        .addStringOption((option) =>
        option
              .setName("message")
              .setDescription("The message to echo.")
              .setRequired(true)
              )
}