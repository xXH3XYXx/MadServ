const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Testing"),
    async execute(interation) {
        interation.reply("Testing");
    }
}