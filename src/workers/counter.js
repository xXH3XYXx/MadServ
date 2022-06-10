const CounterSettings = require('../models/counterSettings');

const DEFAULT_REACTION = "🥳";
const DEFAULT_MISS_MESSAGE = "Booo <author> you can't count!";
const DEFAULT_DOUBLE_MESSAGE = "Booo <author> you can't count twice in a row!";
const parseFailureMessage = (failureMsg, msg) => {
  const regex = /<author>/i;
  return failureMsg.replace(regex, msg.author);
};

const updateBrokenCount = (settings, msg, reply) => {
  let breakerRole = msg.guild.roles.cache.find(role => role.name === settings.counter_breaker_role_name);
  let curBreakerMember = msg.guild.members.cache.find(member => member.id === msg.author.id);
  let prevBreakerMember = msg.guild.members.cache.find(member => member.id === settings.last_count_breaker_id);
  if (prevBreakerMember) {
    prevBreakerMember.roles.remove(breakerRole);
  }
  msg.client.channels.cache.get(msg.channelId).send(`${reply} Let's try this again starting with 1`);
  curBreakerMember.roles.add(breakerRole);
  settings.count = 0;
  settings.last_counter_id = -1;
  settings.last_count_breaker_id = msg.author.id;
};

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
          switch (nextCount) {
            case 13:
              msg.react("🐈‍⬛");
            case 21:
              msg.react("🥂");
              break;
            case 42:
              msg.react("🇱");
              msg.react("🇮");
              msg.react("🇫");
              msg.react("🇪");
              break;
            case 51:
              msg.react("👽");
              break;
            case 69:
              msg.react("🇳");
              msg.react("🇮");
              msg.react("🇨");
              msg.react("🇪");
              msg.react("6️⃣");
              msg.react("9️⃣");
              break;
            case 100:
              msg.react("💯");
              break;
            case 556:
              msg.react("🪄");
              break;
            default:
              msg.react(settings.counter_react_emoji || DEFAULT_REACTION);
              break;
          }
        }
        else {
          updateBrokenCount(settings, msg, parseFailureMessage(miscountMessage, msg));
        }
      }
      else {
        updateBrokenCount(settings, msg, parseFailureMessage(doubleCountMessage, msg));
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
