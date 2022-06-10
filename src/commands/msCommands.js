const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: [
        new SlashCommandBuilder()
            .setName('purgee')
            .setDescription('Command to purge the channel')
            .addStringOption(option => 
                option
                .setName('amount')
                .setDescription('Amount to purge from channel[500]')
                )
    ]
}