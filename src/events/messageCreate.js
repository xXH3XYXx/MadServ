const counter = require('../workers/counter.js');
const countdown = require('../workers/countdown.js');

const TG_PREFIX = '!tg';
const MS_PREFIX = "+";
module.exports = {
  name: "messageCreate",
  once: false,
  execute(msg) {
    if (msg.author.bot) {
      return;
    }

    //Ping/pong message types
    if (msg.content.toLowerCase().localeCompare('ping') === 0) {
      msg.reply('pong');
      return;
    }
    else if (msg.content.toLowerCase().localeCompare('bloop') === 0) {
      msg.reply('boop');
      return;
    }
    else if (msg.content.toLowerCase().localeCompare('boobs') === 0) {
      msg.reply('where?!');
      return;
    }

    // If the message starts with !tg pass it to the countdown
    if (msg.content.startsWith(TG_PREFIX)) {
      if (msg.content.indexOf('countdown') === 3) {
        countdown(msg, msg.content.substring(12).trim());
        return;
      }
    }
    else if (msg.content.startsWith(MS_PREFIX)) {
      const commandBody = msg.content.slice(MS_PREFIX.length);
      const command = commandBody.toLowerCase();
  
      if (command === 'test') {
        msg.reply("<@" + msg.author.id + ">");
        msg.reply('test');
      }
      return;
    }

    // If the message is a number pass it to the counter
    if (!isNaN(msg.content)) {
      counter(msg);
    }
  }
}