const CounterSettings = require('../models/CounterSettings');

const DEFAULT_REACTION = "🥳";
const DEFAULT_MISS_MESSAGE = "Booo <author> you can't count!";
const DEFAULT_DOUBLE_MESSAGE = "Booo <author> you can't count twice in a row!";
const parseFailureMessage = (failureMsg, msg) => {
  const regex = /<author>/i;
  return failureMsg.replace(regex, msg.author);
}
module.exports = (msg) => {
  const nextCount = parseInt(msg.content, 10);
  
  CounterSettings.findOne({ channel_id: msg.channelId }, (err, settings) => {
    if (err) {
      console.log(err);
      interaction.reply('An error occurred while trying to update the count! Contact TinyGnom');
      return;
    }

    if (settings) {
      const currentCount = settings.count;
      const currentUser = settings.last_counter_id;
      const miscountMessage = settings.counter_miscount_message || DEFAULT_MISS_MESSAGE;
      const doubleCountMessage = settings.counter_double_count_message || DEFAULT_DOUBLE_MESSAGE;

      if (msg.author.id !== currentUser) {
        if (nextCount === currentCount + 1) {
          settings.count++;
          settings.last_counter_id = msg.author.id;
          msg.react(settings.counter_react_emoji || DEFAULT_REACTION);
        }
        else {
          settings.count = 0;
          settings.last_counter_id = -1;
          msg.client.channels.cache.get(msg.channelId).send(`${parseFailureMessage(miscountMessage, msg)} Let's try this again starting with 1`);
        }
      }
      else {
        settings.count = 0;
        settings.last_counter_id = -1;
        msg.client.channels.cache.get(msg.channelId).send(`${parseFailureMessage(doubleCountMessage, msg)} Let's try this again starting with 1`);
      }

      settings.save(err => {
        if (err) {
          console.log(err);
          interaction.reply({ content: 'An error occurred while trying to update the count! Contact TinyGnome', ephemeral: true });
          return;
        }
      });
    }
  });
};
