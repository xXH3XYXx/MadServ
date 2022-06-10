module.exports = {
    execute: (interaction) => {
        interaction.reply({
            content: interaction.options.getString("message")
        });
    }
}