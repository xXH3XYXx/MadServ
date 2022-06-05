const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: [
    new SlashCommandBuilder()
      .setName('tgcounter')
      .setDescription('The TinyGnome Counter configuration commands')
      .addSubcommand(command =>
        command
          .setName('register')
          .setDescription('Register the current channel to be used with the TinyGnome Counter')
          .addStringOption(option => option
            .setName('counter_react_emoji')
            .setDescription('The emoji to be used when reacting to a counted number. Must be an escaped emoji')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_breaker_role_name')
            .setDescription('The role to be added to the user that breaks the count')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_miscount_message')
            .setDescription('The message to display when someone sends a number out of order')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_double_count_message')
            .setDescription('The message to display when someone counts twice in a row')
            .setRequired(false)
          ))
      .addSubcommand(command =>
        command
          .setName('updatetgcounter')
          .setDescription('Update the current channel\'s TinyGnome Counter settings')
          .addStringOption(option => option
            .setName('counter_react_emoji')
            .setDescription('The emoji to be used when reacting to a counted number. Must be an escaped emoji')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_breaker_role_name')
            .setDescription('The role to be added to the user that breaks the count')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_miscount_message')
            .setDescription('The message to display when someone sends a number out of order')
            .setRequired(false)
          )
          .addStringOption(option => option
            .setName('counter_double_count_message')
            .setDescription('The message to display when someone counts twice in a row')
            .setRequired(false)
          )),
    new SlashCommandBuilder()
      .setName('tgcountdown')
      .setDescription('Manage a TinyGnome Countdown')
      .addSubcommand(command =>
        command
          .setName('add')
          .setDescription('Add a new countdown')
          .addStringOption(option =>
            option
              .setName('name')
              .setDescription('The name of the countdown to be added')
              .setRequired(true)
          )
          .addStringOption(option =>
            option
              .setName('date')
              .setDescription('The date to countdown to. Format as mm/dd/yyyy')
              .setRequired(true)
          ))
      .addSubcommand(command =>
        command
          .setName('delete')
          .setDescription('Delete an existing countdown')
          .addStringOption(option =>
            option
              .setName('name')
              .setDescription('The name of the countdown to be deleted')
              .setRequired(true)
          ))
  ]
};
