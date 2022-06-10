module.exports = {
    purgee: (interaction) => {
        amount = interaction.options.getNumber('amount');
        if (amount <= 100) {
            interaction.channel.bulkDelete(amount, true);
        }
        if (err) {
        console.log(err);
        interaction.reply('An error occurred while trying to purge channel');
        return;
      }
    }
}